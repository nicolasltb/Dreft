export interface UpdateTicketDTO {
    success: boolean,
    data?: {
        id: number,
        priority: number,
        status: number,
    },
    error?: Error,
}

export interface UpdateTicketHTTPResponse {
    success: boolean,
    data?: {
        id: number,
        priority: number,
        status: number,
    }
    message?: string,
}
