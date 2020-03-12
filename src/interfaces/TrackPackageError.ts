class TrackPackageError extends Error {
  constructor() {
    const message =
      'Error While Tracking Package in JNE / TNT. this can be because invalid awb number or failure in our tracking system';
    super(message);
    this.name = 'TrackPackageError';
    Object.setPrototypeOf(this, TrackPackageError.prototype);
  }
}

TrackPackageError.prototype.constructor = TrackPackageError;

export default TrackPackageError;
