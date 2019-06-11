"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var zargon_1 = require("zargon");
var queryBuilder_1 = require("./queryBuilder");
var Expressions = __importStar(require("./expression"));
exports.Expression = Expressions;
function buildQuery(jsonAst, resolve) {
    var ast = zargon_1.build(jsonAst);
    var qb = new queryBuilder_1.QueryBuilder(resolve);
    return ast.build(qb);
}
exports.buildQuery = buildQuery;
function compileQuery(jsonAst, resolve) {
    var query = buildQuery(jsonAst, resolve);
    return query.compile();
}
exports.compileQuery = compileQuery;
