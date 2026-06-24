<template>

    <div class="login-wrapper">

        <div class="section-authentication-signin d-flex align-items-center justify-content-center min-vh-100">

            <div class="container-fluid">

                <div class="row">
                    <div class="col-12 col-lg-8 col-xl-7 mx-auto">

                        <div class="card shadow-lg border-0">

                            <div class="card-body">

                                <div class="border p-4 p-md-5 rounded">

                                    <!-- HEADER -->
                                    <div class="text-center mb-4">

                                        <img
                                            src="@/assets/images/logo_letan.png"
                                            class="img-fluid rounded w-100"
                                            alt="Logo Lễ Tân PetCare">

                                        <h2 class="fw-bold mt-4">
                                            ĐĂNG KÝ TÀI KHOẢN LỄ TÂN PETCARE
                                        </h2>

                                        <p class="text-muted mb-0 px-md-4">
                                            Tạo tài khoản nhân viên lễ tân để tiếp nhận khách hàng,
                                            quản lý thú cưng, lịch hẹn và hỗ trợ vận hành hệ thống PetCare.
                                        </p>

                                    </div>

                                    <div class="form-body">

                                        <form v-on:submit.prevent="dangky()" class="row g-3">

                                            <!-- EMAIL -->
                                            <div class="col-12">

                                                <label class="form-label">
                                                    Email công việc
                                                </label>

                                                <input
                                                    tabindex="1"
                                                    type="email"
                                                    class="form-control"
                                                    placeholder="Nhập email công việc"
                                                    required />

                                            </div>

                                            <!-- PASSWORD -->
                                            <div class="col-md-6">

                                                <label class="form-label">
                                                    Mật khẩu đăng nhập
                                                </label>

                                                <div class="input-group">

                                                    <input
                                                        tabindex="2"
                                                        :type="showPassword ? 'text' : 'password'"
                                                        class="form-control border-end-0"
                                                        placeholder="Tạo mật khẩu đăng nhập"
                                                        required />

                                                    <span
                                                        class="input-group-text bg-transparent"
                                                        @click="showPassword = !showPassword">

                                                        <i
                                                            class="bx"
                                                            :class="showPassword ? 'bx-hide' : 'bx-show'">
                                                        </i>

                                                    </span>

                                                </div>

                                            </div>

                                            <!-- CONFIRM PASSWORD -->
                                            <div class="col-md-6">

                                                <label class="form-label">
                                                    Xác nhận mật khẩu
                                                </label>

                                                <div class="input-group">

                                                    <input
                                                        tabindex="3"
                                                        :type="showPassword ? 'text' : 'password'"
                                                        class="form-control border-end-0"
                                                        placeholder="Nhập lại mật khẩu"
                                                        required />

                                                    <span
                                                        class="input-group-text bg-transparent">

                                                        <i class="bx bx-show"></i>

                                                    </span>

                                                </div>

                                            </div>

                                            <!-- FULL NAME -->
                                            <div class="col-12">

                                                <label class="form-label">
                                                    Họ và tên nhân viên lễ tân
                                                </label>

                                                <input
                                                    tabindex="4"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Nhập họ và tên đầy đủ"
                                                    required />

                                            </div>

                                            <!-- PHONE -->
                                            <div class="col-md-6">

                                                <label class="form-label">
                                                    Số điện thoại liên hệ
                                                </label>

                                                <input
                                                    tabindex="5"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Nhập số điện thoại"
                                                    required />

                                            </div>

                                            <!-- GENDER -->
                                            <div class="col-md-6">

                                                <label class="form-label">
                                                    Giới tính
                                                </label>

                                                <select
                                                    tabindex="6"
                                                    class="form-select"
                                                    required>

                                                    <option value="">
                                                        Chọn giới tính
                                                    </option>

                                                    <option value="0">
                                                        Nam
                                                    </option>

                                                    <option value="1">
                                                        Nữ
                                                    </option>

                                                </select>

                                            </div>

                                            <!-- ADDRESS -->
                                            <div class="col-12">

                                                <label class="form-label">
                                                    Địa chỉ cư trú
                                                </label>

                                                <input
                                                    tabindex="7"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Nhập địa chỉ hiện tại"
                                                    required />

                                            </div>

                                            <!-- BIRTHDAY -->
                                            <div class="col-md-6">

                                                <label class="form-label">
                                                    Ngày sinh
                                                </label>

                                                <input
                                                    tabindex="8"
                                                    type="date"
                                                    class="form-control"
                                                    required />

                                            </div>

                                            <!-- CAPTCHA -->
                                            <div class="col-md-6">

                                                <label class="form-label">
                                                    Mã xác minh
                                                </label>

                                                <div class="row g-2">

                                                    <div class="col-5">

                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            placeholder="Nhập mã">

                                                    </div>

                                                    <div class="col-5">

                                                        <div class="border rounded text-center py-2 fw-bold bg-light">
                                                            7Z3GU
                                                        </div>

                                                    </div>

                                                    <div class="col-2">

                                                        <button
                                                            type="button"
                                                            class="btn btn-outline-secondary w-100">

                                                            <i class="fa-solid fa-rotate"></i>

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                            <!-- TERMS -->
                                            <div class="col-12">

                                                <div class="form-check">

                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        required>

                                                    <label class="form-check-label">
                                                        Tôi xác nhận thông tin đăng ký là chính xác và đồng ý tuân thủ quy định hoạt động của hệ thống PetCare.
                                                    </label>

                                                </div>

                                            </div>

                                            <!-- LOGIN -->
                                            <div class="col-12">

                                                <p class="text-center mb-0">

                                                    Đã có tài khoản lễ tân?

                                                    <router-link to="/login">
                                                        Đăng nhập ngay
                                                    </router-link>

                                                </p>

                                            </div>

                                            <!-- BUTTON -->
                                            <div class="col-12">

                                                <div class="d-grid">

                                                    <button class="btn btn-primary btn-lg">

                                                        <i class="fa-solid fa-user-plus me-2"></i>

                                                        HOÀN TẤT ĐĂNG KÝ

                                                    </button>

                                                </div>

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

    </div>

</template>

<style scoped>
.card {
    max-width: 850px;
    margin: auto;
}

img {
    display: block;
    object-fit: cover;
}

.form-check-label {
    font-size: 14px;
}

@media (max-width: 768px) {

    .card {
        max-width: 100%;
    }

    h2 {
        font-size: 1.8rem;
    }

    .card-body {
        padding: 1rem;
    }
}
</style>


<script>
// import axios from 'axios';
// export default {
//     name: 'AdminLogin',
//     data() {
//         return {
//             dangKyForm: {
//                 email: '',
//                 password: '',
//                 re_password: '',
//                 ho_ten: '',
//                 so_dien_thoai: '',
//                 ngay_sinh: '',
//                 gioi_tinh: '',
//                 dia_chi: '',
//             },
//             showPassword: false,
//             isLoading: false,
//             error: null
//         }
//     },
//     mounted() {
//     },
//     methods: {
//         dangky(){
//             axios
//                 .post("http://127.0.0.1:8000/api/benh-nhan/register",this.dangKyForm)
//                 .then(response=>{
//                     if(response.data.status){
//                         this.$toast.success(response.data.message);
//                         this.$router.push('/login');
//                     }else{
//                         this.$toast.error(response.data.message);
//                     }
//                 })
//                 .catch(err => {
//                     if (err.response?.data?.errors) {
//                         Object.values(err.response.data.errors).forEach(error => {
//                             this.$toast.error(error[0]);
//                         });
//                     }
//                 });
//         }
//     }
// }
</script>
