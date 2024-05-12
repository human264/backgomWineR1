import axios from "axios";
import {LoginResponse, LogInUserDto} from "@/types/LogInUserDto.ts";
import {useLogInStore} from "@/stores/logInStore.ts";
import { Router } from 'vue-router';


const apiClient = axios.create({
    // baseURL: "http://backgom.iptime.org:48088/api",
    // baseURL: `${process.env.VITE_APP_API_URL}/api`,
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`,
    // baseURL: `/api`,

    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 재요청 플래그 설정
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                // Refresh token을 이용해 access token 갱신 요청
                const res = await apiClient.post('/auth/refresh', { refreshToken });
                const { accessToken } = res.data;
                localStorage.setItem('accessToken', accessToken);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                return apiClient(originalRequest); // 재요청 수행
            } catch (refreshError) {
                console.error('Refresh token error:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const logInApi = async (logInUserData: LogInUserDto): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<LoginResponse>('/auth/signin', logInUserData);
        const { tokenDto } = response.data;

        localStorage.setItem('accessToken', tokenDto.accessToken);
        localStorage.setItem('refreshToken', tokenDto.refreshToken);

        return response.data;
    } catch (error: any) {
        console.error('Login error:', error.response?.data || error.message);

        throw error;
    }
}

export const fetchUserImage = async (): Promise<string> => {
    try {
        const response = await apiClient.get<Blob>('/auth/getUserBasePicture', { responseType: 'blob' });
        const dataUrl = await blobToDataUrl(response.data);
        return dataUrl;
    } catch (error: any) {
        console.error('이미지 가져오기 오류:', error.response?.data || error.message);
        throw error;
    }
}

function blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Blob을 데이터 URL로 변환하는 데 실패했습니다.'));
        reader.readAsDataURL(blob);
    });
}

export const joinInApi = async (formData: FormData): Promise<any> => {
    try {
        const response = await apiClient.post('/auth/joinInWithOutPhoto', formData);
        console.log('Server Response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Login error:', error.response?.data || error.message);

        throw error;
    }
}

export const joinInApi2 = async (formData: FormData): Promise<any> => {
    try {
        const response = await apiClient.post('/auth/joinIn', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Server Response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('JoinIn error:', error.response?.data || error.message);
        throw error;
    }
}

export const uploadImageUrls = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/auth/uploadImageUrls', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Server response:', response.data);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
};

export function logout(router: Router) {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Axios 기본 헤더에서 Authorization 제거
    axios.defaults.headers.common['Authorization'] = undefined;

    const store = useLogInStore();
    store.updateLogOutState()
    router.push({ name: 'LogIn' }); // 직접 라우터 인스턴스 사용
}

export default apiClient;
