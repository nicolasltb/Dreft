import { Request, Response } from 'express';
import { CreateTicketHTTPResponse } from './create-ticket';
import { CreateTicket } from '@use-cases/tickets/create/create-ticket.usecase';

const CreateTicketService = new CreateTicket();

export class CreateTicketMiddleware {
    public async handle(request: Request, response: Response) {

        const httpResponse: CreateTicketHTTPResponse = { success: true };

        const ticketContent = request.body.ticketData as TicketBase;

        if (!ticketContent) {
            httpResponse.success = false;
            httpResponse.message = 'Missing "ticketData" field in request body!';
            return response.status(400).json(httpResponse);
        }

        const createTicketResponse = await CreateTicketService.execute(ticketContent);
        if (createTicketResponse.success && createTicketResponse.data) {
            httpResponse.success = true;
            httpResponse.data = {
                id: createTicketResponse.data.id,
                subject: createTicketResponse.data.subject
            };
            return response.status(201).json(httpResponse);
        }

        if(createTicketResponse.error) {
            httpResponse.success = false;
            httpResponse.message = createTicketResponse.error as unknown as string;
            return response.status(500).json(httpResponse);
        }

        httpResponse.success = false;
        httpResponse.message = 'Failed by internal/unknown reasons, report this issue!';
        return response.status(500).json(httpResponse);
    }
}
