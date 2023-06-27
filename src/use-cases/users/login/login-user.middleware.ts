import { Request, Response } from 'express';
import { LoginUserHTTPResponse } from './login-user';
import { LoginUser } from '@use-cases/users/login/login-user.usecase';

const LoginUserService = new LoginUser();

export class LoginUserMiddleware {
    public async handle(request: Request, response: Response) {

        const httpResponse: LoginUserHTTPResponse = { success: true };

        const userContent = request.body.userData;

        if (!userContent) {
            httpResponse.success = false;
            httpResponse.message = 'Missing "userData" field in request body!';
            return response.status(400).json(httpResponse);
        }

        const loginUserResponse = await LoginUserService.execute(userContent);
        if (loginUserResponse.success && loginUserResponse.data) {
            httpResponse.success = true;
            httpResponse.data = {
                token: loginUserResponse.data.token
            };
            return response.status(201).json(httpResponse);
        }

        if(loginUserResponse.error) {
            httpResponse.success = false;
            httpResponse.message = loginUserResponse.error as unknown as string;
            return response.status(500).json(httpResponse);
        }

        httpResponse.success = false;
        httpResponse.message = 'Failed by internal/unknown reasons, report this issue!';
        return response.status(500).json(httpResponse);
    }
}
