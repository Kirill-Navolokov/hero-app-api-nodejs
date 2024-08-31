// src/index.ts
import App from './app';
import { WodsController } from './controllers/wodsController';
import WodsRoutes from './routes/wodsRoutes';
import WodsService from './services/wodsService';

try {
    const app = new App([new WodsRoutes(new WodsController(new WodsService()))]);
    app.start();
} catch(error) {
    console.log(error);
}