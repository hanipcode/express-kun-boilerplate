class NotFoundError extends Error {
  field: string;

  constructor(message: string, field: string) {
    super(message);
    this.field = field;
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

NotFoundError.prototype.constructor = NotFoundError;

export default NotFoundError;
