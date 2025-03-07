class ApiError extends Error {
  static EMAIL_IN_USE = { code: 402, message: "Email already in use" };
  static NICKNAME_IN_USE = { code: 405, message: "Nickname already in use" };
  static FAILED_CREATE_USER = { code: 406, message: "Failed to create user" };
  static INVALID_USER = { code: 407, message: "User not found" };
  static INCORRECT_PASSWORD = { code: 408, message: "Incorrect password" };
  static INVALID_AUTHENTICATION_SCHEME = { code: 409, message: "Invalid authentication scheme" };
  static INVALID_AUTHENTICATION_TOKEN = { code: 409, message: "Invalid or expired token" };
  static LOGIN_FAILED = { code: 410, message: "Login failed" };
  static EMPTY_RESPONSE = { code: 411, message: "" };
  static INVALID_REFRESH_TOKEN = { code: 412, message: "The refresh token provided is not valid" };

  constructor(errorType) {
    const errorDetails = ApiError[errorType];
    
    if (!errorDetails) {
      throw new Error("Unknown error type");
    }

    super(errorDetails.message);
    this.code = errorDetails.code;
    this.message = errorDetails.message;
    this.name = "ApiError";
  }
}

module.exports = ApiError;
