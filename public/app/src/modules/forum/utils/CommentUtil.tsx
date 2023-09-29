
import { Comment } from "../models/Comment";
import { CommentDTO } from "../dtos/commentDTO";

export class CommentUtil {

  public static maxCommentLength: number = 10000;
  public static minCommentLength: number = 20;

  /**
   * Sorts an array of comments by date in descending order.
   *
   * @param {Comment} a - The first comment to compare.
   * @param {Comment} b - The second comment to compare.
   * @return {number} The difference between the dates of the two comments.
   */
  private static sortByDateDesc (a: Comment, b: Comment) {
    return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
  }

  /**
   * Converts a CommentDTO object to a Comment view model.
   *
   * @param {CommentDTO} dto - The CommentDTO object to convert.
   * @return {Comment} The converted Comment view model.
   */
  public static toViewModel (dto: CommentDTO): Comment {
    return {
      
      postSlug: dto.postSlug,
      commentId: dto.commentId,
      parentCommentId: dto.parentCommentId,
      text: dto.text,
      member: {
        username: dto.member.user.username,
        reputation: dto.member.reputation,
      },
      createdAt: dto.createdAt,
      childComments: [],
      postTitle: dto.postTitle,
      points: dto.points
    }
  }

  /**
   * Sorts an array of comments and returns a new array with the sorted comments.
   *
   * @param {Comment[]} comments - The array of comments to be sorted.
   * @return {Comment[]} The sorted array of comments.
   */
  public static getSortedComments (comments: Comment[]): Comment[] {

    comments.forEach((c) => {
      const hasParentComment = !!c.parentCommentId === true;
      if (hasParentComment) {
        // get the index of the parent comment
        const parentCommentIndex = comments.findIndex((cc) => cc.commentId === c.parentCommentId);
        
        if (parentCommentIndex !== -1) {
          comments[parentCommentIndex].childComments.push(c)

          // Sort
          comments[parentCommentIndex].childComments = comments[parentCommentIndex].childComments
            .sort(this.sortByDateDesc);
        }
      }
    });

    return comments.filter((c) => !!c.parentCommentId === false);
  }

  /**
   * Get the thread of comments for a given parent comment ID.
   *
   * @param {string} parentCommentId - The ID of the parent comment
   * @param {Comment[]} comments - An array of comments
   * @return {Comment[]} - An array of child comments
   */
  public static getThread (parentCommentId: string, comments: Comment[]): Comment[] {
    comments.forEach((c, cIndex) => {
      const hasParentComment = !!c.parentCommentId === true;
      if (hasParentComment) {
        const parentCommentIndex = comments.findIndex((cc) => cc.commentId === c.parentCommentId);
        const foundParentComment = parentCommentIndex !== -1;

        if (foundParentComment) {
          // Add to thread
          comments[parentCommentIndex].childComments.push(c);

          // Sort
          comments[parentCommentIndex].childComments = comments[parentCommentIndex].childComments
            .sort(this.sortByDateDesc);

          
          // Remove from root thread
          comments.splice(cIndex, 1)
        }
      }
    });

    const parentComment = this.traverseToComment(parentCommentId, comments);
    return !!parentComment === true 
      ? parentComment.childComments.filter((c) => c.commentId !== parentCommentId)
      : [];
  }

  /**
   * Finds and returns a comment with the specified target comment ID by traversing through the comments recursively.
   *
   * @param {string} targetCommentId - The ID of the target comment to find.
   * @param {Comment[]} comments - The array of comments to search through.
   * @return {Comment | undefined} - The comment with the target ID, or undefined if not found.
   */
  private static traverseToComment (targetCommentId: string, comments: Comment[]): Comment {
    return comments.find((comment) => {
      const found = comment.commentId === targetCommentId
      if (found) {
        return comment;
      } else {
        return this.traverseToComment(targetCommentId, comment.childComments);
      }
    }) as Comment;
  }

}