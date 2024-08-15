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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const argon2_1 = __importDefault(require("argon2"));
const config_1 = __importDefault(require("config"));
const ARGON_SALT_LENGTH = config_1.default.get('auth.argon.saltLength');
const ARGON_HASH_LENGTH = config_1.default.get('auth.argon.hashLength');
const ARGON_TIME_COST = config_1.default.get('auth.argon.timeCost');
const ARGON_MEMORY_COST = config_1.default.get('auth.argon.memoryCost');
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordHash = yield argon2_1.default.hash(password, {
        type: argon2_1.default.argon2id,
        //saltLength :ARGON_SALT_LENGTH,
        hashLength: ARGON_HASH_LENGTH,
        timeCost: ARGON_TIME_COST,
        memoryCost: ARGON_MEMORY_COST
    });
    return passwordHash;
});
exports.hashPassword = hashPassword;
const verifyPassword = (password, passwordHash) => __awaiter(void 0, void 0, void 0, function* () {
    const valid = yield argon2_1.default.verify(passwordHash, password);
    return valid;
});
exports.verifyPassword = verifyPassword;
exports.default = { hashPassword: exports.hashPassword, verifyPassword: exports.verifyPassword };
//# sourceMappingURL=password.js.map