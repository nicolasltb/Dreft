import { Router } from 'express';
import { CreateUserMiddleware } from '@use-cases/users/create/create-user.middleware';
import { LoginUserMiddleware } from '@use-cases/users/login/login-user.middleware';
import { CreateTicketMiddleware } from '@use-cases/tickets/create/create-ticket.middleware';
import { DeleteTicketMiddleware } from '@use-cases/tickets/delete/delete-ticket.middleware';
import { UpdateTicketMiddleware } from '@use-cases/tickets/update/update-ticket.middleware';
import { ReadTicketMiddleware } from '@use-cases/tickets/read/read-ticket.middleware';

export const router = Router();

// User CRUD
router.post('/create-user', new CreateUserMiddleware().handle);
router.post('/login-user', new LoginUserMiddleware().handle);

// Ticket CRUD
router.post('/create-ticket', new CreateTicketMiddleware().handle);
router.delete('/delete-ticket', new DeleteTicketMiddleware().handle);
router.put('/update-ticket', new UpdateTicketMiddleware().handle);
router.get('/read-ticket', new ReadTicketMiddleware().handle)
