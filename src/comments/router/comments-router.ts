import {Request, Response, Router} from "express";
import {BlogViewType} from "../../common/types/blog-type";
import {blogsQueryRepository} from "../../blogs/blogs-query/blogs-query-repository";
import {PostCreateType, PostViewType} from "../../common/types/post-type";
import {postsService} from "../../posts/domain/posts-service";
import {ObjectId} from "mongodb";
import {postsQueryRepository} from "../../posts/posts-query/posts-query-repository";
import {HTTP_STATUSES} from "../../common/constants/http-statuses";
import {postsRouter, postValidators} from "../../posts/router/posts-router";
import {commentsService} from "../service/comments-service";
import {authorizationMiddleware, bearerAuthMiddleware} from "../../validation/auth-validation";
import {commentQueryRepository} from "../query-repository/comment-query-repository";
import {postIdValidation} from "../../validation/posts-validation";
import {commentContentValidation} from "../validation/comments-validation";

export const commentsRouter = Router({})

commentsRouter.put('/:commentId',
    bearerAuthMiddleware,
    commentContentValidation,
    // ...postValidators,
    async (req: Request, res: Response) => {
        try {
            const response: boolean = await postsService.updatePost(new ObjectId(req.params.commentId), req.body.content)
            res.sendStatus(response ? HTTP_STATUSES.NO_CONTENT_204 : HTTP_STATUSES.NOT_FOUND_404)

        } catch (error) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
    })


commentsRouter.delete('/:commentId',
    bearerAuthMiddleware,
    async (req: Request, res: Response) => {
        try {
            const response: boolean = await postsService.deletePost(new ObjectId(req.params.commentId))
            res.sendStatus(response ? HTTP_STATUSES.NO_CONTENT_204 : HTTP_STATUSES.NOT_FOUND_404)
        } catch (error) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
    })

commentsRouter.get('/:id', async (req: Request, res: Response) => {
    const comment = await commentQueryRepository.getCommentById(new ObjectId(req.params.id))
    return comment ? res.send(comment) : res.sendStatus(404)
})