import { Request, Response } from 'express';
import PostModel from './post.model';
import CommentModel, { IComment } from './comment.model';
import * as yup from 'yup';
import validationWording from '../../constants/validationWording';
import User from '../user/user.model';
import NotFoundError from '../../interfaces/NotFoundError';
import recurseComment from './helpers/recureseComment';

export const getAll = async (req: Request, res: Response) => {
  const allPost = await PostModel.find({})
    .sort({
      points: 'descending'
    })
    .populate('comments');

  res.json({
    message: 'Success get all post',
    data: allPost
  });
};

export const getPost = async (req: Request, res: Response) => {
  const validationParams = yup.object().shape({
    postId: yup.string().required(validationWording.required('postId'))
  });
  const validatedParams = validationParams.validateSync(req.params);

  const post = await PostModel.findOne({
    _id: validatedParams.postId
  });

  res.json({
    data: post,
    message: 'successfully get post'
  });
};

export const upsertPoint = async (req: Request, res: Response) => {
  const validationParams = yup.object().shape({
    postId: yup.string().required(validationWording.required('postId'))
  });
  const validation = yup.object().shape({
    type: yup
      .mixed<'increment' | 'decrement'>()
      .oneOf(['increment', 'decrement'])
      .required(validationWording.required('type'))
  });

  const validatedBody = validation.validateSync(req.body);
  const validatedParams = validationParams.validateSync(req.params);

  const currentPost = await PostModel.findOne({
    _id: validatedParams.postId
  });
  if (!currentPost) {
    throw new NotFoundError(validationWording.notFound('Post'), 'Post');
  }
  if (validatedBody.type === 'increment') {
    currentPost.points = currentPost.points + 1;
  } else {
    currentPost.points = currentPost.points - 1;
  }
  currentPost.save();
  res.json({
    data: currentPost,
    message: `success ${validatedBody.type}ing points`
  });
};

export const create = async (req: Request, res: Response) => {
  const validation = yup.object().shape({
    content: yup.string().required(validationWording.required('content'))
  });

  const validatedBody = validation.validateSync(req.body);
  const user = res.locals.decoded.data;

  const currentUser = await User.findOne({
    _id: user._id
  });

  if (!currentUser) {
    throw new NotFoundError('User not found', 'user');
  }

  const postItem = await PostModel.create({
    ...validatedBody,
    user: user._id
  });

  currentUser.posts.push(postItem);
  await currentUser.save();

  res.json({
    data: postItem,
    message: 'Successfully create post'
  });
};

export const comment = async (req: Request, res: Response) => {
  const validation = yup.object().shape({
    message: yup.string().required(validationWording.required('message'))
  });
  const paramsValidation = yup.object().shape({
    postId: yup.string().required(validationWording.required('postId'))
  });

  const validatedBody = validation.validateSync(req.body);
  const validatedParams = paramsValidation.validateSync(req.params);

  const user = res.locals.decoded.data;
  const currentPost = await PostModel.findOne({
    _id: validatedParams.postId
  });
  if (!currentPost) {
    throw new NotFoundError(validationWording.notFound('Post'), 'Post');
  }

  const comment = await CommentModel.create({
    post: validatedParams.postId,
    message: validatedBody.message,
    user: user._id
  });

  currentPost.comments.push(comment._id);
  await currentPost.save();

  res.json({
    data: comment,
    message: 'Successfully create comment'
  });
};

export const getComments = async (req: Request, res: Response) => {
  const paramsValidation = yup.object().shape({
    postId: yup.string().required(validationWording.required('postId'))
  });
  const validatedParams = paramsValidation.validateSync(req.params);
  const comments = await CommentModel.find({
    post: validatedParams.postId,
    level: 0
  }).sort({
    points: 'descending'
  });

  const result = await recurseComment(comments);

  res.json({
    data: result,
    message: 'successfully get comments'
  });
};

export const createSubComment = async (req: Request, res: Response) => {
  const paramsValidation = yup.object().shape({
    postId: yup.string().required(validationWording.required('postId')),
    commentId: yup.string().required(validationWording.required('commentId'))
  });

  const bodyValidation = yup.object().shape({
    message: yup.string().required(validationWording.required('message'))
  });
  const user = res.locals.decoded.data;

  const validatedParams = await paramsValidation.validate(req.params);
  const validatedBody = await bodyValidation.validate(req.body);

  const currentComment = await CommentModel.findOne({
    _id: validatedParams.commentId
  });

  const currentPost = await PostModel.findOne({
    _id: validatedParams.postId
  });

  if (!currentComment) {
    throw new NotFoundError(validationWording.notFound('Comment'), 'Comment');
  }
  if (!currentPost) {
    throw new NotFoundError(validationWording.notFound('Post'), 'Post');
  }

  const comment = await CommentModel.create({
    user: user._id,
    message: validatedBody.message,
    post: validatedParams.postId,
    level: currentComment.level + 1
  });

  currentComment.comments.push(comment._id);
  await currentComment.save();

  currentPost.comments.push(comment._id);
  await currentPost.save();

  res.json({
    data: comment,
    message: 'success creating sub comment'
  });
};

export const upsertPointToComment = async (req: Request, res: Response) => {
  const paramsValidation = yup.object().shape({
    commentId: yup.string().required(validationWording.required('commentId'))
  });
  const bodyValidation = yup.object().shape({
    type: yup
      .mixed<'increment' | 'decrement'>()
      .oneOf(['decrement', 'increment'])
      .required(validationWording.required('type'))
  });

  const validatedParams = paramsValidation.validateSync(req.params);
  const validatedBody = bodyValidation.validateSync(req.body);

  const currentComment = await CommentModel.findOne({
    _id: validatedParams.commentId
  });

  if (!currentComment) {
    throw new NotFoundError(validationWording.notFound('comment'), 'comment');
  }

  if (validatedBody.type === 'increment') {
    currentComment.points = currentComment.points + 1;
  } else {
    currentComment.points = currentComment.points - 1;
  }
  await currentComment.save();

  res.json({
    message: 'Comment Saved',
    data: currentComment
  });
};
