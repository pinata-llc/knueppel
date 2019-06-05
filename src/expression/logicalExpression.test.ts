import { queryBuilder, toSql } from "../utils/test_helpers";
import { Literal } from "./literal";
import { LogicalExpression } from "./logicalExpression";
describe("LogicalExpression", () => {
  test("AND expression", async () => {
    const exp = new LogicalExpression(new Literal(true), "&&", new Literal(false));
    const query = await exp.build(queryBuilder);
    expect(toSql(query)).toBe("(true AND false)");
  });

  test("OR expression", async () => {
    const exp = new LogicalExpression(new Literal(false), "||", new Literal(true));
    const query = await exp.build(queryBuilder);
    expect(toSql(query)).toBe("(false OR true)");
  });

  test("complex expression", async () => {
    const exp1 = new LogicalExpression(new Literal(false), "||", new Literal(true));
    const exp2 = new LogicalExpression(exp1, "&&", new Literal(true));
    const exp3 = new LogicalExpression(new Literal(false), "||", exp2);

    const query = await exp3.build(queryBuilder);
    expect(toSql(query)).toBe("(false OR ((false OR true) AND true))");
  });
});
