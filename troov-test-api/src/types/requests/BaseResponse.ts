type SuccessResponse<T> = {
  isError: false
  data: T
}

type ErrorResponse = {
  isError: true
  errorMessage: string
}

export type BaseResponse<T> = SuccessResponse<T> | ErrorResponse

export type EmptyResponse = BaseResponse<null>
