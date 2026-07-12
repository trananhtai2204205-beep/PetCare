require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const { sequelize, Doctor, Customer, Pet, Appointment, MedicalRecord, Prescription, Vaccine, VaccinationRecord } = require('../models');

async function seed() {
  try {
    console.log('🌱 Bắt đầu tạo dữ liệu mẫu...');
    await sequelize.sync({ force: true });
    console.log('✅ Đã sync database');

    // ===== DOCTORS =====
    const docPassword = await bcrypt.hash('123456', 10);
    const doctor1 = await Doctor.create({
      name: 'BS. Nguyễn Minh Khoa',
      email: 'dr.khoa@petcare.vn',
      password: docPassword,
      phone: '0901234567',
      specialty: 'Thú y tổng quát',
      licenseNumber: 'BS-TV-2024-001',
    });
    const doctor2 = await Doctor.create({
      name: 'BS. Trần Thị Mai',
      email: 'dr.mai@petcare.vn',
      password: docPassword,
      phone: '0901234568',
      specialty: 'Ngoại khoa',
      licenseNumber: 'BS-TV-2024-002',
    });
    const doctor3 = await Doctor.create({
      name: 'BS. Lê Văn Hùng',
      email: 'dr.hung@petcare.vn',
      password: docPassword,
      phone: '0901234569',
      specialty: 'Nội khoa',
      licenseNumber: 'BS-TV-2024-003',
    });
    console.log('✅ Đã tạo 3 bác sĩ');

    // ===== CUSTOMERS =====
    const cusPassword = await bcrypt.hash('123456', 10);
    const cus1 = await Customer.create({
      name: 'Trần Thị Mai',
      email: 'mai@gmail.com',
      password: cusPassword,
      phone: '0912345678',
      address: 'Q1, TP.HCM',
    });
    const cus2 = await Customer.create({
      name: 'Nguyễn Văn Hùng',
      email: 'hung@gmail.com',
      password: cusPassword,
      phone: '0909876543',
      address: 'Q3, TP.HCM',
    });
    const cus3 = await Customer.create({
      name: 'Lê Thị Hoa',
      email: 'hoa@gmail.com',
      password: cusPassword,
      phone: '0938765432',
      address: 'Q7, TP.HCM',
    });
    const cus4 = await Customer.create({
      name: 'Phạm Minh Tuấn',
      email: 'tuan@gmail.com',
      password: cusPassword,
      phone: '0977123456',
      address: 'Bình Thạnh, TP.HCM',
    });
    const cus5 = await Customer.create({
      name: 'Nguyễn Thị Lan',
      email: 'lan.nguyen@gmail.com',
      password: cusPassword,
      phone: '0912345679',
      address: '123 Đường Lê Lợi, Q1, TP.HCM',
    });
    console.log('✅ Đã tạo 5 khách hàng');

    // ===== PETS =====
    const pet1 = await Pet.create({
      customerId: cus1.id,
      name: 'Mochi',
      species: 'cat',
      breed: 'Mèo Anh lông ngắn',
      age: 3,
      weight: 4.2,
      gender: 'male',
      color: 'Xám',
    });
    const pet2 = await Pet.create({
      customerId: cus2.id,
      name: 'Buddy',
      species: 'dog',
      breed: 'Golden Retriever',
      age: 2,
      weight: 28,
      gender: 'male',
      color: 'Vàng',
    });
    const pet3 = await Pet.create({
      customerId: cus3.id,
      name: 'Kitty',
      species: 'cat',
      breed: 'Mèo Ba Tư',
      age: 5,
      weight: 3.8,
      gender: 'female',
      color: 'Trắng',
    });
    const pet4 = await Pet.create({
      customerId: cus4.id,
      name: 'Rex',
      species: 'dog',
      breed: 'Husky',
      age: 1,
      weight: 15,
      gender: 'male',
      color: 'Đen trắng',
    });
    const pet5 = await Pet.create({
      customerId: cus1.id,
      name: 'Luna',
      species: 'rabbit',
      breed: 'Thỏ Hà Lan',
      age: 1,
      weight: 1.5,
      gender: 'female',
      color: 'Trắng đen',
    });
    console.log('✅ Đã tạo 5 thú cưng');

    // ===== APPOINTMENTS =====
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const appt1 = await Appointment.create({
      petId: pet1.id, doctorId: doctor1.id, customerId: cus1.id,
      date: today, time: '08:30', type: 'checkup', status: 'waiting',
      notes: 'Thú cưng bỏ ăn 2 ngày',
    });
    const appt2 = await Appointment.create({
      petId: pet2.id, doctorId: doctor1.id, customerId: cus2.id,
      date: today, time: '09:00', type: 'vaccination', status: 'in_progress',
      notes: 'Tiêm vaccine năm thứ 2',
    });
    const appt3 = await Appointment.create({
      petId: pet3.id, doctorId: doctor1.id, customerId: cus3.id,
      date: today, time: '10:30', type: 'checkup', status: 'completed',
      notes: '',
    });
    const appt4 = await Appointment.create({
      petId: pet4.id, doctorId: doctor1.id, customerId: cus4.id,
      date: today, time: '14:00', type: 'surgery', status: 'waiting',
      notes: 'Triệt sản',
    });
    const appt5 = await Appointment.create({
      petId: pet5.id, doctorId: doctor1.id, customerId: cus1.id,
      date: today, time: '15:30', type: 'follow_up', status: 'waiting',
      notes: 'Tái khám sau mổ',
    });
    const appt6 = await Appointment.create({
      petId: pet1.id, doctorId: doctor1.id, customerId: cus1.id,
      date: tomorrow, time: '09:00', type: 'checkup', status: 'waiting',
      notes: 'Tái khám',
    });
    const appt7 = await Appointment.create({
      petId: pet2.id, doctorId: doctor1.id, customerId: cus2.id,
      date: yesterday, time: '11:00', type: 'grooming', status: 'completed',
      notes: 'Cắt móng, tắm',
    });
    console.log('✅ Đã tạo 7 lịch hẹn');

    // ===== MEDICAL RECORDS =====
    const rec1 = await MedicalRecord.create({
      appointmentId: appt3.id,
      petId: pet3.id,
      doctorId: doctor1.id,
      symptoms: ['Bỏ ăn', 'Nôn mửa', 'Uể oải'],
      diagnosis: 'Rối loạn tiêu hóa nhẹ, nghi do thức ăn không phù hợp',
      treatment: 'Nhịn ăn 12 giờ, cho uống nước điện giải. Sau đó ăn thức ăn nhẹ dễ tiêu.',
      notes: 'Chủ nhân cần theo dõi tình trạng trong 48 giờ. Tái khám nếu không cải thiện.',
      weight: 3.8,
      temperature: 38.5,
      nextVisitDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    });
    await Prescription.bulkCreate([
      {
        medicalRecordId: rec1.id,
        medical_record_id: rec1.id,
        medicineName: 'Smecta',
        dosage: '1 gói',
        frequency: '3 lần/ngày',
        duration: '3 ngày',
        instructions: 'Pha với 50ml nước, cho uống trước ăn 30 phút',
      },
      {
        medicalRecordId: rec1.id,
        medical_record_id: rec1.id,
        medicineName: 'Vitamin B complex',
        dosage: '1 viên',
        frequency: '1 lần/ngày',
        duration: '7 ngày',
        instructions: 'Cho ăn cùng thức ăn',
      },
    ]);

    const rec2 = await MedicalRecord.create({
      appointmentId: appt7.id,
      petId: pet2.id,
      doctorId: doctor1.id,
      symptoms: ['Lông xơ xác', 'Móng dài'],
      diagnosis: 'Chăm sóc định kỳ - không có bệnh lý',
      treatment: 'Tắm, sấy, cắt móng, vệ sinh tai',
      notes: 'Thú cưng khỏe mạnh. Lịch tắm tiếp theo sau 1 tháng.',
      weight: 28,
      temperature: 38.8,
    });
    console.log('✅ Đã tạo hồ sơ bệnh và đơn thuốc');

    // ===== VACCINES =====
    const vac1 = await Vaccine.create({ name: 'DHPPI', description: 'Phòng bệnh Carré, Parvo, Parainfluenza, Adenovirus', manufacturer: 'Nobivac', dosage: '1ml tiêm dưới da', intervalDays: 365, requiredDoses: 2 });
    const vac2 = await Vaccine.create({ name: 'Dại (Rabies)', description: 'Phòng bệnh dại - bắt buộc theo quy định', manufacturer: 'Rabisin', dosage: '1ml tiêm bắp', intervalDays: 365, requiredDoses: 2 });
    const vac3 = await Vaccine.create({ name: 'Lepto', description: 'Phòng bệnh leptospirosis (xoắn khuẩn)', manufacturer: 'Nobivac', dosage: '1ml tiêm dưới da', intervalDays: 365, requiredDoses: 2 });
    const vac4 = await Vaccine.create({ name: 'FVRCP', description: 'Phòng bệnh hô hấp, viêm mũi, Panleukopenia ở mèo', manufacturer: 'Purevax', dosage: '1ml tiêm dưới da', intervalDays: 365, requiredDoses: 2 });
    const vac5 = await Vaccine.create({ name: 'FeLV', description: 'Phòng bệnh bạch cầu mèo (FeLV)', manufacturer: 'Purevax', dosage: '1ml tiêm dưới da', intervalDays: 365, requiredDoses: 2 });
    const vac6 = await Vaccine.create({ name: 'Bordetella', description: 'Phòng bệnh viêm phế quản truyền nhiễm ở chó', manufacturer: 'Bronchi-Shield', dosage: 'Nhỏ mũi', intervalDays: 365, requiredDoses: 1 });
    console.log('✅ Đã tạo 6 loại vaccine');

    // ===== VACCINATION RECORDS =====
    const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
    const nextMonth = new Date(Date.now() + 25 * 86400000).toISOString().split('T')[0];
    const lastMonth = new Date(Date.now() - 20 * 86400000).toISOString().split('T')[0];
    const overdueDate = new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0];

    await VaccinationRecord.bulkCreate([
      { petId: pet2.id, vaccineId: vac1.id, doctorId: doctor1.id, doseNumber: 2, administeredDate: lastMonth, nextDueDate: nextWeek, status: 'scheduled', batchNumber: 'LOT2024-001', notes: 'Nhắc nhở chủ 3 ngày trước' },
      { petId: pet1.id, vaccineId: vac4.id, doctorId: doctor1.id, doseNumber: 1, administeredDate: lastMonth, nextDueDate: nextMonth, status: 'scheduled', batchNumber: 'LOT2024-002', notes: '' },
      { petId: pet3.id, vaccineId: vac2.id, doctorId: doctor1.id, doseNumber: 2, administeredDate: overdueDate, nextDueDate: overdueDate, status: 'overdue', notes: 'Cần liên hệ chủ ngay' },
      { petId: pet4.id, vaccineId: vac1.id, doctorId: doctor1.id, doseNumber: 1, administeredDate: tomorrow, nextDueDate: tomorrow, status: 'scheduled', notes: 'Mũi đầu tiên' },
      { petId: pet2.id, vaccineId: vac2.id, doctorId: doctor1.id, doseNumber: 1, administeredDate: new Date(Date.now() - 365 * 86400000).toISOString().split('T')[0], nextDueDate: new Date(Date.now() - 365 * 86400000).toISOString().split('T')[0], status: 'completed', batchNumber: 'LOT2023-005', notes: '' },
    ]);
    console.log('✅ Đã tạo lịch vaccine');

    console.log('\n🎉 Seed thành công!');
    console.log('------------------------------------');
    console.log('📧 Tài khoản bác sĩ:');
    console.log('   Email: dr.khoa@petcare.vn | Pass: 123456');
    console.log('   Email: dr.mai@petcare.vn  | Pass: 123456');
    console.log('   Email: dr.hung@petcare.vn | Pass: 123456');
    console.log('📧 Tài khoản khách hàng:');
    console.log('   Email: lan.nguyen@gmail.com | Pass: 123456');
    console.log('   Email: mai@gmail.com         | Pass: 123456');
    console.log('   Email: hung@gmail.com        | Pass: 123456');
    console.log('------------------------------------');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed thất bại:', err);
    process.exit(1);
  }
}

seed();
