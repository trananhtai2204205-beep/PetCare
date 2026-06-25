<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header d-flex justify-content-between">
                    <h4 class="mt-2">QUẢN LÝ LỊCH HẸN</h4>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                        Thêm lịch hẹn
                    </button>
                </div>
                <div class="row mb-2 mt-2 px-3">
                    <div class="col-md-3">
                        <label class="form-label">Bác sĩ</label>
                        <select class="form-select" >
                            <option value="">Tất cả bác sĩ</option>
                            <template >
                                <option >TEN</option>
                            </template>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Từ ngày</label>
                        <input type="date" class="form-control" >
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Đến ngày</label>
                        <input type="date" class="form-control" >
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Trạng thái</label>
                        <select class="form-select" >
                            <option value="">Tất cả trạng thái</option>
                            <option value="0">Chờ xác nhận</option>
                            <option value="1">Đã xác nhận</option>
                            <option value="2">Đã huỷ</option>
                            <option value="3">Hoàn thành</option>
                        </select>
                    </div>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr class="bg-primary text-light text-nowrap">
                                <th class="text-center">#</th>
                                <th class="text-center">Bác Sĩ</th>
                                <th class="text-center">Bệnh Nhân</th>
                                <th class="text-center">Thời Gian</th>
                                <th class="text-center">Lý Do Khám</th>
                                <th class="text-center">Thanh Toán</th>
                                <th class="text-center">Trạng Thái</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template>
                                <tr class="text-nowrap">
                                    <th class="align-middle text-center">1</th>
                                    <td class="align-middle">TEN BS</td>
                                    <td class="align-middle">TEN BN</td>
                                    <td class="align-middle text-center">TG</td>
                                    <td class="align-middle">LDK</td>
                                    <td class="align-middle text-center">
                                        <button >Chưa thanh toán</button>
                                        <button >Đã thanh toán</button>
                                        <button>Đã huỷ</button>
                                    </td>
                                    <td class="align-middle text-center">
                                        <button >Chờ xác nhận</button>
                                        <button
                                        data-bs-toggle="modal"
                                            data-bs-target="#donThuocModal" 
                                            @click="Object.assign(don_thuoc_data, { id: value.id_chi_tiet, don_thuoc: '', chuan_doan: '', ghi_chu: '' })"
                                            >Đã xác nhận</button>
                                        <button >Đã huỷ</button>
                                        <button>Hoàn thành</button>
                                    </td>
                                    <td class="align-middle text-center d-flex">
                                        <button  data-bs-toggle="modal"
                                            data-bs-target="#xacNhanModal" class="btn btn-success me-2 flex-fill"
                                            
                                            style="width: 120px;">
                                            Xác nhận
                                        </button>
                                        <button  data-bs-toggle="modal"
                                            data-bs-target="#donThuocModal" class="btn btn-info me-2 flex-fill"
                                            
                                            style="width: 120px;">
                                            Hoàn thành
                                        </button>
                                        <button  data-bs-toggle="modal"
                                            data-bs-target="#chiTietModal" class="btn btn-primary me-2 flex-fill"
                                            
                                            style="width: 120px;">
                                            Chi tiết
                                        </button>
                                        <button  class="btn btn-danger flex-fill"
                                            data-bs-toggle="modal" data-bs-target="#deleteModal"
                                            >
                                            Hủy
                                        </button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Thêm Mới -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Thêm Lịch Hẹn</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Bệnh Nhân</label>
                            <select class="form-select" >
                                <option value="">-- Chọn bệnh nhân --</option>
                                <template>
                                    <option>TEN</option>
                                </template>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Bác Sĩ</label>
                            <select class="form-select" >
                                <option value="">-- Chọn bác sĩ --</option>
                                <template >
                                    <option>TEN</option>
                                </template>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Ngày Hẹn</label>
                            <select class="form-select" >
                                <option value="">-- Chọn ngày làm việc --</option>
                                <option>D</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Giờ Hẹn</label>
                            <select class="form-select" >
                                <option value="">-- Chọn khung giờ --</option>
                                <option>
                                    TGBĐ - TGKT
                                </option>
                            </select>
                        </div>
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Lý Do Khám</label>
                            <textarea class="form-control" rows="3" ></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="themLichHen()">
                        Thêm mới
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Xác Nhận Lịch Hẹn -->
    <div class="modal fade" id="xacNhanModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Xác Nhận Lịch Hẹn</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning" role="alert">
                        Bạn có chắc chắn muốn xác nhận lịch hẹn này không?
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="xacNhanLichHen()">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Kê Đơn Thuốc -->
    <div class="modal fade" id="donThuocModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Kê Đơn Thuốc</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Đơn Thuốc</label>
                            <textarea class="form-control" rows="4" placeholder="Nhập đơn thuốc..." ></textarea>
                        </div>
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Chẩn Đoán</label>
                            <textarea class="form-control" rows="3" placeholder="Nhập chẩn đoán..." ></textarea>
                        </div>
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Ghi Chú</label>
                            <textarea class="form-control" rows="3" placeholder="Nhập ghi chú..." ></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="hoanThanhLichHen()">
                        Hoàn thành
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Chi Tiết Lịch Hẹn -->
    <div class="modal fade" id="chiTietModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chi Tiết Lịch Hẹn</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h6 class="card-title mb-2">Bệnh nhân</h6>
                                    <div class="fw-semibold">\TEN</div>
                                    <div class="small text-muted">ID: ID</div>
                                    <div class="small text-muted" >SĐT: SĐT</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h6 class="card-title mb-2">Bác sĩ phụ trách</h6>
                                    <div class="fw-semibold">TÊN</div>
                                    <div class="small text-muted" >SĐT: SĐT</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-title mb-3">Thông tin lịch hẹn</h6>
                            <dl class="row mb-0">
                                <dt class="col-sm-4 text-muted">Thời gian</dt>
                                <dd class="col-sm-8">AAAAAAAAAAA</dd>

                                <dt class="col-sm-4 text-muted">Ngày hẹn (đặt)</dt>
                                <dd class="col-sm-8">NDH</dd>

                                <dt class="col-sm-4 text-muted">Lý do khám</dt>
                                <dd class="col-sm-8">HLDK</dd>

                                <template >
                                    <dt class="col-sm-4 text-muted">Chẩn đoán</dt>
                                    <dd class="col-sm-8">HCĐ</dd>
                                </template>

                                <template >
                                    <dt class="col-sm-4 text-muted">Đơn thuốc</dt>
                                    <dd class="col-sm-8">HĐT</dd>
                                </template>

                                <template >
                                    <dt class="col-sm-4 text-muted">Ghi chú</dt>
                                    <dd class="col-sm-8">GC</dd>
                                </template>
                            </dl>
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

    <!-- Modal Hủy -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Hủy Lịch Hẹn</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có chắc chắn muốn hủy lịch hẹn này không?
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="huyLichHen()">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import baseRequestAdmin from '../../../core/baseRequestAdmin';

