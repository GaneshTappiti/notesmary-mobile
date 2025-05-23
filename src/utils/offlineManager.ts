
import { Preferences } from '@capacitor/preferences';

// Define types for our cached data
export interface CachedData<T> {
  timestamp: number;
  data: T;
  expiresIn?: number; // Time in milliseconds before cache is considered stale
}

// Keys for different types of cached data
export const CACHE_KEYS = {
  USER_DATA: 'cached-user-data',
  NOTES: 'cached-notes',
  RECENT_NOTES: 'cached-recent-notes',
  STUDY_ROOMS: 'cached-study-rooms',
  NOTIFICATIONS: 'cached-notifications',
  SETTINGS: 'cached-settings',
};

export const OfflineManager = {
  /**
   * Save data to persistent storage
   */
  async saveData<T>(key: string, data: T, expiresIn?: number): Promise<boolean> {
    try {
      const cachedData: CachedData<T> = {
        timestamp: Date.now(),
        data,
        expiresIn,
      };
      
      await Preferences.set({
        key,
        value: JSON.stringify(cachedData),
      });
      
      return true;
    } catch (error) {
      console.error(`Error saving offline data for ${key}:`, error);
      return false;
    }
  },
  
  /**
   * Get data from persistent storage
   * Returns null if no data or data is expired
   */
  async getData<T>(key: string, ignoreExpiry = false): Promise<T | null> {
    try {
      const result = await Preferences.get({ key });
      
      if (!result.value) {
        return null;
      }
      
      const cachedData: CachedData<T> = JSON.parse(result.value);
      
      // Check if data is expired
      if (!ignoreExpiry && cachedData.expiresIn) {
        const now = Date.now();
        const expirationTime = cachedData.timestamp + cachedData.expiresIn;
        
        if (now > expirationTime) {
          console.log(`Cache for ${key} has expired`);
          return null;
        }
      }
      
      return cachedData.data;
    } catch (error) {
      console.error(`Error retrieving offline data for ${key}:`, error);
      return null;
    }
  },
  
  /**
   * Remove data from persistent storage
   */
  async removeData(key: string): Promise<boolean> {
    try {
      await Preferences.remove({ key });
      return true;
    } catch (error) {
      console.error(`Error removing offline data for ${key}:`, error);
      return false;
    }
  },
  
  /**
   * Clear all cached data
   */
  async clearAllData(): Promise<boolean> {
    try {
      await Preferences.clear();
      return true;
    } catch (error) {
      console.error('Error clearing all offline data:', error);
      return false;
    }
  },
  
  /**
   * Check if data exists and is not expired
   */
  async hasValidData(key: string): Promise<boolean> {
    const data = await this.getData(key);
    return data !== null;
  },
  
  /**
   * Get cache timestamp to display when data was last updated
   */
  async getLastUpdated(key: string): Promise<Date | null> {
    try {
      const result = await Preferences.get({ key });
      
      if (!result.value) {
        return null;
      }
      
      const cachedData: CachedData<any> = JSON.parse(result.value);
      return new Date(cachedData.timestamp);
    } catch (error) {
      console.error(`Error retrieving timestamp for ${key}:`, error);
      return null;
    }
  }
};
