"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSql = exports.queryBuilder = exports.getMockResolver = exports.knex = void 0;
var knex_1 = __importDefault(require("knex"));
var queryBuilder_1 = require("../queryBuilder");
exports.knex = knex_1.default({ client: "pg" });
function getMockResolver(identifierConfig) {
    return function (name) { return identifierConfig[name]; };
}
exports.getMockResolver = getMockResolver;
var mockIdentifierResolver = getMockResolver({ test: { queryString: "t.test" } });
exports.queryBuilder = new queryBuilder_1.QueryBuilder(mockIdentifierResolver);
function toSql(query) {
    var compiledQuery = query.compile();
    return exports.knex.raw(compiledQuery.queryString, compiledQuery.bindings).toString();
}
exports.toSql = toSql;
