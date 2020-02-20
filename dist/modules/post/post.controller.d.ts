import { Request, Response } from 'express';
export declare const getAll: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) => Promise<void>;
export declare const getPost: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) => Promise<void>;
export declare const upsertPoint: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) => Promise<void>;
export declare const create: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) => Promise<void>;
export declare const comment: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) => Promise<void>;
export declare const getComments: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) => Promise<void>;
export declare const createSubComment: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) => Promise<void>;
export declare const upsertPointToComment: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) => Promise<void>;
