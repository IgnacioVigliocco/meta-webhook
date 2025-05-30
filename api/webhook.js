// api/webhook.js

export default function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "miperfil123"; // Cambiá esto por el token que vos quieras usar

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
    }
  } else if (req.method === "POST") {
    console.log("Webhook recibido: ", JSON.stringify(req.body, null, 2));
    res.sendStatus(200); // siempre respondé 200
  } else {
    res.sendStatus(405); // método no permitido
  }
}
