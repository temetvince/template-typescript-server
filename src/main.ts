import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'; // Correct extension for ESM
import { initUserModel } from './models/User.js';
import { command } from './command.js';

const main = async () => {
   const app = express();
   const PORT = process.env.PORT || 3001;

   // Middleware
   app.use(express.json());
   app.use(cors());

   // Default route for the root URL
   app.get('/', async (req, res) => {
      try {
         const result = await command();
         res.send(result);
      } catch (error) {
         console.error(error);
         res.send('');
      }
   });

   // User routes
   app.use('/users', userRoutes); // Handle routes under /users

   // Initialize models and start server
   (async () => {
      try {
         console.log('Initializing server...');

         await initUserModel();

         console.log('Server initialized.');

         app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
         });
      } catch (err) {
         console.error('Unable to start the server:', err);
      }
   })();
};

main();
