import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../core/connection";
import { UserEntity } from "../entities/user";
import { User, UserWithPassword } from "../models/user";
import { ServiceError } from '../core/serviceError';
import {verifyPassword} from '../core/password';
import {generateJWT, verifyJWT} from '../core/jwt';
import {getLogger} from '../core/logging';

interface Session {
    teamId: number;
    roles: string;
    authToken: string;
  }

   

class UserService {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  } 
  
  checkAndParseSession = async (authHeader: string | undefined): Promise<Session> =>{
  //check if a token is given
  if (!authHeader)
  {
    throw ServiceError.unauthorized('You need to be signed in');
  }
  //token should start with 'Bearer'
  if(!authHeader.startsWith('Bearer'))
  {
    throw ServiceError.unauthorized('Invalid authentication token');
  }
  //get token starting from 7 (after 'Bearer ')
  const authToken = authHeader.substring(7);
  try {
    const {roles, teamId} = await verifyJWT(authToken);
    return {
      teamId,
      roles,
      authToken
    };
  }catch(error){
      if (error instanceof Error)
      {
          getLogger().error(error.message, {error});
          throw new Error(error.message);
      }
      else {
          getLogger().error('An unknown error occurred', { error });
          throw new Error('An unknown error occurred');
      }
    }
  };

  checkRole = (role: string, roles: string[]) => {
    const hasPermission = roles.includes(role);
    if (!hasPermission){
      throw ServiceError.forbidden('you are not allowed to view this part of the application');
    }
  };
  
  //Login
  makeLoginData = async (user: UserWithPassword):Promise<{token:string; user:User}> => {
    const token = await generateJWT(user);
    return {
      token,
      user:this.makeExposedUser(user)
    };
  };

  //GET all user - VIEW: Only Admin
  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | undefined> {
    const User = await this.userRepository.findOneBy({ teamId: id });
    return User as User;
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete({ teamId: id });
  }

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw ServiceError.unauthorized('The given email or password do not match');
    }
    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      throw ServiceError.unauthorized('The given email or password do not match');
    }
    const token = await generateJWT(user);
    const exposedUser = this.makeExposedUser(user);
    return {
      token,
      user: exposedUser
    };
  }
  private makeExposedUser(user: User): User {
    const { password_hash, ...exposedUser } = user;
    return exposedUser as User;
  }
}
// Export a singleton instance in the service layer
export const userService = new UserService();
