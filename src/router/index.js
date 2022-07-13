import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import BoxOfficeByDayView from '../views/BoxOfficeByDayView.vue';
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
