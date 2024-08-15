import { Role } from "../models/roles"
import Koa from 'koa';

//Verification team via paramater
export const checkTeamId = (ctx: Koa.Context, next: Koa.Next) => {
    const { id:paramTeamId } = ctx.params;
    // You can only get our own data unless you're an admin
    checkTeam(ctx, paramTeamId);
    return next();
  };
  
  //Verification team via session id or role
export const checkTeam = (ctx: Koa.Context, teamId: number)=>{
    const { teamId:sessionTeamId, roles } = ctx.state.session;
    if (teamId != sessionTeamId && !roles.includes(Role.ADMIN)) {
      console.log('You are not allowed to view this user\'s information')
      ctx.throw(403, 'You are not allowed to view this user\'s information',
        {
          code: 'FORBIDDEN',
        });
    }
  };