This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-enterprise-next-app`](https://github.com/anuradhamudalige/create-enterprise-next-app).

## Getting Started

## Project Structure

- **cicd**: CICD configurations.
- **src**: Contains the main source code for the application.
    - **app**: Contains the Next.js application router files (App router).
        - **api**: API routes for the application (Backend presentation layer).
    - **models**: Contains TypeScript models.
    - **server**: Server-side application logic.
        - **application**: Application-specific logic including the domain.
            - **container**: Dependency injection configuration.
        - **external**: External layer for interacting with external services/databases.
    - **util**: Utility functions.
    - **components**: Application components.
        - **{/route}**: Components which specif to the route, usually they may hold a business value.
        - **layout**: Common layouts which will be using through the app using(or not) the UI components.
        - **ui**: Common components which does not involve any business values.
    - **styles**: Global styling files and each page styles are contained in the same folder as the page.
    - **middleware.ts**: Middleware configuration.
- **public**: Public assets.
- **__tests__**: All the testing files must be placed here.
- **next.config.ts**: Next.js configuration.
- **package.json**: Project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration.
- **build.js**: Will copy required files for production deployment from `.next` to `dist`.

## Running project
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Local Development

- Create a file named `.env.local` in the root directory of the project.
- Add the following environment variables to `.env.local`:

```plaintext
NEXT_PUBLIC_BASE_PATH=''
NEWRELIC_AGENT_SCRIPT_FILENAME=dev-agent.min.js
```
- Take a copy from the configuration file from Github and extend the above with it.
- Note that `.env.local` is having highest priority, so you can override any variable from the configuration file.

## Guides

- Developer Guide
- Integrating NextAuth
- Integrating Authorization using azure (ACL based)
- Setting up NewRelic Agent (client)
- Setting up NewRelic (server)

## Libraries in action

- InversifyJS - Dependency injection library [Link](https://inversify.io/)
- Luxon - Date and time library [Link](https://moment.github.io/luxon/)

## Executing API requests using provided BaseClient (Optional)
To execute API requests in your Next.js application, you can use the `BaseClient` provided in the `src/server/external/api/common` directory. This client is designed to handle API requests with built-in error handling and logging.
### Example Usage
```typescript
import { inject, injectable } from 'inversify';
import { BaseClient } from '@/server/external/api/common/client/BaseClient';
import { YourRequest } from '@/server/external/api/YourRequest';
import { YourResponse } from '@/server/external/api/YourResponse';
import { HTTPMethod } from '@/server/external/api/common/model/RequestTypes';
import camelcaseKeys from 'camelcase-keys';
import { logger } from '@/util/logger';
import { DiTypes } from '@/server/application/container/DiTypes';
import type { AnyService } from '@/server/external/api/any-service/AnyService';
import { AxiosError, AxiosRequestConfig, HttpStatusCode } from 'axios';

@injectable()
export class YourClient extends BaseClient {
  constructor(@inject(DiTypes.TokenService) protected anyService: AnyService) {
    super();
  }
  async onRetry(error: AxiosError, requestConfig: AxiosRequestConfig): Promise<void> {
    // override this method to handle retries
  }
  async yourEndpoint(request: YourRequest): Promise<YourResponse> {
    // example of how to use the BaseClient to make an API request
    const url = `/v1/your-endpoint`;
    try {
      const response = await this.execute({
        endpoint: url, 
        method: HTTPMethod.POST, 
        payload: request,
        type: 'json',
        baseUrl: process.env.YOUR_SERVICE_SPECIFIC_BASE_URL,
        headers: {
          'Authorization': `Bearer ${await this.anyService.getToken()}`
        }
      });

      return camelcaseKeys(response.data, {deep: true});

    } catch (error) {
      logger.error(`Error occurred: ${JSON.stringify(error)}`);
      throw new Error(`Failed to generate response`);
    }
  }
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
