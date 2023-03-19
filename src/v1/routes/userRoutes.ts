import { Router } from 'express';
import { createUser, login } from '../../controllers';

const router = Router();

router.get('/healthCheck', (req, res) => { res.sendStatus(200) });

router.post('/login', login);

router.post('/signup', createUser);


export { router };
