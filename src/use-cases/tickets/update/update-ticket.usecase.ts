import { prismaClient } from "@loaders/prisma-client";
import { logger } from '@utils/logger';
import { UpdateTicketDTO } from "./update-ticket";

export class UpdateTicket {

    public async execute(ticketContent: UpdateTicketBase): Promise<UpdateTicketDTO> {
        logger.info('Initializing "update-ticket" service.');
        const response: UpdateTicketDTO = { success: false };

        let ticketExists = await prismaClient.ticket.findFirst({
            where: { id: ticketContent.ticketid }
        })

        if(!ticketExists) {
            const errorMessage = `Cannot Update ticket. Details: Ticket with id ${ticketContent.ticketid} does not exist!`;
            logger.error(errorMessage);
            response.success = false;
            response.error = errorMessage as unknown as Error;
            return response;
        }

        await prismaClient.ticket.update({
            where: {
                id: ticketContent.ticketid
            },
            data: {
                status: ticketContent.data.status,
                priority: ticketContent.data.priority,
                agent_id: ticketContent.data.agentId!
            }
        }).then((ticket) => {
            logger.info(`Ticket with id ${ticket.id} was successfully Updated.`);
            response.success = true;
            response.data = {
                id: ticket.id,
                priority: ticket.priority,
                status: ticket.status
            };
        })
        .catch((error) => {
            logger.error(`Cannot Update ticket with id ${ticketContent.ticketid}. Details: ${error}`);
            response.success = false;
            response.error = error;
        })

        logger.info('Finishing "update-ticket" service.');
        return response;
    }
}
