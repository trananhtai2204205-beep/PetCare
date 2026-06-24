<template>
    <div class="row">
        <div class="col-12">
            <div class="card border-0 shadow-sm">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Lịch cá nhân tuần này</h5>
                    <div>
                        <button class="btn btn-outline-secondary btn-sm me-2" @click="changeWeek(-1)">
                            <i class='bx bx-chevron-left'></i> Tuần trước
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" @click="changeWeek(1)">
                            Tuần sau <i class='bx bx-chevron-right'></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-2 fw-semibold">{{ weekTitle }}</div>
                    <div class="row g-0 border rounded">
                        <div class="col-12">
                            <div class="row g-0">
                                <div class="col" v-for="day in weekDays" :key="day.name">
                                    <div class="p-2 bg-light border-end text-center fw-bold">
                                        {{ day.name }}<br>
                                        <small class="text-muted">{{ day.date }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row g-0" style="min-height: 360px;">
                                <div class="col border-end" v-for="(day, idx) in weekDays" :key="idx">
                                    <div class="p-2 h-100" style="min-height: 360px;">
                                        <div  class="mb-2 p-2 border rounded bg-light">
                                            <div class="small text-muted">
                                                <span class="badge bg-success me-1" >Sáng</span>
                                                <span class="badge bg-info text-dark me-1" >Chiều</span>
                                                <span class="badge bg-warning text-dark me-1" >Tối</span>
                                            </div>
                                            <div class="small text-muted">TGBT - TGKT </div>
                                        </div>
                                        <div  class="text-center text-muted py-3 small">
                                            Không có lịch
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
</template>
<script>
// import baseRequestBacsi from '../../../core/baseRequestBacsi';

export default {
    data() {
        return {
            currentWeek: new Date(),
            schedules: [],
        };
    },
    computed: {
        weekTitle() {
            const start = this.getWeekStart(this.currentWeek);
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            return `${this.formatDate(start)} - ${this.formatDate(end)}`;
        },
        weekDays() {
            const start = this.getWeekStart(this.currentWeek);
            const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
            return days.map((name, index) => {
                const date = new Date(start);
                date.setDate(start.getDate() + index);
                return { name, date: this.formatDate(date) };
            });
        },
    },
    // mounted() {
    //     this.loadSchedules();
    // },
    methods: {
        getWeekStart(date) {
            const d = new Date(date);
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            d.setDate(diff);
            d.setHours(0, 0, 0, 0);
            return d;
        },
        formatDate(date) {
            return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        },
        changeWeek(step) {
            const n = new Date(this.currentWeek);
            n.setDate(n.getDate() + step * 7);
            this.currentWeek = n;
            this.loadSchedules();
        },
        // getSchedulesForDay(dateStr) {
        //     return this.schedules.filter(s => this.formatDate(new Date(s.ngay_lam_viec)) === dateStr);
        // },
        // isMorning(item) {
        //     return item.thoi_gian_bat_dau && item.thoi_gian_bat_dau < '12:00';
        // },
        // isAfternoon(item) {
        //     return item.thoi_gian_bat_dau && item.thoi_gian_bat_dau >= '12:00' && item.thoi_gian_bat_dau < '18:00';
        // },
        // isEvening(item) {
        //     return item.thoi_gian_bat_dau && item.thoi_gian_bat_dau >= '18:00';
        // },
        loadSchedules() {
            const start = this.getWeekStart(this.currentWeek);
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            // baseRequestBacsi.get('bac-si/lich-lam-viec/data', {
            //     headers: {
            //         Authorization: "Bearer " + localStorage.getItem("token_bac_si"),
            //     },
            // })
            //     .then(res => {
            //         this.schedules = res.data.data;
            //     })
            //     .catch((res) => {
            //         const list = Object.values(res.response.data.errors);
            //         list.forEach((v) => {
            //             this.$toast.error(v[0]);
            //         });
                // });
        },
    }
}
</script>
<style>
</style>