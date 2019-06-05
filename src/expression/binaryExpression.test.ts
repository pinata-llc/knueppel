import { queryBuilder, toSql } from "../utils/test_helpers";
import { BinaryExpression, BinaryOperator } from "./binaryExpression";
import { ListLiteral } from "./listLiteral";
import { Literal } from "./literal";
describe("LogicalExpression", () => {
  test("numeric binary expressions", async () => {
    const left = new Literal(4);
    const right = new Literal(2);
    const operators: BinaryOperator[] = ["=", "!=", "<", "<=", ">", ">=", "+", "-", "*", "/", "%"];
    const compiled = [];
    for (const operator of operators) {
      const exp = new BinaryExpression(left, operator, right);
      const query = await exp.build(queryBuilder);
      compiled.push(toSql(query));
    }

    expect(compiled).toStrictEqual([
      "(4 = 2)",
      "(4 != 2)",
      "(4 < 2)",
      "(4 <= 2)",
      "(4 > 2)",
      "(4 >= 2)",
      "(4 + 2)",
      "(4 - 2)",
      "(4 * 2)",
      "(4 / 2)",
      "(4 % 2)",
    ]);
  });

  test("IN expression with numbers", async () => {
    const exp = new BinaryExpression(new Literal(4), "in", new ListLiteral([2, 3, 4, 5, 6]));
    const query = await exp.build(queryBuilder);
    expect(toSql(query)).toBe("(4 in (2,3,4,5,6))");
  });

  test("IN expression with strings", async () => {
    const exp = new BinaryExpression(new Literal("b"), "in", new ListLiteral(["a", "b", "c"]));
    const query = await exp.build(queryBuilder);
    expect(toSql(query)).toBe("('b' in ('a','b','c'))");
  });
});
