export default function errorHandler(err, req, res, next) {
  // Log detailed server errors internally
  console.error("[Server Error]", err);

  let statusCode = 500;
  let userMessage = "An internal server error occurred. Please try again later.";

  const errorMessage = err.message || "";
  const errorCode = err.code || "";

  // Handle Ollama errors
  if (
    errorMessage.includes("Ollama") ||
    errorMessage.includes("fetch failed") ||
    errorMessage.includes("ECONNREFUSED") ||
    errorCode === "ECONNREFUSED" ||
    errorMessage.includes("timed out")
  ) {
    statusCode = 503;
    userMessage = "Ollama is currently unavailable. Please ensure the Ollama service is running.";
  } 
  // Handle file system errors
  else if (errorCode === "ENOENT" || errorMessage.includes("Invalid JSON file")) {
    statusCode = 500;
    userMessage = "A required knowledge base file is missing or invalid. Please contact the administrator.";
  } 
  // Custom user message if explicitly provided by throwing code
  else if (err.userMessage) {
    statusCode = err.statusCode || 400;
    userMessage = err.userMessage;
  }

  res.status(statusCode).json({
    success: false,
    error: userMessage,
  });
}
