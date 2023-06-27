export interface LoginUserDTO {
    success: boolean,
    data?: {
        token: String,
    },
    error?: Error,
}

export interface LoginUserHTTPResponse {
    success: boolean,
    data?: {
        token: String,
    }
    message?: string,
}
