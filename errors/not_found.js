import CustomApiError from "./custom_api.js";

class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    this.status_code = 404;
  }
}

export default NotFoundError;
