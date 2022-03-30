import { Application, Request, Response } from 'express';
import swaggerJSDOC from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const baseModulePath = './src/modules';
const getPath = (path: string): string => `${baseModulePath}${path}`;

const docsSources = [getPath('/user/user.routes.ts')];

export default function generateDoc(app: Application) {
  const swaggerOptions = {
    definition: {
      securityDefinitions: {
        jwt: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
      components: {},
      info: {
        title: 'Express Kun Boilerplate',
        version: '1.0.0',
      },
      basePath: '/api/v1',
    },
    apis: docsSources,
  };

  const swaggerSpec = swaggerJSDOC(swaggerOptions);
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.send(swaggerSpec);
  });
  app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, {
      // customJs: '/reload/reload.js',
    })
  );
}
