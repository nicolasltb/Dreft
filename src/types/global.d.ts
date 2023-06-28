enum UserType {
    "CUSTOMER",
    "AGENT",
}

type UserBase = {
    name: string,
    email: string,
    password: string,
    type: UserType,
}

type TicketBase = {
    id?: number,
    subject: string,
    description: string,
    status: number,
    priority: number,
    agent_id?: number,
    createdat?: Date,
    updated_at?: Date,
}

type UpdateTicketBase = {
    ticketid: number,
    data: {
        status: number,
        priority: number,
        agentId?: number
    }
}
