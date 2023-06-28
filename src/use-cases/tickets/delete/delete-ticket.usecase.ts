import { prismaClient } from "@loaders/prisma-client";
import { logger } from '@utils/logger';
import { DeleteTicketDTO } from "./delete-ticket";

export class DeleteTicket {

    public async execute(ticketId: number): Promise<DeleteTicketDTO> {
        logger.info('Initializing "delete-ticket" service.');
        const response: DeleteTicketDTO = { success: false };

        let ticketExists = await prismaClient.ticket.findUnique({
            where: { id: ticketId }
        })

        if(!ticketExists) {
            const errorMessage = `Cannot delete ticket. Details: Ticket with id ${ticketId} does not exist!`;
            logger.error(errorMessage);
            response.success = false;
            response.error = errorMessage as unknown as Error;
            return response;
        }

        await prismaClient.ticket.delete({
            where: {
                id: ticketId
            }
        }).then((ticket) => {
            logger.info('Ticket was successfully deleted.');
            response.success = true;
            response.data = { id: ticket.id };
        })
        .catch((error) => {
            logger.error(`Cannot delete ticket with id ${ticketId}. Details: ${error}`);
            response.success = false;
            response.error = error;
        })

        logger.info('Finishing "delete-ticket" service.');
        return response;
    }
}
