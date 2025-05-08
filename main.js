import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('Olá mundo!!');
});

app.post('/login', (req, res) => {
  let usuario = req.body.user
  let senha = req.body.pass

  const predefinedUser = "admin";
    const predefinedPass = "1234";

    if (user === predefinedUser && pass === predefinedPass) {
        res.json({
          isValid:true
        })
    } else {
      res.json({
        isValid:false
      })
    }
});

app.get('/sugestoes', (req, res) => {
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  let sugestoes = [];
  for (let index = 0; index < 10; index++) {
    sugestoes.push("Item " + index);
  }
  res.send(sugestoes);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});