import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { public: true, layout: 'auth' }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('../views/auth/ForgotPasswordView.vue'),
      meta: { public: true, layout: 'auth' }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { title: 'Dashboard' }
    },
    {
      path: '/appointments',
      name: 'Appointments',
      component: () => import('../views/AppointmentView.vue'),
      meta: { title: 'Lịch khám' }
    },
    {
      path: '/medical-records',
      name: 'MedicalRecords',
      component: () => import('../views/MedicalRecordView.vue'),
      meta: { title: 'Hồ sơ khám bệnh' }
    },
    {
      path: '/medical-history',
      name: 'MedicalHistory',
      component: () => import('../views/MedicalHistoryView.vue'),
      meta: { title: 'Lịch sử khám' }
    },
    {
      path: '/vaccination',
      name: 'Vaccination',
      component: () => import('../views/VaccinationView.vue'),
      meta: { title: 'Tiêm phòng' }
    },
  ]
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  auth.checkAuth()

  if (!to.meta.public && !auth.isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.public && auth.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
