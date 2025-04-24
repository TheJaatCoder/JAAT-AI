// Interface for Storage
export interface IStorage {
  getModes?(): Promise<any[]>;
  getStats?(): Promise<any>;
  sendMessage?(message: string, modeId?: string): Promise<any>;
  getUserProfile?(): Promise<any>;
}

// Implementation is handled in index.ts for now
export const storage: IStorage = {};