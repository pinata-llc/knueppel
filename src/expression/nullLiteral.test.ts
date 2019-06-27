import { queryBuilder, toSql } from "../utils/test_helpers";
import { NullLiteral } from "./nullLiteral";
describe("NullLiteral", () => {
  test("string literal", async () => {
    const exp = new NullLiteral();
    const query = await exp.build(queryBuilder);
    expect(toSql(query)).toBe("null");
  });
});
