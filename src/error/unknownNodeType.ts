import { KnueppelError } from "./index";

export class UnknownNodeType extends KnueppelError {
  constructor(public nodeType: string) {
    super(`Node type: \`${nodeType}\` not implemented`);
  }
}
