
import React from 'react';
import { IForumOperations } from '../redux/operators';
import { ForumState } from '../redux/states';

interface withVotingProps extends IForumOperations {
  users: ForumState;
}

/**
 * Creates a higher-order component (HOC) that adds voting functionality to a wrapped component.
 *
 * @param {any} WrappedComponent - The component to be wrapped.
 * @return {React.Component} The wrapped component with added voting functionality.
 */
function withVoting (WrappedComponent: any) {
  class HOC extends React.Component<withVotingProps, any> {
    constructor (props: withVotingProps) {
      super(props)
    }

    /**
     * Handles the upvoting of a comment.
     *
     * @param {string} commentId - The id of the comment to be upvoted.
     * @return {void} - This function does not return a value.
     */
    handleUpvoteComment (commentId: string) {
      this.props.upvoteComment(commentId);
    }

    /**
     * Handles the downvote of a comment.
     *
     * @param {string} commentId - The ID of the comment to be downvoted.
     */
    handleDownvoteComment (commentId: string) {
      this.props.downvoteComment(commentId);
    }

    /**
     * Handles the upvoting of a post.
     *
     * @param {string} postSlug - The slug of the post to be upvoted.
     */
    handleUpvotePost (postSlug: string) {
      this.props.upvotePost(postSlug)
    }

    /**
     * Handles the downvoting of a post.
     *
     * @param {string} postSlug - The slug of the post to be downvoted.
     */
    handleDownvotePost (postSlug: string) {
      this.props.downvotePost(postSlug);
    }

    /**
     * Renders the wrapped component with the necessary props.
     *
     * @return {JSX.Element} The rendered component.
     */
    render () {
      return (
        <WrappedComponent
          upvoteComment={(commentId: string) => this.handleUpvoteComment(commentId)}
          downvoteComment={(commentId: string) => this.handleDownvoteComment(commentId)}
          upvotePost={(slug: string) => this.handleUpvotePost(slug)}
          downvotePost={(slug: string) => this.handleDownvotePost(slug)}
          {...this.props}
        />
      );
    }
  }
  return HOC;
}

export default withVoting;