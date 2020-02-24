"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
var bcrypt_1 = __importDefault(require("bcrypt"));
var validationWording_1 = __importDefault(require("../../constants/validationWording"));
var user_repository_1 = __importDefault(require("./user.repository"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var NotFoundError_1 = __importDefault(require("../../interfaces/NotFoundError"));
var InvalidRequestError_1 = __importDefault(require("../../interfaces/InvalidRequestError"));
var keys_1 = __importDefault(require("../../constants/keys"));
var getAllRoleKey_1 = __importDefault(require("./helpers/getAllRoleKey"));
var user_model_1 = require("./user.model");
exports.createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, schema, validatedBody, userRepository, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                schema = yup.object().shape({
                    email: yup
                        .string()
                        .email(validationWording_1.default.invalid('email'))
                        .required(validationWording_1.default.required('email')),
                    password: yup
                        .string()
                        .min(8, validationWording_1.default.minLength(8))
                        .required(validationWording_1.default.required('password')),
                    name: yup.string().required(validationWording_1.default.required('name')),
                    role: yup
                        .mixed()
                        .oneOf(getAllRoleKey_1.default(), validationWording_1.default.oneOf.apply(validationWording_1.default, __spreadArrays(['role'], getAllRoleKey_1.default())))
                });
                validatedBody = schema.validateSync(body);
                userRepository = new user_repository_1.default();
                return [4 /*yield*/, userRepository.create({
                        email: validatedBody.email,
                        password: validatedBody.password,
                        role: user_model_1.Role[validatedBody.role],
                        name: validatedBody.name
                    })];
            case 1:
                user = _a.sent();
                res.json({
                    message: 'success creating user',
                    data: user
                });
                return [2 /*return*/];
        }
    });
}); };
exports.loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, schema, validatedBody, userRepository, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                schema = yup.object().shape({
                    email: yup
                        .string()
                        .email(validationWording_1.default.invalid('email'))
                        .required(validationWording_1.default.required('email')),
                    password: yup.string().required(validationWording_1.default.required('password'))
                });
                validatedBody = schema.validateSync(body);
                userRepository = new user_repository_1.default();
                return [4 /*yield*/, userRepository.findOneUserWithPassword({
                        email: validatedBody.email
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new NotFoundError_1.default(validationWording_1.default.notFound('user'), 'user');
                }
                if (!bcrypt_1.default.compareSync(validatedBody.password, user.password)) {
                    throw new InvalidRequestError_1.default(validationWording_1.default.invalid('password'), 'password');
                }
                delete user.password;
                token = jsonwebtoken_1.default.sign({ data: user }, keys_1.default.secretKey, {
                    expiresIn: '1h'
                });
                res.json({
                    data: user,
                    token: token,
                    message: 'Successfully login'
                });
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=user.controller.js.map