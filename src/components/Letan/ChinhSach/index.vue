<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-3 mb-4">
        <div class="card border-0 shadow-sm rounded-4">
          <div class="list-group list-group-flush" id="policy-tab" role="tablist">
            <a class="list-group-item list-group-item-action py-3 active"
               id="tab-general"
               data-bs-toggle="tab"
               href="#tab-content-general"
               role="tab"
               aria-controls="tab-content-general"
               aria-selected="true">
              <i class="fas fa-gavel me-2 text-primary"></i> Quy định chung
            </a>
            <a class="list-group-item list-group-item-action py-3"
               id="tab-appointment"
               data-bs-toggle="tab"
               href="#tab-content-appointment"
               role="tab"
               aria-controls="tab-content-appointment"
               aria-selected="false">
              <i class="fas fa-calendar-check me-2 text-success"></i> Quy định đặt lịch
            </a>
            <a class="list-group-item list-group-item-action py-3"
               id="tab-payment"
               data-bs-toggle="tab"
               href="#tab-content-payment"
               role="tab"
               aria-controls="tab-content-payment"
               aria-selected="false">
              <i class="fas fa-credit-card me-2 text-warning"></i> Chính sách thanh toán
            </a>
            <a class="list-group-item list-group-item-action py-3"
               id="tab-privacy"
               data-bs-toggle="tab"
               href="#tab-content-privacy"
               role="tab"
               aria-controls="tab-content-privacy"
               aria-selected="false">
              <i class="fas fa-user-secret me-2 text-info"></i> Bảo mật thông tin
            </a>
            <a class="list-group-item list-group-item-action py-3"
               id="tab-cancel"
               data-bs-toggle="tab"
               href="#tab-content-cancel"
               role="tab"
               aria-controls="tab-content-cancel"
               aria-selected="false">
              <i class="fas fa-ban me-2 text-danger"></i> Chính sách hủy lịch
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="card border-0 shadow-sm rounded-4">
          <div class="card-body p-4 p-md-5">
            <div class="tab-content" id="policy-tabContent">
              <!-- Quy định chung -->
              <div class="tab-pane fade show active" id="tab-content-general" role="tabpanel" aria-labelledby="tab-general">
                <h3 class="fw-bold mb-4 text-primary"><i class="fas fa-gavel me-2"></i>Quy định chung</h3>
                <div class="mb-4">
                  <h5 class="fw-bold">1. Giờ làm việc</h5>
                  <p>Phòng khám hoạt động từ <b>7:30 - 18:00</b> các ngày trong tuần (trừ các ngày lễ).</p>
                </div>
                <div class="mb-4">
                  <h5 class="fw-bold">2. Quy trình khám bệnh</h5>
                  <ul class="mb-0">
                    <li>Đặt lịch trước khi đến khám</li>
                    <li>Đến trước giờ hẹn 15 phút để làm thủ tục</li>
                    <li>Mang theo giấy tờ tùy thân và thẻ BHYT (nếu có)</li>
                    <li>Tuân thủ hướng dẫn của nhân viên y tế</li>
                  </ul>
                </div>
              </div>
              <!-- Quy định đặt lịch -->
              <div class="tab-pane fade" id="tab-content-appointment" role="tabpanel" aria-labelledby="tab-appointment">
                <h3 class="fw-bold mb-4 text-success"><i class="fas fa-calendar-check me-2"></i>Quy định đặt lịch</h3>
                <div class="mb-4">
                  <h5 class="fw-bold">1. Thời gian đặt lịch</h5>
                  <ul class="mb-0">
                    <li>Đặt lịch trước ít nhất 24 giờ</li>
                    <li>Có thể đặt lịch tối đa 30 ngày trước</li>
                    <li>Thời gian tư vấn trung bình 30 phút/ca</li>
                  </ul>
                </div>
                <div class="mb-4">
                  <h5 class="fw-bold">2. Xác nhận lịch hẹn</h5>
                  <ul class="mb-0">
                    <li>Nhận email xác nhận sau khi đặt lịch</li>
                    <li>Nhận SMS nhắc lịch trước 24 giờ</li>
                    <li>Có thể xem và quản lý lịch hẹn trong tài khoản</li>
                  </ul>
                </div>
              </div>
              <!-- Chính sách thanh toán -->
              <div class="tab-pane fade" id="tab-content-payment" role="tabpanel" aria-labelledby="tab-payment">
                <h3 class="fw-bold mb-4 text-warning"><i class="fas fa-credit-card me-2"></i>Chính sách thanh toán</h3>
                <div class="mb-4">
                  <h5 class="fw-bold">1. Phương thức thanh toán</h5>
                  <ul class="mb-0">
                    <li>Thanh toán tiền mặt</li>
                    <li>Chuyển khoản ngân hàng</li>
                    <li>Thẻ tín dụng/ghi nợ</li>
                    <li>Ví điện tử (Momo, VNPay)</li>
                  </ul>
                </div>
                <div class="mb-4">
                  <h5 class="fw-bold">2. Chính sách bảo hiểm</h5>
                  <ul class="mb-0">
                    <li>Áp dụng BHYT theo quy định</li>
                    <li>Hỗ trợ thanh toán bảo hiểm tư nhân</li>
                    <li>Cung cấp hóa đơn VAT theo yêu cầu</li>
                  </ul>
                </div>
              </div>
              <!-- Bảo mật thông tin -->
              <div class="tab-pane fade" id="tab-content-privacy" role="tabpanel" aria-labelledby="tab-privacy">
                <h3 class="fw-bold mb-4 text-info"><i class="fas fa-user-secret me-2"></i>Bảo mật thông tin</h3>
                <div class="mb-4">
                  <h5 class="fw-bold">1. Thông tin cá nhân</h5>
                  <ul class="mb-0">
                    <li>Bảo mật thông tin theo quy định pháp luật</li>
                    <li>Không chia sẻ thông tin cho bên thứ ba</li>
                    <li>Mã hóa dữ liệu người dùng</li>
                  </ul>
                </div>
                <div class="mb-4">
                  <h5 class="fw-bold">2. Hồ sơ bệnh án</h5>
                  <ul class="mb-0">
                    <li>Lưu trữ an toàn theo tiêu chuẩn y tế</li>
                    <li>Chỉ chia sẻ thông tin khi có sự đồng ý</li>
                    <li>Quyền truy cập và chỉnh sửa thông tin</li>
                  </ul>
                </div>
              </div>
              <!-- Chính sách hủy lịch -->
              <div class="tab-pane fade" id="tab-content-cancel" role="tabpanel" aria-labelledby="tab-cancel">
                <h3 class="fw-bold mb-4 text-danger"><i class="fas fa-ban me-2"></i>Chính sách hủy lịch</h3>
                <div class="mb-4">
                  <h5 class="fw-bold">1. Thời gian hủy lịch</h5>
                  <ul class="mb-0">
                    <li>Hủy lịch trước 24 giờ: không phí</li>
                    <li>Hủy lịch trong vòng 24 giờ: phí 50%</li>
                    <li>Không đến mà không báo: phí 100%</li>
                  </ul>
                </div>
                <div class="mb-4">
                  <h5 class="fw-bold">2. Đổi lịch hẹn</h5>
                  <ul class="mb-0">
                    <li>Đổi lịch trước 24 giờ: không phí</li>
                    <li>Được phép đổi tối đa 2 lần</li>
                    <li>Ưu tiên sắp xếp lịch gần nhất có thể</li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- end tab-content -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// export default {
//     data() {
//         return {
            
//         }
//     },
// };
</script>