import Knex from "knex";
import { ASTNode, ASTParam } from "../ast";
import { UnknownBinaryOperator } from "../error/unknownBinaryOperator";
import { IdentifierResolver } from "../node";
import { Expression } from "./expression";

const binaryOperators = ["=", "!=", "<", "<=", ">", ">=", "+", "-", "*", "/", "%", "in"] as const;
export type BinaryOperator = typeof binaryOperators[number];

@ASTNode
export class BinaryExpression extends Expression {
  constructor(
    @ASTParam("left") protected left: Expression,
    @ASTParam("operator") protected operator: BinaryOperator,
    @ASTParam("right") protected right: Expression,
  ) {
    super();
  }

  public compile(knex: Knex, resolve: IdentifierResolver) {
    const left = this.left.compile(knex, resolve);
    const right = this.right.compile(knex, resolve);

    if (binaryOperators.includes(this.operator)) {
      return knex.raw(`(? ${this.operator} ?)`, [left, right]);
    }

    throw new UnknownBinaryOperator(this.operator);
  }
}
