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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var post_model_1 = __importDefault(require("./post.model"));
var comment_model_1 = __importDefault(require("./comment.model"));
var yup = __importStar(require("yup"));
var validationWording_1 = __importDefault(require("../../constants/validationWording"));
var user_model_1 = __importDefault(require("../user/user.model"));
var NotFoundError_1 = __importDefault(require("../../interfaces/NotFoundError"));
var recureseComment_1 = __importDefault(require("./helpers/recureseComment"));
exports.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allPost;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, post_model_1.default.find({})
                    .sort({
                    points: 'descending'
                })
                    .populate('comments')];
            case 1:
                allPost = _a.sent();
                throw new NotFoundError_1.default('memang', 'mamang');
        }
    });
}); };
exports.getPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationParams, validatedParams, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validationParams = yup.object().shape({
                    postId: yup.string().required(validationWording_1.default.required('postId'))
                });
                validatedParams = validationParams.validateSync(req.params);
                return [4 /*yield*/, post_model_1.default.findOne({
                        _id: validatedParams.postId
                    })];
            case 1:
                post = _a.sent();
                res.json({
                    data: post,
                    message: 'successfully get post'
                });
                return [2 /*return*/];
        }
    });
}); };
exports.upsertPoint = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationParams, validation, validatedBody, validatedParams, currentPost;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validationParams = yup.object().shape({
                    postId: yup.string().required(validationWording_1.default.required('postId'))
                });
                validation = yup.object().shape({
                    type: yup
                        .mixed()
                        .oneOf(['increment', 'decrement'])
                        .required(validationWording_1.default.required('type'))
                });
                validatedBody = validation.validateSync(req.body);
                validatedParams = validationParams.validateSync(req.params);
                return [4 /*yield*/, post_model_1.default.findOne({
                        _id: validatedParams.postId
                    })];
            case 1:
                currentPost = _a.sent();
                if (!currentPost) {
                    throw new NotFoundError_1.default(validationWording_1.default.notFound('Post'), 'Post');
                }
                if (validatedBody.type === 'increment') {
                    currentPost.points = currentPost.points + 1;
                }
                else {
                    currentPost.points = currentPost.points - 1;
                }
                currentPost.save();
                res.json({
                    data: currentPost,
                    message: "success " + validatedBody.type + "ing points"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validation, validatedBody, user, currentUser, postItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validation = yup.object().shape({
                    content: yup.string().required(validationWording_1.default.required('content'))
                });
                validatedBody = validation.validateSync(req.body);
                user = res.locals.decoded.data;
                return [4 /*yield*/, user_model_1.default.findOne({
                        _id: user._id
                    })];
            case 1:
                currentUser = _a.sent();
                if (!currentUser) {
                    throw new NotFoundError_1.default('User not found', 'user');
                }
                return [4 /*yield*/, post_model_1.default.create(__assign(__assign({}, validatedBody), { user: user._id }))];
            case 2:
                postItem = _a.sent();
                currentUser.posts.push(postItem);
                return [4 /*yield*/, currentUser.save()];
            case 3:
                _a.sent();
                res.json({
                    data: postItem,
                    message: 'Successfully create post'
                });
                return [2 /*return*/];
        }
    });
}); };
exports.comment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validation, paramsValidation, validatedBody, validatedParams, user, currentPost, comment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validation = yup.object().shape({
                    message: yup.string().required(validationWording_1.default.required('message'))
                });
                paramsValidation = yup.object().shape({
                    postId: yup.string().required(validationWording_1.default.required('postId'))
                });
                validatedBody = validation.validateSync(req.body);
                validatedParams = paramsValidation.validateSync(req.params);
                user = res.locals.decoded.data;
                return [4 /*yield*/, post_model_1.default.findOne({
                        _id: validatedParams.postId
                    })];
            case 1:
                currentPost = _a.sent();
                if (!currentPost) {
                    throw new NotFoundError_1.default(validationWording_1.default.notFound('Post'), 'Post');
                }
                return [4 /*yield*/, comment_model_1.default.create({
                        post: validatedParams.postId,
                        message: validatedBody.message,
                        user: user._id
                    })];
            case 2:
                comment = _a.sent();
                currentPost.comments.push(comment._id);
                return [4 /*yield*/, currentPost.save()];
            case 3:
                _a.sent();
                res.json({
                    data: comment,
                    message: 'Successfully create comment'
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getComments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paramsValidation, validatedParams, comments, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paramsValidation = yup.object().shape({
                    postId: yup.string().required(validationWording_1.default.required('postId'))
                });
                validatedParams = paramsValidation.validateSync(req.params);
                return [4 /*yield*/, comment_model_1.default.find({
                        post: validatedParams.postId,
                        level: 0
                    }).sort({
                        points: 'descending'
                    })];
            case 1:
                comments = _a.sent();
                return [4 /*yield*/, recureseComment_1.default(comments)];
            case 2:
                result = _a.sent();
                res.json({
                    data: result,
                    message: 'successfully get comments'
                });
                return [2 /*return*/];
        }
    });
}); };
exports.createSubComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paramsValidation, bodyValidation, user, validatedParams, validatedBody, currentComment, currentPost, comment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paramsValidation = yup.object().shape({
                    postId: yup.string().required(validationWording_1.default.required('postId')),
                    commentId: yup.string().required(validationWording_1.default.required('commentId'))
                });
                bodyValidation = yup.object().shape({
                    message: yup.string().required(validationWording_1.default.required('message'))
                });
                user = res.locals.decoded.data;
                return [4 /*yield*/, paramsValidation.validate(req.params)];
            case 1:
                validatedParams = _a.sent();
                return [4 /*yield*/, bodyValidation.validate(req.body)];
            case 2:
                validatedBody = _a.sent();
                return [4 /*yield*/, comment_model_1.default.findOne({
                        _id: validatedParams.commentId
                    })];
            case 3:
                currentComment = _a.sent();
                return [4 /*yield*/, post_model_1.default.findOne({
                        _id: validatedParams.postId
                    })];
            case 4:
                currentPost = _a.sent();
                if (!currentComment) {
                    throw new NotFoundError_1.default(validationWording_1.default.notFound('Comment'), 'Comment');
                }
                if (!currentPost) {
                    throw new NotFoundError_1.default(validationWording_1.default.notFound('Post'), 'Post');
                }
                return [4 /*yield*/, comment_model_1.default.create({
                        user: user._id,
                        message: validatedBody.message,
                        post: validatedParams.postId,
                        level: currentComment.level + 1
                    })];
            case 5:
                comment = _a.sent();
                currentComment.comments.push(comment._id);
                return [4 /*yield*/, currentComment.save()];
            case 6:
                _a.sent();
                currentPost.comments.push(comment._id);
                return [4 /*yield*/, currentPost.save()];
            case 7:
                _a.sent();
                res.json({
                    data: comment,
                    message: 'success creating sub comment'
                });
                return [2 /*return*/];
        }
    });
}); };
exports.upsertPointToComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paramsValidation, bodyValidation, validatedParams, validatedBody, currentComment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paramsValidation = yup.object().shape({
                    commentId: yup.string().required(validationWording_1.default.required('commentId'))
                });
                bodyValidation = yup.object().shape({
                    type: yup
                        .mixed()
                        .oneOf(['decrement', 'increment'])
                        .required(validationWording_1.default.required('type'))
                });
                validatedParams = paramsValidation.validateSync(req.params);
                validatedBody = bodyValidation.validateSync(req.body);
                return [4 /*yield*/, comment_model_1.default.findOne({
                        _id: validatedParams.commentId
                    })];
            case 1:
                currentComment = _a.sent();
                if (!currentComment) {
                    throw new NotFoundError_1.default(validationWording_1.default.notFound('comment'), 'comment');
                }
                if (validatedBody.type === 'increment') {
                    currentComment.points = currentComment.points + 1;
                }
                else {
                    currentComment.points = currentComment.points - 1;
                }
                return [4 /*yield*/, currentComment.save()];
            case 2:
                _a.sent();
                res.json({
                    message: 'Comment Saved',
                    data: currentComment
                });
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=post.controller.js.map