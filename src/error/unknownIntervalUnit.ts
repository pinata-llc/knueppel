import { KnueppelError } from "./index";

export class UnknownIntervalUnit extends KnueppelError {
  constructor(public unit: string) {
    super(`Unknown interval unit: \`${unit}\``);
  }
}
