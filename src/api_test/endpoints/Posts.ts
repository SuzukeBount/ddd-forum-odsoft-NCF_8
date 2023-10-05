/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/
import { AxiosResponse } from "axios";

import { AEndpoint } from "./abstracts/AEndpoint";
 
export default class Posts extends AEndpoint {
  /**
   * Constructor for the class.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  constructor() {
    super("/posts", "posts");
  }

  /**
   * Retrieves popular posts.
   *
   * @return {Promise<AxiosResponse>} The response from the server.
   */
  public async getPopularPosts(): Promise<AxiosResponse> {
    return this.restClient.sendGet({ route: "/popular" });
  }
}
