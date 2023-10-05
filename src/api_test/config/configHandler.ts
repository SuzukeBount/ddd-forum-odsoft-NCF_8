/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/
import { readFileSync } from "fs";
import { TLogLevelName } from "tslog";

import YAML from "yaml";

export class ConfigHandler {
  private static instance: ConfigHandler;

  private validEnvironments = ["local", "prod"];

  public commonConfig: { request_headers: object };

  public environment: string;

  public environmnetConfig: {
    log_level: TLogLevelName;
    time_zone: string;
    api_base_url: string;
  };

  /**
   * Initializes the private constructor of the class.
   *
   * This function sets the common configuration and environment configuration
   * based on the value of the TEST_ENV environment variable. If the TEST_ENV
   * environment variable is not set, it defaults to "prod".
   *
   * @private
   */
  private constructor() {
    this.setCommonConfig();
    this.setEnvironmentConfig(process.env.TEST_ENV || "prod");
  }

/**
 * Returns the singleton instance of the ConfigHandler class.
 *
 * @return {ConfigHandler} The singleton instance of the ConfigHandler class.
 */
  public static getInstance(): ConfigHandler {
    if (!ConfigHandler.instance) {
      ConfigHandler.instance = new ConfigHandler();
    }
    return ConfigHandler.instance;
  }

  /**
   * Sets the common configuration.
   *
   * @private
   * @returns {void}
   */
  private setCommonConfig(): void {
    try {
      this.commonConfig = YAML.parse(
        readFileSync("src/api_test/config/config-api.yaml", "utf8")
      ).common;
    } catch (error) {
      throw Error(`Error reading common config: (${error})`);
    }
  }

/**
 * Sets the environment configuration based on the provided environment.
 *
 * @param {string} environment - The environment to set the configuration for.
 * @return {void} This function does not return a value.
 */
  private setEnvironmentConfig(environment: string): void {
    this.ensureEnvironmentIsValid(environment);
    try {
      this.environmnetConfig = YAML.parse(
        readFileSync("src/api_test/config/config-api.yaml", "utf8")
      )[environment];
    } catch (error) {
      throw Error(`Error reading environment config: (${error})`);
    }
  }

  /**
   * Ensures that the environment is valid.
   *
   * @param {string} environment - The environment to be checked.
   * @throws {Error} If the environment is not valid.
   */
  private ensureEnvironmentIsValid(environment: string): void {
    if (this.validEnvironments.indexOf(environment) === -1) {
      throw Error(`Config environment is not valid: "${environment}"`);
    }
  }
}

export default ConfigHandler;
