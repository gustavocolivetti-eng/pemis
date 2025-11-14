
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const readJSON = (file) => JSON.parse(fs.readFileSync(file, "utf-8"));
const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

app.get("/produtos", (req, res) => {
  const produtos = readJSON("./data/produtos.json");
  res.json(produtos);
});

app.post("/pedidos", (req, res) => {
  const pedidos = readJSON("./data/pedidos.json");
  const novoPedido = req.body;
  novoPedido.id = pedidos.length + 1;
  novoPedido.data = new Date();
  pedidos.push(novoPedido);
  writeJSON("./data/pedidos.json", pedidos);
  res.json({ message: "Pedido recebido!", pedido: novoPedido });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
