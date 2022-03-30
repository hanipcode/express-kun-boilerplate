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
var Role;
(function (Role) {
    Role["distributor"] = "Distributor";
    Role["receiver"] = "Receiver";
    Role["admin"] = "Admin";
    Role["lab"] = "Lab";
    Role["techincal"] = "Technical";
})(Role = exports.Role || (exports.Role = {}));
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        set: hashPassword,
    },
    name: {
        required: true,
        type: String,
    },
});
var User = mongoose_1.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map