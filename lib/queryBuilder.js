"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder(resolve) {
        this.resolve = resolve;
    }
    QueryBuilder.prototype.query = function (queryString, bindings, tables) {
        return new Query(queryString, bindings, tables);
    };
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
var qmark = /\?/g;
var Query = /** @class */ (function () {
    function Query(queryString, bindings, tables) {
        this.queryString = queryString;
        this.bindings = bindings;
        this.tables = tables;
    }
    Query.prototype.compile = function () {
        var _this = this;
        var cnt = 0;
        var compiledBindings = [];
        var compiledTables;
        var compiledQueryString = this.queryString.replace(qmark, function () {
            var binding = _this.bindings[cnt];
            cnt += 1;
            if (binding instanceof Query) {
                var query = binding.compile();
                compiledBindings = compiledBindings.concat(query.bindings);
                if (query.tables) {
                    compiledTables = compiledTables ? compiledTables.concat(query.tables) : query.tables;
                }
                return query.queryString;
            }
            else {
                compiledBindings.push(binding);
                return "?";
            }
        });
        if (this.tables) {
            if (compiledTables) {
                compiledTables = Array.from(new Set(compiledTables.concat(this.tables)));
            }
            compiledTables = this.tables;
        }
        return {
            bindings: compiledBindings,
            queryString: compiledQueryString,
            tables: compiledTables,
        };
    };
    return Query;
}());
exports.Query = Query;
