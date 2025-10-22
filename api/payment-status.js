const axios = require("axios");

module.exports = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    res.status(400).json({ error: "Falta o ID do pagamento" });
    return;
  }

  try {
    const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
    const resposta = await axios.get(
      `https://api.mercadopago.com/v1/payments/${id}`,
      { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
    );
    res.status(200).json(resposta.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao consultar pagamento" });
  }
};
