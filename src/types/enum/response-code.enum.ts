enum ResponseCode {
  // HTTP Status 200
  SUCCESS = "SU",

  // HTTP Status 400
  VALIDATION_FAILED = "VF",
  DUPLICATE_ID = "DI",
  NOT_EXISTED_PROJECT = "NEP",
  NOT_EXISTED_POST = "NEP",
  EMPTY_FILE = "EF",

  // HTTP Status 401
  AUTHORIZATION_FAILED = "AF",

  // HTTP Status 403
  NO_PERMISSION = "NP",

  // HTTP Status 500
  DATABASE_ERROR = "DBE",
  FILE_SAVE_ERROR = "FSE",
}

export default ResponseCode;
