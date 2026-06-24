<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-2">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center gap-2" href="/">
                <img src="../../../assets/images/logo-icon.jpg" alt="logo icon" width="36" height="36">
                <span class="fw-bold fs-4 text-primary">PetCare</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar"
                aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mainNavbar">
                <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link d-flex align-items-center gap-2" to="/">
                            <i class="fas fa-home fs-5 text-primary"></i>
                            <span class="fw-semibold">Trang chủ</span>
                        </router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" role="button"
                            data-bs-toggle="dropdown">
                            <i class="fas fa-stethoscope fs-5 text-success"></i>
                            <span class="fw-semibold">Dịch vụ</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link class="dropdown-item" to="/chuyen-khoa">
                                    <i class="fas fa-hospital-alt me-2"></i>Chuyên khoa
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/bac-si">
                                    <i class="fas fa-user-md me-2"></i>Đội ngũ bác sĩ
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link class="nav-link d-flex align-items-center gap-2" to="/dat-kham">
                            <i class="fas fa-calendar-plus fs-5 text-danger"></i>
                            <span class="fw-semibold">Đặt lịch khám</span>
                        </router-link>
                    </li> -->
                    <li class="nav-item">
                        <router-link class="nav-link d-flex align-items-center gap-2" to="/tin-tuc">
                            <i class="fas fa-newspaper fs-5 text-info"></i>
                            <span class="fw-semibold">Tin tức</span>
                        </router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" role="button"
                            data-bs-toggle="dropdown">
                            <i class="fas fa-info-circle fs-5 text-warning"></i>
                            <span class="fw-semibold">Thông tin</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link class="dropdown-item" to="/gioi-thieu">
                                    <i class="fas fa-hospital-user me-2"></i>Giới thiệu
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/chinh-sach">
                                    <i class="fas fa-shield-alt me-2"></i>Chính sách & Quy định
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/lien-he">
                                    <i class="fas fa-envelope me-2"></i>Liên hệ
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>

                <!-- User Dropdown khi đã đăng nhập -->
                <div class="user-box dropdown">
                    <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img :src="'../../../assets/images/avatars/avatar-1.png'"
                            class="user-img rounded-circle border border-2 border-primary" alt="user avatar"
                            style="width: 40px; height: 40px; object-fit: cover;">
                        <div class="user-info ps-3">
                            <p class="user-name mb-0 fw-semibold text-dark">tai mat lon </p>
                            <small class="text-muted">tai mat lon @gmail.com</small>
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0">
                        <li>
                            <router-link to="/profile" class="dropdown-item">
                                <i class="fas fa-user-circle me-2 text-primary"></i>
                                <span>Thông tin cá nhân</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/lich-hen-cua-toi" class="dropdown-item">
                                <i class="fas fa-calendar-alt me-2 text-success"></i>
                                <span>Lịch hẹn của tôi</span>
                            </router-link>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item text-danger" href="javascript:;" @click="logout()">
                                <i class="fas fa-sign-out-alt me-2 text-danger"></i>
                                <span>Đăng xuất</span>
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item text-danger" href="javascript:;" @click="logoutAll()">
                                <i class="fas fa-door-open me-2 text-danger"></i>
                                <span>Đăng xuất tất cả</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Buttons khi chưa đăng nhập -->
                <div  class="d-flex gap-2">
                    <router-link to="/dang-ky">
                        <button class="btn btn-outline-primary rounded-pill px-4">
                            <i class="fas fa-user-plus me-2"></i>Đăng ký
                        </button>
                    </router-link>
                    <router-link to="/login">
                        <button class="btn btn-primary rounded-pill px-4">
                            <i class="fas fa-sign-in-alt me-2"></i>Đăng nhập
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
// import baseRequestBenhNhan from '../../../core/baseRequestBenhNhan';

export default {
    data() {
        return {
            isLoggedIn: false,
            userProfile: {
                ho_ten: '',
                email: '',
                hinh_anh: ''
            }
        }
    },
    // mounted() {
    //     this.checkLoginStatus();
    // },
    // methods: {
    //     checkLoginStatus() {
    //         const token = localStorage.getItem('token_benh_nhan');
    //         if (token) {
    //             this.isLoggedIn = true;
    //             this.loadUserProfile();
    //         } else {
    //             this.isLoggedIn = false;
    //         }
    //     },
    //     loadUserProfile() {
    //         baseRequestBenhNhan.get('benh-nhan/profile/data', {
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.getItem("token_benh_nhan"),
    //             },
    //         })
    //             .then(res => {
    //                 if (res.data.status) {
    //                     this.userProfile = res.data.data;
    //                 }
    //             })
    //             .catch((err) => {
    //                 const listErr = err.response.data.errors;
    //                 Object.values(listErr).forEach((error) => {
    //                     this.$toast.error(error[0]);
    //                 });
    //             });
    //     },
    //     logout() {
    //         baseRequestBenhNhan.post('benh-nhan/logout', {
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.getItem("token_benh_nhan"),
    //             },
    //         })
    //             .then(res => {
    //                 if (res.data.status) {
    //                     this.isLoggedIn = false;
    //                     localStorage.removeItem('token_benh_nhan');
    //                     localStorage.removeItem('ho_ten_benh_nhan');
    //                     this.$toast.success(res.data.message);
    //                     this.$router.push('/');
    //                 }
    //             })
    //             .catch((err) => {
    //                 const listErr = err.response.data.errors;
    //                 Object.values(listErr).forEach((error) => {
    //                     this.$toast.error(error[0]);
    //                 });
    //             });
    //     },
    //     logoutAll() {
    //         baseRequestBenhNhan.post('benh-nhan/logout-all', {
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.getItem("token_benh_nhan"),
    //             },
    //         })
    //             .then(res => {
    //                 if (res.data.status) {
    //                     this.isLoggedIn = false;
    //                     localStorage.removeItem('token_benh_nhan');
    //                     localStorage.removeItem('ho_ten_benh_nhan');
    //                     this.$toast.success(res.data.message);
    //                     this.$router.push('/');
    //                 }
    //             })
    //             .catch((err) => {
    //                 const listErr = err.response.data.errors;
    //                 Object.values(listErr).forEach((error) => {
    //                     this.$toast.error(error[0]);
    //                 });
    //             });
    //     }
    // },
    watch: {
        '$route'() {
            this.checkLoginStatus();
        }
    }
}
</script>

<style scoped>
.navbar-nav .nav-link {
    position: relative;
    padding: 0.5rem 1rem;
    color: var(--bs-dark);
    transition: all 0.3s ease;
}

.navbar-nav .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: var(--bs-primary);
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.navbar-nav .nav-link:hover::after,
.navbar-nav .nav-link.router-link-active::after {
    width: 80%;
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.router-link-active {
    color: var(--bs-primary);
}

.navbar-nav .nav-link i {
    transition: all 0.3s ease;
}

.navbar-nav .nav-link:hover i,
.navbar-nav .nav-link.router-link-active i {
    color: var(--bs-primary) !important;
}

.dropdown-menu {
    border: none;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.dropdown-item {
    padding: 0.5rem 1rem;
    transition: all 0.2s ease;
}

.dropdown-item.router-link-active {
    color: var(--bs-primary);
    background-color: rgba(var(--bs-primary-rgb), 0.1);
}

.dropdown-item.router-link-active i {
    color: var(--bs-primary) !important;
}

.dropdown-item:hover {
    background-color: var(--bs-primary);
    color: white;
}

.dropdown-item:hover i {
    color: white !important;
}

.btn {
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
}
</style>