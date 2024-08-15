"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const JOI_OPTIONS = {
    abortEarly: true,
    allowUnknown: false,
    convert: true,
    presence: 'required',
};
const cleanupJoiError = (error) => error.details.reduce((resultObj, { message, path, type }) => {
    const joinedPath = path.join('.') || 'value';
    if (!resultObj[joinedPath]) {
        resultObj[joinedPath] = [];
    }
    resultObj[joinedPath].push({
        type,
        message,
    });
    return resultObj;
}, {});
const validate = (schema) => {
    if (!schema) {
        schema = {
            query: joi_1.default.object({}),
            body: joi_1.default.object({}),
            params: joi_1.default.object({}),
        };
    }
    return (ctx, next) => {
        const errors = {};
        if (!joi_1.default.isSchema(schema.params)) {
            schema.params = joi_1.default.object(schema.params || {});
        }
        const { error: paramsError, value: paramsValue } = schema.params.validate(ctx.params, JOI_OPTIONS);
        if (paramsError) {
            errors.params = cleanupJoiError(paramsError);
        }
        else {
            ctx.params = paramsValue;
        }
        if (!joi_1.default.isSchema(schema.body)) {
            schema.body = joi_1.default.object(schema.body || {});
        }
        const { error: bodyError, value: bodyValue } = schema.body.validate(ctx.request.body, JOI_OPTIONS);
        if (bodyError) {
            errors.body = cleanupJoiError(bodyError);
        }
        else {
            ctx.request.body = bodyValue;
        }
        if (!joi_1.default.isSchema(schema.query)) {
            schema.query = joi_1.default.object(schema.query || {});
        }
        const { error: queryError, value: queryValue } = schema.query.validate(ctx.query, JOI_OPTIONS);
        if (queryError) {
            errors.query = cleanupJoiError(queryError);
        }
        else {
            ctx.query = queryValue;
        }
        if (Object.keys(errors).length) {
            ctx.throw(400, 'Validation failed, check details for more information', {
                code: 'VALIDATION_FAILED',
                details: errors,
            });
        }
        return next();
    };
};
exports.default = validate;
//# sourceMappingURL=validation.js.map