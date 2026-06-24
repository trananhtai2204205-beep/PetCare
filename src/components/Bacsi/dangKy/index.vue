<template>
    <div class="login-wrapper">

        <div class="section-authentication-signin d-flex align-items-center justify-content-center min-vh-100">

            <div class="container-fluid">

                <div class="row">
                    <div class="col-12 col-lg-8 col-xl-7 mx-auto">

                        <div class="card shadow-lg">

                            <div class="card-body">

                                <div class="border p-4 p-md-5 rounded">

                                    <!-- HEADER -->
                                    <div class="text-center mb-4">

                                        <img
                                            src="@/assets/images/login_bacsi.jpg"
                                            class="img-fluid rounded-top w-100"
                                            alt="Bác sĩ PetCare">

                                        <h2 class="fw-bold mt-4">
                                            Đăng ký tài khoản Bác sĩ PetCare
                                        </h2>

                                        <p class="text-muted mb-0 px-md-5">
                                            Tạo tài khoản để tham gia đội ngũ bác sĩ thú y PetCare và quản lý hồ sơ khám chữa bệnh cho thú cưng.
                                        </p>

                                    </div>

                                    <div class="form-body">

                                        <form class="row g-3">

                                            <!-- EMAIL -->
                                            <div class="col-12">

                                                <label class="form-label">
                                                    Email bác sĩ
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
                                                    Mật khẩu tài khoản
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

                                            <!-- XÁC NHẬN MẬT KHẨU -->
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
                                                        class="input-group-text bg-transparent"
                                                        @click="showPassword = !showPassword">

                                                        <i
                                                            class="bx"
                                                            :class="showPassword ? 'bx-hide' : 'bx-show'">
                                                        </i>

                                                    </span>

                                                </div>

                                            </div>

                                            <!-- HỌ TÊN -->
                                            <div class="col-12">

                                                <label class="form-label">
                                                    Họ và tên bác sĩ
                                                </label>

                                                <input
                                                    tabindex="4"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Nhập họ và tên đầy đủ"
                                                    required />

                                            </div>

                                            <!-- SĐT -->
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

                                            <!-- GIỚI TÍNH -->
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

                                            <!-- ĐỊA CHỈ -->
                                            <div class="col-12">

                                                <label class="form-label">
                                                    Địa chỉ hiện tại
                                                </label>

                                                <input
                                                    tabindex="7"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Nhập địa chỉ"
                                                    required />

                                            </div>

                                            <!-- NGÀY SINH -->
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
                                                            A7X9K
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

                                            <!-- ĐIỀU KHOẢN -->
                                            <div class="col-12">

                                                <div class="form-check">

                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        required>

                                                    <label class="form-check-label">
                                                        Tôi xác nhận thông tin đăng ký là chính xác và đồng ý với quy định của PetCare.
                                                    </label>

                                                </div>

                                            </div>

                                            <!-- LOGIN -->
                                            <div class="col-12">

                                                <p class="text-center mb-0">

                                                    Đã có tài khoản bác sĩ?

                                                    <router-link to="/bac-si/login">
                                                        Đăng nhập hệ thống
                                                    </router-link>

                                                </p>

                                            </div>

                                            <!-- BUTTON -->
                                            <div class="col-12">

                                                <div class="d-grid">

                                                    <button
                                                        type="submit"
                                                        class="btn btn-primary btn-lg">

                                                        <i class="fa-solid fa-user-doctor me-2"></i>

                                                        ĐĂNG KÝ TÀI KHOẢN BÁC SĨ

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

.form-body {
    width: 100%;
}

img {
    display: block;
}

.form-check-label {
    font-size: 14px;
}

@media (max-width: 768px) {
    .card {
        max-width: 100%;
    }

    .p-md-5 {
        padding: 1.5rem !important;
    }

    h2 {
        font-size: 1.8rem;
    }
}
</style>



<script>
// import baseRequestBacsi from '../../../core/baseRequestBacsi';
// export default {

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
//         dangky() {
//             baseRequestBacsi.post('bac-si/register', this.dangKyForm)
//                 .then(response => {
//                     if (response.data.status) {
//                         this.$toast.success(response.data.message);
//                         this.$router.push('/bac-si/login');
//                     } else {
//                         this.$toast.error(response.data.message);
//                     }
//                 })
//                 .catch((err) => {
//                     this.loaded = false;
//                     const listErr = err.response.data.errors;
//                     Object.values(listErr).forEach((error) => {
//                         this.$toast.error(error[0]);
//                     });
//                 });
//         }
//     }
// }
</script>
