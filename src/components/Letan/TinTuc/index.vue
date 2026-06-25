<template>
  <div class="container py-5">
    <div class="row mb-4">
  <div class="col-12">
    <div class="card border-0 shadow-sm rounded-4 p-3 p-md-4">
      <form>
        <div class="row g-2 align-items-center">
          <div class="col-md-8">
            <div class="input-group">
              <input type="text" class="form-control form-control-lg rounded-start-pill" placeholder="Tìm kiếm tin tức...">
              <button class="btn btn-primary rounded-end-pill px-4" type="button">
                <i class="fas fa-search me-1"></i> Tìm kiếm
              </button>
            </div>
          </div>
          <div class="col-md-4">
            <select class="form-select form-select-lg rounded-pill">
              <option selected>Tất cả danh mục</option>
              <option>Sức khỏe tổng quát</option>
              <option>Dinh dưỡng</option>
              <option>Tư vấn</option>
              <option>Tin tức</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

    <!-- Featured News -->
    <div class="card border-0 shadow-lg mb-5 overflow-hidden">
      <div class="row g-0">
        <div class="col-md-6">
          <img src="https://img.freepik.com/free-photo/woman-doctor-wearing-gloves-face-mask_23-2148684510.jpg"
            class="img-fluid h-100 w-100 object-fit-cover" style="min-height:300px;object-fit:cover;" alt="Phòng ngừa COVID-19: Những điều cần biết">
        </div>
        <div class="col-md-6">
          <div class="card-body p-4">
            <span class="badge bg-primary mb-2 px-3 py-2 fs-6">Nổi bật</span>
            <h2 class="card-title fw-bold mb-3">Phòng ngừa COVID-19: Những điều cần biết</h2>
            <p class="card-text text-muted mb-3">Cập nhật những thông tin mới nhất về cách phòng ngừa và bảo vệ bản thân trước đại dịch COVID-19...</p>
            <div class="d-flex align-items-center mb-3">
              <img src="https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg"
                class="rounded-circle me-2" width="40" height="40" alt="BS. Nguyễn Văn A">
              <div>
                <h6 class="mb-0">BS. Nguyễn Văn A</h6>
                <small class="text-muted">15/03/2024</small>
              </div>
            </div>
            <a href="#" class="btn btn-primary rounded-pill px-4">Đọc thêm</a>
          </div>
        </div>
      </div>
    </div>

    <!-- News Grid -->
    <div class="row">
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 border-0 shadow-sm">
          <img src="https://img.freepik.com/free-photo/senior-woman-consulting-with-doctor_23-2148962371.jpg"
            class="card-img-top" style="height: 200px; object-fit: cover;" alt="Chế độ ăn uống lành mạnh cho người cao tuổi">
          <div class="card-body">
            <span class="badge bg-success mb-2">Dinh dưỡng</span>
            <h5 class="card-title fw-bold mt-2">Chế độ ăn uống lành mạnh cho người cao tuổi</h5>
            <p class="card-text text-muted">Những lời khuyên về dinh dưỡng giúp người cao tuổi duy trì sức khỏe tốt...</p>
          </div>
          <div class="card-footer bg-white border-0">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img src="https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg"
                  class="rounded-circle me-2" width="30" height="30" alt="BS. Lê Thị B">
                <small class="text-muted">BS. Lê Thị B</small>
              </div>
              <small class="text-muted">14/03/2024</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 border-0 shadow-sm">
          <img src="https://img.freepik.com/free-photo/physiotherapist-helping-patient-with-exercise_23-2148957239.jpg"
            class="card-img-top" style="height: 200px; object-fit: cover;" alt="Tập thể dục đúng cách để phòng ngừa bệnh tật">
          <div class="card-body">
            <span class="badge bg-primary mb-2">Sức khỏe tổng quát</span>
            <h5 class="card-title fw-bold mt-2">Tập thể dục đúng cách để phòng ngừa bệnh tật</h5>
            <p class="card-text text-muted">Hướng dẫn chi tiết về các bài tập thể dục phù hợp với từng độ tuổi...</p>
          </div>
          <div class="card-footer bg-white border-0">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img src="https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg"
                  class="rounded-circle me-2" width="30" height="30" alt="BS. Trần Văn C">
                <small class="text-muted">BS. Trần Văn C</small>
              </div>
              <small class="text-muted">13/03/2024</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 border-0 shadow-sm">
          <img src="https://img.freepik.com/free-photo/doctor-examining-patient-with-stethoscope_23-2148957227.jpg"
            class="card-img-top" style="height: 200px; object-fit: cover;" alt="Các dấu hiệu cảnh báo sớm của bệnh tim mạch">
          <div class="card-body">
            <span class="badge bg-info mb-2 text-white">Tư vấn</span>
            <h5 class="card-title fw-bold mt-2">Các dấu hiệu cảnh báo sớm của bệnh tim mạch</h5>
            <p class="card-text text-muted">Nhận biết sớm các triệu chứng của bệnh tim mạch để có biện pháp phòng ngừa kịp thời...</p>
          </div>
          <div class="card-footer bg-white border-0">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img src="https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg"
                  class="rounded-circle me-2" width="30" height="30" alt="BS. Phạm Thị D">
                <small class="text-muted">BS. Phạm Thị D</small>
              </div>
              <small class="text-muted">12/03/2024</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="row mt-4">
      <div class="col-12">
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">
                <i class="fas fa-chevron-left"></i>
              </a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">5</a></li>
            <li class="page-item">
              <a class="page-link" href="#">
                <i class="fas fa-chevron-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
// export default {
//     data() {
//         return {
//         // Data properties can be added here if needed
//         };
//     },
//     methods: {
//         // Methods can be added here if needed
//     }
// }
</script>
