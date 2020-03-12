class ExtensionError extends Error {
  constructor(invalidAccess: string | string[]) {
    const message = `File should be one of type ${JSON.stringify(
      invalidAccess
    )}`;
    super(message);
    this.name = 'ExtensionError';
    Object.setPrototypeOf(this, ExtensionError.prototype);
  }
}

ExtensionError.prototype.constructor = ExtensionError;

export default ExtensionError;
