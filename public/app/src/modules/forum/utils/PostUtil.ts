
import { Post } from "../models/Post";
import { PostDTO } from "../dtos/postDTO";

export class PostUtil {
  public static maxTextLength: number = 10000;
  public static minTextLength: number = 20;

  public static maxTitleLength: number = 85;
  public static minTitleLength: number = 2;

  public static maxLinkLength: number = 500;
  public static minLinkLength: number = 8;

  /**
   * Compute the updated post after an upvote.
   *
   * @param {Post} post - The post object to compute the updated post for.
   * @return {Post} - The updated post object.
   */
  public static computePostAfterUpvote (post: Post): Post {
    return {
      ...post,
      wasUpvotedByMe: post.wasUpvotedByMe ? false : true,
      points: post.wasUpvotedByMe ? (post.points - 1) : (post.points + 1)
    } 
  }

  /**
   * Computes the updated post object after a downvote.
   *
   * @param {Post} post - The original post object.
   * @return {Post} - The updated post object.
   */
  public static computePostAfterDownvote (post: Post): Post {
    return {
      ...post,
      wasDownvotedByMe: post.wasDownvotedByMe ? false : true,
      points: post.wasDownvotedByMe ? (post.points + 1) : (post.points - 1)
    } 
  }

  /**
   * Converts a PostDTO object to a Post object in the view model.
   *
   * @param {PostDTO} dto - The PostDTO object to be converted.
   * @return {Post} The converted Post object in the view model.
   */
  public static toViewModel (dto: PostDTO): Post {
    return {
      slug: dto.slug,
      title: dto.title,
      createdAt: dto.createdAt,
      postAuthor: dto.memberPostedBy.user.username,
      numComments: dto.numComments,
      points: dto.points,
      type: dto.type,
      text: dto.text,
      link: dto.link,
      wasUpvotedByMe: dto.wasUpvotedByMe,
      wasDownvotedByMe: dto.wasDownvotedByMe
    }
  }
}