import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./core/database";

const startServer = async () => {
  await connectDatabase();

  app.listen(Number(env.PORT), () => {
    console.log(`server is running on port ${env.PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
