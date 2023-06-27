export interface CreateUserDTO {
    success: boolean,
    data?: {
        id: number,
        name: String,
    },
    error?: Error,
}

export interface CreateUserHTTPResponse {
    success: boolean,
    data?: {
        id: number,
        name: String,
    }
    message?: string,
}
