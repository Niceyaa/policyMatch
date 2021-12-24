import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        // path: '/:id',
        path: '/',
        name: 'Index',
        component: Index,
        meta: {keepAlive: false,showTabBar: true}
    },
    {
        path: '/MatchCondition/:id',
        name: 'MatchCondition',
        component: () => import('../views/MatchCondition.vue'),
        meta: {keepAlive: true,showTabBar: false}
    },
    {
        path: '/MatchList',
        name: 'MatchList',
        component: () => import('../views/MatchList.vue'),
        meta: {keepAlive: false,showTabBar: false}
    },
    {
        path: '/ProjectDetail',
        name: 'ProjectDetail',
        component: () => import('../views/ProjectDetail.vue'),
        meta: {keepAlive: false,showTabBar: false}
    },
    {
        path: '/RecordPage',
        name: 'RecordPage',
        component: ()=>import("../views/RecordPage.vue"),
        meta: {keepAlive: false,showTabBar: true}
    }
]

const router = createRouter({
    routes,
    history:createWebHistory()
})
export default router


