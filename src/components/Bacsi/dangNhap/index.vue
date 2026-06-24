<template>
    <div class="login-wrapper">
        <div class="section-authentication-signin d-flex align-items-center justify-content-center min-vh-100">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-12 col-lg-8 col-xl-6 mx-auto">

                        <div class="card shadow-lg border-0">
                            <div class="card-body">
                                <div class="p-4 rounded">

                                    <!-- Logo -->
                                    <div class="text-center mb-4">

                                        <img
                                            src="@/assets/images/login_bacsi.jpg"
                                            class="img-fluid rounded w-100"
                                            alt="Logo Bác Sĩ">

                                        <h2 class="mt-4 fw-bold">
                                            HỆ THỐNG BÁC SĨ PETCARE
                                        </h2>

                                        <p class="text-muted mb-0 px-md-4">
                                            Đăng nhập để quản lý hồ sơ bệnh án, lịch khám và quá trình điều trị thú cưng
                                        </p>

                                    </div>

                                    <!-- Form -->
                                    <form class="row g-3">

                                        <!-- Tài khoản -->
                                        <div class="col-12">
                                            <label class="form-label fw-semibold">
                                                Tài khoản bác sĩ
                                            </label>

                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Nhập email hoặc tài khoản bác sĩ">
                                        </div>

                                        <!-- Password -->
                                        <div class="col-12">
                                            <label class="form-label fw-semibold">
                                                Mật khẩu
                                            </label>

                                            <div class="input-group">

                                                <input
                                                    :type="showPassword ? 'text' : 'password'"
                                                    class="form-control"
                                                    placeholder="Nhập mật khẩu">

                                                <span
                                                    class="input-group-text bg-white"
                                                    style="cursor:pointer"
                                                    @click="showPassword = !showPassword">

                                                    <i
                                                        class="bx"
                                                        :class="showPassword ? 'bx-hide' : 'bx-show'">
                                                    </i>

                                                </span>

                                            </div>
                                        </div>

                                        <!-- Captcha -->
                                        <div class="col-12">
                                            <label class="form-label fw-semibold">
                                                Mã xác thực
                                            </label>

                                            <div class="row g-2 align-items-center">

                                                <div class="col-4">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Nhập mã">
                                                </div>

                                                <div class="col-5">
                                                    <div class="border rounded text-center py-2 fw-bold bg-light">
                                                        A7X9K
                                                    </div>
                                                </div>

                                                <div class="col-3">
                                                    <button
                                                        type="button"
                                                        class="btn btn-outline-primary w-100">

                                                        <i class="fa-solid fa-rotate"></i>

                                                    </button>
                                                </div>

                                            </div>
                                        </div>

                                        <!-- Remember + Forgot -->
                                        <div class="col-6">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox">

                                                <label class="form-check-label">
                                                    Ghi nhớ đăng nhập
                                                </label>
                                            </div>
                                        </div>

                                        <div class="col-6 text-end">
                                            <router-link
                                                to="/quen-mat-khau"
                                                class="text-decoration-none">

                                                Quên mật khẩu?

                                            </router-link>
                                        </div>

                                        <!-- Login Button -->
                                        <div class="col-12">
                                            <div class="d-grid">

                                                <button
                                                    type="button"
                                                    class="btn btn-primary btn-lg">

                                                    <i class="fa-solid fa-user-doctor me-2"></i>

                                                    ĐĂNG NHẬP BÁC SĨ

                                                </button>

                                            </div>
                                        </div>

                                        <!-- Register -->
                                        <div class="col-12 text-center mt-3">

                                            <span>
                                                Chưa có tài khoản bác sĩ?
                                            </span>

                                            <router-link
                                                to="/bac-si/dang-ky"
                                                class="ms-1 fw-bold text-primary">

                                                Đăng ký ngay

                                            </router-link>

                                        </div>

                                        <!-- Footer -->
                                        <div class="col-12 text-center mt-2">

                                            <small class="text-muted">
                                                PetCare - Hệ thống quản lý và chăm sóc thú cưng toàn diện
                                            </small>

                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    max-width: 800px;
    margin: auto;
}

img {
    display: block;
    object-fit: cover;
}

@media (max-width: 768px) {
    h2 {
        font-size: 1.8rem;
    }

    .card-body {
        padding: 1rem;
    }
}
</style>



<script>
// import baseRequestBacsi from '../../../core/baseRequestBacsi';
// export default {
//     data() {
//         return {
//             user: {
//                 email: '',
//                 password: ''
//             },
//         }
//     },
//     methods: {
//         DangNhap() {
//             baseRequestBacsi.post('bac-si/login', this.user)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message)
//                         this.user = {};
//                         localStorage.setItem('token_bac_si', res.data.token);
//                         this.$router.push('/bac-si/quan-ly-benh-nhan');
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((err) => {
//                     const listErr = err.response.data.errors;
//                     Object.values(listErr).forEach((error) => {
//                         this.$toast.error(error[0]);
//                     });
//                 })
//         }
//     }
// }
</script>
<style></style>