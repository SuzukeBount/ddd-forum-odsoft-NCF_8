import { getTopFivePosts, changeBackgroundColorForToday } from './pages/index';
import { Post } from './modules/forum/models/Post';
import { Provider } from 'react-redux';
import { initialReduxStartupScript } from './shared/infra/redux/startupScript';
import configureStore from './shared/infra/redux/configureStore';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const store = configureStore();
initialReduxStartupScript(store);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});



describe('getTopFiveVotedPosts', () => {
  it('should return the top 5 voted posts when given a list of popular posts', () => {
    // Arrange
    const popularPosts: Post[] = [
      {
        "slug": "1625886-asdasdasdadadsa",
        "title": "asdasdasdadadsa",
        "createdAt": "2023-10-05T12:54:13.000Z",
        "postAuthor": "teste_isep",
        "numComments": 0,
        "points": 1,
        "type": "text",
        "text": "<p>sdasdasdasdasdasdasd</p>",
        "link": "",
        "wasUpvotedByMe": false,
        "wasDownvotedByMe": false
      },
      {
        "slug": "2784535-1234567890",
        "title": "1234567890",
        "createdAt": "2023-10-05T12:53:10.000Z",
        "postAuthor": "teste_isep",
        "numComments": 0,
        "points": 4,
        "type": "text",
        "text": "<p>asdasdadsasdads</p>",
        "link": "",
        "wasUpvotedByMe": false,
        "wasDownvotedByMe": false
      },
      {
        "slug": "2838614-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "title": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "createdAt": "2023-10-05T12:54:38.000Z",
        "postAuthor": "teste_isep",
        "numComments": 0,
        "points": 5,
        "type": "text",
        "text": "<p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>",
        "link": "",
        "wasUpvotedByMe": false,
        "wasDownvotedByMe": false
      },
      {
        "slug": "1548859-asdasdasdasdasdddddddddddddddd",
        "title": "asdasdasdasdasdddddddddddddddd",
        "createdAt": "2023-10-05T12:54:22.000Z",
        "postAuthor": "teste_isep",
        "numComments": 0,
        "points": 3,
        "type": "text",
        "text": "<p>ddddddddddddddddddddddddd</p>",
        "link": "",
        "wasUpvotedByMe": false,
        "wasDownvotedByMe": false
      },
      {
        "slug": "1675274-qqqqqqqqqqqqqqqqqqqqqqqqq",
        "title": "qqqqqqqqqqqqqqqqqqqqqqqqq",
        "createdAt": "2023-10-05T12:54:29.000Z",
        "postAuthor": "teste_isep",
        "numComments": 0,
        "points": 2,
        "type": "text",
        "text": "<p>qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</p>",
        "link": "",
        "wasUpvotedByMe": false,
        "wasDownvotedByMe": false
      },
      {
        "slug": "8442672-asdadsasd",
        "title": "asdadsasd",
        "createdAt": "2023-10-05T12:53:19.000Z",
        "postAuthor": "teste_isep",
        "numComments": 0,
        "points": 0,
        "type": "text",
        "text": "<p>asdasdasdadad</p>",
        "link": "",
        "wasUpvotedByMe": false,
        "wasDownvotedByMe": false
      }
    ];

    // Act
    const result = getTopFivePosts(popularPosts);

    // Assert
    expect(result).toHaveLength(5);
    expect(result[0]).toEqual({
      title: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      points: 5,
      slug: '2838614-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      createdAt: '2023-10-05T12:54:38.000Z',
      postAuthor: 'teste_isep',
      numComments: 0,
      type: 'text',
      text: '<p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>',
      link: '',
      wasUpvotedByMe: false,
      wasDownvotedByMe: false
    });
    expect(result[1]).toEqual({
      title: '1234567890',
      points: 4,
      slug: '2784535-1234567890',
      createdAt: '2023-10-05T12:53:10.000Z',
      postAuthor: 'teste_isep',
      numComments: 0,
      type: 'text',
      text: '<p>asdasdadsasdads</p>',
      link: '',
      wasUpvotedByMe: false,
      wasDownvotedByMe: false
    });
    expect(result[2]).toEqual({
      title: "asdasdasdasdasdddddddddddddddd",
      points: 3,
      slug: '1548859-asdasdasdasdasdddddddddddddddd',
      createdAt: '2023-10-05T12:54:22.000Z',
      postAuthor: 'teste_isep',
      numComments: 0,
      type: 'text',
      text: '<p>ddddddddddddddddddddddddd</p>',
      link: '',
      wasUpvotedByMe: false,
      wasDownvotedByMe: false
    });
    expect(result[3]).toEqual({
      title: "qqqqqqqqqqqqqqqqqqqqqqqqq",
      points: 2,
      slug: '1675274-qqqqqqqqqqqqqqqqqqqqqqqqq',
      createdAt: '2023-10-05T12:54:29.000Z',
      postAuthor: 'teste_isep',
      numComments: 0,
      type: 'text',
      text: '<p>qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</p>',
      link: '',
      wasUpvotedByMe: false,
      wasDownvotedByMe: false
    });
    expect(result[4]).toEqual({
      title: 'asdasdasdadadsa',
      points: 1,
      slug: '1625886-asdasdasdadadsa',
      createdAt: '2023-10-05T12:54:13.000Z',
      postAuthor: 'teste_isep',
      numComments: 0,
      type: 'text',
      text: '<p>sdasdasdasdasdasdasd</p>',
      link: '',
      wasUpvotedByMe: false,
      wasDownvotedByMe: false
    });

  });

  it('should return an empty array when given an empty list of popular posts', () => {
    // Arrange
    const popularPosts: Post[] = [];

    // Act
    const result = getTopFivePosts(popularPosts);

    // Assert
    expect(result).toHaveLength(0);
  });

  it('should return the same list of popular posts when given a list with less than 5 posts', () => {
    // Arrange
    const popularPosts: Post[] = [
      {
        "slug": "2838614-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "title": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "createdAt": "2023-10-05T12:54:38.000Z",
        "postAuthor": "teste_isep",
        "numComments": 0,
        "points": 5,
        "type": "text",
        "text": "<p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>",
        "link": "",
        "wasUpvotedByMe": false,
        "wasDownvotedByMe": false
      },
      {
        "slug": "2784535-1234567890",
        "title": "1234567890",
        "createdAt": "2023-10-05T12:53:10.000Z",
        "postAuthor": "teste_isep",
        "numComments": 0,
        "points": 4,
        "type": "text",
        "text": "<p>asdasdadsasdads</p>",
        "link": "",
        "wasUpvotedByMe": false,
        "wasDownvotedByMe": false
      }
    ];

    // Act
    const result = getTopFivePosts(popularPosts);

    // Assert
    expect(result).toEqual(popularPosts);
  });
});




describe('getRowStyle', () => {
  test('should return style with green background when createdAt is today', () => {
    const today = new Date();
    expect(changeBackgroundColorForToday(today)).toEqual({
      backgroundColor: '#B2F77D'
    });
  });

  test('should return style with white background when createdAt is not today', () => {
    const otherDate = new Date(2021, 0, 1); // January 1, 2021
    expect(changeBackgroundColorForToday(otherDate)).toEqual({
      backgroundColor: 'white'
    });
  });
});


