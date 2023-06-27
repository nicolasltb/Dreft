import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from '@routes/router';
import { logger } from '@utils/logger';

dotenv.config();

const app = express();

const PORT = process.env['PORT'] || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/v1', router);

app.listen(PORT || 3001, () => {
    logger.info(`Server is running on port ${process.env['API_PORT'] || 3001}`);
});
