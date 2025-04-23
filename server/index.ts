import express from "express";
import { setupRoutes } from "./routes";
import { storage } from "./storage";

// Create the Express app
const app = express();
const port = parseInt(process.env.PORT || "5000", 10);

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup API routes
setupRoutes(app, storage);

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server started. Serving API on port ${port}`);
  console.log(`Access the API at http://localhost:${port}/api`);
});