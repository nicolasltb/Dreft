import { prismaClient } from "@loaders/prisma-client";
import { logger } from '@utils/logger';
import { CreateUserDTO } from "./create-user";
import bcrypt from "bcrypt";

export class CreateUser {

    public async execute(userContent: UserBase): Promise<CreateUserDTO> {
        logger.info('Initializing "create-user" service.');
        const response: CreateUserDTO = { success: false };
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(userContent.password, salt);

        let userAlreadyExists = await prismaClient.user.findUnique({
            where: { email: userContent.email }
        })

        if(userAlreadyExists) {
            const errorMessage = `Cannot create user. Details: User is already created`;
            logger.error(errorMessage);
            response.success = false;
            response.error = errorMessage as unknown as Error;
            return response;
        }

        await prismaClient.user.create({
            data: {
                name: userContent.name,
                email: userContent.email,
                password: passwordHash,
                type: userContent.type as unknown as string
            }
        }).then((user) => {
            logger.info('User was successfully created.');
            response.success = true;
            response.data = { id: user.id, name: user.name };
        })
        .catch((error) => {
            logger.error(`Cannot create user. Details: ${error}`);
            response.success = false;
            response.error = error;
        })

        logger.info('Finishing "create-user" service.');
        return response;
    }
}
