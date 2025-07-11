const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
  } catch (error) {
    console.error('No se pudo conectar a la DB:', error);
  }
})();
