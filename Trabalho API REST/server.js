import app from './src/app.js'

// criar servidor localhost na porta 3000

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})