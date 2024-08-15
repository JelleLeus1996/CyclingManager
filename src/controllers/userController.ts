import { Context } from "koa";
import {
  request,
  summary,
  responsesAll,
  tagsAll,
  path,
  body,
  security,
} from "koa-swagger-decorator";
import { userService } from "../services/userService";
import { UserWithPassword, User } from "../models/user";
import { userSchema } from "../entities/user";
import Koa from "koa";
import { checkTeam } from "../core/utility";

//Verification via paramater of user to get teamId
export const checkTeamIdViaUser = async (ctx: Koa.Context, next: Koa.Next) => {
  const { id } = ctx.params;
  const user = await userService.getUserById(Number(id));
  const teamId = user?.teamId;
  if (teamId != null) {
    checkTeam(ctx, teamId);
  }
  return next();
};
@responsesAll({
  200: { description: "success" },
  400: { description: "bad request" },
  401: { description: "unauthorized, missing/wrong jwt token" },
  404: { description: "not found" },
})
@tagsAll(["Users"])
export default class UserController {
  //GET all users - VIEW: Only Admin
  @request("get", "/users")
  @summary("Get all users")
  @security([{ Bearer: [] }])
  public static async getAllUsers(ctx: Context): Promise<void> {
    const teams = await userService.getAllUsers();
    if (teams) {
      ctx.status = 200;
      ctx.body = teams;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Users not found" };
    }
  }

  //GET user by id - View: Admin & concerning user related to the team
  @request("get", "/users/{id}")
  @summary("Find user by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of user" },
  })
  public static async getUserById(ctx: Context): Promise<void> {
    const userId = +ctx.params.id;
    console.log(userId);
    const user = await userService.getUserById(userId);
    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 404;
      ctx.body = { message: `No user found with id ${userId}` };
    }
  }

  //POST Login - ALL - No authentication - initial call
  @request("post", "/users/login")
  @summary("Login a user")
  @body({
    email: {
      type: "string",
      required: true,
      description: "User's email ex.jelle.leus@student.hogent.be",
    },
    password: {
      type: "string",
      required: true,
      description: "User's password",
    },
  })
  public static async login(ctx: Context): Promise<void> {
    const { email, password } = ctx.request.body as UserWithPassword;
    try {
      const { token, user } = await userService.login(email, password);
      ctx.status = 200;
      ctx.body = { token, user };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }
  //UPDATE team - Admin only
  @request("put", "/users/{id}")
  @summary("Update user by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of user" },
  })
  @body(userSchema)
  public static async updateUser(ctx: Context): Promise<void> {
    const userId = +ctx.params.id;
    const updatedUser: User = {
      ...(ctx.request.body as User),
    };
    try {
      await userService.updateUser(userId, updatedUser);
      ctx.status = 200;
      ctx.body = { message: "User updated" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }

  //DELETE user - Admin only
  @request("delete", "/users/{id}")
  @summary("Delete user by id")
  @security([{ Bearer: [] }])
  @path({
    id: { type: "number", required: true, description: "id of user" },
  })
  public static async deleteUser(ctx: Context): Promise<void> {
    const userId = +ctx.params.id;
    try {
      await userService.deleteUser(userId);
      ctx.status = 200;
      ctx.body = { message: "User deleted" };
    } catch (error) {
      const err = error as Error;
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  }
}
