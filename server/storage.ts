import { users, type User, type InsertUser } from "../shared/schema";
import { AIMode as AIModeSchema, UserProfile as UserProfileSchema, ChatResponse } from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interfaces
export interface IStorage {
  getModes(): Promise<AIMode[]>;
  getStats(): Promise<Stats>;
  sendMessage(message: string, modeId?: string): Promise<ChatResponse>;
  getUserProfile(): Promise<UserProfile>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
}

// Types
export interface AIMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export interface Stats {
  interactions: number;
  interactionsChange: number;
  credits: number;
  creditsChange: number;
  content: number;
  contentChange: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  plan: string;
  credits: number;
  maxCredits: number;
}

// Sample data (used for initial setup and fallback)
const modes: AIMode[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT Style',
    description: 'General conversation AI assistant',
    icon: 'comment-dots',
    category: 'general'
  },
  {
    id: 'content',
    name: 'Content Writer',
    description: 'SEO optimized content creation',
    icon: 'file-alt',
    category: 'creative'
  },
  {
    id: 'code',
    name: 'Code Assistant',
    description: 'Programming help in multiple languages',
    icon: 'laptop-code',
    category: 'programming'
  },
  {
    id: 'character',
    name: 'Character AI',
    description: 'Interact with fictional characters',
    icon: 'theater-masks',
    category: 'creative'
  },
  {
    id: 'knowledge',
    name: 'Knowledge',
    description: 'Factual research assistant',
    icon: 'brain',
    category: 'education'
  }
];

const stats: Stats = {
  interactions: 486,
  interactionsChange: 12,
  credits: 682,
  creditsChange: -8,
  content: 24300,
  contentChange: 15
};

const userProfile: UserProfile = {
  name: 'John Doe',
  avatar: '',
  plan: 'Free',
  credits: 318,
  maxCredits: 1000
};

// Database Storage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getModes(): Promise<AIMode[]> {
    // For now, we'll use the in-memory modes
    // In a production scenario, this would fetch from the database
    return Promise.resolve(modes);
  }

  async getStats(): Promise<Stats> {
    // For now, we'll use the in-memory stats
    // In a production scenario, this would fetch from the database
    return Promise.resolve(stats);
  }

  async sendMessage(message: string, modeId?: string): Promise<ChatResponse> {
    const mode = modeId ? modes.find(m => m.id === modeId) : modes[0];
    
    return Promise.resolve({
      message: `This is a response from ${mode?.name || 'JAAT-AI'} mode. Your message was: "${message}"`,
      mode: mode?.name || 'JAAT-AI'
    });
  }

  async getUserProfile(): Promise<UserProfile> {
    // For now, we'll use the in-memory profile
    // In a production scenario, this would fetch from the database
    return Promise.resolve(userProfile);
  }
}

// For now, let's keep using MemStorage until we fully set up the database
// export const storage = new DatabaseStorage();

// MemStorage implementation
class MemStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return {
      id: 1,
      username: insertUser.username,
      passwordHash: insertUser.passwordHash,
      name: insertUser.name || 'User',
      email: insertUser.email || '',
      avatar: insertUser.avatar || '',
      plan: insertUser.plan || 'Free',
      credits: insertUser.credits || 500,
      maxCredits: insertUser.maxCredits || 1000,
      createdAt: new Date()
    };
  }

  async getModes(): Promise<AIMode[]> {
    return Promise.resolve(modes);
  }

  async getStats(): Promise<Stats> {
    return Promise.resolve(stats);
  }

  async sendMessage(message: string, modeId?: string): Promise<ChatResponse> {
    const mode = modeId ? modes.find(m => m.id === modeId) : modes[0];
    
    return Promise.resolve({
      message: `This is a simulated response from ${mode?.name || 'JAAT-AI'} mode. Your message was: "${message}"`,
      mode: mode?.name || 'JAAT-AI'
    });
  }

  async getUserProfile(): Promise<UserProfile> {
    return Promise.resolve(userProfile);
  }
}

// Export the storage instance
// Switch to DatabaseStorage when ready to use the database
export const storage = new MemStorage();