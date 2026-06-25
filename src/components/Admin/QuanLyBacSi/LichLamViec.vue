    <template>
        <div class="row">
            <div class="col-lg-12">
                <div class="card radius-10 border-top border-0 border-3 border-info">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h4 class="mt-2">Quản Lý Lịch Làm Việc</h4>
                        <div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themLichModal">
                                <i class="bx bx-plus me-1"></i>Thêm lịch làm việc
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <!-- Search & Filter -->
                        <div class="row mb-3">
                            <div class="col-md-3">
                                <div class="card border-0 shadow-sm">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <button class="btn btn-sm btn-light" @click="changeMonth(-1)">
                                                <i class='bx bx-chevron-left'></i>
                                            </button>
                                            <div class="d-flex align-items-center">
                                                <input type="month" class="form-control form-control-sm mx-2"
                                                    >
                                            </div>
                                            <button class="btn btn-sm btn-light" @click="changeMonth(1)">
                                                <i class='bx bx-chevron-right'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="card border-0 shadow-sm mb-4 mt-3">
                                    <div class="card-body">
                                        <label class="form-label">Bác sĩ</label>
                                        <select class="form-select" >
                                            <option value="">Tất cả bác sĩ</option>
                                            <option>TEN</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        <div class="col-md-9">
                            <div class="card border-0 shadow-sm">
                                <div class="card-body">
                                    <!-- Week Navigation -->
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <button class="btn btn-outline-secondary" @click="changeWeek(-1)">
                                            <i class="bx bx-chevron-left"></i> Tuần trước
                                        </button>
                                        <h5 class="mb-0">JHHHHH</h5>
                                        <button class="btn btn-outline-secondary" @click="changeWeek(1)">
                                            Tuần sau <i class="bx bx-chevron-right"></i>
                                        </button>
                                    </div>
                                    
                                    <!-- Week Calendar -->
                                    <div class="row g-0 border rounded">
                                        <!-- Day Headers -->
                                        <div class="col-12">
                                            <div class="row g-0">
                                                <div class="col" >
                                                    <div class="p-2 bg-light border-end text-center fw-bold">
                                                        NAME<br>
                                                        <small class="text-muted">DATE</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- Day Content -->
                                        <div class="col-12">
                                            <div class="row g-0" style="min-height: 400px;">
                                                <div class="col border-end" >
                                                    <div class="p-2 h-100" style="min-height: 400px;">
                                                        <div  
                                                             class="mb-2 p-2 border rounded bg-light">
                                                            <div class="fw-bold small">TEN</div>
                                                            <div class="small text-muted">
                                                                <span class="badge bg-success me-1" >Sáng</span>
                                                                <span class="badge bg-info text-dark me-1" >Chiều</span>
                                                                <span class="badge bg-warning text-dark me-1" >Tối</span>
                                                            </div>
                                                            <div class="small text-muted">NBĐ - NKT</div>
                                                        </div>
                                                        <div class="text-center text-muted py-3" >
                                                            <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#themLichModaduoilich" @click="openCreateForDay(day.date)">
                                                                <i class="bx bx-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Xóa -->
        <div class="modal fade" id="xoaLichModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Xóa Lịch Làm Việc</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                            <div class="d-flex align-items-center">
                                <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                                    <div class="text-white">Bạn có chắc chắn xóa lịch làm việc <b>01/09/2025</b> này
                                        không!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xác
                            Nhận</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Thêm/ dưới lịch làm việc-->
        <div class="modal fade" id="themLichModaduoilich" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-white bg-primary">
                        <h5 class="modal-title">Thêm Lịch Làm Việc</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Bác sĩ <span class="text-danger">*</span></label>
                            <select class="form-select" required >
                                <option value="">-- Chọn bác sĩ --</option>
                                <option >ten</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Ngày trực <span class="text-danger">*</span></label>
                            <input type="date" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Ca trực <span class="text-danger">*</span></label>
                            <select class="form-select" required  @change="updateTimeRange">
                                <option value="">-- Chọn ca trực --</option>
                                <option value="1">Ca sáng (8:00 - 12:00)</option>
                                <option value="2">Ca chiều (13:00 - 17:00)</option>
                                <option value="3">Ca tối (18:00 - 21:00)</option>
                            </select>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Thời gian bắt đầu <span class="text-danger">*</span></label>
                                    <input type="time" class="form-control" required >
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Thời gian kết thúc <span class="text-danger">*</span></label>
                                    <input type="time" class="form-control" required >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary" @click="createLichLamViec">
                            <i class='bx bx-save me-1'></i>Thêm mới
                        </button>
                    </div>
                </div>
            </div>
        </div>

         <!-- Modal Thêm -->
         <div class="modal fade" id="themLichModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-white bg-primary">
                        <h5 class="modal-title">Thêm Lịch Làm Việc</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Bác sĩ <span class="text-danger">*</span></label>
                            <select class="form-select" required >
                                <option value="">-- Chọn bác sĩ --</option>
                                <option >ten</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Ngày trực <span class="text-danger">*</span></label>
                            <input type="date" class="form-control" required >
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Ca trực <span class="text-danger">*</span></label>
                            <select class="form-select" required  @change="updateTimeRange">
                                <option value="">-- Chọn ca trực --</option>
                                <option value="1">Ca sáng (8:00 - 12:00)</option>
                                <option value="2">Ca chiều (13:00 - 17:00)</option>
                                <option value="3">Ca tối (18:00 - 21:00)</option>
                            </select>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Thời gian bắt đầu <span class="text-danger">*</span></label>
                                    <input type="time" class="form-control" required >
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Thời gian kết thúc <span class="text-danger">*</span></label>
                                    <input type="time" class="form-control" required >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary" @click="createLichLamViec">
                            <i class='bx bx-save me-1'></i>Thêm mới
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
//             list_bac_si: [],
//             list_lich_lam_viec: [],
//             list_lich_lam_viec_bac_si: [],
//             selected_month: new Date().toISOString().slice(0, 7),
//             selected_bac_si: '',
//             currentWeek: new Date(),
//             create_lich_lam_viec: {
//                 id_bac_si: '',
//                 ngay_lam_viec: '',
//                 ca_lam_viec: '',
//                 thoi_gian_bat_dau: '',
//                 thoi_gian_ket_thuc: '',
//                 tinh_trang: '1',
//                 ghi_chu: ''
//             },
//         }
//     },
//     computed: {
//         weekTitle() {
//             const start = this.getWeekStart(this.currentWeek);
//             const end = new Date(start);
//             end.setDate(start.getDate() + 6);
//             return `${this.formatDate(start)} - ${this.formatDate(end)}`;
//         },
//         weekDays() {
//             const start = this.getWeekStart(this.currentWeek);
//             const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
//             return days.map((name, index) => {
//                 const date = new Date(start);
//                 date.setDate(start.getDate() + index);
//                 return {
//                     name,
//                     date: this.formatDate(date)
//                 };
//             });
//         },
//         filteredSchedules() {
//             if (this.selected_bac_si) {
//                 return this.list_lich_lam_viec_bac_si || [];
//             }
//             return this.list_lich_lam_viec || [];
//         },
//     },
//     watch: {
//         selected_bac_si(newVal) {
//             if (newVal) {
//                 this.loadLichLamViecBacSi(newVal);
//             } else {
//                 this.list_lich_lam_viec_bac_si = [];
//             }
//         }
//     },
//     mounted() {
//         this.loadBacSi();
//         this.loadDataLichLamViec();
//     },
//     methods: {
//         openCreateForDay(displayDate) {
//             if (displayDate && displayDate.includes('/')) {
//                 const [d, m, y] = displayDate.split('/');
//                 this.create_lich_lam_viec.ngay_lam_viec = `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
//             } else {
//                 this.create_lich_lam_viec.ngay_lam_viec = displayDate;
//             }
//             this.create_lich_lam_viec.id_bac_si = this.selected_bac_si || '';
//         },
//         changeWeek(step) {
//             const newWeek = new Date(this.currentWeek);
//             newWeek.setDate(newWeek.getDate() + (step * 7));
//             this.currentWeek = newWeek;
//             if (this.selected_bac_si) {
//                 this.loadLichLamViecBacSi(this.selected_bac_si);
//             }
//         },
//         getWeekStart(date) {
//             const d = new Date(date);
//             const day = d.getDay();
//             const diff = d.getDate() - day + (day === 0 ? -6 : 1);
//             d.setDate(diff);
//             d.setHours(0, 0, 0, 0);
//             return d;
//         },
//         formatDate(date) {
//             return date.toLocaleDateString('vi-VN', { 
//                 day: '2-digit', 
//                 month: '2-digit', 
//                 year: 'numeric' 
//             });
//         },
//         getSchedulesForDay(dateStr) {
//             return this.filteredSchedules.filter(schedule => {
//                 const scheduleDate = new Date(schedule.ngay_lam_viec);
//                 const formattedScheduleDate = this.formatDate(scheduleDate);
//                 console.log('Comparing:', formattedScheduleDate, 'with', dateStr);
//                 return formattedScheduleDate === dateStr;
//             });
//         },
//         changeMonth(step) {
//             const [y, m] = this.selected_month.split('-').map(n => parseInt(n));
//             const d = new Date(y, m - 1 + step, 1);
//             const month = (d.getMonth() + 1).toString().padStart(2, '0');
//             this.selected_month = `${d.getFullYear()}-${month}`;
//         },
//         isMorning(item) {
//             return item.thoi_gian_bat_dau && item.thoi_gian_bat_dau < '12:00';
//         },
//         isAfternoon(item) {
//             return item.thoi_gian_bat_dau && item.thoi_gian_bat_dau >= '12:00' && item.thoi_gian_bat_dau < '18:00';
//         },
//         isEvening(item) {
//             return item.thoi_gian_bat_dau && item.thoi_gian_bat_dau >= '18:00';
//         },
//         loadBacSi() {
//             baseRequestAdmin.get('admin/bac-si/data', {
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("token_admin"),
//                 }
//             })
//                 .then(res => {
//                     if(res.data.status) {
//                         this.list_bac_si = res.data.data;
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 }).catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         loadDataLichLamViec() {
//             baseRequestAdmin.get('admin/lich-lam-viec-bac-si/data', {
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("token_admin"),
//                 }
//             }).then(res => {
//                 if (res.data.status === true) {
//                     if(res.data.status) {
//                         this.list_lich_lam_viec = res.data.data || [];
//                     } else {
//                         this.$toast.error(res.data.message);
//                     }
//                 } else {
//                     this.$toast.error(res.data.message);
//                     this.list_lich_lam_viec = [];
//                 }
//             }).catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         loadLichLamViecBacSi(idBacSi) {
//             const startDate = this.getWeekStart(this.currentWeek);
//             const endDate = new Date(startDate);
//             endDate.setDate(startDate.getDate() + 6);
            
//             baseRequestAdmin.post(`admin/lich-lam-viec/data/${idBacSi}`, {
//                 from_date: startDate.toISOString().split('T')[0],
//                 to_date: endDate.toISOString().split('T')[0]
//             }, {
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("token_admin"),
//                 }
//             }).then(res => {
//                 if (res.data.status === true) {
//                     const doctorInfo = this.list_bac_si.find(bs => bs.id == idBacSi);
//                     this.list_lich_lam_viec_bac_si = res.data.data.map(item => ({
//                         ...item,
//                         id_bac_si: idBacSi,
//                         ho_ten: doctorInfo ? doctorInfo.ho_ten : 'Bác sĩ'
//                     }));
//                 } else {
//                     this.$toast.error(res.data.message);
//                     this.list_lich_lam_viec_bac_si = [];
//                 }
//             }).catch((res) => {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 });
//         },
//         updateTimeRange() {
//             const ca = this.create_lich_lam_viec.ca_lam_viec;
//             switch(ca) {
//                 case '1':   
//                     this.create_lich_lam_viec.thoi_gian_bat_dau = '08:00';
//                     this.create_lich_lam_viec.thoi_gian_ket_thuc = '12:00';
//                     break;
//                 case '2':
//                     this.create_lich_lam_viec.thoi_gian_bat_dau = '13:00';
//                     this.create_lich_lam_viec.thoi_gian_ket_thuc = '17:00';
//                     break;
//                 case '3':
//                     this.create_lich_lam_viec.thoi_gian_bat_dau = '18:00';
//                     this.create_lich_lam_viec.thoi_gian_ket_thuc = '21:00';
//                     break;
//                 default:
//                     this.create_lich_lam_viec.thoi_gian_bat_dau = '';
//                     this.create_lich_lam_viec.thoi_gian_ket_thuc = '';
//             }
//         },
//         createLichLamViec() {
//             baseRequestAdmin.post('admin/lich-lam-viec-bac-si/create', this.create_lich_lam_viec, {
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("token_admin"),
//                 }
//             }).then((res) => {
//                 if (res.data.status) {
//                     this.$toast.success(res.data.message);
//                     this.create_lich_lam_viec = {
//                         id_bac_si: '',
//                         ngay_lam_viec: '',
//                         ca_lam_viec: '',
//                         thoi_gian_bat_dau: '',
//                         thoi_gian_ket_thuc: '',
//                         tinh_trang: '1',
//                         ghi_chu: ''
//                     };
//                     this.loadDataLichLamViec();
//                     if (this.selected_bac_si) {
//                         this.loadLichLamViecBacSi(this.selected_bac_si);
//                     }
//                     const modal = bootstrap.Modal.getInstance(document.getElementById('themLichModaduoilich'));
//                     if (modal) modal.hide();
//                 } else {
//                     this.$toast.error(res.data.message);
//                 }
//             }).catch((res) => {
//                 if (res.response && res.response.data && res.response.data.errors) {
//                     const list = Object.values(res.response.data.errors);
//                     list.forEach((v) => {
//                         this.$toast.error(v[0]);
//                     });
//                 } else if (res.response && res.response.data && res.response.data.message) {
//                     this.$toast.error(res.response.data.message);
//                 } else {
//                     this.$toast.error(res.data.message);
//                 }
//             });
//         },
       
//     }
  
// }
</script>

<style></style>