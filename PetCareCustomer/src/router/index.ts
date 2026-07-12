import { createRouter, createWebHistory } from 'vue-router'
import { useCustomerAuthStore } from '../stores/customerAuth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/CustomerLoginView.vue'),
      meta: { public: true, layout: 'auth' }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('../views/auth/CustomerForgotPasswordView.vue'),
      meta: { public: true, layout: 'auth' }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/CustomerDashboardView.vue'),
      meta: { title: 'Tổng quan' }
    },
    {
      path: '/pets',
      name: 'MyPets',
      component: () => import('../views/MyPetsView.vue'),
      meta: { title: 'Thú cưng của tôi' }
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: () => import('../views/BookingView.vue'),
      meta: { title: 'Đặt lịch khám' }
    },
    {
      path: '/health',
      name: 'HealthRecords',
      component: () => import('../views/HealthRecordsView.vue'),
      meta: { title: 'Hồ sơ sức khỏe' }
    },
    {
      path: '/vaccinations',
      name: 'VaccinationBook',
      component: () => import('../views/VaccinationBookView.vue'),
      meta: { title: 'Sổ tiêm phòng' }
    },
    {
      path: '/invoices',
      name: 'Invoices',
      component: () => import('../views/InvoicesView.vue'),
      meta: { title: 'Hóa đơn' }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { title: 'Hồ sơ cá nhân' }
    },
  ]
})

router.beforeEach((to, _from, next) => {
  const customerAuth = useCustomerAuthStore()
  customerAuth.checkAuth()
  
  if (!to.meta.public && !customerAuth.isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.public && customerAuth.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
