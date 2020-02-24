"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var ENV = process.env.ENV;
var PORT = 8000;
app_1.default.listen(process.env.PORT || PORT, function () {
    if (ENV !== 'test') {
        console.log("successfully run app in port " + PORT);
    }
});
//# sourceMappingURL=index.js.map