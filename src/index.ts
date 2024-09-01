// src/index.ts
import App from './app';

try {
    const app = new App();
    app.start();
} catch(error) {
    console.log(error);
}