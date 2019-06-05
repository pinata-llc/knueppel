import { queryBuilder, toSql } from "../utils/test_helpers";
import { Literal } from "./literal";
import { NotExpression } from "./notExpression";

test("NOT expression", async () => {
  const exp = new NotExpression(new Literal(true));
  const query = await exp.build(queryBuilder);
  expect(toSql(query)).toBe("not (true)");
});
