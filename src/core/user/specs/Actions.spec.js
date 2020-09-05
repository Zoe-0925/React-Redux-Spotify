import { saveAccessToken, SAVE_ACCESS_TOKEN } from "../Actions"

describe('saveAccessToken', () => {
    it('should create an action', () => {
        const token = "token"
        let action = saveAccessToken(token)
        expect(action).toEqual({
            type: SAVE_ACCESS_TOKEN,
            accessToken: token
        });
    })
})
