import { APP_ERROR_TYPE } from './errors';

export class AppError extends Error {
  public readonly message: string;
  public readonly details?: string[];
  public readonly type: APP_ERROR_TYPE;
  constructor(params: {
    message: string;
    type: APP_ERROR_TYPE;
    details?: string[];
  }) {
    const { message, details, type } = params;
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.details = details ?? [];
    this.type = type;
    Error.captureStackTrace(this, this.constructor);
  }
}
