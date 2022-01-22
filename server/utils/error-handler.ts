export class APIError extends Error {
  public code: Number;
  constructor(message: any, code = 400) {
    super(message);
    this.code = code;
  }
}
