import {AuthType} from "../auth/auth-types/auth-types";
import {currentUser} from "./current-user";
import {UserViewType} from "../users/types/user-types";

const jwt = require('jsonwebtoken')
export const jwtService = {
    async createJWT(userId: any) {
        const token = await jwt.sign({userId: userId}, '1', {expiresIn: '1h'})
        return token
    },
    async checkToken(token: string) {
        try {
            const result: any = await jwt.verify(token, '1');
            return result.userId
        } catch (error) {
            console.error('Ошибка при проверке токена:', error);
            return
        }
    },
     updateCurrentUser(userId: string, userLogin: string) {
        currentUser.userId = userId
        currentUser.userLogin = userLogin
        return
    }
}

