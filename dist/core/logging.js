"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = exports.initializeLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, colorize, printf } = winston_1.default.format;
let rootLogger = null;
/**
 * Get the root logger.
 */
const getLogger = () => {
    if (!rootLogger) {
        throw new Error('You must first initialize the logger');
    }
    return rootLogger;
};
exports.getLogger = getLogger;
/**
 * Define the logging format. We output a timestamp, context (name), level, message and the stacktrace in case of an error (creation of a structured error message)
 */
const loggerFormat = () => {
    const formatMessage = (_a) => {
        var { level, message, timestamp, name = 'server' } = _a, rest = __rest(_a, ["level", "message", "timestamp", "name"]);
        return `${timestamp} | ${name} | ${level} | ${message} | ${JSON.stringify(rest)}`;
    };
    const formatError = (info) => {
        const { error } = info, rest = __rest(info, ["error"]);
        return `${formatMessage(rest)}\n\n${error instanceof Error ? error.stack : 'Error'}\n`;
    };
    const format = (info) => info instanceof Error ? formatError(info) : formatMessage(info);
    return combine(colorize(), timestamp(), printf(format));
};
/**
 * Initialize the root logger.
 *
 * @param {object} options - The options.
 * @param {string} options.level - The log level.
 * @param {boolean} options.disabled - Disable all logging.
 * @param {object} options.defaultMeta - Default metadata to show.
 */
const initializeLogger = ({ level, disabled = false, defaultMeta = {} }) => {
    rootLogger = winston_1.default.createLogger({
        level,
        format: loggerFormat(),
        defaultMeta,
        transports: [
            new winston_1.default.transports.Console({
                silent: disabled,
            }),
        ],
    });
    return rootLogger;
};
exports.initializeLogger = initializeLogger;
//# sourceMappingURL=logging.js.map