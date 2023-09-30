/**
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import { Logger } from "tslog";

import ConfigHandler from "../../config/configHandler";
import { RestClient } from "../../restClient/RestClient";

/**
 * Represents an abstract class for handling API endpoints.
 */
export abstract class AEndpoint {

  /**
   * The base URL for the service.
   */
  protected url: string;
  
  /**
   * An instance of the RestClient class for making API requests.
   */
  public restClient: RestClient;
  
  /**
   * The name of the service.
   */
  protected serviceName: string;

  /**
   * A set to store created item IDs.
   */
  public createdItemIds: Set<string> = new Set();

  /**
   * Configuration handler instance.
   */
  protected config = ConfigHandler.getInstance();
  
  /**
   * Logger instance for logging.
   */
  protected log: Logger = new Logger({
    minLevel: this.config.environmnetConfig.log_level,
    dateTimeTimezone:
      this.config.environmnetConfig.time_zone ||
      Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  
  /**
   * Initializes a new instance of the class.
   *
   * @param {string} serviceUrl - The service URL.
   * @param {string} serviceName - The service name.
   */
  protected constructor(serviceUrl: string, serviceName: string) {
    const baseUrl: string = this.config.environmnetConfig.api_base_url;
    this.url = baseUrl + serviceUrl;
    this.restClient = new RestClient(this.url);
    this.serviceName = serviceName;
    this.log.info(`The Service URL for ${this.serviceName} is ${this.url}`);
  }

  /**
   * Retrieves the base URL.
   *
   * @return {string} The base URL.
   */
  public getBaseUrl(): string {
    return this.url;
  }
}
