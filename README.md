# R1-DASHBOARD-C

This is a Next.js project that includes Storybook for ui-kit documentation.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root of the project and add the following environment variables:
   ```
   AUTH_SECRET=your_auth_secret
   PUBLIC_API_URL=your_api_url
   NEXTAUTH_URL=http://localhost:3000
   ```
   - Replace `your_auth_secret` with a secure secret key for authentication.
   - Replace `your_api_url` with the public API URL for your project.
   - `NEXTAUTH_URL` should be set to your domain. For local development, use `http://localhost:3000`.

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Storybook

This project includes Storybook for developing and testing UI components in isolation.

To run Storybook:
```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`.