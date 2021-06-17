"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idIn = exports.bin = exports.uuidList = exports.buildLogicalExpression = void 0;
function buildLogicalExpression(operator, expressions) {
    var outerLe = {
        type: "LogicalExpression",
        operator: operator,
        left: null,
        right: null,
    };
    var le = outerLe;
    for (var x = 0; x < expressions.length; x++) {
        var exp = expressions[x];
        if (le.left) {
            if (x + 1 < expressions.length) {
                le.right = {
                    type: "LogicalExpression",
                    operator: operator,
                    left: exp,
                    right: null,
                };
                le = le.right;
            }
            else {
                le.right = exp;
            }
        }
        else {
            le.left = exp;
        }
    }
    if (outerLe.left) {
        if (!outerLe.right) {
            return outerLe.left;
        }
        return outerLe;
    }
    return null;
}
exports.buildLogicalExpression = buildLogicalExpression;
var uuidList = function (values) { return ({ type: "UUIDListLiteral", values: values }); };
exports.uuidList = uuidList;
function bin(left, operator, right) {
    return {
        type: "BinaryExpression",
        left: typeof left === "string" ? { type: "Identifier", name: left } : left,
        operator: operator,
        right: typeof right === "object"
            ? right
            : {
                type: "Literal",
                value: right,
            },
    };
}
exports.bin = bin;
function idIn(ids) {
    return bin("id", "in", exports.uuidList(ids));
}
exports.idIn = idIn;
