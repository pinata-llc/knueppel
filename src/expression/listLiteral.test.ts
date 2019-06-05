import { queryBuilder, toSql } from "../utils/test_helpers";
import { ListLiteral } from "./listLiteral";
describe("Literal", () => {
  test("string list literal", async () => {
    const exp = new ListLiteral(["Test1", "Test2", "Test3"]);
    const query = await exp.build(queryBuilder);
    expect(toSql(query)).toBe("('Test1','Test2','Test3')");
  });

  test("string list literal as array", async () => {
    const exp = new ListLiteral(["Test1", "Test2", "Test3"]);
    const query = await exp.compileAsArray(queryBuilder);
    expect(toSql(query)).toBe("array['Test1','Test2','Test3']::text[]");
  });

  test("number list literal", async () => {
    const exp = new ListLiteral([1, 2, 3]);
    const query = await exp.build(queryBuilder);
    expect(toSql(query)).toBe("(1,2,3)");
  });

  test("number list literal as array", async () => {
    const exp = new ListLiteral([1, 2, 3]);
    const query = await exp.compileAsArray(queryBuilder);
    expect(toSql(query)).toBe("array[1,2,3]::int[]");
  });
});
