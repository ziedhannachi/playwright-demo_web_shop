import { Pool, PoolClient } from 'pg';

/**
 * Utility class for database operations
 * Author: Zied Hannachi
 */
export class DatabaseHelper {
  private pool: Pool;

  constructor(config: { host: string; port: number; database: string; user: string; password: string }) {
    this.pool = new Pool(config);
  }

  /**
   * Executes a query and returns the first row
   * @param query SQL query string
   * @param params optional query parameters
   */
  public async fetchOne<T = any>(query: string, params?: any[]): Promise<T | null> {
    const client: PoolClient = await this.pool.connect();
    try {
      const res = await client.query(query, params);
      return res.rows[0] || null;
    } finally {
      client.release();
    }
  }

  /**
   * Executes a query and returns all rows
   * @param query SQL query string
   * @param params optional query parameters
   */
  public async fetchAll<T = any>(query: string, params?: any[]): Promise<T[]> {
    const client: PoolClient = await this.pool.connect();
    try {
      const res = await client.query(query, params);
      return res.rows;
    } finally {
      client.release();
    }
  }

  /**
   * Close the pool connection
   */
  public async close(): Promise<void> {
    await this.pool.end();
  }
}
