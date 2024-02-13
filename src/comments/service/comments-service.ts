import {commentsRepository} from "../repository/comments-repository";
import {CommentCreateType, CommentEntity} from "../types/comment-type";
import {currentUser} from "../../application/current-user";
import {changeIdFormat} from "../../common/custom-methods/change-id-format";

export const commentsService = {
    async createComment(comment: string, postId: string) {
        const newComment: CommentCreateType = {
            content: comment,
            postId: postId,
            commentatorInfo: {
                userId: currentUser.userId,
                userLogin: currentUser.userLogin
            },
            createdAt: new Date().toISOString()
        }
        const response = await commentsRepository.createComment(newComment)
        return response
    }
}