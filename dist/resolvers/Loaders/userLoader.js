"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const __1 = require("../..");
const batchUsers = async (ids) => {
    const users = await __1.prisma.user.findMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
    const userMap = {};
    users.forEach((user) => {
        userMap[user.id] = user;
    });
    return ids.map((id) => userMap[id]);
};
// @ts-ignore
exports.userLoader = new dataloader_1.default(batchUsers);
