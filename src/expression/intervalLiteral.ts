import { ASTNode, ASTParam } from "../ast";
import { UnknownIntervalUnit } from "../error/unknownIntervalUnit";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

const intervalUnits = ["years", "months", "weeks", "days", "hours", "minutes", "seconds"] as const;
type IntervalUnit = typeof intervalUnits[number];

@ASTNode
export class IntervalLiteral extends Expression {
  constructor(
    @ASTParam("value")
    protected value: number,
    @ASTParam("unit")
    protected unit: IntervalUnit,
  ) {
    super();
  }

  public async build(qb: QueryBuilder) {
    if (!intervalUnits.includes(this.unit)) {
      throw new UnknownIntervalUnit(this.unit);
    }

    return qb.query("INTERVAL ?", [`${this.value} ${this.unit}`]);
  }
}
