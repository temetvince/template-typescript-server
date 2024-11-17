import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

const router = Router();

// Create a new user
router.post(
   '/',
   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { name, email } = req.body;
         const user = await User.create({ name, email });
         res.status(201).json(user);
      } catch (err) {
         next(err);
      }
   },
);

// Get all users
router.get(
   '/',
   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const users = await User.findAll();
         res.status(200).json(users);
      } catch (err) {
         next(err);
      }
   },
);

// Get a user by ID
router.get(
   '/:id',
   async (
      req: Request<{ id: string }>,
      res: Response,
      next: NextFunction,
   ): Promise<void> => {
      try {
         const user = await User.findByPk(req.params.id);
         if (!user) {
            res.status(404).json({ error: 'User not found' });
         } else {
            res.status(200).json(user);
         }
      } catch (err) {
         next(err);
      }
   },
);

// Update a user
router.put(
   '/:id',
   async (
      req: Request<{ id: string }>,
      res: Response,
      next: NextFunction,
   ): Promise<void> => {
      try {
         const { name, email } = req.body;
         const [updated] = await User.update(
            { name, email },
            { where: { id: req.params.id } },
         );
         if (!updated) {
            res.status(404).json({ error: 'User not found' });
            return;
         }
         const updatedUser = await User.findByPk(req.params.id);
         res.status(200).json(updatedUser);
      } catch (err) {
         next(err);
      }
   },
);

// Delete a user
router.delete(
   '/:id',
   async (
      req: Request<{ id: string }>,
      res: Response,
      next: NextFunction,
   ): Promise<void> => {
      try {
         const deleted = await User.destroy({ where: { id: req.params.id } });
         if (!deleted) {
            res.status(404).json({ error: 'User not found' });
            return;
         }
         res.status(204).send();
      } catch (err) {
         next(err);
      }
   },
);

export default router;
