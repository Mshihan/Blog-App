"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromToken = void 0;
const keys_1 = require("../keys");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserFromToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, keys_1.JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
exports.getUserFromToken = getUserFromToken;
