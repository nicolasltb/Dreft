import { Request, Response } from 'express';
import { DeleteTicketHTTPResponse } from './delete-ticket';
import { DeleteTicket } from '@use-cases/tickets/delete/delete-ticket.usecase';

const DeleteTicketService = new DeleteTicket();

export class DeleteTicketMiddleware {
    public async handle(request: Request, response: Response) {

        const httpResponse: DeleteTicketHTTPResponse = { success: true };

        const ticketId = request.body.ticketid;

        if (!ticketId) {
            httpResponse.success = false;
            httpResponse.message = 'Missing "ticketid" field in request body!';
            return response.status(400).json(httpResponse);
        }

        const deleteTicketResponse = await DeleteTicketService.execute(ticketId);
        if (deleteTicketResponse.success && deleteTicketResponse.data) {
            httpResponse.success = true;
            httpResponse.data = {
                id: deleteTicketResponse.data.id,
            };
            httpResponse.message = `Ticket with id ${ticketId} was sucessfully deleted`
            return response.status(201).json(httpResponse);
        }

        if(deleteTicketResponse.error) {
            httpResponse.success = false;
            httpResponse.message = deleteTicketResponse.error as unknown as string;
            return response.status(500).json(httpResponse);
        }

        httpResponse.success = false;
        httpResponse.message = 'Failed by internal/unknown reasons, report this issue!';
        return response.status(500).json(httpResponse);
    }
}
