import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Basic information's about API
const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Data API', version: '1.0.0' },
    },
    apis: ['./src/v1/routes/dataRoutes.js']
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
    // Route-Handler to visit our docs
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Make our docs in JSON format available
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Swagger http://localhost:${port}/api/v1/docs`);
};

export default swaggerDocs;

