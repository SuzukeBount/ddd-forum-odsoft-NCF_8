
import { APIResponse } from "../../../shared/infra/services/APIResponse";
import { PostType, Post } from "../models/Post";
import { BaseAPI } from "../../../shared/infra/services/BaseAPI";
import { IAuthService } from "../../users/services/authService";
import { Result } from "../../../shared/core/Result";
import { right, left } from "../../../shared/core/Either";
import { PostUtil } from "../utils/PostUtil";
import { PostDTO } from "../dtos/postDTO";

export interface IPostService {
  createPost (title: string, type: PostType, text?: string, link?: string): Promise<APIResponse<void>>;
  getRecentPosts (offset?: number): Promise<APIResponse<Post[]>>;
  getPopularPosts (offset?: number): Promise<APIResponse<Post[]>>
  getPostBySlug (slug: string): Promise<APIResponse<Post>>;
  upvotePost (slug: string): Promise<APIResponse<void>>;
  downvotePost (slug: string): Promise<APIResponse<void>>;
}

export class PostService extends BaseAPI implements IPostService {

  /**
   * Initializes a new instance of the constructor.
   *
   * @param {IAuthService} authService - The authentication service.
   */
  constructor (authService: IAuthService) {
    super(authService);
  }

/**
 * Retrieves a post by its slug.
 *
 * @param {string} slug - The slug of the post.
 * @return {Promise<APIResponse<Post>>} A Promise that resolves to the API response containing the post.
 */
  public async getPostBySlug (slug: string): Promise<APIResponse<Post>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get('/posts', { slug }, 
        isAuthenticated ? auth : null
      );

      return right(Result.ok<Post>(
        PostUtil.toViewModel(response.data.post)
      ));
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  /**
   * Retrieves the recent posts from the API.
   *
   * @param {number} offset - The number of posts to skip from the beginning.
   * @return {Promise<APIResponse<Post[]>>} A promise that resolves to the API response containing an array of recent posts.
   */
  public async getRecentPosts (offset?: number): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get('/posts/recent', { offset }, 
        isAuthenticated ? auth : null
      );

      return right(Result.ok<Post[]>(
        response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p)))
      );
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  /**
   * Retrieves popular posts from the API.
   *
   * @param {number} offset - The offset value for pagination (optional).
   * @return {Promise<APIResponse<Post[]>>} A Promise that resolves to an APIResponse containing an array of Post objects.
   */
  public async getPopularPosts (offset?: number): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };
      const response = await this.get('/posts/popular', { offset }, 
        isAuthenticated ? auth : null
      );

      return right(Result.ok<Post[]>(
        response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p)))
      );
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  /**
   * Creates a new post.
   *
   * @param {string} title - The title of the post.
   * @param {PostType} type - The type of the post.
   * @param {string} [text] - The text content of the post (optional).
   * @param {string} [link] - The link of the post (optional).
   * @return {Promise<APIResponse<void>>} A promise that resolves to the API response.
   */
  public async createPost (title: string, type: PostType, text?: string, link?: string): Promise<APIResponse<void>> {
    try {
      await this.post('/posts', { title, postType: type, text, link }, null, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  /**
   * Upvotes a post.
   *
   * @param {string} slug - The slug of the post to upvote.
   * @return {Promise<APIResponse<void>>} A promise that resolves to the API response.
   */
  async upvotePost (slug: string): Promise<APIResponse<void>> {
    try {
      await this.post('/posts/upvote', { slug }, null, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  /**
   * Downvotes a post.
   *
   * @param {string} slug - The slug of the post.
   * @return {Promise<APIResponse<void>>} A promise that resolves to an APIResponse with a void return value.
   */
  async downvotePost (slug: string): Promise<APIResponse<void>> {
    try {
      await this.post('/posts/downvote', { slug }, null, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }
}