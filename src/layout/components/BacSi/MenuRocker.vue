<template>
    <div class="nav-container primary-menu">
        <div class="mobile-topbar-header">
            <div>
                <img src="../../../assets/images/logo_letan.png" class="logo-icon" alt="logo icon">
            </div>
            <div>
                <h4 class="logo-text">Bác sĩ</h4>
            </div>
            <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
            </div>
        </div>
        <nav class="navbar navbar-expand-xl w-100">
            <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
                <li class="nav-item">
                    <router-link to="/bac-si/lich-hen">
                        <a class="nav-link" href="/bac-si/lich-hen">
                            <div class="parent-icon"><i class="bx bx-calendar"></i>
                            </div>
                            <div class="menu-title">Lịch Hẹn</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/bac-si/lich-ca-nhan">
                        <a class="nav-link" href="/bac-si/lich-ca-nhan">
                            <div class="parent-icon"><i class="bx bx-calendar-event"></i>
                            </div>
                            <div class="menu-title">Lịch Cá Nhân</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/bac-si/quan-ly-benh-nhan">
                        <a class="nav-link" href="/bac-si/quan-ly-benh-nhan">
                            <div class="parent-icon"><i class="bx bx-user"></i>
                            </div>
                            <div class="menu-title">Quản Lý Bệnh Nhân</div>
                        </a>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {

}
</script>
<style></style>