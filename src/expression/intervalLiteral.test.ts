import { queryBuilder, toSql } from "../utils/test_helpers";
import { IntervalLiteral } from "./intervalLiteral";
import { UnknownIntervalUnit } from "../error/unknownIntervalUnit";

describe("IntervalLiteral", () => {
  test("throws on unknown unit", async () => {
    let error: Error | null = null;

    try {
      await new IntervalLiteral(20, "nanoseconds" as any).build(queryBuilder);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(UnknownIntervalUnit);
  });

  test("compiles properly", async () => {
    const exp = new IntervalLiteral(20, "weeks" as any);
    const query = await exp.build(queryBuilder);
    expect(toSql(query)).toBe("INTERVAL '20 weeks'");
  });
});
