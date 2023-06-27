import { Request, Response } from 'express';
import { CreateUserHTTPResponse } from './create-user';
import { CreateUser } from '@use-cases/users/create/create-user.usecase';

const CreateUserService = new CreateUser();

export class CreateUserMiddleware {
    public async handle(request: Request, response: Response) {

        const httpResponse: CreateUserHTTPResponse = { success: true };

        const userContent = request.body.userData as UserBase;

        if (!userContent) {
            httpResponse.success = false;
            httpResponse.message = 'Missing "userData" field in request body!';
            return response.status(400).json(httpResponse);
        }

        const createUserResponse = await CreateUserService.execute(userContent);
        if (createUserResponse.success && createUserResponse.data) {
            httpResponse.success = true;
            httpResponse.data = {
                id: createUserResponse.data.id,
                name: createUserResponse.data.name
            };
            return response.status(201).json(httpResponse);
        }

        if(createUserResponse.error) {
            httpResponse.success = false;
            httpResponse.message = createUserResponse.error as unknown as string;
            return response.status(500).json(httpResponse);
        }

        httpResponse.success = false;
        httpResponse.message = 'Failed by internal/unknown reasons, report this issue!';
        return response.status(500).json(httpResponse);
    }
}
