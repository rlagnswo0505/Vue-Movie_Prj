import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import BoxOfficeByDayView from '../views/BoxOfficeByDayView.vue';
import BoxOfficeByWeek from '../views/BoxOfficeByWeek.vue';
const routes = [
  {
    path: '/',
    name: 'name',
    component: Home,
  },
  {
    path: '/boxOfficeByDay',
    name: 'boxOfficeByDay',
    component: BoxOfficeByDayView,
  },
  {
    path: '/boxOfficeByWeek',
    name: 'boxOfficeByWeek',
    component: BoxOfficeByWeek,
  },
  // {
  //   path: '/boxOfficeByDay',
  //   name: 'boxOfficeByDay',
  //   component: () => import(/* webpackChunkName: "boxofficebyday", webpackPrefetch:true */ '../views/BoxOfficeByDayView.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
