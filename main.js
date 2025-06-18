import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config(); // Carrega variáveis do .env

const app = express();
const port = 3000;

// Configura a API do Gemini com a chave da variável de ambiente
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());

// CORS (Permissivo em desenvolvimento, restrinja em produção)
app.use(cors({ origin: '*' }));

// Teste simples
app.get('/', (req, res) => {
  res.send('Servidor ativo!');
});

// Rota de login simulada
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === "admin" && senha === "1234") {
    return res.json({ isValid: true });
  }

  res.json({ isValid: false });
});

// Rota de chat com Gemini PRO
app.post('/gemini-chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Mensagem não fornecida.' });
  }

  try {
    // Usa o modelo Gemini PRO
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Envia a mensagem diretamente (sem histórico)
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text }); // Retorna a resposta para o frontend

  } catch (error) {
    console.error("Erro ao interagir com a API do Gemini:", error);
    res.status(500).json({ error: 'Erro ao processar sua solicitação com o Gemini AI.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});