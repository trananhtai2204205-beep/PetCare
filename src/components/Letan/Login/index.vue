<template>
    <div class="login-wrapper">

        <div
            class="section-authentication-signin d-flex align-items-center justify-content-center min-vh-100">

            <div class="container">

                <div class="row">
                    <div class="col-lg-8 col-xl-7 mx-auto">

                        <div class="card shadow-lg border-0">

                            <div class="card-body p-4 p-md-5">

                                <!-- HEADER -->
                                <div class="text-center mb-4">

                                    <img
                                        src="@/assets/images/logo_letan.png"
                                        class="img-fluid rounded w-100"
                                        alt="Lễ Tân PetCare">

                                    <h2 class="system-title mt-4">
                                        HỆ THỐNG LỄ TÂN PETCARE
                                    </h2>

                                    <p class="text-muted login-description mb-0">
                                        Đăng nhập để tiếp nhận khách hàng,
                                        quản lý hồ sơ thú cưng, lịch hẹn khám
                                        và hỗ trợ vận hành hệ thống PetCare.
                                    </p>

                                </div>

                                <!-- FORM -->
                                <form class="row g-3">

                                    <!-- USERNAME -->
                                    <div class="col-12">

                                        <label class="form-label fw-semibold">
                                            Tài khoản lễ tân
                                        </label>
                                        <input type="email" class="form-control" v-model="user.email" placeholder="Nhập email hoặc tên đăng nhập">                                           
                                    </div>

                                    <!-- PASSWORD -->
                                    <div class="col-12">

                                        <label class="form-label fw-semibold">
                                            Mật khẩu
                                        </label>

                                        <div class="input-group">

                                            <input
                                                :type="showPassword ? 'text' : 'password'"
                                                class="form-control"
                                                v-model="user.password"
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

                                    <!-- CAPTCHA -->
                                    <div class="col-12">

                                        <label class="form-label fw-semibold">
                                            Mã xác minh
                                        </label>

                                        <div class="row g-2 align-items-center">

                                            <div class="col-4">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Nhập mã">
                                            </div>

                                            <div class="col-5">
                                                <div
                                                    class="border rounded text-center py-2 fw-bold bg-light captcha-box">
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

                                    <!-- REMEMBER -->
                                    <div class="col-6">

                                        <div class="form-check">

                                            <input
                                                class="form-check-input"
                                                type="checkbox">

                                            <label class="form-check-label">
                                                Ghi nhớ đăng nhập
                                            </label>

                                        </div>

                                    </div>

                                    <!-- FORGOT -->
                                    <div class="col-6 text-end">

                                        <router-link
                                            to="/quen-mat-khau"
                                            class="text-decoration-none">

                                            Quên mật khẩu?

                                        </router-link>

                                    </div>

                                    <!-- BUTTON -->
                                    <div class="col-12">

                                        <div class="d-grid">

                                            <button v-on:click="DangNhap()"
                                                type="button"
                                                class="btn btn-primary btn-lg">

                                                <i class="fa-solid fa-right-to-bracket me-2"></i>

                                                ĐĂNG NHẬP HỆ THỐNG

                                            </button>

                                        </div>

                                    </div>

                                    <!-- REGISTER -->
                                    <div class="col-12 text-center">

                                        <span>
                                            Chưa có tài khoản lễ tân?
                                        </span>

                                        <router-link
                                            to="/dang-ky"
                                            class="fw-bold text-primary ms-1">

                                            Đăng ký ngay

                                        </router-link>

                                    </div>

                                    <!-- FOOTER -->
                                    <div class="col-12 text-center">

                                        <small class="text-muted">
                                            Hệ thống quản lý PetCare dành cho nhân viên lễ tân
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
</template>
<script>
import baseRequestLeTan from '../../../core/baseRequestLeTan';
export default {
    name: 'AdminLogin',
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            showPassword: false,    
        }
    },
    methods: {
        DangNhap() {
            baseRequestLeTan.post('le-tan/login', this.user)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message)
                        this.user = {};
                        localStorage.setItem('token_le_tan', res.data.token);
                        localStorage.setItem('ho_ten_le_tan', res.data.ho_ten);
                        this.$router.push('/');
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    const listErr = err.response.data.errors;
                    Object.values(listErr).forEach((error) => {
                        this.$toast.error(error[0]);
                    });
                })
        }

    }
}
</script>
<style scoped>

.login-wrapper{
    background:#f8fafc;
    padding:20px;
}

.card{
    border-radius:20px;
    overflow:hidden;
}

.card-body{
    padding:2rem;
}

/* ẢNH LOGO */
.login-banner{
    width:100%;
    max-width:420px;
    height:auto;
    display:block;
    margin:0 auto;
    object-fit:contain;
}

/* TIÊU ĐỀ */
.system-title{
    color:#000;
    font-size:2rem;
    font-weight:700;
    letter-spacing:.5px;
    margin-bottom:10px;
}

/* MÔ TẢ */
.login-description{
    max-width:600px;
    margin:auto;
    line-height:1.6;
}

/* INPUT */
.form-control{
    height:48px;
    border-radius:10px;
}

.input-group-text{
    height:48px;
}

/* CAPTCHA */
.captcha-box{
    min-height:48px;
    display:flex;
    align-items:center;
    justify-content:center;
}

/* BUTTON */
.btn-lg{
    height:52px;
    font-size:16px;
    font-weight:600;
    border-radius:10px;
}

.form-label{
    margin-bottom:6px;
    font-weight:600;
}

/* TABLET */
@media(max-width:768px){

    .card-body{
        padding:1.5rem;
    }

    .login-banner{
        max-width:300px;
    }

    .system-title{
        font-size:1.6rem;
    }

    .login-description{
        font-size:14px;
    }

}

/* MOBILE */
@media(max-width:576px){

    .login-banner{
        max-width:220px;
    }

    .system-title{
        font-size:1.3rem;
    }

    .login-description{
        font-size:13px;
    }

    .card-body{
        padding:1.2rem;
    }

}

</style>
