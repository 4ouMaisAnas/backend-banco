import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('Olá mundo!!');
});

app.post('/login', (req, res) => {
  let usuario = req.body.usuario
  let senha = req.body.senha

  const predefinedUser = "admin";
  const predefinedPass = "1234";

  if (usuario === predefinedUser && senha === predefinedPass) {
    res.json({
      isValid: true
    })
  } else {
    res.json({
      isValid: false
    })
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});