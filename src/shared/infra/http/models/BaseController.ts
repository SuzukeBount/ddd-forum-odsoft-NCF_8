import * as express from 'express'

export abstract class BaseController {

  /**
   * Description
   * @param {any} req:express.Request
   * @param {any} res:express.Response
   * @returns {any}
   */
  protected abstract executeImpl (req: express.Request, res: express.Response): Promise<void | any>;

  /**
   * Executes the function implementation.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @return {Promise<void>} - A promise that resolves when the function is executed successfully.
   */
  public async execute (req: express.Request, res: express.Response): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);
      this.fail(res, 'An unexpected error occurred')
    }
  }

  /**
   * Sends a JSON response with the specified HTTP status code and message.
   *
   * @param {express.Response} res - The response object.
   * @param {number} code - The HTTP status code.
   * @param {string} message - The message to be included in the response.
   * @return {express.Response} The response object.
   */
  public static jsonResponse (res: express.Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  /**
   * Sends a successful response to the client.
   *
   * @param {express.Response} res - The response object used to send the response.
   * @param {T} dto - The optional data transfer object to be included in the response.
   * @return {express.Response} The response object.
   */
  public ok<T> (res: express.Response, dto?: T) {
    if (!!dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  /**
   * Successful response to the client.
   *
   * @param {express.Response} res - The response object
   * @return {void} The function does not return a value
   */
  public created (res: express.Response) {
    return res.sendStatus(201);
  }

  /**
   * Handles client errors and sends a JSON response with the specified message and status code.
   *
   * @param {express.Response} res - The response object.
   * @param {string} message - Optional. The error message to send in the response. If not provided, a default message will be used.
   * @return {any} The JSON response.
   */
  public clientError (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
  }

  /**
   * Sends an unauthorized response with the given message or a default 'Unauthorized' message.
   *
   * @param {express.Response} res - The express response object.
   * @param {string} message - Optional. The message to include in the response.
   * @return {void}
   */
  public unauthorized (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
  }

  /**
   * Generates a payment required response.
   *
   * @param {express.Response} res - The response object.
   * @param {string} message - Optional message to include in the response.
   * @return {any} The JSON response.
   */
  public paymentRequired (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 402, message ? message : 'Payment required');
  }

  /**
   * Sends a forbidden response to the client.
   *
   * @param {express.Response} res - The response object.
   * @param {string} message - The optional message to include in the response. Defaults to 'Forbidden'.
   * @return {void}
   */
  public forbidden (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
  }

  /**
   * Handles a not found response.
   *
   * @param {express.Response} res - The response object.
   * @param {string} message - Optional message to be included in the response. Defaults to 'Not found'.
   * @return {any} The JSON response object.
   */
  public notFound (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
  }

  /**
   * Handles a conflict response.
   *
   * @param {express.Response} res - The response object.
   * @param {string} message - An optional message.
   * @return {void}
   */
  public conflict (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
  }

  /**
   * A function that handles the case when there are too many requests.
   *
   * @param {express.Response} res - The response object.
   * @param {string} [message] - An optional message to be included in the response.
   * @return {any} - The response object with the appropriate status code and message.
   */
  public tooMany (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
  }

/**
 * Handles a invalid or corruped response.
 *
 * @param {express.Response} res - The response object
 * @return {any} The result of the function
 */
  public todo (res: express.Response) {
    return BaseController.jsonResponse(res, 400, 'TODO');
  }

  /**
   * A function that handles an unexpected condition response.
   *
   * @param {express.Response} res - The express response object.
   * @param {Error | string} error - The error object or error message.
   * @return {void} This function does not return a value.
   */
  public fail (res: express.Response, error: Error | string) {
    console.log(error);
    return res.status(500).json({
      message: error.toString()
    })
  }
}