import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import FeedLayout from "@/views/subViews/FeedLayout.vue";
import WineCommunityLayout from "@/views/subViews/WineCommunityLayout.vue";
import MyMeetingFindLayout from "@/views/subViews/MyMeetingFindLayout.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: FeedLayout
    },
    {
        path: '/Feed',
        name: 'FeedLayout',
        component: FeedLayout
    },
    {
        path: '/WineCommunity',
        name: 'WineCommunity',
        component: MyMeetingFindLayout
    },

    {
        path: '/WineCommunity/:communityName',
        name: 'WineCommunityWithName',
        component: WineCommunityLayout
    },


]

const router = createRouter({
    // process.env.BASE_URL 대신 직접 '/' 사용
    history: createWebHistory('/'),
    routes
})


export default router