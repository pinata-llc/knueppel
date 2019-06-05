import { Expression } from "./expression/expression";
import { build } from "./index";
import { queryBuilder } from "./utils/test_helpers";

const testJson = require("./ast.test.json");

it("should build an object tree from a JSON", async () => {
  console.log(testJson);
  const ast: Expression = build(testJson);
  console.log(ast);
  const query = await ast.build(queryBuilder);
  console.log(query.compile());
});
