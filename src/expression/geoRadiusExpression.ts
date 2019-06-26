import { ASTNode, ASTParam } from "zargon";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

export type DistanceUnit = "km" | "mi";

const factors = {
  km: 1000,
  mi: 1609.34,
};

@ASTNode
export class GeoRadiusExpression extends Expression {
  constructor(
    @ASTParam("pointA")
    protected pointA: Expression,
    @ASTParam("radius")
    protected radius: Expression,
    @ASTParam("unit")
    protected unit: DistanceUnit,
    @ASTParam("pointB")
    protected pointB: Expression,
  ) {
    super();
  }

  public async build(qb: QueryBuilder) {
    return qb.query(`earth_distance(?, ?) <= ?::numeric * ?::numeric`, [
      await this.pointA.build(qb),
      await this.pointB.build(qb),
      await this.radius.build(qb),
      factors[this.unit],
    ]);
  }
}
