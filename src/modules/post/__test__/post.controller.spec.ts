import * as postController from '../post.controller';
import { mockRequest, mockResponse } from '../../../utils/testUtils';
import Post from '../post.model';
import Comment from '../comment.model';
import User from '../../user/user.model';
import { ValidationError } from 'yup';
import validationWording from '../../../constants/validationWording';
import testConstants from '../../../constants/testConstants';
import PostModel from '../post.model';
import NotFoundError from '../../../interfaces/NotFoundError';

jest.mock('../post.model.ts');
jest.mock('../comment.model.ts');
jest.mock('../../user/user.model.ts');

describe('POST Controller', () => {
  let req: any;
  let res: any;
  beforeEach(() => {
    jest.resetAllMocks();
    req = mockRequest();
    res = mockResponse();
    res.locals.decoded.data = testConstants.userDocument;
    const userSaveSpy = jest.fn();
    const postPushSpy = jest.fn();
    const userDocSpy = {
      ...testConstants.userDocument,
      posts: {
        push: postPushSpy
      },
      save: userSaveSpy
    };
    (User.findOne as jest.Mock).mockReturnValue(userDocSpy);

    (Comment.create as jest.Mock).mockReturnValue({
      _id: '12341521312'
    });
  });

  describe('Get All Post', () => {
    it('can get all post', async () => {
      const resBody = {
        data: [
          {
            user: 'usearlnro123 arnold',
            comments: [{ message: 'ini comments' }],
            content: 'Hi dari content'
          }
        ],
        message: 'Success get all post'
      };
      const populateFn = jest.fn();
      (Post.find as jest.Mock).mockImplementation(() => {
        return {
          sort: () => ({
            populate: populateFn.mockImplementation(() => resBody.data)
          })
        };
      });
      await postController.getAll(req, res);

      expect(populateFn).toBeCalled();
      expect(populateFn).toBeCalledWith('comments');

      expect(res.json).toBeCalled();
      expect(res.json).toBeCalledWith({
        data: resBody.data,
        message: expect.any(String)
      });
    });
  });

  describe('Create Post', () => {
    it('error on empty content in body', async () => {
      req.body = {};

      try {
        await postController.create(req, res);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e.message).toEqual(validationWording.required('content'));
      }
    });

    it('call Post.create with post content', async () => {
      res.locals.decoded.data = testConstants.userDocument;
      const content = 'menjelang pagiku';
      req.body = {
        content
      };

      const expectedParam = {
        user: testConstants.userDocument._id,
        content
      };

      const postId = '2ip3jeiojeo';

      (PostModel.create as jest.Mock).mockImplementation(() => ({
        _id: '2ip3jeiojeo',
        ...expectedParam
      }));

      await postController.create(req, res);

      expect(PostModel.create).toBeCalled();
      expect(PostModel.create).toBeCalledWith(expectedParam);

      expect(res.json).toBeCalled();
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            _id: expect.any(String),
            user: testConstants.userDocument._id,
            content
          }),
          message: expect.any(String)
        })
      );
    });

    it('assign the newly created post to user', async () => {
      res.locals.decoded.data = testConstants.userDocument;
      const content = 'menjelang pagiku';
      req.body = {
        content
      };

      const expectedParam = {
        user: testConstants.userDocument._id,
        content
      };

      const postId = '2ip3jeiojeo';
      const userSaveSpy = jest.fn();
      const postPushSpy = jest.fn();
      const userDocSpy = {
        ...testConstants.userDocument,
        posts: {
          push: postPushSpy
        },
        save: userSaveSpy
      };
      (User.findOne as jest.Mock).mockReturnValue(userDocSpy);

      (PostModel.create as jest.Mock).mockImplementation(() => ({
        _id: postId,
        ...expectedParam
      }));

      await postController.create(req, res);

      expect(User.findOne).toBeCalled();
      expect(User.findOne).toBeCalledWith({
        _id: testConstants.userDocument._id
      });

      expect(userSaveSpy).toBeCalled();
      expect(postPushSpy).toBeCalled();
      expect(postPushSpy).toBeCalledWith({
        _id: postId,
        ...expectedParam
      });
    });
  });

  describe('Commenting', () => {
    describe('Negative Test', () => {
      it('error on empty message', async () => {
        res.locals.decoded.data = testConstants.userDocument;

        req.body = {};

        try {
          await postController.comment(req, res);
        } catch (error) {
          expect(error).toBeInstanceOf(ValidationError);
          expect(error.message).toEqual(validationWording.required('message'));
        }
      });

      it('error if no postId in the params', async () => {
        res.locals.decoded.data = testConstants.userDocument;

        req.params = {};

        req.body = {
          message: 'test test'
        };

        expect(postController.comment(req, res)).rejects.toBeTruthy();
        try {
          await postController.comment(req, res);
        } catch (error) {
          expect(error).toBeInstanceOf(ValidationError);
          expect(error.message).toEqual(validationWording.required('postId'));
        }
      });
    });

    describe('Positive Test', () => {
      const message = 'This is Message';
      let pushSpy: any;
      let saveSpy: any;
      const postId = '123131212e3';

      beforeEach(() => {
        (Comment.create as jest.Mock).mockImplementation(() => {
          return {
            _id: '123123123',
            user: testConstants.userDocument._id,
            message
          };
        });
        pushSpy = jest.fn();
        saveSpy = jest.fn();
        (Post.findOne as jest.Mock).mockImplementation(() => {
          return {
            _id: postId,
            comments: {
              push: jest.fn()
            },
            save: jest.fn()
          };
        });
      });
      it('call Comment.create with user id and message', async () => {
        res.locals.decoded.data = testConstants.userDocument;

        req.params = {
          postId: '1231312'
        };
        req.body = {
          message
        };

        await postController.comment(req, res);

        expect(Comment.create).toBeCalled();
        expect(Comment.create).toBeCalledWith({
          user: testConstants.userDocument._id,
          post: expect.any(String),
          message
        });
      });

      it('return response with newly created comment', async () => {
        res.locals.decoded.data = testConstants.userDocument;

        req.body = {
          message
        };

        req.params = {
          postId: '1231312'
        };
        (Comment.create as jest.Mock).mockImplementation(() => {
          return {
            user: testConstants.userDocument._id,
            message
          };
        });
        await postController.comment(req, res);

        expect(res.json).toBeCalled();
        expect(res.json).toBeCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              user: testConstants.userDocument._id,
              message
            }),
            message: expect.any(String)
          })
        );
      });
      it('get the post object', async () => {
        res.locals.decoded.data = testConstants.userDocument;

        req.body = {
          message
        };

        req.params = {
          postId: postId
        };
        (Comment.create as jest.Mock).mockImplementation(() => {
          return {
            _id: '123123123',
            user: testConstants.userDocument._id,
            message
          };
        });

        await postController.comment(req, res);

        expect(Post.findOne).toBeCalled();
        expect(Post.findOne).toBeCalledWith({
          _id: postId
        });
      });
      it('save the comment to the post object', async () => {
        res.locals.decoded.data = testConstants.userDocument;

        req.body = {
          message
        };

        req.params = {
          postId: '1231312'
        };
        pushSpy = jest.fn();
        saveSpy = jest.fn();
        (Post.findOne as jest.Mock).mockImplementation(() => {
          return {
            _id: postId,
            comments: {
              push: pushSpy
            },
            save: saveSpy
          };
        });
        (Comment.create as jest.Mock).mockImplementation(() => {
          return {
            _id: '123123123',
            user: testConstants.userDocument._id,
            message
          };
        });

        await postController.comment(req, res);

        expect(pushSpy).toBeCalled();
        expect(pushSpy).toBeCalledWith('123123123');
        expect(saveSpy).toBeCalled();
      });
    });
  });

  describe('Sub Comment', () => {
    let postId: any;
    let saveSpy: any;
    let pushSpy: any;
    beforeEach(() => {
      postId = '12312313';
      pushSpy = jest.fn();
      saveSpy = jest.fn();
      (Post.findOne as jest.Mock).mockReturnValue({
        _id: postId,
        comments: {
          push: pushSpy
        },
        save: saveSpy
      });
    });
    it('commentId should be supplied from the param', async () => {
      res.params = {
        postId
      };
      req.body = {
        message: 'yuhuaahj'
      };
      expect(postController.createSubComment(req, res)).rejects.toBeTruthy();
      try {
        await postController.createSubComment(req, res);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(validationWording.required('commentId'));
      }
    });

    it('should have message in the body', async () => {
      req.params = {
        postId,
        commentId: '231kajsnd01'
      };
      req.body = {};
      expect(postController.createSubComment(req, res)).rejects.toBeTruthy();

      try {
        await postController.createSubComment(req, res);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toEqual(validationWording.required('message'));
      }
    });

    it('call Comment.findOne with the commentId as params', async () => {
      res.locals.decoded.data = testConstants.userDocument;
      req.params = {
        postId,
        commentId: '31123131'
      };
      req.body = {
        message: 'this is the message'
      };

      (Comment.findOne as jest.Mock).mockReturnValue({
        _id: '231312312',
        message: 'comment message',
        level: 0,
        comments: {
          push: jest.fn()
        },
        save: jest.fn()
      });

      await postController.createSubComment(req, res);

      expect(Comment.findOne).toBeCalled();
      expect(Comment.findOne).toBeCalledWith({
        _id: req.params.commentId
      });
    });

    it('call comment.create with message and comment level greater than previous comment', async () => {
      res.locals.decoded.data = testConstants.userDocument;
      req.params = {
        postId,
        commentId: '31123131'
      };
      req.body = {
        message: 'this is the message'
      };

      (Comment.findOne as jest.Mock).mockReturnValue({
        _id: '231312312',
        message: 'comment message',
        level: 1,
        comments: {
          push: jest.fn()
        },
        save: jest.fn()
      });

      await postController.createSubComment(req, res);

      expect(Comment.create).toBeCalled();
      expect(Comment.create).toBeCalledWith({
        user: testConstants.userDocument._id,
        post: expect.any(String),
        message: req.body.message,
        level: 2
      });
    });

    it('error if comment not found', async () => {
      res.locals.decoded.data = testConstants.userDocument;
      req.params = {
        postId,
        commentId: '31123131'
      };
      req.body = {
        message: 'this is the message'
      };

      (Comment.findOne as jest.Mock).mockReturnValue(null);

      expect(postController.createSubComment(req, res)).rejects.toBeTruthy();

      try {
        await postController.createSubComment(req, res);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.message).toEqual(validationWording.notFound('Comment'));
      }
    });

    it('call push and save on parent comments', async () => {
      res.locals.decoded.data = testConstants.userDocument;
      req.params = {
        postId,
        commentId: '31123131'
      };
      req.body = {
        message: 'this is the message'
      };

      const pushSpy = jest.fn();
      const saveSpy = jest.fn();
      (Comment.findOne as jest.Mock).mockReturnValue({
        _id: '231312312',
        message: 'comment message',
        level: 1,
        comments: {
          push: pushSpy
        },
        save: saveSpy
      });
      const createdId = '12341521312';

      await postController.createSubComment(req, res);

      expect(pushSpy).toBeCalled();
      expect(pushSpy).toBeCalledWith(createdId);
      expect(saveSpy).toBeCalled();
    });

    it('call res.json with created sub comment', async () => {
      res.locals.decoded.data = testConstants.userDocument;
      req.params = {
        postId,
        commentId: '31123131'
      };
      req.body = {
        message: 'this is the message'
      };

      const pushSpy = jest.fn();
      const saveSpy = jest.fn();
      (Comment.findOne as jest.Mock).mockReturnValue({
        _id: '231312312',
        message: 'comment message',
        level: 1,
        comments: {
          push: pushSpy
        },
        save: saveSpy
      });
      const createdId = '12341521312';

      (Comment.create as jest.Mock).mockReturnValue({
        _id: '12341521312',
        message: 'this is the message'
      });

      await postController.createSubComment(req, res);

      expect(res.json).toBeCalled();
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            message: 'this is the message'
          }),
          message: expect.any(String)
        })
      );
    });

    it('add comment to the post object', async () => {
      res.locals.decoded.data = testConstants.userDocument;
      req.params = {
        postId,
        commentId: '31123131'
      };
      req.body = {
        message: 'this is the message'
      };

      const pushSpy = jest.fn();
      const saveSpy = jest.fn();
      (Comment.findOne as jest.Mock).mockReturnValue({
        _id: '231312312',
        message: 'comment message',
        level: 1,
        comments: {
          push: pushSpy
        },
        save: saveSpy
      });
      const createdId = '12341521312';

      (Comment.create as jest.Mock).mockReturnValue({
        _id: '12341521312',
        message: 'this is the message'
      });

      await postController.createSubComment(req, res);
      expect(Post.findOne).toBeCalled();
      expect(Post.findOne).toBeCalledWith({
        _id: postId
      });

      expect(pushSpy).toBeCalled();
      expect(pushSpy).toBeCalledWith('12341521312');
      expect(saveSpy).toBeCalled();
    });
  });

  describe('upsert point', () => {
    it('should error if no type provided', async () => {
      req.body = {};

      expect(postController.upsertPoint(req, res)).rejects.toBeTruthy();

      try {
        await postController.upsertPoint(req, res);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toEqual(validationWording.required('type'));
      }
    });

    it('should throw validation error if invalid type provided', async () => {
      req.body = {
        type: 'whatever'
      };

      expect(postController.upsertPoint(req, res)).rejects.toBeTruthy();

      try {
        await postController.upsertPoint(req, res);
      } catch (error) {
        console.log(error.message);
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    it('is able to save to the post object', async () => {
      const postId = '12312313';
      req.params = {
        postId,
        commentId: '123123123'
      };
      req.body = {
        type: 'increment',
        message: 'durara'
      };
      const pushSpy = jest.fn();
      const saveSpy = jest.fn();
      (Comment.findOne as jest.Mock).mockReturnValue({
        _id: '123131321',
        message: 'parent',
        comments: {
          push: jest.fn()
        },
        save: jest.fn()
      });
      (Comment.create as jest.Mock).mockReturnValue({
        _id: '12313123131131d',
        message: 'parent',
        comments: {
          push: jest.fn()
        },
        save: jest.fn()
      });
      (Post.findOne as jest.Mock).mockReturnValue({
        _id: postId,
        points: 0,
        comments: {
          push: pushSpy
        },
        save: saveSpy
      });

      await postController.upsertPoint(req, res);

      expect(Post.findOne).toBeCalled();
      expect(Post.findOne).toBeCalledWith({
        _id: postId
      });
      expect(saveSpy).toBeCalled();
    });
  });
});
