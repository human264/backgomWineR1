export interface LogInUserDto {
    email: string;
    password: string;
}

interface TokenDto {
    grantType: string;
    accessToken: string;
    refreshToken: string;
}

export interface LoginResponse {
    tokenDto: TokenDto;
    email: string;
    password: null;
    phoneNumber: null;
    emailValidKey: null;
    id: string;
}

export interface UserLogInData {
    email: string;
    id: string;
}