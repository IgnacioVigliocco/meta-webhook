export default async function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "miperfil123"; // Cambiá por tu token seguro

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
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(405); // Method Not Allowed
  }
}