// export default {
//     data() {
//         return {
//             list_lich_hen: [],
//             list_benh_nhan: [],
//             list_bac_si: [],
//             create_lich_hen: {
//                 id_benh_nhan: "",
//                 id_bac_si: "",
//                 ngay_hen: "",
//                 gio_hen: "",
//                 ly_do_kham: "",
//             },
//             del_lich_hen: {},
//             xac_nhan_lich_hen: {
//                 id: "",
//                 id_bac_si: "",
//             },
//             don_thuoc_data: {
//                 id: "",
//                 don_thuoc: "",
//                 chuan_doan: "",
//                 ghi_chu: "",
//             },
//             chi_tiet_lich_hen: {},
//             tim_kiem: {
//                 id_bac_si: "",
//                 tu_ngay: "",
//                 den_ngay: "",
//                 tinh_trang: "",
//             },
//             lich_dates: [],
//             lich_slots_by_date: {},
//             selected_date: "",
//             time_slots: [],
//         };
//     },
//     mounted() {
//         this.loadData();
//         this.loadBenhNhan();
//         this.loadBacSi();
//     },
//     methods: {
//         formatThoiGian(bat_dau, ket_thuc) {
//             try {
//                 if (!bat_dau && !ket_thuc) return '-';
//                 const start = bat_dau ? new Date(bat_dau) : null;
//                 const end = ket_thuc ? new Date(ket_thuc) : null;
//                 const pad = (n) => (n < 10 ? '0' + n : '' + n);
//                 const fmt = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
//                 if (start && end) {
//                     const sameDay = start.toDateString() === end.toDateString();
//                     return sameDay ? `${fmt(start)} - ${pad(end.getHours())}:${pad(end.getMinutes())}` : `${fmt(start)} - ${fmt(end)}`;
//                 }
//                 if (start) return fmt(start);
//                 if (end) return fmt(end);
//                 return '-';
//             } catch (e) {
//                 return '-';
//             }
//         },
//         timKiem() {
//             baseRequestAdmin.post('admin/lich-hen/tim-kiem', this.tim_kiem)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_lich_hen = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         loadData() {
//             baseRequestAdmin.get('admin/lich-hen/data')
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_lich_hen = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         changeStatus(value) {
//             baseRequestAdmin.post('admin/lich-hen/change-status', value)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.loadData();
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         changeStatus(value) {
//             baseRequestAdmin.post('admin/lich-hen/change-status', value)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.loadData();
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         loadBenhNhan() {
//             baseRequestAdmin.get('admin/benh-nhan/data')
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_benh_nhan = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         loadBacSi() {
//             baseRequestAdmin.get('admin/bac-si/data')
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.list_bac_si = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         layNgayLamBS() {
//             this.create_lich_hen.ngay_hen = this.selected_date || '';
//             this.time_slots = this.selected_date && this.lich_slots_by_date[this.selected_date] ? this.lich_slots_by_date[this.selected_date] : [];
//             if (this.time_slots.length === 0) {
//                 this.create_lich_hen.gio_hen = '';
//             }
//         },
//         loadLichLamViecBS() {
//             baseRequestAdmin.post(`admin/lich-lam-viec/data/${this.create_lich_hen.id_bac_si}`)
//                 .then((res) => {
//                     if (res.data.status) {
//                         const rows = res.data.data || [];
//                         const dates = new Set();
//                         const grouped = {};
//                         rows.forEach((r) => {
//                             dates.add(r.ngay_lam_viec);
//                             if (!grouped[r.ngay_lam_viec]) grouped[r.ngay_lam_viec] = [];
//                             grouped[r.ngay_lam_viec].push({
//                                 thoi_gian_bat_dau: r.thoi_gian_bat_dau,
//                                 thoi_gian_ket_thuc: r.thoi_gian_ket_thuc,
//                             });
//                         });
//                         this.lich_dates = Array.from(dates);
//                         this.lich_slots_by_date = grouped;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         themLichHen() {
//             baseRequestAdmin.post('admin/lich-hen/create', this.create_lich_hen)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.loadData();
//                         this.create_lich_hen = {
//                             id_benh_nhan: '',
//                             id_bac_si: '',
//                             ngay_hen: '',
//                             gio_hen: '',
//                             ly_do: '',
//                             id_benh_nhan: '',
//                         };
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         xacNhanLichHen() {
//             baseRequestAdmin.post('admin/lich-hen/xac-nhan', this.xac_nhan_lich_hen)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.loadData();
//                         this.xac_nhan_lich_hen = { id: '', id_bac_si: '' };
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         hoanThanhLichHen() {
//             const payload = {
//                 id: this.don_thuoc_data.id || this.chi_tiet_lich_hen.id_chi_tiet,
//                 don_thuoc: this.don_thuoc_data.don_thuoc,
//                 chuan_doan: this.don_thuoc_data.chuan_doan,
//                 ghi_chu: this.don_thuoc_data.ghi_chu,
//             };
//             baseRequestAdmin.post('admin/lich-hen/hoan-thanh', payload)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.loadData();
//                         this.chi_tiet_lich_hen = {};
//                         this.don_thuoc_data = {
//                             id: '',
//                             don_thuoc: '',
//                             chuan_doan: '',
//                             ghi_chu: '',
//                         };
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         huyLichHen() {
//             baseRequestAdmin.post('admin/lich-hen/huy', this.del_lich_hen)
//                 .then((res) => {
//                     if (res.data.status) {
//                         this.$toast.success(res.data.message);
//                         this.loadData();
//                         this.del_lich_hen = {};
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 })
//                 .catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
        
//     },
// };
</script>

<style scoped>
</style>