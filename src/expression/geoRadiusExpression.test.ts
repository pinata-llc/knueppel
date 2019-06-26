import { queryBuilder, toSql } from "../utils/test_helpers";
import { PointLiteral } from "./pointLiteral";
import { GeoRadiusExpression } from "./geoRadiusExpression";
import { Literal } from "./literal";

describe("GeoRadiusExpression", () => {
  let pointA: PointLiteral, pointB: PointLiteral, radius: Literal;

  beforeEach(() => {
    pointA = new PointLiteral(40.720727, -74.087358);
    pointB = new PointLiteral(41.107719, -73.546965);
    radius = new Literal(20);
  });

  test("builds earth distance", async () => {
    const kmExpr = new GeoRadiusExpression(pointA, radius, "km", pointB).build(queryBuilder);

    expect(toSql(await kmExpr)).toBe(
      "earth_distance(ll_to_earth(40.720727, -74.087358), ll_to_earth(41.107719, -73.546965)) <= 20::numeric * 1000::numeric",
    );
  });

  test("mi", async () => {
    const miExpr = new GeoRadiusExpression(pointA, radius, "mi", pointB).build(queryBuilder);

    expect(toSql(await miExpr)).toBe(
      "earth_distance(ll_to_earth(40.720727, -74.087358), ll_to_earth(41.107719, -73.546965)) <= 20::numeric * 1609.34::numeric",
    );
  });
});
