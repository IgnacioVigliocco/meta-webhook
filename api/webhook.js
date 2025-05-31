export default async function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "miperfil123"; // Usá tu token seguro

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token) {
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(400); // Bad Request si falta algo
    }
  } else if (req.method === "POST") {
    console.log("Webhook recibido: ", JSON.stringify(req.body, null, 2));

    // 🔗 URL de tu Webhook en Make (la que copiaste antes)
    const makeWebhookUrl = "https://hook.us2.make.com/5ctpnx66y99da8wsh9usvmykeysooddo"; // ← PONÉ TU URL AQUÍ

    try {
      await fetch(makeWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body) // reenviamos el mismo cuerpo que llega
      });
      res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
      console.error('Error al enviar a Make:', error);
      res.sendStatus(500); // Error interno si falla
    }
  } else {
    res.sendStatus(405); // Método no permitido
  }
}

