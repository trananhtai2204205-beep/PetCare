<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header">
                    <h4 class="mt-2">LỊCH HẸN CỦA TÔI</h4>
                </div>
                
                <div class="row mb-2 mt-2 px-3">
                    <div class="col-md-12 col-lg-12 d-flex gap-1">
                        <input type="text" class="form-control form-control" @input="timKiem" placeholder="Nhập tên bệnh nhân...">
                        <button class="btn btn-primary text-nowrap" @click="timKiem">Tìm kiếm</button>
                    </div>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr class="bg-primary text-light text-nowrap">
                                <th class="text-center">#</th>
                                <th class="text-center">Bệnh Nhân</th>
                                <th class="text-center">SĐT</th>
                                <th class="text-center">Thời Gian Hẹn</th>
                                <th class="text-center">Lý Do Khám</th>
                                <th class="text-center">Trạng Thái</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template >
                                <tr class="text-nowrap">
                                    <td class="align-middle text-center">1</td>
                                    <td class="align-middle">
                                        <div >TEN BN</div>
                                    </td>
                                    <td class="align-middle">SDT BN</td>
                                        <td class="align-middle text-center">
                                        <div >NDH</div>
                                    </td>
                                    <td class="align-middle">LDK</td>
                                    <td class="align-middle text-center">
                                        <button>HELLO TTBN</button>
                                        <!-- <button v-if="value.tinh_trang == 0" class="btn w-100 btn-warning">Chờ xác nhận</button>
                                        <button v-else-if="value.tinh_trang == 1" class="btn w-100 btn-primary">Đã xác nhận</button>
                                        <button v-else-if="value.tinh_trang == 2" class="btn w-100 btn-danger">Đã huỷ</button>
                                        <button v-else-if="value.tinh_trang == 3" class="btn w-100 btn-success">Hoàn thành</button> -->
                                    </td>
                                    <td class="align-middle text-center">
                                        <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#chiTietModal" @click="Object.assign(chi_tiet_lich_hen, value)">
                                            <i class="fas fa-eye"></i> Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            </template>
                            <tr >
                                <td colbutton="9" class="text-center py-4">
                                    <div class="text-muted">
                                        <i class="fas fa-calendar-times fa-2x mb-2"></i>
                                        <div>Không có lịch hẹn nào</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="chiTietModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chi Tiết Lịch Hẹn</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card mb-3">
                        <div class="card-header bg-primary text-white">
                            <h6 class="mb-0"><i class="fas fa-user"></i> Thông tin bệnh nhân</h6>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-2">
                                        <strong>Họ tên:</strong> TTBN
                                    </div>
                                    <div class="mb-2">
                                        <strong>Số điện thoại:</strong>TTBN
                                    </div>
                                    <div class="mb-2">
                                        <strong>Ngày sinh:</strong> TTBN
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-2">
                                        <strong>Giới tính:</strong> 
                                        <span >  Nam</span>
                                        <span >  Nữ</span>
                                    </div>
                                    <div class="mb-2">
                                        <strong>Email:</strong> TTBN
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-3">
                        <div class="card-header bg-info text-white">
                            <h6 class="mb-0"><i class="fas fa-calendar"></i> Thông tin lịch hẹn</h6>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-2">
                                        <strong>Ngày hẹn:</strong> TTLH
                                    </div>
                                    <div class="mb-2">
                                        <strong>Trạng thái:</strong> 
                                        <span>TTLH HOÀN THÀNH</span>
                                        <!-- <span v-if="chi_tiet_lich_hen.tinh_trang == 0"><b>Chờ xác nhận</b></span>
                                        <span v-else-if="chi_tiet_lich_hen.tinh_trang == 1"><b>Đã xác nhận</b></span>
                                        <span v-else-if="chi_tiet_lich_hen.tinh_trang == 2"><b> Đã huỷ</b></span>
                                        <span v-else-if="chi_tiet_lich_hen.tinh_trang == 3"><b> Hoàn thành</b></span> -->
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-2">
                                        <strong>Lý do khám:</strong> TTLH
                                    </div>
                                    <div class="mb-2" >
                                        <strong>Nhận xét:</strong> TTLH
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card" >
                        <div class="card-header bg-success text-white">
                            <h6 class="mb-0"><i class="fas fa-stethoscope"></i> Thông tin khám bệnh</h6>
                        </div>
                        <div class="card-body">
                            <div class="mb-3" >
                                <strong>Chẩn đoán:</strong>
                                <div class="mt-1 p-2 bg-light rounded">TTKB</div>
                            </div>
                            <div class="mb-3" >
                                <strong>Đơn thuốc:</strong>
                                <div class="mt-1 p-2 bg-light rounded">TTKB</div>
                            </div>
                            <div class="mb-3" >
                                <strong>Ghi chú:</strong>
                                <div class="mt-1 p-2 bg-light rounded">TTKB</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
// import baseRequestBacSi from '../../../core/baseRequestBacsi';

// export default {
    // data() {
//         return {
//             list_lich_hen: [],
//             tim_kiem: {
//                 ten_benh_nhan: "",
//                 tinh_trang: "",
//             },
//             chi_tiet_lich_hen: {},
//         };
//     },
//     mounted() {
//         this.loadData();
//     },
//     methods: {
//         formatNgay(ngay) {
//             try {
//                 if (!ngay) return '-';
//                 const date = new Date(ngay);
//                 const pad = (n) => (n < 10 ? '0' + n : '' + n);
//                 return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
//             } catch (e) {
//                 return '-';
//             }
//         },
//         loadData() {
//             baseRequestBacSi.get('bac-si/lich-hen/data' , {
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("token_bac_si"),
//                 },
//             })
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_lich_hen = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((err) => {
//                     const listErr = err.response.data.errors;
//                     Object.values(listErr).forEach((error) => {
//                         this.$toast.error(error[0]);
//                     });
//                 });
//         },
//         timKiem() {
//             let filteredData = this.list_lich_hen;
//             if (this.tim_kiem.ten_benh_nhan) {
//                 filteredData = filteredData.filter(item => 
//                     item.ten_benh_nhan.toLowerCase().includes(this.tim_kiem.ten_benh_nhan.toLowerCase())
//                 );
//             }
            
//             if (this.tim_kiem.tinh_trang !== "") {
//                 filteredData = filteredData.filter(item => item.tinh_trang == this.tim_kiem.tinh_trang);
//             }
//         },
//     },
// };
</script>

<style scoped>
</style>