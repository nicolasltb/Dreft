import { prismaClient } from "@loaders/prisma-client";
import { logger } from '@utils/logger';
import { ReadTicketDTO } from "./read-ticket";

export class ReadTicket {

    public async execute(ticketId: number | undefined): Promise<ReadTicketDTO> {
        logger.info('Initializing "read-ticket" service.');
        const response: ReadTicketDTO = { success: false };

        let tickets;

        if(ticketId) {
            tickets = await prismaClient.ticket.findUnique({
                where: { id: ticketId }
            })
        } else {
            tickets = await prismaClient.ticket.findMany();
        }

        if(!tickets) {
            const errorMessage = `Cannot get specified ticket. Details: No ticket was found`;
            logger.error(errorMessage);
            response.success = false;
            response.error = errorMessage as unknown as Error;
            return response;
        }

        response.success = true;
        response.data = tickets as TicketBase[];

        logger.info('Finishing "read-ticket" service.');
        return response;
    }
}
