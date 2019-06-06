import { Expression } from "./expression/expression";
import { build } from "./index";
import { queryBuilder } from "./utils/test_helpers";

// tslint:disable-next-line
const testJson = require("./ast.test.json");

it("should build query object from a JSON AST", async () => {
  const ast: Expression = build(testJson);
  const query = await ast.build(queryBuilder);
  expect(query.compile()).toMatchSnapshot();
});
