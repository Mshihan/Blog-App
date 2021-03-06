"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../keys");
exports.auth = {
    signup: async (_, { user }, { prisma }) => {
        const isEmail = validator_1.default.isEmail(user.email);
        if (!isEmail)
            return {
                userErrors: [{ message: "Please enter a valid email address" }],
                token: null,
            };
        const isValidPassword = validator_1.default.isLength(user.password, { min: 5 });
        if (!isValidPassword)
            return {
                userErrors: [{ message: "Password must be at least 5 characters" }],
                token: null,
            };
        if (!user.name || !user.bio)
            return {
                userErrors: [{ message: "Name and Bio are required" }],
                token: null,
            };
        const hashedPassword = await bcrypt_1.default.hash(user.password, 12);
        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashedPassword,
            },
        });
        const profile = await prisma.profile.create({
            data: {
                bio: user.bio,
                userId: newUser.id,
            },
        });
        const token = await jsonwebtoken_1.default.sign({
            userId: newUser.id,
        }, keys_1.JWT_SECRET, { expiresIn: "1h" });
        return {
            userErrors: [],
            token,
        };
    },
    signin: async (_, { user }, { prisma }) => {
        const { email, password } = user;
        const resultUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!resultUser)
            return {
                userErrors: [
                    { message: "Please check your credentials and try again" },
                ],
                token: null,
            };
        const isPasswordMatch = await bcrypt_1.default.compare(password, resultUser.password);
        if (!isPasswordMatch)
            return {
                userErrors: [
                    { message: "Please check your credentials and try again" },
                ],
                token: null,
            };
        return {
            userErrors: [],
            token: jsonwebtoken_1.default.sign({ userId: resultUser.id }, keys_1.JWT_SECRET, {
                expiresIn: "1h",
            }),
        };
    },
};
