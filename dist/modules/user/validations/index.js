"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yup = __importStar(require("yup"));
var validationWording_1 = __importDefault(require("../../../constants/validationWording"));
exports.LoginShape = {
    email: yup
        .string()
        .email(validationWording_1.default.invalid('email'))
        .required(validationWording_1.default.required('email')),
    password: yup.string().required(validationWording_1.default.required('password'))
};
exports.RegisterShape = {
    email: yup
        .string()
        .email(validationWording_1.default.invalid('email'))
        .required(validationWording_1.default.required('email')),
    password: yup
        .string()
        .min(8, validationWording_1.default.minLength(8))
        .required(validationWording_1.default.required('password')),
    name: yup.string().required(validationWording_1.default.required('name'))
};
exports.loginValidation = yup.object().shape(exports.LoginShape);
exports.registerValidation = yup.object().shape(exports.RegisterShape);
//# sourceMappingURL=index.js.map