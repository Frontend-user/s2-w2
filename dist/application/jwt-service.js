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
exports.jwtService = void 0;
const current_user_1 = require("./current-user");
const jwt = require('jsonwebtoken');
exports.jwtService = {
    createJWT(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield jwt.sign({ userId: userId }, '1', { expiresIn: '1h' });
            return token;
        });
    },
    checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield jwt.verify(token, '1');
                return result.userId;
            }
            catch (error) {
                console.error('Ошибка при проверке токена:', error);
                return;
            }
        });
    },
    updateCurrentUser(userId, userLogin) {
        current_user_1.currentUser.userId = userId;
        current_user_1.currentUser.userLogin = userLogin;
        return;
    }
};
//# sourceMappingURL=jwt-service.js.map