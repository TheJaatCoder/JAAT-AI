import { Express, Request, Response } from "express";
import { IStorage } from "./storage";
import { insertUserSchema } from "../shared/schema";
import { z } from "zod";

// Setup API routes
export function setupRoutes(app: Express, storage: IStorage) {
  // Get AI modes
  app.get("/api/modes", async (req: Request, res: Response) => {
    try {
      const modes = await storage.getModes();
      res.json(modes);
    } catch (error) {
      console.error("Error fetching modes:", error);
      res.status(500).json({ error: "Failed to fetch AI modes" });
    }
  });

  // Get statistics
  app.get("/api/stats", async (req: Request, res: Response) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  // Send a message to the AI
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, modeId } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      
      const response = await storage.sendMessage(message, modeId);
      res.json(response);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // Get user profile
  app.get("/api/profile", async (req: Request, res: Response) => {
    try {
      const profile = await storage.getUserProfile();
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  });

  // Create a new user
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      // Validate request body against the insert schema
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid user data", 
          details: result.error.format() 
        });
      }
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(result.data.username);
      
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }
      
      // Create the user
      const user = await storage.createUser(result.data);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });
}