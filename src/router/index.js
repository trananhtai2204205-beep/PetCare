import { createRouter, createWebHistory } from "vue-router";
const routes = [

    // TRANG CHỦ
    {
        path: "/",
        component: ()=> import("../components/Letan/TrangChu/index.vue"),
        meta: {
            layout: "letan-layout"
        }
    },

    // ĐĂNG NHẬP ADMIN
    {
        path: "/admin/login",
        component: () => import("../components/Admin/login/index.vue"),
        meta: {
            layout: "blank-layout",
        },
    },

    // ĐĂNG NHẬP , ĐĂNG KÝ LỄ TÂN
    {
        path: "/login",
        component: () => import("../components/Letan/Login/index.vue"),
        meta: {
            layout: "blank",
        },
    },
    {
        path: "/dang-ky",
        component: () => import("../components/Letan/dangky/index.vue"),
        meta: {
            layout: "blank",
        },
    },






    // ĐĂNG NHẬP , ĐĂNG KÝ BÁC SĨ
    {
        path: "/bac-si/login",
        component: () => import("../components/Bacsi/dangNhap/index.vue"),
        meta: {
            layout: "blank",
        },
    },

    {
        path: "/bac-si/dang-ky",
        component: () => import("../components/Bacsi/dangKy/index.vue"),
        meta: {
            layout: "blank",
        },
    },
    {
        path: "/bac-si/lich-hen",
        component: () => import("../components/Bacsi/LichHen/index.vue"),
        meta: {
            layout: "bac-si-layout",
        },
    },
    {
        path: "/bac-si/lich-ca-nhan",
        component: () => import("../components/Bacsi/LichCaNhan/index.vue"),
        meta: {
            layout: "bac-si-layout",
        },
    },
    {
        path: "/bac-si/quan-ly-benh-nhan",
        component: () => import("../components/Bacsi/QuanLyBenhNhan/index.vue"),
        meta: {
            layout: "bac-si-layout",
        },
    },
    {
        path: "/bac-si/quen-mat-khau",
        component: () => import("../components/Bacsi/QuenMatKhau/index.vue"),
        meta: {
            layout: "blank",
        },
    },
    {
        path: "/bac-si/profile",
        component: () => import("../components/Bacsi/Profile/index.vue"),
        meta: {
            layout: "bac-si-layout",
        },
    },
    {
        path: "/bac-si/kich-hoat/:ma_code",
        component: () => import("../components/Bacsi/KichHoat/index.vue"),
        meta: {
            layout: "blank",
            },
        props :true
    },


    // DASHBOARD ADMIN
    {
        path: "/admin/dashboard",
        component: () => import("../components/Admin/dashboard/index.vue"),
        meta: {
            layout: "admin-layout"
        },
    },
    
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
export default router;
