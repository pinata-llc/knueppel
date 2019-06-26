import { queryBuilder, toSql } from "../utils/test_helpers";
import { PointLiteral } from "./pointLiteral";

describe("PointLiteral", () => {
  test("builds", async () => {
    const exp = new PointLiteral(40.720727, -74.087358);

    const query = await exp.build(queryBuilder);
    expect(toSql(query)).toBe("ll_to_earth(40.720727, -74.087358)");
  });
});
