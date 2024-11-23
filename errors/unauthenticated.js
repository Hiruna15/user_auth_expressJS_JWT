import CustomApiError from "./custom_api.js";

class UnauthenticatedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.status_code = 401;
  }
}

export default UnauthenticatedError;
