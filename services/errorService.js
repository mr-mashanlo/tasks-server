export class GeneralError extends Error {
  constructor( { code = 500, type, name, message } ) {
    super();
    this.code = code;
    this.type = type;
    this.name = name;
    this.message = message;
  }

  getCode() {
    return this.code;
  }
}

export class BadRequest extends GeneralError {
  constructor( error ) {
    super( { ...error, code: 400 } );
  }
}

export class Unauthorized extends GeneralError {
  constructor( error ) {
    super( { ...error, code: 401 } );
  }
}

export class Forbidden extends GeneralError {
  constructor( error ) {
    super( { ...error, code: 403 } );
  }
}

export class Expired extends GeneralError {
  constructor( error ) {
    super( { ...error, code: 419 } );
  }
}