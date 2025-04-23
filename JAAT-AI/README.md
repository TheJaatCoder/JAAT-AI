# JAAT-AI Platform

Advanced AI-powered dashboard with holographic UI elements and multiple AI interaction modes.

## Features

- **Advanced Holographic UI**: Immersive interface with 3D effects, particle animations, and interactive elements
- **Multiple AI Modes**: Specialized AI assistants for different tasks (Content Creation, Code Assistance, Data Analysis, etc.)
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **PostgreSQL Database**: Secure, scalable database for user data, conversations, and settings
- **Authentication System**: Secure login, registration, and session management
- **Subscription Plans**: Free, Pro, and Enterprise tiers with different features and credits
- **API Access**: Interface with other systems through secured API endpoints

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript with advanced animation techniques
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT, bcrypt, and session management
- **Visualization**: Canvas-based animated charts and holographic elements
- **Security**: Helmet, CORS protection, and secure session handling

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL 12+
- NPM or Yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/jaat-ai.git
   cd jaat-ai
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up the environment variables
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/jaat_ai
   NODE_ENV=development
   HTTP_PORT=5000
   HTTPS_PORT=5443
   DOMAIN=jaat-ai.com
   SESSION_SECRET=your-secure-session-key
   ```

4. Initialize the database
   ```
   npm run db:push
   ```

5. Start the development server
   ```
   npm run dev
   ```

6. Access the application
   Open [http://localhost:5000](http://localhost:5000) in your browser

## Deployment

For production deployment to jaat-ai.com:

1. Set NODE_ENV to 'production' in your .env file
2. Add SSL certificates to the ./ssl directory
3. Run `npm start` to start the production server

## Available Scripts

- `npm start`: Start the server in production mode
- `npm run dev`: Start the server in development mode with auto-reload
- `npm run db:push`: Push schema changes to the database
- `npm run db:generate`: Generate migration files
- `npm run db:studio`: Open Drizzle Studio to visualize and manage the database

## Accessing the Application

The application is accessible at:
- Development: http://localhost:5000
- Production: https://jaat-ai.com

## API Documentation

API endpoints include:
- `/api/health`: Health check endpoint
- `/api/auth/login`: User login
- `/api/auth/register`: User registration
- `/api/modes`: Get available AI modes

## License

MIT