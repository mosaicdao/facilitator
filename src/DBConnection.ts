/**
 * The class creates db connection object using npm client.
 */
export default class DBConnection {
  private static connection;

  /**
   * Creates and returns db connection object.
   */
  public static getConnection(config) {
    // Create connection object here using npm client.
    // Return connection object if already present.
    // Create new connection object if not present.
    // e.g. this.connection = this.connection || <create connection>
    return this.connection;
  }
}