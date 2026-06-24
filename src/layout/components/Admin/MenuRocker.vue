<template>
    <div class="nav-container primary-menu">
        <div class="mobile-topbar-header">
            <div>
                <img src="../../../assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
            </div>
            <div>
                <h4 class="logo-text">Admin</h4>
            </div>
            <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
            </div>
        </div>
        <nav class="navbar navbar-expand-xl w-100">
            <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
                <!-- Dashboard -->
                <li class="nav-item">
                    <router-link to="/admin/dashboard" class="nav-link">
                        <div class="parent-icon"><i class="bx bx-home-circle"></i></div>
                        <div class="menu-title">Dashboard</div>
                    </router-link>
                </li>


                <!-- Quản lý lịch hẹn -->

                <!-- Quản lý Bác sĩ -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <div class="parent-icon"><i class="bx bx-user-pin"></i></div>
                        <div class="menu-title">Quản lý Bác sĩ</div>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="nav-item">
                            <router-link to="/admin/bac-si" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-list-ul"></i></div>
                                <div class="menu-title">Danh sách Bác sĩ</div>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/bac-si/lich-lam-viec" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-calendar-check"></i></div>
                                <div class="menu-title">Lịch làm việc</div>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/lich-hen" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-calendar"></i></div>
                                <div class="menu-title">Lịch hẹn</div>
                            </router-link>
                        </li>
                    </ul>
                </li>

                <!-- Quản lý Bệnh nhân -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <div class="parent-icon"><i class="bx bx-user"></i></div>
                        <div class="menu-title">Quản lý Bệnh nhân</div>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="nav-item">
                            <router-link to="/admin/benh-nhan" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-list-ul"></i></div>
                                <div class="menu-title">Danh sách Bệnh nhân</div>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/ho-so-benh-an" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-folder"></i></div>
                                <div class="menu-title">Hồ sơ bệnh án</div>
                            </router-link>
                        </li>
                    </ul>
                </li>

                <!-- Quản lý Dịch vụ -->
                <li class="nav-item dropdown">
                    <router-link to="/admin/chuyen-khoa" class="nav-link">
                        <div class="parent-icon"><i class="bx bx-user-pin"></i></div>
                        <div class="menu-title">Quản lý Chuyên khoa</div>
                    </router-link>
                                    
                    </li>
                 <!-- Quản lý Phòng khám -->
                 <li class="nav-item">
                    <router-link to="/admin/phong-kham" class="nav-link">
                        <div class="parent-icon"><i class="bx bx-plus-medical"></i></div>
                        <div class="menu-title">Quản lý Phòng khám</div>
                    </router-link>
                </li>
                <!-- Quản lý Slide -->
                <li class="nav-item">
                    <router-link to="/admin/slide" class="nav-link">
                        <div class="parent-icon"><i class="bx bx-slideshow"></i></div>
                        <div class="menu-title">Quản lý Slide</div>
                    </router-link>
                </li>

                <!-- Phân quyền -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <div class="parent-icon"><i class="bx bx-id-card"></i></div>
                        <div class="menu-title">Phân quyền</div>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="nav-item">
                            <router-link to="/admin/nhan-vien" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-user"></i></div>
                                <div class="menu-title">Nhân viên</div>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/phan-quyen" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-lock"></i></div>
                                <div class="menu-title">Phân quyền</div>
                            </router-link>
                        </li>
                    </ul>
                </li>

                <!-- Thống kê & Báo cáo -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <div class="parent-icon"><i class="bx bx-bar-chart"></i></div>
                        <div class="menu-title">Thống kê & Báo cáo</div>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="nav-item">
                            <router-link to="/admin/thong-ke/lich-hen-chuyen-khoa" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-calendar"></i></div>
                                <div class="menu-title">Lịch hẹn theo chuyên khoa</div>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/thong-ke/lich-hen-bac-si" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-calendar"></i></div>
                                <div class="menu-title">Lịch hẹn theo bác sĩ</div>
                            </router-link>
                        </li>
                        
                        <li class="nav-item">
                            <router-link to="/admin/thong-ke/bac-si-theo-phong-kham" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-calendar"></i></div>
                                <div class="menu-title">Bác sĩ theo phòng khám</div>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/thong-ke/lich-lam-viec-theo-phong-kham" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-calendar"></i></div>
                                <div class="menu-title">Lịch làm việc theo phòng khám</div>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/thong-ke/benh-nhan-theo-bac-si" class="nav-link">
                                <div class="parent-icon"><i class="bx bx-calendar"></i></div>
                                <div class="menu-title">Bệnh nhân theo bác sĩ</div>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'MenuRocker'
}
</script>

<style scoped>
.nav-link {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    color: #6c757d;
    transition: all .3s ease;
}

.nav-link:hover,
.nav-link.active {
    color: #0d6efd;
    background: rgba(13, 110, 253, .1);
}

.parent-icon {
    font-size: 20px;
    line-height: 1;
    margin-right: 10px;
}

.menu-title {
    font-size: 14px;
}

.dropdown-menu {
    border: none;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    padding: 0.5rem 0;
}

.dropdown-menu .nav-link {
    padding: 0.5rem 1rem;
}
</style>