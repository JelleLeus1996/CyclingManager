import {userService} from '../services/userService';
import Koa from 'koa';
import {generateJWT, verifyJWT} from '../core/jwt';

const requireAuthentication = async (ctx: Koa.Context, next: Koa.Next): Promise<any> => {
  const authHeader = ctx.headers.authorization;
  console.log('Authorization header:', authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.throw(401, 'You need to be signed in');
  }

  const token = authHeader.slice(7); // Remove 'Bearer ' from the token
  try {
    const payload = await verifyJWT(token);
    ctx.state.user = payload; // Store payload in state for later use
    await next(); // Token is valid, proceed to the next middleware
  } catch (error) {
    ctx.throw(401, 'Invalid or expired token');
  }
};
/* const requireAuthentication = async (ctx: Koa.Context, next: Koa.Next): Promise<any> =>{
  const {authorization}=ctx.headers;
  console.log('Authorization header:', authorization);
  //If you login you'll get a token and all session info like team name, country etc.
  if (!authorization) {
    ctx.throw(401, 'You need to be signed in');
  }
  try {
    const { authToken, ...session } = await userService.checkAndParseSession(authorization);
    console.log('Session data:', session); // Add logging

    ctx.state.session = session;
    ctx.state.authToken = authToken;

    return next();
  } catch (error) {
    console.error('Authentication error:', error); // Add logging
    ctx.throw(401, 'Invalid authentication token');
  }
}; */

//use currying here:
const makeRequireRole = (role: string)=> async(ctx: Koa.Context, next: Koa.Next): Promise<any> =>{
  const {roles=[]} = ctx.state.session;

  userService.checkRole(role, roles);

  return next();
};

export {requireAuthentication,makeRequireRole};