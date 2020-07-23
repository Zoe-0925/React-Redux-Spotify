import { getToken } from "../Selectors"

const state = {
    UserReducer: {
        accessToken: "token"
    }
}

describe('getToken', () => {
    it('should return the access token', () => {
        let action = getToken(state);
        expect(action).toBe("token");
    })
})
