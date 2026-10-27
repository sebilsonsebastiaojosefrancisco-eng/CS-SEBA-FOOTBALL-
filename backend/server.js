const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_FOOTBALL_KEY;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    projeto: "CS SEBA FOOTBALL",
    estado: "Servidor ativo"
  });
});

app.get("/api/fixtures", async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({
      erro: "A chave da API ainda não foi configurada no servidor."
    });
  }

  try {
    const data = new Date().toISOString().slice(0, 10);
    const resposta = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${data}`,
      {
        headers: {
          "x-apisports-key": API_KEY
        }
      }
    );

    const resultado = await resposta.json();
    res.status(resposta.ok ? 200 : resposta.status).json(resultado);
  } catch (erro) {
    res.status(502).json({
      erro: "Não foi possível obter os jogos da API-Football."
    });
  }
});

app.listen(PORT, () => {
  console.log(`CS SEBA FOOTBALL ativo na porta ${PORT}`);
});
  
