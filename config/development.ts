"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: 9000,
    logging: {
        level: 'silly', //logging until lowest level (6 - silly)
        disabled: false
    }, //add configurations of cors: webapplication will render on 5173 and maxAge is the time that it will have access (is in seconds, so 3hours here)
    cors: {
        origins: ['http://localhost:5173'], // 👈 2
        maxAge: 3 * 60 * 60, // 👈 3
    },
    database: {
        client: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        name: "cyclingdatabase",
    },
    auth: {
        argon: {
            saltLength: 16,
            hashLength: 32,
            timeCost: 6,
            memoryCost: Math.pow(2, 17),
        },
        jwt: {
            secret: 'eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked',
            expirationInterval: 60 * 60 * 1000, // ms (1 hour) dependent on the secutity needs of the app. Bank app shorter
            issuer: 'cyclingdb.hogent.be',
            audience: 'cyclingdb.hogent.be',
        },
    },
};
//# sourceMappingURL=development.js.map