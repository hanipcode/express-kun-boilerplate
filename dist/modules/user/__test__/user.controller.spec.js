"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var userController = __importStar(require("../user.controller"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var user_model_1 = __importDefault(require("../user.model"));
var testUtils_1 = require("../../../utils/testUtils");
var yup_1 = require("yup");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validationWording_1 = __importDefault(require("../../../constants/validationWording"));
var keys_1 = __importDefault(require("../../../constants/keys"));
var InvalidRequestError_1 = __importDefault(require("../../../interfaces/InvalidRequestError"));
jest.mock('../user.model.ts');
jest.mock('jsonwebtoken');
describe('User Controller', function () {
    beforeEach(function () {
        jest.resetAllMocks();
    });
    describe('Register', function () {
        test('Given email, password, name in the boey, it can handle creating user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var req, res, email, name, password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = testUtils_1.mockRequest();
                        res = testUtils_1.mockResponse();
                        email = 'hanif@mail.com';
                        name = 'Muhammad Hanif';
                        password = 'passwordku123456!';
                        req.body.email = email;
                        req.body.password = password;
                        req.body.name = name;
                        // act
                        return [4 /*yield*/, userController.createUser(req, res)];
                    case 1:
                        // act
                        _a.sent();
                        // assert
                        expect(user_model_1.default.create).toBeCalled();
                        expect(user_model_1.default.create).toBeCalledWith({
                            email: email,
                            name: name,
                            password: password
                        });
                        expect(res.json).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        test('it throws error when password is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
            var req, res, email, name, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = testUtils_1.mockRequest();
                        res = testUtils_1.mockResponse();
                        email = 'hanif@mail.com';
                        name = 'Muhammad Hanif';
                        req.body.name = name;
                        req.body.email = email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userController.createUser(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1).toBeInstanceOf(yup_1.ValidationError);
                        expect(e_1.message).toEqual(validationWording_1.default.required('password'));
                        return [3 /*break*/, 4];
                    case 4:
                        // assert
                        expect(user_model_1.default.create).not.toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        test('it throws error when name is empty', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var req, res, email, password, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = testUtils_1.mockRequest();
                        res = testUtils_1.mockResponse();
                        email = 'hanif@mail.com';
                        req.body.email = email;
                        password = 'passwordku123456!';
                        req.body.password = password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userController.createUser(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(e_2).toBeInstanceOf(yup_1.ValidationError);
                        expect(e_2.message).toEqual(validationWording_1.default.required('name'));
                        return [3 /*break*/, 4];
                    case 4:
                        //  assert
                        expect(user_model_1.default.create).not.toBeCalled();
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('it throws error when email is empty', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var req, res, name, password, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = testUtils_1.mockRequest();
                        res = testUtils_1.mockResponse();
                        name = 'Muhammad Hanif';
                        req.body.name = name;
                        password = 'passwordku123456!';
                        req.body.password = password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userController.createUser(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        expect(e_3).toBeInstanceOf(yup_1.ValidationError);
                        expect(e_3.message).toEqual(validationWording_1.default.required('email'));
                        return [3 /*break*/, 4];
                    case 4:
                        //  assert
                        expect(user_model_1.default.create).not.toBeCalled();
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test('it throws error when email is invalid', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var req, res, name, password, email, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = testUtils_1.mockRequest();
                        res = testUtils_1.mockResponse();
                        name = 'Muhammad Hanif';
                        req.body.name = name;
                        password = 'passwordku123456!';
                        req.body.password = password;
                        email = 'hanifemailnya suka suka';
                        req.body.email = email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userController.createUser(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        expect(e_4).toBeInstanceOf(yup_1.ValidationError);
                        expect(e_4.message).toEqual(validationWording_1.default.invalid('email'));
                        return [3 /*break*/, 4];
                    case 4:
                        //  assert
                        expect(user_model_1.default.create).not.toBeCalled();
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Login', function () {
        test('Given email and password in the body, it can handle login', function () { return __awaiter(void 0, void 0, void 0, function () {
            var req, res, email, password, currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = testUtils_1.mockRequest();
                        res = testUtils_1.mockResponse();
                        email = 'hanif@mail.com';
                        password = 'passwordku123456!';
                        req.body.email = email;
                        req.body.password = password;
                        currentUser = {
                            email: email,
                            password: password,
                            name: 'ceritanya nama'
                        };
                        jsonwebtoken_1.default.sign.mockImplementation(function () { return '131j213jToken'; });
                        user_model_1.default.findOne.mockImplementation(function () { return ({
                            select: jest.fn().mockReturnValue(__assign(__assign({}, currentUser), { password: bcrypt_1.default.hashSync(currentUser.password, keys_1.default.salt) }))
                        }); });
                        // act
                        return [4 /*yield*/, userController.loginUser(req, res)];
                    case 1:
                        // act
                        _a.sent();
                        // assert
                        expect(user_model_1.default.findOne).toBeCalled();
                        expect(user_model_1.default.findOne).toBeCalledWith({
                            email: email
                        });
                        expect(jsonwebtoken_1.default.sign).toBeCalled();
                        expect(jsonwebtoken_1.default.sign).toBeCalledWith({
                            data: expect.objectContaining({
                                name: currentUser.name,
                                email: currentUser.email
                            })
                        }, keys_1.default.secretKey, expect.any(Object));
                        expect(res.json).toBeCalled();
                        expect(res.json).toBeCalledWith(expect.objectContaining({
                            data: expect.objectContaining({
                                name: currentUser.name,
                                email: currentUser.email
                            }),
                            token: expect.any(String)
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        test('Given incorrect password in the body, it throw InvalidRequestError', function () { return __awaiter(void 0, void 0, void 0, function () {
            var req, res, email, password, currentUser, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = testUtils_1.mockRequest();
                        res = testUtils_1.mockResponse();
                        email = 'hanif@mail.com';
                        password = 'passwordku123456!';
                        req.body.email = email;
                        req.body.password = password;
                        currentUser = {
                            email: email,
                            password: password,
                            name: 'ceritanya nama'
                        };
                        user_model_1.default.findOne.mockImplementation(function () { return ({
                            select: jest.fn().mockReturnValue(__assign(__assign({}, currentUser), { password: bcrypt_1.default.hashSync('wrong password', keys_1.default.salt) }))
                        }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userController.loginUser(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        expect(e_5).toBeInstanceOf(InvalidRequestError_1.default);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        test('Given invalid body, it throw ValidationError', function () { return __awaiter(void 0, void 0, void 0, function () {
            var req, res, email, currentUser, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = testUtils_1.mockRequest();
                        res = testUtils_1.mockResponse();
                        email = 'hanif@mail.com';
                        req.body.email = email;
                        currentUser = {
                            email: email,
                            name: 'ceritanya nama'
                        };
                        user_model_1.default.findOne.mockImplementation(function () { return ({
                            select: jest.fn().mockReturnValue(__assign({}, currentUser))
                        }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userController.loginUser(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        expect(e_6).toBeInstanceOf(yup_1.ValidationError);
                        expect(e_6.message).toEqual(validationWording_1.default.required('password'));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=user.controller.spec.js.map