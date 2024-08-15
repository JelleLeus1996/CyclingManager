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
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequireRole = exports.requireAuthentication = void 0;
const userService_1 = require("../services/userService");
const jwt_1 = require("../core/jwt");
const requireAuthentication = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = ctx.headers.authorization;
    console.log('Authorization header:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        ctx.throw(401, 'You need to be signed in');
    }
    const token = authHeader.slice(7); // Remove 'Bearer ' from the token
    try {
        const payload = yield (0, jwt_1.verifyJWT)(token);
        ctx.state.user = payload; // Store payload in state for later use
        ctx.state.session = {
            teamId: payload.teamId,
            roles: payload.roles
        };
        yield next(); // Token is valid, proceed to the next middleware
    }
    catch (error) {
        ctx.throw(401, 'Invalid or expired token');
    }
});
exports.requireAuthentication = requireAuthentication;
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
const makeRequireRole = (role) => (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roles = [] } = ctx.state.session;
    userService_1.userService.checkRole(role, roles);
    return next();
});
exports.makeRequireRole = makeRequireRole;
//# sourceMappingURL=auth.js.map