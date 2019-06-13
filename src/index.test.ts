import { buildQuery } from "./index";
import { getMockResolver } from "./utils/test_helpers";

// tslint:disable-next-line
const testJson = require("./index.test.json");

it("should build query object from a JSON AST", async () => {
  const identifiers = {
    identifier1: {
      queryString: "coalesc(table2.columnB, table3.columnC, ?)",
      bindings: [10],
      tables: ["table2, table3"],
    },
    identifier2: {
      queryString: "(select columnX from tableX where tableX.columnA = table1.columnA)",
      tables: ["table1"],
    },
  };

  const query = await buildQuery(testJson, getMockResolver(identifiers));
  expect(query).toMatchSnapshot();
  expect(query.compile()).toMatchSnapshot();
});
