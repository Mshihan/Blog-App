"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.User = exports.Profile = exports.Mutation = void 0;
__exportStar(require("./Query"), exports);
var Mutation_1 = require("./Mutation/Mutation");
Object.defineProperty(exports, "Mutation", { enumerable: true, get: function () { return Mutation_1.Mutation; } });
var Profile_1 = require("./Profile");
Object.defineProperty(exports, "Profile", { enumerable: true, get: function () { return Profile_1.Profile; } });
var User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
var Post_1 = require("./Post");
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return Post_1.Post; } });
