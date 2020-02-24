"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var initDB_1 = __importDefault(require("./utils/initDB"));
var routes_1 = __importDefault(require("./routes"));
var generateDoc_1 = __importDefault(require("./utils/generateDoc"));
initDB_1.default();
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
generateDoc_1.default(app);
routes_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map