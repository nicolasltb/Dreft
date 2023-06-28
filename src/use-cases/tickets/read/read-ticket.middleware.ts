import { Request, Response } from 'express';
import { ReadTicketHTTPResponse } from './read-ticket';
import { ReadTicket } from '@use-cases/tickets/read/read-ticket.usecase';

const ReadTicketService = new ReadTicket();

export class ReadTicketMiddleware {
    public async handle(request: Request, response: Response) {

        const httpResponse: ReadTicketHTTPResponse = { success: true };

        const ticketId = parseInt(request.query['id'] as string);

        const ReadTicketResponse = await ReadTicketService.execute(ticketId);
        if (ReadTicketResponse.success && ReadTicketResponse.data) {
            httpResponse.success = true;
            httpResponse.data = ReadTicketResponse.data;
            httpResponse.message = `Retrieved successfully ${ReadTicketResponse.data.length || 1} tickets`
            return response.status(201).json(httpResponse);
        }

        if(ReadTicketResponse.error) {
            httpResponse.success = false;
            httpResponse.message = ReadTicketResponse.error as unknown as string;
            return response.status(500).json(httpResponse);
        }

        httpResponse.success = false;
        httpResponse.message = 'Failed by internal/unknown reasons, report this issue!';
        return response.status(500).json(httpResponse);
    }
}
