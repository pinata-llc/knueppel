import { buildLogicalExpression } from "./astHelpers";

describe("astHelpers", () => {
  describe("buildLogicalExpression", () => {
    it("should create tree", () => {
      const result = buildLogicalExpression("||", [
        {
          type: "BinaryExpression",
          left: { type: "Identifier", name: "productCount" },
          operator: "=",
          right: { type: "Literal", value: 1 },
        },
        {
          type: "BinaryExpression",
          left: { type: "Identifier", name: "productCount" },
          operator: ">",
          right: { type: "Literal", value: 20 },
        },
        {
          type: "BinaryExpression",
          left: { type: "Identifier", name: "startDate" },
          operator: ">",
          right: { type: "Identifier", name: "now" },
        },
      ]);

      expect(result).toMatchSnapshot();
    });
  });
});
