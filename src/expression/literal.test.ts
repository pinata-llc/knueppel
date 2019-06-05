import { queryBuilder } from "../utils/test_helpers";
import { Literal } from "./literal";
describe("Literal", () => {
  test("string literal", async () => {
    const exp = new Literal("Test");
    const query = await exp.build(queryBuilder);
    expect(query.toString()).toBe("'Test'");
  });

  test("number literal", async () => {
    const exp = new Literal(34);
    const query = await exp.build(queryBuilder);
    expect(query.toString()).toBe("34");
  });
});
