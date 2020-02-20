"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("../app"));
var supertest_1 = __importDefault(require("supertest"));
var testConstants_1 = __importDefault(require("../constants/testConstants"));
function mockRequest() {
    var req = {};
    req.body = {};
    req.params = {};
    return req;
}
exports.mockRequest = mockRequest;
function mockResponse() {
    var res = {};
    res.locals = {};
    res.locals.decoded = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}
exports.mockResponse = mockResponse;
function loginUser(auth) {
    var testRequest = supertest_1.default(app_1.default);
    return function (done) {
        testRequest
            .post('/users/login')
            .send({
            email: testConstants_1.default.user.email,
            password: testConstants_1.default.user.password
        })
            .expect(200)
            .end(onResponse);
        function onResponse(_, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}
exports.loginUser = loginUser;
//# sourceMappingURL=testUtils.js.map