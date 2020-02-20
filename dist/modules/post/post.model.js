"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose_1.Types.ObjectId, ref: 'Comment' }],
    points: { type: Number, default: 0 },
    content: { type: String }
}, {
    timestamps: true
});
var PostModel = mongoose_1.model('Post', PostSchema);
exports.default = PostModel;
//# sourceMappingURL=post.model.js.map