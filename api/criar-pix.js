const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido" });
    return;
  }

  try {
    const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
    const valor = 2.00;

    const resposta = await axios.post(
      "https://api.mercadopago.com/v1/payments",
      {
        transaction_amount: valor,
        description: "Aposta SÃO PEDRO CAP",
        payment_method_id: "pix",
        payer: {
          email: "apostador@spcap.com",
          first_name: "Apostador",
          last_name: "SPCAP",
          identification: { type: "CPF", number: "12345678909" }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = resposta.data;
    res.status(200).json({
      id: data.id,
      status: data.status,
      qr_text: data.point_of_interaction.transaction_data.qr_code,
      qr_base64: data.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao criar PIX" });
  }
};
