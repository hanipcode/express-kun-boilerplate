"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    invalid: function (name) { return name + " tidak valid"; },
    minLength: function (min) { return "Password minimal " + min + " angka"; },
    required: function (name) { return name + " tidak boleh kosong"; },
    notFound: function (name) { return name + " tidak ditemukan"; },
    incorrect: function (name) { return name + " salah"; },
    duplicate: function (name, value) { return name + " " + value + " telah dipakai"; },
    oneOf: function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return name + " harus salah satu diantara " + args.map(function (v) { return "'" + v + "'"; }).join(', ');
    }
};
//# sourceMappingURL=validationWording.js.map