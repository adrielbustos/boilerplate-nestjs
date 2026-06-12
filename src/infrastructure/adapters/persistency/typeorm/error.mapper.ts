import { APP_ERROR_TYPE, AppError } from '@/domain/apperror';

export abstract class TypeOrmErrorMapper {
  public static mapError(error: unknown): AppError {
    if (error instanceof Error) {
      if (error.name === 'QueryFailedError') {
        return new AppError({
          type: APP_ERROR_TYPE.DATABASE,
          message: error.message,
        });
      }
    }
    return new AppError({
      type: APP_ERROR_TYPE.UNKNOWN,
      message: 'An unknown error occurred',
    });
  }
}
