"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceError = exports.ErrorCode = void 0;
// Error codes as enums
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ErrorCode["VALIDATION_FAILED"] = "VALIDATION_FAILED";
    ErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    ErrorCode["FORBIDDEN"] = "FORBIDDEN";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
// Extend the built-in Error class to create a ServiceError class
class ServiceError extends Error {
    constructor(code, message, details = {}) {
        super(message);
        this.code = code;
        this.details = details;
        this.name = 'ServiceError';
    }
    static notFound(message, details = {}) {
        return new ServiceError(ErrorCode.NOT_FOUND, message, details);
    }
    static validationFailed(message, details = {}) {
        return new ServiceError(ErrorCode.VALIDATION_FAILED, message, details);
    }
    static unauthorized(message, details = {}) {
        return new ServiceError(ErrorCode.UNAUTHORIZED, message, details);
    }
    static forbidden(message, details = {}) {
        return new ServiceError(ErrorCode.FORBIDDEN, message, details);
    }
    get isNotFound() {
        return this.code === ErrorCode.NOT_FOUND;
    }
    get isValidationFailed() {
        return this.code === ErrorCode.VALIDATION_FAILED;
    }
    get isUnauthorized() {
        return this.code === ErrorCode.UNAUTHORIZED;
    }
    get isForbidden() {
        return this.code === ErrorCode.FORBIDDEN;
    }
}
exports.ServiceError = ServiceError;
//# sourceMappingURL=serviceError.js.map