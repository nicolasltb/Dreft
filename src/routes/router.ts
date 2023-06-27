import { Router } from 'express';
import { CreateUserMiddleware } from '@use-cases/users/create/create-user.middleware';
import { LoginUserMiddleware } from '@use-cases/users/login/login-user.middleware';
import { CreateTicketMiddleware } from '@use-cases/tickets/create/create-ticket.middleware';

export const router = Router();

// User CRUD
router.post('/create-user', new CreateUserMiddleware().handle);
router.post('/login-user', new LoginUserMiddleware().handle);

// Ticket CRUD
router.post('/create-ticket', new CreateTicketMiddleware().handle);
