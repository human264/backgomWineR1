import apiClient from "@/api/login.ts";
import {ClubInfo} from "@/types/ClubInfo.ts";

export const fetchMyJoinedClubs = async (): Promise<ClubInfo[]> => {
    try {
        const response = await apiClient.get<ClubInfo[]>('/WineCommunity/myJoinedClubList');
        return response.data;
    } catch (error) {
        // 에러 핸들링, 필요에 따라 에러를 던지거나, 로그를 남기거나, 기본값을 반환할 수 있습니다.
        console.error('Failed to fetch clubs', error);
        throw error;
    }
};