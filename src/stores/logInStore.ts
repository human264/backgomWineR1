import {defineStore} from "pinia";
import {UserLogInData} from "@/api/dto/LogInUserDto";


export const useLogInStore = defineStore('logInStore', {
    state: () => ({
        isLogIn: false,
        userData: {} as UserLogInData,  // 초기 상태를 명시적으로 비어있는 객체로 설정하고 타입 지정

    }),
    actions: {
        updateLogInState(accessToken: string, refreshToken: string) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            this.isLogIn = !!accessToken && !!refreshToken;
        },
        setUserData(userData: UserLogInData) {
            this.userData = userData;
        }
    },
    getters: {
        getLogInState: (state) => state.isLogIn,

    }
});