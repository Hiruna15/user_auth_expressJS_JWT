import CustomApiError from "./custom_api.js";

class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.status_code = 400;
  }
}

export default BadRequestError;
