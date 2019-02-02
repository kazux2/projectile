import VueRouter from 'vue-router';
import Auth from './components/Auth.vue';
import Top from './components/Top.vue';
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Auth },
    { path: '/auth', component: Auth },
    { path: '/top', component: Top }, //Topを廃止してTimelineにする
    { path: '/timeline', component: Timeline },
    { path: '/mypage', component: MyPage },
    { path: '/project', component: Project },
  ]
});
export default router;