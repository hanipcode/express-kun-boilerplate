"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose_1.Types.ObjectId, ref: 'Comment' }],
    points: { type: Number, default: 0 },
    post: { type: mongoose_1.Types.ObjectId, ref: 'Post' },
    message: { type: String },
    level: { type: Number, default: 0 }
}, {
    timestamps: true
});
var CommentModel = mongoose_1.model('Comment', CommentSchema);
exports.default = CommentModel;
//# sourceMappingURL=comment.model.js.map