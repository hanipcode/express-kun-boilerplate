import { Request, Response } from 'express';
import PostModel from './post.model';
import CommentModel, { IComment } from './comment.model';
import * as yup from 'yup';
import validationWording from '../../constants/validationWording';
import User from '../user/user.model';
import NotFoundError from '../../interfaces/NotFoundError';

export const getAll = async (req: Request, res: Response) => {
  const allPost = await PostModel.find({}).populate('comments');

  res.json({
    message: 'Success get all post',
    data: allPost
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
};

export const create = async (req: Request, res: Response) => {
  const validation = yup.object().shape({
    content: yup.string().required(validationWording.required('content'))
  });

  const validatedBody = validation.validateSync(req.body);
  const user = res.locals.decoded;

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

  const user = res.locals.decoded;
  const currentPost = await PostModel.findOne({
    _id: validatedParams.postId
  });
  if (!currentPost) {
    throw new NotFoundError(validationWording.notFound('Post'), 'Post');
  }

  const comment = await CommentModel.create({
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

export const createSubComment = async (req: Request, res: Response) => {
  const paramsValidation = yup.object().shape({
    postId: yup.string().required(validationWording.required('postId')),
    commentId: yup.string().required(validationWording.required('commentId'))
  });

  const bodyValidation = yup.object().shape({
    message: yup.string().required(validationWording.required('message'))
  });
  const user = res.locals.decoded;

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
