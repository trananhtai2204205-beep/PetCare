require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const doctorRoutes = require('./src/routes/doctor.routes');
const customerRoutes = require('./src/routes/customer.routes');
const petRoutes = require('./src/routes/pet.routes');
const appointmentRoutes = require('./src/routes/appointment.routes');
const medicalRecordRoutes = require('./src/routes/medicalRecord.routes');
const vaccineRoutes = require('./src/routes/vaccine.routes');
const vaccinationRoutes = require('./src/routes/vaccination.routes');

// Import DB & error handler
const { sequelize } = require('./src/models');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors({
  origin: [
    'http://localhost:5173', // Doctor Portal
    'http://localhost:5174', // Customer Portal
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/vaccines', vaccineRoutes);
app.use('/api/vaccinations', vaccinationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🐾 PetCare API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} không tồn tại` });
});

// Global error handler
app.use(errorHandler);

// ===== START SERVER =====
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối database thành công!');

    // Tự động sync các model (không force - giữ nguyên dữ liệu)
    await sequelize.sync({ alter: false });
    console.log('✅ Database synced!');

    app.listen(PORT, () => {
      console.log(`\n🚀 PetCare Backend đang chạy trên port ${PORT}`);
      console.log(`📍 API URL: http://localhost:${PORT}/api`);
      console.log(`💊 Health: http://localhost:${PORT}/api/health`);
      console.log(`\n📋 API Endpoints:`);
      console.log(`   POST /api/auth/doctor/login`);
      console.log(`   POST /api/auth/customer/login`);
      console.log(`   POST /api/auth/customer/register`);
      console.log(`   GET  /api/appointments`);
      console.log(`   GET  /api/medical-records`);
      console.log(`   GET  /api/vaccinations`);
    });
  } catch (err) {
    console.error('❌ Không thể khởi động server:', err.message);
    console.error('\n💡 Hướng dẫn: Kiểm tra lại thông tin database trong file .env');
    process.exit(1);
  }
}

startServer();
