/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import { Logger } from "tslog";
import { stringify } from "yaml";

import https from "https";

import ConfigHandler from "../config/configHandler";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

/**
 * Checks if a property is set.
 *
 * @param {any} property - The property to check.
 * @return {boolean} Returns `true` if the property is not `undefined` and not `null`, otherwise `false`.
 */
function isSet(property): boolean {
  return property !== undefined && property !== null;
}

export class RestClient {
  private static authToken: string;

  private axiosInstance: AxiosInstance;

  /**
   * Constructs a new instance of the class.
   *
   * @param {string} baseUrl - The base URL for the axios instance.
   */
  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({ baseURL: baseUrl });
  }

  private httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  // Not returning an actual auth token for this example project.
  // Just showing how it can be done!
  static async getToken(requestHeaders: object) {
    requestHeaders["Authorization"] = `asdf`;
  }

  /**
   * Calls an API endpoint using Axios.
   *
   * @param {IAxiosCallEndpointArgs} args - The arguments for the API call.
   * @param {string} args.route - The route of the API endpoint.
   * @param {string} args.method - The HTTP method of the API call.
   * @param {string} args.authToken - The authentication token for the API call.
   * @param {Object} args.headers - The headers for the API call.
   * @param {Object} args.data - The data to be sent in the request body.
   * @param {Object} args.additionalConfigs - Additional configurations for the API call.
   * @param {Object} args.params - The URL parameters for the API call.
   * @return {Promise<AxiosResponse>} A Promise that resolves to the Axios response.
   */
  public async callEndpoint({
    route,
    method,
    authToken,
    headers,
    data,
    additionalConfigs,
    params,
  }: IAxiosCallEndpointArgs): Promise<AxiosResponse> {
    let response;
    let responseLog = "Response: ";
    let requestHeaders = headers;

    // if headers are not passed in, use the default headers
    if (requestHeaders == undefined) {
      requestHeaders = { ...config.commonConfig.request_headers };
    }

    // if authToken is passed in, add it to the request headers
    if (authToken !== undefined) {
      requestHeaders = {
        ...requestHeaders,
        ...{
          Authorization: `Bearer ${authToken}`,
        },
      };
    }

    // if we have not set the auth headers yet, set them
    else if (!requestHeaders.Authorization) {
      //await RestClient.getToken(requestHeaders);
    }

    log.debug(
      RestClient.prepareLogRecord({
        route,
        method,
        headers: requestHeaders,
        data,
        additionalConfigs,
        params,
      })
    );

    await this.axiosInstance
      .request({
        url: route,
        method,
        data,
        headers: requestHeaders,
        httpsAgent: this.httpsAgent,
        params,
        ...additionalConfigs,
      })
      .then((res) => {
        response = res;
        responseLog = `<Success> Status = ${res.status} ${res.statusText}`;
      })
      .catch((error) => {
        response = error.response;
        if (response === undefined)
          responseLog = `<Error> Something wrong happened, did not get proper error from server! (${error.message})`;
        else
          responseLog = `<Error> Status = ${response.status} ${response.statusText}, ${error.message}`;
      });
    log.debug(responseLog);
    return response;
  }

  /**
   * Sends a POST request to the specified route with the provided data and configurations.
   *
   * @param {IAxiosHttpRequestArgs} args - The arguments for the POST request.
   * @param {string} args.route - The route to send the POST request to.
   * @param {string} args.authToken - The authentication token for the request.
   * @param {any} args.data - The data to send in the request body.
   * @param {object} args.params - The query parameters for the request.
   * @param {object} args.headers - The headers for the request.
   * @param {object} args.additionalConfigs - Additional configurations for the request.
   * @return {Promise<any>} A promise that resolves with the response from the server.
   */
  public async sendPost({
    route,
    authToken,
    data,
    params,
    headers,
    additionalConfigs,
  }: IAxiosHttpRequestArgs): Promise<any> {
    return this.callEndpoint({
      route,
      method: "POST",
      authToken,
      data,
      params,
      headers,
      additionalConfigs,
    });
  }

  /**
   * Sends a GET request to the specified route.
   *
   * @param {IAxiosHttpRequestArgs} args - The arguments for the GET request.
   * @param {string} args.route - The route to send the GET request to.
   * @param {string} args.authToken - The authentication token for the request.
   * @param {object} args.params - The query parameters for the request.
   * @param {object} args.headers - The headers for the request.
   * @param {object} args.additionalConfigs - Additional configurations for the request.
   * @return {Promise<any>} - A promise that resolves with the response data from the request.
   */
  public async sendGet({
    route,
    authToken,
    params,
    headers,
    additionalConfigs,
  }: IAxiosHttpRequestArgs): Promise<any> {
    return this.callEndpoint({
      route,
      method: "GET",
      authToken,
      params,
      headers,
      additionalConfigs,
    });
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @param {IAxiosHttpRequestArgs} requestArgs - The arguments for the request.
   * @param {string} requestArgs.route - The route of the endpoint.
   * @param {string} requestArgs.authToken - The authentication token.
   * @param {object} requestArgs.params - The request parameters.
   * @param {object} requestArgs.headers - The request headers.
   * @param {object} requestArgs.additionalConfigs - Additional configurations for the request.
   * @return {Promise<any>} A promise that resolves with the response data.
   */
  public async sendDelete({
    route,
    authToken,
    params,
    headers,
    additionalConfigs,
  }: IAxiosHttpRequestArgs): Promise<any> {
    return this.callEndpoint({
      route,
      method: "DELETE",
      authToken,
      params,
      headers,
      additionalConfigs,
    });
  }

  /**
   * Sends a PATCH request to the specified route with the provided data and headers.
   *
   * @param {IAxiosHttpRequestArgs} requestArgs - The arguments for the request.
   *    - route: The route to send the request to.
   *    - authToken: The authentication token to include in the request headers.
   *    - data: The data to send with the request.
   *    - headers: The headers to include in the request.
   *    - additionalConfigs: Additional configurations for the request.
   * @return {Promise<any>} A promise that resolves with the response from the server.
   */
  public async sendPatch({
    route,
    authToken,
    data,
    headers,
    additionalConfigs,
  }: IAxiosHttpRequestArgs): Promise<any> {
    return this.callEndpoint({
      route,
      method: "PATCH",
      authToken,
      data,
      headers,
      additionalConfigs,
    });
  }

  /**
   * Sends a PUT request to the specified route with the provided data and headers.
   *
   * @param {IAxiosHttpRequestArgs} options - The options for the PUT request.
   * @param {string} options.route - The route to send the PUT request to.
   * @param {string} options.authToken - The authentication token for the request.
   * @param {any} options.data - The data to send with the request.
   * @param {object} options.headers - The headers for the request.
   * @param {object} options.additionalConfigs - Additional configurations for the request.
   *
   * @returns {Promise<any>} A promise that resolves with the response data.
   */
  public async sendPut({
    route,
    authToken,
    data,
    headers,
    additionalConfigs,
  }: IAxiosHttpRequestArgs): Promise<any> {
    return this.callEndpoint({
      route,
      method: "PUT",
      authToken,
      data,
      headers,
      additionalConfigs,
    });
  }

  /**
   * Prepares a log record for an Axios call endpoint.
   *
   * @param {IAxiosCallEndpointArgs} route - The route of the endpoint.
   * @param {IAxiosCallEndpointArgs} method - The method of the endpoint.
   * @param {IAxiosCallEndpointArgs} headers - The headers of the request.
   * @param {IAxiosCallEndpointArgs} data - The data of the request.
   * @param {IAxiosCallEndpointArgs} additionalConfigs - Additional configurations for the request.
   * @param {IAxiosCallEndpointArgs} params - The parameters of the request.
   * @return {string} The prepared log record.
   */
  private static prepareLogRecord({
    route,
    method,
    headers,
    data,
    additionalConfigs,
    params,
  }: IAxiosCallEndpointArgs): string {
    let logRecord = `Request: ${method} ${route}`;
    if (isSet(headers))
      logRecord = `${logRecord}\nHeaders: ${stringify(headers)}`;

    if (isSet(params)) logRecord = `${logRecord}\nParams: ${stringify(params)}`;

    if (isSet(additionalConfigs)) {
      logRecord = `${logRecord}\nAdditional Configuration: ${stringify(
        additionalConfigs
      )}`;
    }

    if (isSet(data)) {
      const jsonData = stringify(data);
      // We don't want to log anything that isn't json data
      logRecord = `${logRecord}\nData: ${jsonData === undefined ? "Some data, not JSON!" : jsonData
        }`;
    }
    return logRecord;
  }
}

export interface IAxiosHttpRequestArgs {
  route: string;
  authToken?: string;
  data?: object;
  params?: object;
  headers?: any;
  additionalConfigs?: AxiosRequestConfig;
}

export interface IAxiosCallEndpointArgs extends IAxiosHttpRequestArgs {
  method: Method;
}

export default RestClient;