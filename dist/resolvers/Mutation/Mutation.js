"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const post_1 = require("./post");
const auth_1 = require("./auth");
exports.Mutation = {
    ...post_1.post,
    ...auth_1.auth,
};
