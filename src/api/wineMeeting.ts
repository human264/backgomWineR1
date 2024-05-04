import apiClient from "@/api/login.ts";
import {ClubInfo, ClubMeetingCreate, MeetingJoinInDto, MeetingTableDto, WineInfo} from "@/types/ClubInfo.ts";
import {DIClubInfo} from "@/types/DIClubInfo.ts";
import {ElNotification} from "element-plus";

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

export const findClubsToJoin = async (): Promise<DIClubInfo[]> => {
    try {
        const response = await apiClient.get<DIClubInfo[]>('/WineCommunity/FindToJoin');
        return response.data;
    } catch (error) {
        // 에러 핸들링, 필요에 따라 에러를 던지거나, 로그를 남기거나, 기본값을 반환할 수 있습니다.
        console.error('Failed to fetch clubs', error);
        throw error;
    }
};

export const joinInTheClubApi = async (id: string): Promise<any> => {
    try {
        const response = await apiClient.post('/WineCommunity/ClubJoinIn',  id);
        return response.data;
    } catch (error) {
        // 에러 핸들링, 필요에 따라 에러를 던지거나, 로그를 남기거나, 기본값을 반환할 수 있습니다.
        console.error('Failed to fetch clubs', error);
        throw error;
    }
};

export const getTheWineNameList = async (): Promise<any> => {
    try {
        const response = await apiClient.get('/WineCommunity/getTheWineTotalList');
        return response.data;
    } catch (error) {
        // 에러 핸들링, 필요에 따라 에러를 던지거나, 로그를 남기거나, 기본값을 반환할 수 있습니다.
        console.error('Failed to fetch clubs', error);
        throw error;
    }
}

export const makeTheNewMeeting = async (dto: ClubMeetingCreate): Promise<any> => {

    try {
        const response = await apiClient.post('/WineCommunity/createTheWineMeeting',dto);
            ElNotification({
                title: 'Success',
                message: '모임 생성에 성공하였습니다.',
                type: 'success'
            });

    return response.data;


    } catch (error) {
        ElNotification({
            title: 'Error',
            message: '모임 생성에 실패하였습니다.',
            type: 'error'
        });
    }
}

export const inputTheWineInfo = async (dto: WineInfo): Promise<any> => {
    try {
        const response = await apiClient.post('/WineCommunity/inputTheWineInfo',dto);
        return response.data;
    } catch (error) {
        // 에러 핸들링, 필요에 따라 에러를 던지거나, 로그를 남기거나, 기본값을 반환할 수 있습니다.
        console.error('Failed to fetch clubs', error);
        throw error;
    }
}

export const getTheMeetingList = async (clubName: String): Promise<any> => {
    try {
        const response = await apiClient.get(`/WineCommunity/getTheMeetingList?clubName=${clubName}` );
        return response.data;
    } catch (error) {
        // 에러 핸들링, 필요에 따라 에러를 던지거나, 로그를 남기거나, 기본값을 반환할 수 있습니다.
        console.error('Failed to fetch clubs', error);
        throw error;
    }
}


export const meetingJoinIn = async (meetingUuid: string): Promise<any> => {
    try {

        const response = await apiClient.post(`/WineCommunity/joinIntheMeeting`, meetingUuid );
        return response.data;
    } catch (error) {
        console.error('Failed to join the meeting', error);  // 에러 메시지 수정
        throw error;
    }
}


export const getTheWineAfterMeetingList = async (): Promise<any> => {
    try {
        const response = await apiClient.get(`/WineCommunity/review/wineReview` );
        return response.data;
    } catch (error) {
        console.error('자료를 불러오는데 실패 하였습니다.', error);  // 에러 메시지 수정
        throw error;
    }
}

