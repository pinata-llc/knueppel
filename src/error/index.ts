export class KnueppelError extends Error {
  constructor(message: string) {
    super(`Knüppel: ${message}`);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
