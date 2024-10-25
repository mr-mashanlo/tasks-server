export class GeneralError extends Error {
  constructor( errors, code = 500 ) {
    super();
    this.errors = errors;
    this.code = code;
  }

  getCode() {
    return this.code;
  }
}

export class BadRequest extends GeneralError {
  constructor( errors ) {
    super( errors );
    this.code = 400;
  }
}

export class Unauthorized extends GeneralError {
  constructor( errors ) {
    super( errors );
    this.code = 400;
  }
}