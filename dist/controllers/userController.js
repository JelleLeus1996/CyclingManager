"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const userService_1 = require("../services/userService");
let UserController = class UserController {
    //GET all teams limited - VIEW: ALL
    static getAllUsers(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield userService_1.userService.getAllUsers();
            if (teams) {
                ctx.status = 200;
                ctx.body = teams;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: "Users not found" };
            }
        });
    }
    static login(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = ctx.request.body;
            try {
                const { token, user } = yield userService_1.userService.login(email, password);
                ctx.status = 200;
                ctx.body = { token, user };
            }
            catch (error) {
                const err = error;
                ctx.status = 400;
                ctx.body = { message: err.message };
            }
        });
    }
};
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/users"),
    (0, koa_swagger_decorator_1.summary)("Get all users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController, "getAllUsers", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("post", "/users/login"),
    (0, koa_swagger_decorator_1.summary)("Login a user"),
    (0, koa_swagger_decorator_1.body)({
        email: { type: "jelle.leus@student.hogent.be", required: true, description: "User's email" },
        password: { type: "password", required: true, description: "User's password" },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController, "login", null);
UserController = __decorate([
    (0, koa_swagger_decorator_1.responsesAll)({
        200: { description: "success" },
        400: { description: "bad request" },
        401: { description: "unauthorized, missing/wrong jwt token" },
        404: { description: "not found" },
    }),
    (0, koa_swagger_decorator_1.tagsAll)(["Users"])
], UserController);
exports.default = UserController;
//# sourceMappingURL=userController.js.map