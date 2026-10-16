require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");

async function startServer() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  await connectDB();

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error("Server startup failed:", err.message);
  process.exitCode = 1;
});
