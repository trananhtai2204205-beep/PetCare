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
                <h3 class="fw-bold mb-4 text-primary">
                  <i class="fas fa-gavel me-2"></i>Quy định chung
                </h3>

                <div class="mb-4">
                  <h5 class="fw-bold">1. Thời gian làm việc</h5>
                  <p>
                    PetCare phục vụ khách hàng từ <b>07:30 - 18:00</b> tất cả các ngày trong tuần.
                    Đối với các trường hợp khẩn cấp, vui lòng liên hệ hotline để được hỗ trợ nhanh nhất.
                  </p>
                </div>

                <div class="mb-4">
                  <h5 class="fw-bold">2. Quy trình khám thú cưng</h5>
                  <ul class="mb-0">
                    <li>Đặt lịch trước để được phục vụ nhanh hơn.</li>
                    <li>Đưa thú cưng đến đúng giờ hẹn.</li>
                    <li>Cung cấp đầy đủ thông tin về tình trạng sức khỏe của thú cưng.</li>
                    <li>Tuân thủ hướng dẫn của bác sĩ và nhân viên PetCare.</li>
                  </ul>
                </div>
              </div>

              <!-- Quy định đặt lịch -->
              <div class="tab-pane fade" id="tab-content-appointment" role="tabpanel" aria-labelledby="tab-appointment">
                <h3 class="fw-bold mb-4 text-success">
                  <i class="fas fa-calendar-check me-2"></i>Quy định đặt lịch
                </h3>

                <div class="mb-4">
                  <h5 class="fw-bold">1. Đăng ký lịch khám</h5>
                  <ul class="mb-0">
                    <li>Đặt lịch trực tuyến hoặc qua hotline.</li>
                    <li>Có thể đặt lịch trước tối đa 30 ngày.</li>
                    <li>Lựa chọn bác sĩ, chuyên khoa và thời gian phù hợp.</li>
                  </ul>
                </div>

                <div class="mb-4">
                  <h5 class="fw-bold">2. Xác nhận lịch hẹn</h5>
                  <ul class="mb-0">
                    <li>Hệ thống gửi thông báo xác nhận sau khi đặt lịch thành công.</li>
                    <li>Khách hàng nên đến trước giờ hẹn khoảng 10 - 15 phút.</li>
                    <li>Có thể thay đổi lịch hẹn nếu thông báo trước.</li>
                  </ul>
                </div>
              </div>

              <!-- Chính sách thanh toán -->
              <div class="tab-pane fade" id="tab-content-payment" role="tabpanel" aria-labelledby="tab-payment">
                <h3 class="fw-bold mb-4 text-warning">
                  <i class="fas fa-credit-card me-2"></i>Chính sách thanh toán
                </h3>

                <div class="mb-4">
                  <h5 class="fw-bold">1. Hình thức thanh toán</h5>
                  <ul class="mb-0">
                    <li>Thanh toán bằng tiền mặt.</li>
                    <li>Chuyển khoản ngân hàng.</li>
                    <li>Thanh toán qua thẻ ATM, Visa, MasterCard.</li>
                    <li>Ví điện tử như MoMo hoặc VNPay.</li>
                  </ul>
                </div>

                <div class="mb-4">
                  <h5 class="fw-bold">2. Hóa đơn</h5>
                  <ul class="mb-0">
                    <li>Xuất hóa đơn theo yêu cầu của khách hàng.</li>
                    <li>Bảng giá dịch vụ được niêm yết công khai.</li>
                    <li>Không phát sinh chi phí ngoài thông báo.</li>
                  </ul>
                </div>
              </div>

              <!-- Bảo mật -->
              <div class="tab-pane fade" id="tab-content-privacy" role="tabpanel" aria-labelledby="tab-privacy">
                <h3 class="fw-bold mb-4 text-info">
                  <i class="fas fa-user-secret me-2"></i>Bảo mật thông tin
                </h3>

                <div class="mb-4">
                  <h5 class="fw-bold">1. Thông tin khách hàng</h5>
                  <ul class="mb-0">
                    <li>Mọi thông tin cá nhân được bảo mật tuyệt đối.</li>
                    <li>Không chia sẻ dữ liệu cho bên thứ ba khi chưa được đồng ý.</li>
                    <li>Thông tin chỉ được sử dụng để hỗ trợ dịch vụ tại PetCare.</li>
                  </ul>
                </div>

                <div class="mb-4">
                  <h5 class="fw-bold">2. Hồ sơ thú cưng</h5>
                  <ul class="mb-0">
                    <li>Lưu trữ lịch sử khám và điều trị an toàn.</li>
                    <li>Chủ nuôi có thể xem lịch sử khám của thú cưng.</li>
                    <li>Hồ sơ được cập nhật sau mỗi lần khám hoặc điều trị.</li>
                  </ul>
                </div>
              </div>

              <!-- Hủy lịch -->
              <div class="tab-pane fade" id="tab-content-cancel" role="tabpanel" aria-labelledby="tab-cancel">
                <h3 class="fw-bold mb-4 text-danger">
                  <i class="fas fa-ban me-2"></i>Chính sách hủy lịch
                </h3>

                <div class="mb-4">
                  <h5 class="fw-bold">1. Hủy lịch hẹn</h5>
                  <ul class="mb-0">
                    <li>Khách hàng nên hủy lịch trước ít nhất 12 giờ.</li>
                    <li>Việc hủy lịch hoàn toàn miễn phí.</li>
                    <li>Nếu không đến mà không báo trước nhiều lần, hệ thống có thể hạn chế đặt lịch trực tuyến.</li>
                  </ul>
                </div>

                <div class="mb-4">
                  <h5 class="fw-bold">2. Thay đổi lịch hẹn</h5>
                  <ul class="mb-0">
                    <li>Có thể đổi lịch khi còn khung giờ trống.</li>
                    <li>PetCare sẽ hỗ trợ sắp xếp lịch phù hợp nhất.</li>
                    <li>Mọi thay đổi sẽ được xác nhận qua hệ thống.</li>
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