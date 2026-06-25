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
        path: "/admin/dashboard",
        component: () => import("../components/Admin/dashboard/index.vue"),
        meta: {
            layout: "admin-layout"
        },
    },
    {
        path: "/admin/login",
        component: () => import("../components/Admin/login/index.vue"),
        meta: {
            layout: "blank-layout",
        },
    },

    {
        path: "/admin/danh-sach-bac-si",
        component: () => import("../components/Admin/QuanLyBacSi/DanhSach.vue"),
        meta: {
            layout: "admin-layout",
        },
            
    },
    {
        path: "/admin/bac-si/lich-lam-viec",
        component: () => import("../components/Admin/QuanLyBacSi/LichLamViec.vue"),
        meta: {
            layout: "admin-layout",
        },
    // beforeEnter: checkAdmin,
    },
    {
        path: "/admin/lich-hen",
        component: () => import("../components/Admin/QuanLyBacSi/LichHen.vue"),
        meta: {
        layout: "admin-layout",
            },
            // beforeEnter: checkAdmin,
    },
    {
        path: "/admin/danh-sach",
        component: () => import("../components/Admin/QuanLyPetCare/DanhSachPetCare.vue"),
        meta: {
        layout: "admin-layout",
            },
            // beforeEnter: checkAdmin,
    },
    {
    path: "/admin/ho-so-benh-an",
    component: () => import("../components/Admin/QuanLyPetCare/HoSoPetCare.vue"),
    meta: {
      layout: "admin-layout",
    },
    // beforeEnter: checkAdmin,
    },
    {
        path: "/admin/chuyen-khoa",
        component: () => import("../components/Admin/QuanLyChuyenKhoa/index.vue"),
        meta: {
        layout: "admin-layout",
        },
    // beforeEnter: checkAdmin,
    },
    {
    path: "/admin/phong-kham",
    component: () => import("../components/Admin/QuanLyPhongKham/index.vue"),
    meta: {
      layout: "admin-layout",
        },
            // beforeEnter: checkAdmin,
    },
    {
    path: "/admin/phan-quyen",
    component: () => import("../components/Admin/PhanQuyen/PhanQuyenChucVu.vue"),
    meta: {
      layout: "admin-layout",
    },
    // beforeEnter: checkAdmin,
    },
    {
        path: "/admin/nhan-vien",
        component: () => import("../components/Admin/PhanQuyen/PhanQuyenNhanVien.vue"),
        meta: {
        layout: "admin-layout",
        },
        // beforeEnter: checkAdmin,
    },
    {
        path: "/admin/thong-ke/lich-lam-viec-theo-phong-kham",
        component: () => import("../components/Admin/ThongKeBaoCao/LichLamViecTheoPhongKham.vue"),
        meta: {
        layout: "admin-layout",
        },
        // beforeEnter: checkAdmin,
    },
    {
        path: "/admin/thong-ke/lich-hen-chuyen-khoa",
        component: () => import("../components/Admin/ThongKeBaoCao/LichHenChuyenKhoa.vue"),
        meta: {
        layout: "admin-layout",
        },
        // beforeEnter: checkAdmin,
    },
    {
        path: "/admin/thong-ke/lich-hen-bac-si",
        component: () => import("../components/Admin/ThongKeBaoCao/LichHenBacSi.vue"),
        meta: {
        layout: "admin-layout",
        },
        // beforeEnter: checkAdmin,
    },
    {
        path: "/admin/thong-ke/benh-nhan-theo-bac-si",
        component: () => import("../components/Admin/ThongKeBaoCao/BenhNhanTheoBacSi.vue"),
        meta: {
        layout: "admin-layout",
        },
        // beforeEnter: checkAdmin,
    },
    {
        path: "/admin/thong-ke/bac-si-theo-phong-kham",
        component: () => import("../components/Admin/ThongKeBaoCao/BacSiTheoPhongKham.vue"),
        meta: {
        layout: "admin-layout",
        },
        // beforeEnter: checkAdmin,
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
    {
        path: "/chinh-sach",
        component: () => import("../components/Letan/ChinhSach/index.vue"),
        meta: {
        layout: "letan-layout",
        },
    },
    {
        path: "/lien-he",
        component: () => import("../components/Letan/LienHe/index.vue"),
        meta: {
        layout: "letan-layout",
        },
    },
    {
        path: "/bac-si",
        component: () => import("../components/Letan/BacSi/index.vue"),
        meta: {
        layout: "letan-layout",
        },
    },
    {
        path: "/gioi-thieu",
        component: () => import("../components/Letan/GioiThieu/index.vue"),
        meta: {
        layout: "letan-layout",
        },
    },
    {
        path: "/tin-tuc",
        component: () => import("../components/Letan/TinTuc/index.vue"),
        meta: {
        layout: "letan-layout",
        },
    },
    {
        path: "/dat-kham",
        component: () => import("../components/Letan/DatKham/index.vue"),  
        meta: {
        layout: "letan-layout",
        },
    },
    {
            path: "/ho-so",
            component: () => import("../components/Letan/HoSo/index.vue"),  
            meta: {
            layout: "letan-layout",
            },
    },
    {
            path: "/lich-hen",
            component: () => import("../components/Letan/LichHen/index.vue"),  
            meta: {
            layout: "letan-layout",
            },
    },
    {
                path: "/chuyen-khoa-Petcare",
                component: () => import("../components/Letan/ChuyenKhoa/index.vue"),  
                meta: {
                layout: "letan-layout",
                },
    },
    {
                path: "/lich-hen-thanh-toan",
                component: () => import("../components/Letan/LichHenThanhToan/index.vue"),  
                meta: {
                layout: "letan-layout",
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


   
    
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
export default router;
