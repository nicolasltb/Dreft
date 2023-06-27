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
    subject: string,
    description: string,
    status: number,
    priority: number,
}
