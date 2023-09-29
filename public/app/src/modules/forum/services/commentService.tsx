
import { APIResponse } from "../../../shared/infra/services/APIResponse";
import { BaseAPI } from "../../../shared/infra/services/BaseAPI";
import { IAuthService } from "../../users/services/authService";
import { Comment } from "../models/Comment";
import { Result } from "../../../shared/core/Result";
import { right, left } from "../../../shared/core/Either";
import { CommentDTO } from "../dtos/commentDTO";
import { CommentUtil } from "../utils/CommentUtil";

export interface ICommentService {
  createReplyToPost (text: string, slug: string): Promise<APIResponse<void>>;
  createReplyToComment (comment: string, parentCommentId: string, slug: string): Promise<APIResponse<void>>;
  getCommentsBySlug (slug: string, offset?: number): Promise<APIResponse<Comment[]>>;
  getCommentByCommentId (commentId: string): Promise<APIResponse<Comment>>;
  upvoteComment (commentId: string): Promise<APIResponse<void>>;
  downvoteComment (commentId: string): Promise<APIResponse<void>>;
}

export class CommentService extends BaseAPI implements ICommentService {

  /**
   * Constructs a new instance of the class.
   *
   * @param {IAuthService} authService - The authentication service to use.
   */
  constructor (authService: IAuthService) {
    super(authService);
  }

  /**
   * Creates a reply to a post.
   *
   * @param {string} comment - The comment for the reply.
   * @param {string} slug - The slug of the post.
   * @return {Promise<APIResponse<void>>} A Promise that resolves to the API response.
   */
  async createReplyToPost (comment: string, slug: string): Promise<APIResponse<void>> {
    try {
      await this.post('/comments', { comment }, { slug }, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  /**
   * Create a reply to a comment.
   *
   * @param {string} comment - The reply comment.
   * @param {string} parentCommentId - The ID of the parent comment.
   * @param {string} slug - The slug of the article.
   * @return {Promise<APIResponse<void>>} The API response indicating success or failure.
   */
  async createReplyToComment (comment: string, parentCommentId: string, slug: string): Promise<APIResponse<void>> {
    try {
      await this.post(`/comments/${parentCommentId}/reply`, { comment }, { slug }, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  /**
   * Retrieves comments by slug.
   *
   * @param {string} slug - The slug of the comments.
   * @param {number} offset - The offset of the comments.
   * @return {Promise<APIResponse<Comment[]>>} A promise that resolves to an API response containing an array of comments.
   */
  async getCommentsBySlug (slug: string, offset?: number): Promise<APIResponse<Comment[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get('/comments', { offset, slug }, 
      isAuthenticated ? auth : null
    );

      return right(Result.ok<Comment[]>(
        response.data.comments.map((c: CommentDTO) => CommentUtil.toViewModel(c)))
      );
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  /**
   * Retrieves a comment by its comment ID.
   *
   * @param {string} commentId - The ID of the comment to retrieve.
   * @return {Promise<APIResponse<Comment>>} A promise that resolves to the API response containing the retrieved comment.
   */
  async getCommentByCommentId (commentId: string): Promise<APIResponse<Comment>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(`/comments/${commentId}`, null, 
        isAuthenticated ? auth : null
      );
      return right(Result.ok<Comment>(CommentUtil.toViewModel(response.data.comment)));
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  /**
   * Upvotes a comment.
   *
   * @param {string} commentId - The ID of the comment to upvote.
   * @returns {Promise<APIResponse<void>>} A Promise that resolves with the API response.
   */
  async upvoteComment (commentId: string): Promise<APIResponse<void>> {
    try {
      await this.post(`/comments/${commentId}/upvote`, null, null, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  /**
   * Downvotes a comment.
   *
   * @param {string} commentId - The ID of the comment to downvote.
   * @return {Promise<APIResponse<void>>} A Promise that resolves to the API response.
   */
  async downvoteComment (commentId: string): Promise<APIResponse<void>> {
    try {
      await this.post(`/comments/${commentId}/downvote`, null, null, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

}