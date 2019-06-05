"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder(resolve) {
        this.resolve = resolve;
    }
    QueryBuilder.prototype.query = function (queryString, bindings) {
        return new Query(queryString, bindings);
    };
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
var qmark = /\?/g;
var Query = /** @class */ (function () {
    function Query(queryString, bindings) {
        this.queryString = queryString;
        this.bindings = bindings;
    }
    Query.prototype.compile = function () {
        var _this = this;
        var cnt = 0;
        var compiledBindings = [];
        var compiledQueryString = this.queryString.replace(qmark, function () {
            var binding = _this.bindings[cnt];
            cnt += 1;
            if (binding instanceof Query) {
                var query = binding.compile();
                compiledBindings = compiledBindings.concat(query.bindings);
                return query.queryString;
            }
            else {
                compiledBindings.push(binding);
                return "?";
            }
        });
        return {
            bindings: compiledBindings,
            queryString: compiledQueryString,
        };
    };
    return Query;
}());
exports.Query = Query;
