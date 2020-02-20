"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
afterAll(function () {
    console.log('all TEST FINISHED');
    mongoose_1.default.connection.db.dropDatabase();
});
//# sourceMappingURL=jest.afterEnv.js.map