"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var UnknownBinaryOperator = /** @class */ (function (_super) {
    __extends(UnknownBinaryOperator, _super);
    function UnknownBinaryOperator(operator) {
        var _this = _super.call(this, "Unknown binary operator: `" + operator + "`") || this;
        _this.operator = operator;
        return _this;
    }
    return UnknownBinaryOperator;
}(index_1.KnueppelError));
exports.UnknownBinaryOperator = UnknownBinaryOperator;
