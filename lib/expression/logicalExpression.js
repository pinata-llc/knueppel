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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ast_1 = require("../ast");
var expression_1 = require("./expression");
var LogicalExpression = /** @class */ (function (_super) {
    __extends(LogicalExpression, _super);
    function LogicalExpression(left, operator, right) {
        var _this = _super.call(this) || this;
        _this.left = left;
        _this.operator = operator;
        _this.right = right;
        return _this;
    }
    LogicalExpression.prototype.compile = function (knex, resolve) {
        return knex.raw("(? " + (this.operator === "||" ? "OR" : "AND") + " ?)", [
            this.left.compile(knex, resolve),
            this.right.compile(knex, resolve),
        ]);
    };
    LogicalExpression = __decorate([
        ast_1.ASTNode,
        __param(0, ast_1.ASTParam("left")),
        __param(1, ast_1.ASTParam("operator")),
        __param(2, ast_1.ASTParam("right")),
        __metadata("design:paramtypes", [expression_1.Expression, String, expression_1.Expression])
    ], LogicalExpression);
    return LogicalExpression;
}(expression_1.Expression));
exports.LogicalExpression = LogicalExpression;
