import app from './src/app.js'
import dotenv from "dotenv";

// configuração para variáveis de ambiente
const config = dotenv.config();

const port = process.env.PORT || 3000;
// criar servidor localhost na porta 3000
app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})