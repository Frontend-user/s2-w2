import {body, param} from "express-validator";
import {BlogViewType} from "../../common/types/blog-type";
import {blogsQueryRepository} from "../../blogs/blogs-query/blogs-query-repository";
import {ObjectId} from "mongodb";
import {postsQueryRepository} from "../../posts/posts-query/posts-query-repository";
import {PostViewType} from "../../common/types/post-type";

export const commentContentValidation = body('content').trim().isLength({min: 20, max: 300}).withMessage({
    message: 'content is wrong',
    field: 'content'
})


export const commentPostIdExistValidation = param('postId').custom(async (value, {req}) => {
    const isExistPostId: PostViewType | boolean = await postsQueryRepository.getPostById( value)
    if (isExistPostId) {
        return true
    } else {
        throw new Error('Wrong postId');
    }
}).withMessage({
    message: 'Wrong postId',
    field: 'postId'
})