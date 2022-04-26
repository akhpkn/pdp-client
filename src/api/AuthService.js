import {request, ApiBaseUrl} from "./ApiUtils";

export default class AuthService {

    static signUp(signUpRequest) {
        return request({
            url: ApiBaseUrl + "/api/v1/auth/signup",
            method: "POST",
            body: JSON.stringify(signUpRequest)
        })
    }

    static signIn(signInRequest) {
        return request({
            url: ApiBaseUrl + "/api/v1/auth/signin",
            method: "POST",
            body: JSON.stringify(signInRequest)
        })
    }
}