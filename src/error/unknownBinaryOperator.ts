import { KnueppelError } from "./index";

export class UnknownBinaryOperator extends KnueppelError {
  constructor(public operator: string) {
    super(`Unknown binary operator: \`${operator}\``);
  }
}
