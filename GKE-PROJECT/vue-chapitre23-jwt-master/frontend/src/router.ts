import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './shared/guards';
import { useUser } from './shared/stores';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/connexion',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/inscription',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/Signup.vue'),
    },
    {
      path: '/profil',
      beforeEnter: [isAuthenticatedGuard],
      component: () => import('@/views/Profile.vue'),
    },
    {
      path: '/:notfound(.*)*',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

router.beforeEach(async () => {
  const userStore = useUser();
  if (!userStore.loaded) {
    await userStore.fetchCurrentUser();
  }
});
