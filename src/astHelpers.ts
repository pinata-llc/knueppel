import { BinaryOperator } from "./expression/binaryExpression";
import { LogicalOperator } from "./expression/logicalExpression";

export type Expression =
  | BinaryExpression
  | GeoRadiusExpression
  | LogicalExpression
  | Identifier
  | Literal
  | NullLiteral
  | ListLiteral
  | UUIDListLiteral
  | PointLiteral
  | NotExpression
  | AnyExpression;

export interface BinaryExpression {
  type: "BinaryExpression";
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
}

export interface AnyExpression {
  type: "AnyExpression";
  values: ListLiteral | UUIDListLiteral | Identifier;
}

export interface LogicalExpression {
  type: "LogicalExpression";
  operator: LogicalOperator;
  left: Expression;
  right: Expression;
}

export interface GeoRadiusExpression {
  type: "GeoRadiusExpression";
  pointA: Expression;
  radius: Expression;
  unit: "km" | "mi";
  pointB: Expression;
}

export interface Identifier {
  type: "Identifier";
  name: string;
  args?: Expression[];
}

export interface Literal {
  type: "Literal";
  value: string | number | boolean;
}

export interface ListLiteral {
  type: "ListLiteral";
  values: string[] | number[] | boolean[];
}

export interface NullLiteral {
  type: "NullLiteral";
}

export interface UUIDListLiteral {
  type: "UUIDListLiteral";
  values: string[];
}

export interface PointLiteral {
  type: "PointLiteral";
  lat: number;
  long: number;
}

export interface NotExpression {
  type: "NotExpression";
  argument: Expression;
}

interface PartialLE {
  type: "LogicalExpression";
  operator: LogicalOperator;
  left: PartialLE | Expression | null;
  right: PartialLE | Expression | null;
}

export function buildLogicalExpression(
  operator: LogicalOperator,
  expressions: Array<Expression | null>,
): Expression | null {
  const outerLe: PartialLE = {
    type: "LogicalExpression",
    operator,
    left: null,
    right: null,
  };

  let le = outerLe;

  for (let x = 0; x < expressions.length; x++) {
    const exp = expressions[x];

    if (le.left) {
      if (x + 1 < expressions.length) {
        le.right = {
          type: "LogicalExpression",
          operator,
          left: exp,
          right: null,
        };

        le = le.right;
      } else {
        le.right = exp;
      }
    } else {
      le.left = exp;
    }
  }

  if (outerLe.left) {
    if (!outerLe.right) {
      return outerLe.left as LogicalExpression;
    }
    return outerLe as LogicalExpression;
  }

  return null;
}

export const uuidList = (values: string[]): UUIDListLiteral => ({ type: "UUIDListLiteral", values });

export function bin(
  left: Expression | string,
  operator: BinaryOperator,
  right: Expression | string | number,
): BinaryExpression {
  return {
    type: "BinaryExpression",
    left: typeof left === "string" ? { type: "Identifier", name: left } : left,
    operator,
    right:
      typeof right === "object"
        ? right
        : {
            type: "Literal",
            value: right,
          },
  };
}

export function idIn(ids: string[]) {
  return bin("id", "in", uuidList(ids));
}
