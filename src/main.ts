import express from 'express';
import userRoutes from './routes/userRoutes.js'; // Correct extension for ESM
import { initUserModel } from './models/User.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Default route for the root URL
app.get('/', (req, res) => {
   res.status(200).send('Welcome to the API!');
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
