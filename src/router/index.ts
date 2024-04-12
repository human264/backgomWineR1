import {createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw} from 'vue-router';
import FeedLayout from "@/views/subViews/FeedLayout.vue";
import WineCommunityLayout from "@/views/subViews/WineCommunityLayout.vue";
import MyMeetingFindLayout from "@/views/subViews/MyMeetingFindLayout.vue";
import CommunityPictureHeaderCombine from "@/components/WineCommunity/main/CommunityPictureHeaderCombine.vue";
import BoardList from "@/components/WineCommunity/board/BoardList.vue";
import CommunityPicture from "@/components/WineCommunity/picture/Picture.vue";
import MeetingList from "@/components/WineCommunity/meeting/MeetingList.vue";
import CommunityWineAfter from "@/components/WineCommunity/wineAfter/CommunityWineAfter.vue";
import CommunityWineChatting from "@/components/WineCommunity/chatting/CommunityWineChatting.vue";
import CommunityEvents from "@/components/WineCommunity/event/CommunityEvents.vue";
import LogIn from "@/components/LogIn/LogIn.vue";
import SignIn from "@/components/LogIn/SignIn.vue";
import PasswordRecovery from "@/components/LogIn/PasswordRecovery.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/LogIn',
        name: 'LogIn',
        component: LogIn,
    },

    {
        path: '/SignIn',
        name: 'SignIn',
        component: SignIn,
    },

    {
        path: '/PasswordRecovery',
        name: 'PasswordRecovery',
        component: PasswordRecovery,
    },


    {
        path: '/',
        name: 'Home',
        component: FeedLayout,
    },
    {
        path: '/Feed',
        name: 'FeedLayout',
        component: FeedLayout,
    },
    {
        path: '/WineCommunity',
        name: 'WineCommunity',
        component: MyMeetingFindLayout,
    },
    {
        path: '/WineCommunity/:communityName',
        name: 'WineCommunityWithName',
        component: WineCommunityLayout,
        redirect: (to: RouteLocationNormalized) => {
            return `/WineCommunity/${to.params.communityName}/home`; // 여기서는 백틱과 ${}를 올바르게 사용합니다.
        },
        children: [
            {
                path: 'home', // 상대 경로 사용
                name: 'CommunityHome',
                component: CommunityPictureHeaderCombine,
            },
            {
                path: 'board', // 상대 경로
                name: 'CommunityBoard', // 고유한 이름
                component: BoardList, // 각각의 컴포넌트로 대체되어야 합니다.
            },
            {
                path: 'meeting', // 상대 경로
                name: 'CommunityMeeting', // 고유한 이름
                component: MeetingList, // 각각의 컴포넌트로 대체되어야 합니다.
            },
            {
                path: 'picture', // 상대 경로
                name: 'CommunityPicture', // 고유한 이름
                component: CommunityPicture, // 각각의 컴포넌트로 대체되어야 합니다.
            },
            {
                path: 'wineAfter', // 상대 경로
                name: 'CommunityWineAfter', // 고유한 이름
                component: CommunityWineAfter, // 각각의 컴포넌트로 대체되어야 합니다.
            },
            {
                path: 'wineChat', // 상대 경로
                name: 'CommunityWineChat', // 고유한 이름
                component: CommunityWineChatting, // 각각의 컴포넌트로 대체되어야 합니다.
            },
            {
                path: 'event', // 상대 경로
                name: 'CommunityEvents', // 고유한 이름
                component: CommunityEvents, // 각각의 컴포넌트로 대체되어야 합니다.
            }

        ],
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;