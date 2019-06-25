import { IResolverResult, QueryBuilder } from "../queryBuilder";
import { toSql } from "../utils/test_helpers";
import { Identifier } from "./identifier";

test("Identifier", async () => {
  const identifiers: { [name: string]: IResolverResult } = {
    doubleTest: { queryString: "(t.test1 = ? or t.test.2 = ?)", bindings: [true, false] },
  };

  const mockIdentifierResolver = (name: string) => identifiers[name];

  const queryBuilder = new QueryBuilder(mockIdentifierResolver);

  const exp = new Identifier("doubleTest", undefined);
  const query = await exp.build(queryBuilder);
  expect(toSql(query)).toBe("(t.test1 = true or t.test.2 = false)");
});
