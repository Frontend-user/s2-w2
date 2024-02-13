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
exports.commentPostIdExistValidation = exports.commentContentValidation = void 0;
const express_validator_1 = require("express-validator");
const posts_query_repository_1 = require("../../posts/posts-query/posts-query-repository");
exports.commentContentValidation = (0, express_validator_1.body)('content').trim().isLength({ min: 20, max: 300 }).withMessage({
    message: 'content is wrong',
    field: 'content'
});
exports.commentPostIdExistValidation = (0, express_validator_1.param)('postId').custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistPostId = yield posts_query_repository_1.postsQueryRepository.getPostById(value);
    if (isExistPostId) {
        return true;
    }
    else {
        throw new Error('Wrong postId');
    }
})).withMessage({
    message: 'Wrong postId',
    field: 'postId'
});
//# sourceMappingURL=comments-validation.js.map