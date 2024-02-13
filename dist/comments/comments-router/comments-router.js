"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = require("express");
const posts_service_1 = require("../../posts/domain/posts-service");
const mongodb_1 = require("mongodb");
const http_statuses_1 = require("../../common/constants/http-statuses");
const posts_router_1 = require("../../posts/router/posts-router");
const comment_query_repository_1 = require("../comment-query-repository/comment-query-repository");
exports.commentsRouter = (0, express_1.Router)({});
exports.commentsRouter.put('/:id', ...posts_router_1.postValidators, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let postDataToUpdate = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId
    };
    try {
        const response = yield posts_service_1.postsService.updatePost(new mongodb_1.ObjectId(req.params.id), postDataToUpdate);
        res.sendStatus(response ? http_statuses_1.HTTP_STATUSES.NO_CONTENT_204 : http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    catch (error) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}));
exports.commentsRouter.delete('/:id', 
// authorizationMiddleware,
// postIdValidation,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield posts_service_1.postsService.deletePost(new mongodb_1.ObjectId(req.params.id));
        res.sendStatus(response ? http_statuses_1.HTTP_STATUSES.NO_CONTENT_204 : http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    catch (error) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}));
exports.commentsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_query_repository_1.commentQueryRepository.getCommentById(new mongodb_1.ObjectId(req.params.id));
    return comment ? res.send(comment) : res.sendStatus(404);
}));
//# sourceMappingURL=router.js.map