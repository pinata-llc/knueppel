import { queryBuilder, toSql } from "../utils/test_helpers";
import { AnyExpression } from "./anyExpression";
import { ListLiteral } from "./listLiteral";

test("ANY expression", async () => {
  const exp = new AnyExpression(new ListLiteral([2, 3, 4, 5, 6]));
  const query = await exp.build(queryBuilder);
  expect(toSql(query)).toBe("any(array[2,3,4,5,6]::int[])");
});
