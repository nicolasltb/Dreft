export interface DeleteTicketDTO {
    success: boolean,
    data?: {
        id: number,
    },
    error?: Error,
}

export interface DeleteTicketHTTPResponse {
    success: boolean,
    data?: {
        id: number,
    }
    message?: string,
}
