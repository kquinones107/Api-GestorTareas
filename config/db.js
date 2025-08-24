const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado a MongoDB');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
