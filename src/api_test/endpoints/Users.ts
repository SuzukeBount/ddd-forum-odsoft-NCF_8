import { AxiosResponse } from "axios";

/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/
import { AEndpoint } from "./abstracts/AEndpoint";
 
export default class Users extends AEndpoint {
/**
 * Constructor for the class.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
  constructor() {
    super("/users", "users");
  }

  /**
   * This method is used to login, using the REST API.
   * For the moment, the username and password are hardcoded. 
   * 
   * @returns the result of the post request. If sucessful, the response will contain an access token and refresh token.
   */
  public async postLogin(): Promise<AxiosResponse> {
    return this.restClient.sendPost({ route: "/login", data: { username: "atb", password: "atbatb" } });
  }

  /**
   * Retrieves the current user information.
   *
   * @param {string} accessToken - The access token for authentication.
   * @return {Promise<AxiosResponse>} - The response from the API call.
   */
  public async getMe(accessToken: string): Promise<AxiosResponse> {
    return this.restClient.sendGet({ route: "/me", headers: { "Authorization": accessToken, "Accept": "application/json",
    "Content-Type": "application/json" } } );
  }  

  /**
   * Send a POST request using the restClient.
   *
   * @return {Promise<AxiosResponse>} The response from the POST request.
   */
  public async post(): Promise<AxiosResponse> {
    return this.restClient.sendPost({ route: "/", data: { username: "atb", email: "atb@isep.ipp.pt", password: "atbatb" } });
  }

}
