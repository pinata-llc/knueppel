import { queryBuilder, toSql } from "../utils/test_helpers";
import { UUIDListLiteral } from "./uuidlistLiteral";

describe("UUIDListLiteral", () => {
  test("as array", async () => {
    const exp = new UUIDListLiteral(["bee7c429-5807-4c05-8826-1f152f9fb66c", "c93d148c-0211-49c1-a7bf-431bacc3a9b2"]);

    const query = await exp.compileAsArray(queryBuilder);
    expect(toSql(query)).toBe(
      "array['bee7c429-5807-4c05-8826-1f152f9fb66c','c93d148c-0211-49c1-a7bf-431bacc3a9b2']::uuid[]",
    );
  });

  test("as list", async () => {
    const exp = new UUIDListLiteral(["bee7c429-5807-4c05-8826-1f152f9fb66c", "c93d148c-0211-49c1-a7bf-431bacc3a9b2"]);

    const query = await exp.build(queryBuilder);
    expect(toSql(query)).toBe("('bee7c429-5807-4c05-8826-1f152f9fb66c','c93d148c-0211-49c1-a7bf-431bacc3a9b2')");
  });
});
