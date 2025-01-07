# Environment Configuration

## Setup Steps

1. Create a `.env` file in the root directory of your project
2. Copy and paste the following environment variables into your `.env` file:

```env
# Server Configuration
NODE_ENV="development"     # Options: 'development', 'production'
PORT="3001"               # Server port number

# JWT Configuration
JWT_SECRET="jwt-secret-key"  # Secret key for JWT token generation
JWT_EXPIRED="1d"            # JWT token expiration time

# Database Configuration
MONGODB_URL=""             # Your MongoDB connection string
```

## Important Notes

- The `.env` file should never be committed to version control
- Make sure to add `.env` to your `.gitignore` file
- For production deployment, ensure all environment variables are properly set with secure values
- Replace the placeholder values with your actual configuration:
  - Set a strong, unique `JWT_SECRET`
  - Configure `MONGODB_URL` with your database connection string
  - Adjust `PORT` if needed based on your hosting environment

## Environment Variables Description

| Variable    | Description               | Example Value                       |
| ----------- | ------------------------- | ----------------------------------- |
| NODE_ENV    | Application environment   | "development" or "production"       |
| PORT        | Server port number        | "3001"                              |
| JWT_SECRET  | Secret key for JWT tokens | "your-secure-secret-key"            |
| JWT_EXPIRED | JWT token expiration time | "1d" (1 day)                        |
| MONGODB_URL | MongoDB connection string | "mongodb://localhost:27017/your-db" |

# Available Scripts

The following npm scripts are available for development, building, and maintenance:

## Development Scripts

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsup",
    "start": "node dist/index.js",
    "lint:fix": "eslint src --fix",
    "check-type": "npx tsc --noEmit"
  }
}
```

### Script Descriptions

#### `npm run dev`

- Runs the application in development mode using `tsx`
- Watches for file changes and automatically restarts the server
- Provides TypeScript compilation and execution on-the-fly

#### `npm run build`

- Builds the application using `tsup`
- Compiles TypeScript files into JavaScript
- Output is generated in the `dist` directory

#### `npm run start`

- Runs the compiled application from the `dist` directory
- Used for running the application in production
- Requires running `npm run build` first

#### `npm run lint:fix`

- Runs ESLint on the source files in the `src` directory
- Automatically fixes common linting issues
- Helps maintain code quality and consistency

#### `npm run check-type`

- Runs TypeScript compiler in type-checking mode
- Verifies type correctness without generating output files
- Useful for catching type-related errors during development

## Usage Examples

### Development Mode

```bash
# Start the development server with hot-reload
npm run dev
```

### Production Deployment

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

### Code Quality Checks

```bash
# Fix linting issues
npm run lint:fix

# Check for type errors
npm run check-type
```
