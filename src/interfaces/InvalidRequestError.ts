class InvalidRequestError extends Error {
  field: string;

  constructor(message: string, field: string) {
    super(message);
    this.field = field;
    this.name = 'InvalidRequestError';

    Object.setPrototypeOf(this, InvalidRequestError.prototype);
  }
}

export default InvalidRequestError;
