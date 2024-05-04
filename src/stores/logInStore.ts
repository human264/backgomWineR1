import {defineStore} from "pinia";
import {UserLogInData} from "@/types/LogInUserDto.ts";


export const useLogInStore = defineStore('logInStore', {
    state: () => ({
        isLogIn: false,
        userData: {} as UserLogInData,  // 초기 상태를 명시적으로 비어있는 객체로 설정하고 타입 지정
        userImage: {} as String,
        tempUrl:{} as String
    }),
    actions: {
        updateLogInState(accessToken: string, refreshToken: string) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            this.isLogIn = !!accessToken && !!refreshToken;
        },

        updateLogOutState() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.userImage = "";
        },

        setUserData(userData: UserLogInData) {
            this.userData = userData;
        },

        setUserImage(userImageBase: String) {
            this.userImage = userImageBase;
        },

        setTempUrl(url: String) {
            this.tempUrl = url;
        },
    },
    getters: {
        getLogInState(state) {
            return state.isLogIn;
        },
        getCircleUrl(state) {
            return state.userImage;
        },
        getTempUrl(state) {
            return state.tempUrl;
        }
    }
});
