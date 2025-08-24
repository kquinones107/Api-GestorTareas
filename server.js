require('dotenv').config();
const { connectDB } = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
