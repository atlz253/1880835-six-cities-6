import { tryStringify } from '../../../utils/json';
import HTTPStatuses from '../../axios/constants/http-statuses';
import ErrorTypes from './constants/error-types';
import { RejectValue, SerializedError } from './types';

export function serializeError(error: Error): Partial<SerializedError> {
  return {
    name: error.name,
    stack: error.stack,
    message: error.message,
  };
}

export function getRejectValue(error: unknown) {
  return {
    type: ErrorTypes.unknown,
    cause:
      error instanceof Error
        ? serializeError(error)
        : { message: tryStringify(error) },
  };
}

export function getErrorTypeByHTTPStatus(status: number) {
  switch (status) {
    case HTTPStatuses.notFound:
      return ErrorTypes.notFound;
    case HTTPStatuses.unauthorized:
      return ErrorTypes.unauthorized;
    case HTTPStatuses.validationError:
      return ErrorTypes.validationFailed;
    case HTTPStatuses.conflict:
      return ErrorTypes.conflict;
    default:
      return ErrorTypes.unknown;
  }
}

export function isValidationError(error?: RejectValue) {
  return error?.type === ErrorTypes.validationFailed;
}

export function isUnauthorizedError(error?: RejectValue) {
  return error?.type === ErrorTypes.unauthorized;
}

export function isNotFoundError(error?: RejectValue) {
  return error?.type === ErrorTypes.notFound;
}
