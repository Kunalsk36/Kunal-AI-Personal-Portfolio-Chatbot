export async function getHealth(_req, res) {
  res.status(200).json({
    status: "ok",
    service: "kunal-ai-backend",
  });
}

