import { prismaClient } from "@loaders/prisma-client";
import { logger } from '@utils/logger';
import { CreateTicketDTO } from "./create-ticket";

export class CreateTicket {

    public async execute(ticketContent: TicketBase): Promise<CreateTicketDTO> {
        logger.info('Initializing "create-ticket" service.');
        const response: CreateTicketDTO = { success: false };

        await prismaClient.ticket.create({
            data: {
                subject: ticketContent.subject,
                description: ticketContent.description,
                priority: ticketContent.priority,
                status: ticketContent.status
            }
        }).then((ticket) => {
            logger.info('Ticket was successfully created.');
            response.success = true;
            response.data = { id: ticket.id, subject: ticket.subject };
        })
        .catch((error) => {
            logger.error(`Cannot create ticket. Details: ${error}`);
            response.success = false;
            response.error = error;
        })

        logger.info('Finishing "create-ticket" service.');
        return response;
    }
}
