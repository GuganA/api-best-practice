import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Request, Response } from 'express';

// Basic information's about API
const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Data API',
            version: '1.0.0'
        },
        components: {
            securitySchema: {
                bearerAuth: {
                    type: 'http',
                    schema: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ['./src/v1/routes/*.ts']
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
export const swaggerDocs = (app: any, port: number) => {
    // Route-Handler to visit our docs
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Make our docs in JSON format available
    app.get('/api/v1/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Swagger http://localhost:${port}/docs`);
};