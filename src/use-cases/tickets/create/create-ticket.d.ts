export interface CreateTicketDTO {
    success: boolean,
    data?: {
        id: number,
        subject: String,
    },
    error?: Error,
}

export interface CreateTicketHTTPResponse {
    success: boolean,
    data?: {
        id: number,
        subject: String,
    }
    message?: string,
}
