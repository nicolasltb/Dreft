import { Router } from 'express';

export const router = Router();

router.post('/search', (req, res) => {
  console.log(req);
  console.log(res);
});
