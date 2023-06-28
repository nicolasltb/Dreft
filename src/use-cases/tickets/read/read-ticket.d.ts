

export interface ReadTicketDTO {
    success: boolean,
    data?: TicketBase[] | null
    error?: Error,
}

export interface ReadTicketHTTPResponse {
    success: boolean,
    data?: TicketBase[] | null
    message?: string,
}
