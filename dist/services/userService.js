"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const connection_1 = require("../core/connection");
const user_1 = require("../entities/user");
const serviceError_1 = require("../core/serviceError");
const password_1 = require("../core/password");
const jwt_1 = require("../core/jwt");
const logging_1 = require("../core/logging");
class UserService {
    constructor() {
        this.checkAndParseSession = (authHeader) => __awaiter(this, void 0, void 0, function* () {
            //check if a token is given
            if (!authHeader) {
                throw serviceError_1.ServiceError.unauthorized('You need to be signed in');
            }
            //token should start with 'Bearer'
            if (!authHeader.startsWith('Bearer')) {
                throw serviceError_1.ServiceError.unauthorized('Invalid authentication token');
            }
            //get token starting from 7 (after 'Bearer ')
            const authToken = authHeader.substring(7);
            try {
                const { roles, teamId } = yield (0, jwt_1.verifyJWT)(authToken);
                return {
                    teamId,
                    roles,
                    authToken
                };
            }
            catch (error) {
                if (error instanceof Error) {
                    (0, logging_1.getLogger)().error(error.message, { error });
                    throw new Error(error.message);
                }
                else {
                    (0, logging_1.getLogger)().error('An unknown error occurred', { error });
                    throw new Error('An unknown error occurred');
                }
            }
        });
        this.checkRole = (role, roles) => {
            const hasPermission = roles.includes(role);
            if (!hasPermission) {
                throw serviceError_1.ServiceError.forbidden('you are not allowed to view this part of the application');
            }
        };
        //Login
        this.makeLoginData = (user) => __awaiter(this, void 0, void 0, function* () {
            const token = yield (0, jwt_1.generateJWT)(user);
            return {
                token,
                user: this.makeExposedUser(user)
            };
        });
        this.userRepository = connection_1.AppDataSource.getRepository(user_1.UserEntity);
    }
    //GET all user - VIEW: Only Admin
    getAllUsers() {
        return this.userRepository.find();
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const User = yield this.userRepository.findOneBy({ teamId: id });
            return User;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.delete({ teamId: id });
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneBy({ email: email });
            if (!user) {
                throw serviceError_1.ServiceError.unauthorized('The given email or password do not match');
            }
            const valid = yield (0, password_1.verifyPassword)(password, user.password_hash);
            if (!valid) {
                throw serviceError_1.ServiceError.unauthorized('The given email or password do not match');
            }
            const token = yield (0, jwt_1.generateJWT)(user);
            const exposedUser = this.makeExposedUser(user);
            return {
                token,
                user: exposedUser
            };
        });
    }
    makeExposedUser(user) {
        const { password_hash } = user, exposedUser = __rest(user, ["password_hash"]);
        return exposedUser;
    }
}
// Export a singleton instance in the service layer
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map