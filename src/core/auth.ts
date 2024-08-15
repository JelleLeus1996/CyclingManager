import {userService} from '../services/userService';
import Koa from 'koa';
import {generateJWT, verifyJWT} from '../core/jwt';

const requireAuthentication = async (ctx: Koa.Context, next: Koa.Next): Promise<any> =>{
  const {authorization}=ctx.headers;
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