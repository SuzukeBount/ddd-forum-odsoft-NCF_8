import { MemberRepo } from "../modules/forum/repos/implementations/sequelizeMemberRepo";
import models from "../shared/infra/database/sequelize/models";
import { PostRepo } from "../modules/forum/repos/implementations/sequelizePostRepo";
import { CommentRepo } from "../modules/forum/repos/implementations/commentRepo";
import { PostVotesRepo } from "../modules/forum/repos/implementations/sequelizePostVotesRepo";
import { CommentVotesRepo } from "../modules/forum/repos/implementations/sequelizeCommentVotesRepo";

const commentVotesRepo = new CommentVotesRepo(models);
const postVotesRepo = new PostVotesRepo(models);
const commentRepo = new CommentRepo(models, commentVotesRepo);

/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/
import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";

import Posts from "./endpoints/Posts";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let posts: Posts;

describe("Posts endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    log.debug("1. Posts Base url: " + posts.getBaseUrl());
  });

  it("Get popular posts", async (): Promise<void> => {
    const response = await posts.getPopularPosts();
    expect(response.status).toBe(200);

    expect(response.data.posts).toBeDefined();
  });
});

//!Descomentar isto depois de se falar com o professor
// describe('getNumberOfCommentsByPostId', () => {
//   let user1;
//   let member1;
//   let postId1;
//   let postId2;
//   let commentId1;
//   let commentId2;
//   let commentId3;
//   let commentId4;
//   let postRepo;
//   //before all create a PostRepo class 
//   beforeAll(async () => {
//     postRepo = new PostRepo(models, commentRepo, postVotesRepo);
//     const rawSequelizeUser1 = {
//       base_user_id: '123',
//       username: 'user123',
//       user_password: 'mypass123',
//       user_email: 'myemail@isep.ipp.pt',
//     }

//     user1 = await models.BaseUser.create(rawSequelizeUser1);

//     const rawSequelizeMember1 = {
//       base_member_id: '123',
//       member_id: '123',
//     }

//     member1 =await models.Member.create(rawSequelizeMember1);

//     // Create two posts
//     const rawSequelizePost1 = {
//       post_id: '1234',
//       member_id: '123',
//       type: 'text',
//       title: 'First Post Title',
//       text: 'This is the content of the first post.',
//       link: null,
//       slug: 'first-post',
//       points: 0,
//       total_num_comments: 0,
//     };

//     const rawSequelizePost2 = {
//       post_id: '1235',
//       member_id: '123',
//       type: 'text',
//       title: 'Second Post Title',
//       text: 'This is the contet of the second post.',
//       link: null,
//       slug: 'second-post',
//       points: 0,
//       total_num_comments: 0,
//     };

//     const rawSequelizeComment1 = {
//       comment_id: '1234', // Replace with the actual comment_id
//       member_id: '123', // Replace with the actual member_id
//       type: 'upvote', // Replace with the actual type
//       text: '<p>SOME WIERD TEXT1</p>',
//       points: '1',
//       post_id: '1234',
//       parent_comment_id: 'NULL'
//     };

//     const rawSequelizeComment2 = {
//       comment_id: '1235', // Replace with the actual comment_id
//       member_id: '132', // Replace with the actual member_id
//       type: 'downvote', // Replace with the actual type
//       text: '<p>SOME WIERD TEXT2</p>',
//       points: '1',
//       post_id: '1234',
//       parent_comment_id: 'NULL'
//     };
//     const rawSequelizeComment3 = {
//       comment_id: '1236', // Replace with the actual comment_id
//       member_id: '132', // Replace with the actual member_id
//       type: 'downvote', // Replace with the actual type
//       text: '<p>SOME WIERD TEXT3</p>',
//       points: '1',
//       post_id: '1235',
//       parent_comment_id: 'NULL'
//     };


//     const rawSequelizeComment4 = {
//       comment_id: '1237', // Replace with the actual comment_id
//       member_id: '132', // Replace with the actual member_id
//       type: 'downvote', // Replace with the actual type
//       text: '<p>SOME WIERD TEXT3</p>',
//       points: '1',
//       post_id: '1234',
//       parent_comment_id: '1234'
//     };

//     //Create Posts
//     const newPost1 =await models.Post.create(rawSequelizePost1);
//     const newPost2 =await models.Post.create(rawSequelizePost2);

//     //Create Comments
//     commentId1 =await models.Comment.create(rawSequelizeComment1);
//     commentId2 =await models.Comment.create(rawSequelizeComment2);
//     commentId3 =await models.Comment.create(rawSequelizeComment3);
//     commentId4 =await models.Comment.create(rawSequelizeComment4);



//     postId1 = newPost1.post_id;
//     postId2 = newPost2.post_id;



//   })
//   it('should return the correct number of comments for a given post ID', async () => {
//     // Test case 1: Valid PostId object

//     const result1 = await postRepo.getNumberOfCommentsByPostId(postId1);
//     expect(result1).toBe(2);

//     // Test case 2: Valid string post ID

//     const result2 = await postRepo.getNumberOfCommentsByPostId(postId2);
//     expect(result2).toBe(1);

//     // Test case 3: Invalid post ID
//     const postId3 = 'invalidId';
//     const result3 = await await postRepo.getNumberOfCommentsByPostId(postId3);
//     expect(result3).toBe(0);
//   });

//   afterAll(()=>{
//     commentId1.destroy();
//     commentId2.destroy();
//     commentId3.destroy();
//     commentId4.destroy();
//     postId1.destroy();
//     postId2.destroy();
//     member1.destroy();
//     user1.destroy();

//   })
// });


export default {};
