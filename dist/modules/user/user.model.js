"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt_1 = __importDefault(require("bcrypt"));
var keys_1 = __importDefault(require("../../constants/keys"));
function hashPassword(value) {
    return bcrypt_1.default.hashSync(value, keys_1.default.salt);
}
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        set: hashPassword
    },
    posts: [{ type: mongoose_1.Types.ObjectId, ref: 'Post' }],
    name: {
        required: true,
        type: String
    }
});
var User = mongoose_1.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map