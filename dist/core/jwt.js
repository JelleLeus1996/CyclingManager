"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJWT = void 0;
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_AUDIENCE = config_1.default.get('auth.jwt.audience');
const JWT_SECRET = config_1.default.get('auth.jwt.secret');
const JWT_ISSUER = config_1.default.get('auth.jwt.issuer');
const JWT_EXPIRATION_INTERVAL = config_1.default.get('auth.jwt.expirationInterval');
const generateJWT = (team) => {
    //eigen claims
    const tokenData = {
        teamId: team.teamId,
        roles: team.roles
    };
    //predifined claims
    const signOptions = {
        expiresIn: Math.floor(JWT_EXPIRATION_INTERVAL / 1000),
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
        subject: 'auth'
    };
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(tokenData, JWT_SECRET, signOptions, (error, token) => {
            if (error) {
                console.log('Error while signing new token', error.message);
                return reject(error);
            }
            if (typeof token === 'string') {
                return resolve(token);
            }
            else {
                return reject(new Error('Failed to generate JWT token'));
            }
        });
    });
};
exports.generateJWT = generateJWT;
const verifyJWT = (authToken) => {
    const verifyOptions = {
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
        sub: 'auth'
    };
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(authToken, JWT_SECRET, verifyOptions, (error, decodedToken) => {
            if (error || !decodedToken) {
                if (error instanceof Error) {
                    console.log('Error while verifying token', error.message);
                }
                else {
                    console.log('An unknown error occurred', { error });
                }
                return reject(error || new Error('Token could not be parsed'));
            }
            return resolve(decodedToken);
        });
    });
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwt.js.map