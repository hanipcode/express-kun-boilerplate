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
var postController = __importStar(require("../post.controller"));
var testUtils_1 = require("../../../utils/testUtils");
var post_model_1 = __importDefault(require("../post.model"));
var comment_model_1 = __importDefault(require("../comment.model"));
var user_model_1 = __importDefault(require("../../user/user.model"));
var yup_1 = require("yup");
var validationWording_1 = __importDefault(require("../../../constants/validationWording"));
var testConstants_1 = __importDefault(require("../../../constants/testConstants"));
var post_model_2 = __importDefault(require("../post.model"));
var NotFoundError_1 = __importDefault(require("../../../interfaces/NotFoundError"));
jest.mock('../post.model.ts');
jest.mock('../comment.model.ts');
jest.mock('../../user/user.model.ts');
describe('POST Controller', function () {
    var req;
    var res;
    beforeEach(function () {
        jest.resetAllMocks();
        req = testUtils_1.mockRequest();
        res = testUtils_1.mockResponse();
        res.locals.decoded.data = testConstants_1.default.userDocument;
        var userSaveSpy = jest.fn();
        var postPushSpy = jest.fn();
        var userDocSpy = __assign(__assign({}, testConstants_1.default.userDocument), { posts: {
                push: postPushSpy
            }, save: userSaveSpy });
        user_model_1.default.findOne.mockReturnValue(userDocSpy);
        comment_model_1.default.create.mockReturnValue({
            _id: '12341521312'
        });
    });
    describe('Get All Post', function () {
        it('can get all post', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resBody, populateFn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resBody = {
                            data: [
                                {
                                    user: 'usearlnro123 arnold',
                                    comments: [{ message: 'ini comments' }],
                                    content: 'Hi dari content'
                                }
                            ],
                            message: 'Success get all post'
                        };
                        populateFn = jest.fn();
                        post_model_1.default.find.mockImplementation(function () {
                            return {
                                sort: function () { return ({
                                    populate: populateFn.mockImplementation(function () { return resBody.data; })
                                }); }
                            };
                        });
                        return [4 /*yield*/, postController.getAll(req, res)];
                    case 1:
                        _a.sent();
                        expect(populateFn).toBeCalled();
                        expect(populateFn).toBeCalledWith('comments');
                        expect(res.json).toBeCalled();
                        expect(res.json).toBeCalledWith({
                            data: resBody.data,
                            message: expect.any(String)
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Create Post', function () {
        it('error on empty content in body', function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.body = {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postController.create(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1).toBeInstanceOf(yup_1.ValidationError);
                        expect(e_1.message).toEqual(validationWording_1.default.required('content'));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('call Post.create with post content', function () { return __awaiter(void 0, void 0, void 0, function () {
            var content, expectedParam, postId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.locals.decoded.data = testConstants_1.default.userDocument;
                        content = 'menjelang pagiku';
                        req.body = {
                            content: content
                        };
                        expectedParam = {
                            user: testConstants_1.default.userDocument._id,
                            content: content
                        };
                        postId = '2ip3jeiojeo';
                        post_model_2.default.create.mockImplementation(function () { return (__assign({ _id: '2ip3jeiojeo' }, expectedParam)); });
                        return [4 /*yield*/, postController.create(req, res)];
                    case 1:
                        _a.sent();
                        expect(post_model_2.default.create).toBeCalled();
                        expect(post_model_2.default.create).toBeCalledWith(expectedParam);
                        expect(res.json).toBeCalled();
                        expect(res.json).toBeCalledWith(expect.objectContaining({
                            data: expect.objectContaining({
                                _id: expect.any(String),
                                user: testConstants_1.default.userDocument._id,
                                content: content
                            }),
                            message: expect.any(String)
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('assign the newly created post to user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var content, expectedParam, postId, userSaveSpy, postPushSpy, userDocSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.locals.decoded.data = testConstants_1.default.userDocument;
                        content = 'menjelang pagiku';
                        req.body = {
                            content: content
                        };
                        expectedParam = {
                            user: testConstants_1.default.userDocument._id,
                            content: content
                        };
                        postId = '2ip3jeiojeo';
                        userSaveSpy = jest.fn();
                        postPushSpy = jest.fn();
                        userDocSpy = __assign(__assign({}, testConstants_1.default.userDocument), { posts: {
                                push: postPushSpy
                            }, save: userSaveSpy });
                        user_model_1.default.findOne.mockReturnValue(userDocSpy);
                        post_model_2.default.create.mockImplementation(function () { return (__assign({ _id: postId }, expectedParam)); });
                        return [4 /*yield*/, postController.create(req, res)];
                    case 1:
                        _a.sent();
                        expect(user_model_1.default.findOne).toBeCalled();
                        expect(user_model_1.default.findOne).toBeCalledWith({
                            _id: testConstants_1.default.userDocument._id
                        });
                        expect(userSaveSpy).toBeCalled();
                        expect(postPushSpy).toBeCalled();
                        expect(postPushSpy).toBeCalledWith(__assign({ _id: postId }, expectedParam));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Commenting', function () {
        describe('Negative Test', function () {
            it('error on empty message', function () { return __awaiter(void 0, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res.locals.decoded.data = testConstants_1.default.userDocument;
                            req.body = {};
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, postController.comment(req, res)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            expect(error_1).toBeInstanceOf(yup_1.ValidationError);
                            expect(error_1.message).toEqual(validationWording_1.default.required('message'));
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            it('error if no postId in the params', function () { return __awaiter(void 0, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res.locals.decoded.data = testConstants_1.default.userDocument;
                            req.params = {};
                            req.body = {
                                message: 'test test'
                            };
                            expect(postController.comment(req, res)).rejects.toBeTruthy();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, postController.comment(req, res)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            expect(error_2).toBeInstanceOf(yup_1.ValidationError);
                            expect(error_2.message).toEqual(validationWording_1.default.required('postId'));
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('Positive Test', function () {
            var message = 'This is Message';
            var pushSpy;
            var saveSpy;
            var postId = '123131212e3';
            beforeEach(function () {
                comment_model_1.default.create.mockImplementation(function () {
                    return {
                        _id: '123123123',
                        user: testConstants_1.default.userDocument._id,
                        message: message
                    };
                });
                pushSpy = jest.fn();
                saveSpy = jest.fn();
                post_model_1.default.findOne.mockImplementation(function () {
                    return {
                        _id: postId,
                        comments: {
                            push: jest.fn()
                        },
                        save: jest.fn()
                    };
                });
            });
            it('call Comment.create with user id and message', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res.locals.decoded.data = testConstants_1.default.userDocument;
                            req.params = {
                                postId: '1231312'
                            };
                            req.body = {
                                message: message
                            };
                            return [4 /*yield*/, postController.comment(req, res)];
                        case 1:
                            _a.sent();
                            expect(comment_model_1.default.create).toBeCalled();
                            expect(comment_model_1.default.create).toBeCalledWith({
                                user: testConstants_1.default.userDocument._id,
                                post: expect.any(String),
                                message: message
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it('return response with newly created comment', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res.locals.decoded.data = testConstants_1.default.userDocument;
                            req.body = {
                                message: message
                            };
                            req.params = {
                                postId: '1231312'
                            };
                            comment_model_1.default.create.mockImplementation(function () {
                                return {
                                    user: testConstants_1.default.userDocument._id,
                                    message: message
                                };
                            });
                            return [4 /*yield*/, postController.comment(req, res)];
                        case 1:
                            _a.sent();
                            expect(res.json).toBeCalled();
                            expect(res.json).toBeCalledWith(expect.objectContaining({
                                data: expect.objectContaining({
                                    user: testConstants_1.default.userDocument._id,
                                    message: message
                                }),
                                message: expect.any(String)
                            }));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('get the post object', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res.locals.decoded.data = testConstants_1.default.userDocument;
                            req.body = {
                                message: message
                            };
                            req.params = {
                                postId: postId
                            };
                            comment_model_1.default.create.mockImplementation(function () {
                                return {
                                    _id: '123123123',
                                    user: testConstants_1.default.userDocument._id,
                                    message: message
                                };
                            });
                            return [4 /*yield*/, postController.comment(req, res)];
                        case 1:
                            _a.sent();
                            expect(post_model_1.default.findOne).toBeCalled();
                            expect(post_model_1.default.findOne).toBeCalledWith({
                                _id: postId
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it('save the comment to the post object', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res.locals.decoded.data = testConstants_1.default.userDocument;
                            req.body = {
                                message: message
                            };
                            req.params = {
                                postId: '1231312'
                            };
                            pushSpy = jest.fn();
                            saveSpy = jest.fn();
                            post_model_1.default.findOne.mockImplementation(function () {
                                return {
                                    _id: postId,
                                    comments: {
                                        push: pushSpy
                                    },
                                    save: saveSpy
                                };
                            });
                            comment_model_1.default.create.mockImplementation(function () {
                                return {
                                    _id: '123123123',
                                    user: testConstants_1.default.userDocument._id,
                                    message: message
                                };
                            });
                            return [4 /*yield*/, postController.comment(req, res)];
                        case 1:
                            _a.sent();
                            expect(pushSpy).toBeCalled();
                            expect(pushSpy).toBeCalledWith('123123123');
                            expect(saveSpy).toBeCalled();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('Sub Comment', function () {
        var postId;
        var saveSpy;
        var pushSpy;
        beforeEach(function () {
            postId = '12312313';
            pushSpy = jest.fn();
            saveSpy = jest.fn();
            post_model_1.default.findOne.mockReturnValue({
                _id: postId,
                comments: {
                    push: pushSpy
                },
                save: saveSpy
            });
        });
        it('commentId should be supplied from the param', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.params = {
                            postId: postId
                        };
                        req.body = {
                            message: 'yuhuaahj'
                        };
                        expect(postController.createSubComment(req, res)).rejects.toBeTruthy();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postController.createSubComment(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        expect(error_3).toBeInstanceOf(Error);
                        expect(error_3.message).toEqual(validationWording_1.default.required('commentId'));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should have message in the body', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.params = {
                            postId: postId,
                            commentId: '231kajsnd01'
                        };
                        req.body = {};
                        expect(postController.createSubComment(req, res)).rejects.toBeTruthy();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postController.createSubComment(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        expect(error_4).toBeInstanceOf(yup_1.ValidationError);
                        expect(error_4.message).toEqual(validationWording_1.default.required('message'));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('call Comment.findOne with the commentId as params', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.locals.decoded.data = testConstants_1.default.userDocument;
                        req.params = {
                            postId: postId,
                            commentId: '31123131'
                        };
                        req.body = {
                            message: 'this is the message'
                        };
                        comment_model_1.default.findOne.mockReturnValue({
                            _id: '231312312',
                            message: 'comment message',
                            level: 0,
                            comments: {
                                push: jest.fn()
                            },
                            save: jest.fn()
                        });
                        return [4 /*yield*/, postController.createSubComment(req, res)];
                    case 1:
                        _a.sent();
                        expect(comment_model_1.default.findOne).toBeCalled();
                        expect(comment_model_1.default.findOne).toBeCalledWith({
                            _id: req.params.commentId
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('call comment.create with message and comment level greater than previous comment', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.locals.decoded.data = testConstants_1.default.userDocument;
                        req.params = {
                            postId: postId,
                            commentId: '31123131'
                        };
                        req.body = {
                            message: 'this is the message'
                        };
                        comment_model_1.default.findOne.mockReturnValue({
                            _id: '231312312',
                            message: 'comment message',
                            level: 1,
                            comments: {
                                push: jest.fn()
                            },
                            save: jest.fn()
                        });
                        return [4 /*yield*/, postController.createSubComment(req, res)];
                    case 1:
                        _a.sent();
                        expect(comment_model_1.default.create).toBeCalled();
                        expect(comment_model_1.default.create).toBeCalledWith({
                            user: testConstants_1.default.userDocument._id,
                            post: expect.any(String),
                            message: req.body.message,
                            level: 2
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('error if comment not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.locals.decoded.data = testConstants_1.default.userDocument;
                        req.params = {
                            postId: postId,
                            commentId: '31123131'
                        };
                        req.body = {
                            message: 'this is the message'
                        };
                        comment_model_1.default.findOne.mockReturnValue(null);
                        expect(postController.createSubComment(req, res)).rejects.toBeTruthy();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postController.createSubComment(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        expect(error_5).toBeInstanceOf(NotFoundError_1.default);
                        expect(error_5.message).toEqual(validationWording_1.default.notFound('Comment'));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('call push and save on parent comments', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pushSpy, saveSpy, createdId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.locals.decoded.data = testConstants_1.default.userDocument;
                        req.params = {
                            postId: postId,
                            commentId: '31123131'
                        };
                        req.body = {
                            message: 'this is the message'
                        };
                        pushSpy = jest.fn();
                        saveSpy = jest.fn();
                        comment_model_1.default.findOne.mockReturnValue({
                            _id: '231312312',
                            message: 'comment message',
                            level: 1,
                            comments: {
                                push: pushSpy
                            },
                            save: saveSpy
                        });
                        createdId = '12341521312';
                        return [4 /*yield*/, postController.createSubComment(req, res)];
                    case 1:
                        _a.sent();
                        expect(pushSpy).toBeCalled();
                        expect(pushSpy).toBeCalledWith(createdId);
                        expect(saveSpy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('call res.json with created sub comment', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pushSpy, saveSpy, createdId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.locals.decoded.data = testConstants_1.default.userDocument;
                        req.params = {
                            postId: postId,
                            commentId: '31123131'
                        };
                        req.body = {
                            message: 'this is the message'
                        };
                        pushSpy = jest.fn();
                        saveSpy = jest.fn();
                        comment_model_1.default.findOne.mockReturnValue({
                            _id: '231312312',
                            message: 'comment message',
                            level: 1,
                            comments: {
                                push: pushSpy
                            },
                            save: saveSpy
                        });
                        createdId = '12341521312';
                        comment_model_1.default.create.mockReturnValue({
                            _id: '12341521312',
                            message: 'this is the message'
                        });
                        return [4 /*yield*/, postController.createSubComment(req, res)];
                    case 1:
                        _a.sent();
                        expect(res.json).toBeCalled();
                        expect(res.json).toBeCalledWith(expect.objectContaining({
                            data: expect.objectContaining({
                                message: 'this is the message'
                            }),
                            message: expect.any(String)
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('add comment to the post object', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pushSpy, saveSpy, createdId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.locals.decoded.data = testConstants_1.default.userDocument;
                        req.params = {
                            postId: postId,
                            commentId: '31123131'
                        };
                        req.body = {
                            message: 'this is the message'
                        };
                        pushSpy = jest.fn();
                        saveSpy = jest.fn();
                        comment_model_1.default.findOne.mockReturnValue({
                            _id: '231312312',
                            message: 'comment message',
                            level: 1,
                            comments: {
                                push: pushSpy
                            },
                            save: saveSpy
                        });
                        createdId = '12341521312';
                        comment_model_1.default.create.mockReturnValue({
                            _id: '12341521312',
                            message: 'this is the message'
                        });
                        return [4 /*yield*/, postController.createSubComment(req, res)];
                    case 1:
                        _a.sent();
                        expect(post_model_1.default.findOne).toBeCalled();
                        expect(post_model_1.default.findOne).toBeCalledWith({
                            _id: postId
                        });
                        expect(pushSpy).toBeCalled();
                        expect(pushSpy).toBeCalledWith('12341521312');
                        expect(saveSpy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('upsert point', function () {
        it('should error if no type provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.body = {};
                        expect(postController.upsertPoint(req, res)).rejects.toBeTruthy();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postController.upsertPoint(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        expect(error_6).toBeInstanceOf(yup_1.ValidationError);
                        expect(error_6.message).toEqual(validationWording_1.default.required('type'));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should throw validation error if invalid type provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.body = {
                            type: 'whatever'
                        };
                        expect(postController.upsertPoint(req, res)).rejects.toBeTruthy();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postController.upsertPoint(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        console.log(error_7.message);
                        expect(error_7).toBeInstanceOf(TypeError);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('is able to save to the post object', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postId, pushSpy, saveSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postId = '12312313';
                        req.params = {
                            postId: postId,
                            commentId: '123123123'
                        };
                        req.body = {
                            type: 'increment',
                            message: 'durara'
                        };
                        pushSpy = jest.fn();
                        saveSpy = jest.fn();
                        comment_model_1.default.findOne.mockReturnValue({
                            _id: '123131321',
                            message: 'parent',
                            comments: {
                                push: jest.fn()
                            },
                            save: jest.fn()
                        });
                        comment_model_1.default.create.mockReturnValue({
                            _id: '12313123131131d',
                            message: 'parent',
                            comments: {
                                push: jest.fn()
                            },
                            save: jest.fn()
                        });
                        post_model_1.default.findOne.mockReturnValue({
                            _id: postId,
                            points: 0,
                            comments: {
                                push: pushSpy
                            },
                            save: saveSpy
                        });
                        return [4 /*yield*/, postController.upsertPoint(req, res)];
                    case 1:
                        _a.sent();
                        expect(post_model_1.default.findOne).toBeCalled();
                        expect(post_model_1.default.findOne).toBeCalledWith({
                            _id: postId
                        });
                        expect(saveSpy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=post.controller.spec.js.map