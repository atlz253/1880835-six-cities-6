import { getApi } from '../../axios';

export interface ExtraArgument {
  getApi: typeof getApi;
}

export interface SerializedError {
  name: string;
  stack: string;
  message: string;
}

export interface RejectValue {
  type: string;
  cause?: Partial<SerializedError>;
}

export interface ThunkConfig<State> {
  state: State;
  rejectValue: RejectValue;
  extra: ExtraArgument;
}

export interface ThunkQuery<Data> {
  data?: Data;
  isFetched: boolean;
  isLoading: boolean;
  isError: boolean;
  error?: RejectValue;
}
