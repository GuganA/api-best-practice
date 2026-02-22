import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Request, Response } from 'express';

// Basic information's about API
const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Stories API',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        email: { type: 'string' },
                        name: { type: 'string' },
                    }
                },
                Story: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        title: { type: 'string' },
                        content: { type: 'string' },
                        isPublic: { type: 'boolean' },
                        tags: { type: 'array', items: { type: 'string' } },
                        slug: { type: 'string' },
                        writer: { $ref: '#/components/schemas/User' }
                    }
                }
            }
        },
        // security: [
        //     {
        //         bearerAuth: [],
        //     }
        // ]
    },
    apis: ['./src/v1/routes/*.ts']
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
export const swaggerDocs = (app: any, port: number) => {
    // Route-Handler to visit our docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Make our docs in JSON format available
    app.get('/api/v1/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Swagger http://localhost:${port}/api-docs`);
};