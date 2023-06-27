import { prismaClient } from "@loaders/prisma-client";
import { logger } from '@utils/logger';
import { LoginUserDTO } from "./login-user";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

export class LoginUser {

    public async execute(userContent: UserBase): Promise<LoginUserDTO> {
        logger.info('Initializing "login-user" service.');
        const response: LoginUserDTO = { success: false };

        let user = await prismaClient.user.findUnique({
            where: { email: userContent.email }
        })

        if(!user) {
            const errorMessage = `Cannot login user. Details: User does not exist!`;
            logger.error(errorMessage);
            response.success = false;
            response.error = errorMessage as unknown as Error;
            return response;
        }

        const isPasswordCorrect = await bcrypt.compare(userContent.password, user.password);

        if(!isPasswordCorrect) {
            const errorMessage = `Cannot login user. Details: Wrong password!`;
            logger.error(errorMessage);
            response.success = false;
            response.error = errorMessage as unknown as Error;
            return response;
        }

        try {
            const secret = process.env["SECRET"];
            const token = jwt.sign({
                id: user.id,
            },
            secret as Secret, {expiresIn: 300})

            logger.info('User was successfully logged in.');
            response.success = true;
            response.data = { token };

        } catch {

        }

        logger.info('Finishing "login-user" service.');
        return response;
    }
}
