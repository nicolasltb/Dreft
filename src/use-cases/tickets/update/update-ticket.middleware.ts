import { Request, Response } from 'express';
import { UpdateTicketHTTPResponse } from './update-ticket';
import { UpdateTicket } from '@use-cases/tickets/update/update-ticket.usecase';

const UpdateTicketService = new UpdateTicket();

export class UpdateTicketMiddleware {
    public async handle(request: Request, response: Response) {

        const httpResponse: UpdateTicketHTTPResponse = { success: true };

        const ticketId = request.body.ticketid;
        const ticketContent = request.body;

        if(!ticketId) {
            httpResponse.success = false;
            httpResponse.message = 'Missing "ticketId" field in request body!';
            return response.status(400).json(httpResponse);
        }

        if (!ticketContent.data) {
            httpResponse.success = false;
            httpResponse.message = 'Missing "data" field in request body!';
            return response.status(400).json(httpResponse);
        }

        const UpdateTicketResponse = await UpdateTicketService.execute(ticketContent);
        if (UpdateTicketResponse.success && UpdateTicketResponse.data) {
            httpResponse.success = true;
            httpResponse.data = {
                id: UpdateTicketResponse.data.id,
                priority: UpdateTicketResponse.data.priority,
                status: UpdateTicketResponse.data.status,
            };
            httpResponse.message = `Ticket with id ${ticketContent.ticketid} was sucessfully Updated`
            return response.status(201).json(httpResponse);
        }

        if(UpdateTicketResponse.error) {
            httpResponse.success = false;
            httpResponse.message = UpdateTicketResponse.error as unknown as string;
            return response.status(500).json(httpResponse);
        }

        httpResponse.success = false;
        httpResponse.message = 'Failed by internal/unknown reasons, report this issue!';
        return response.status(500).json(httpResponse);
    }
}
