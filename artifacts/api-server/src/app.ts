import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import { existsSync } from "fs";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Serve the frontend static files in production
if (process.env.NODE_ENV === "production") {
  // Resolve relative to the project root (cwd) so the path works regardless of
  // where the built dist/index.mjs lives.
  const frontendDist = path.resolve(process.cwd(), "artifacts/portfolio/dist/public");

  if (existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    logger.info({ frontendDist }, "Serving frontend static files");

    // SPA fallback — send index.html for any non-API route
    app.get("/{*splat}", (_req, res) => {
      res.sendFile(path.join(frontendDist, "index.html"));
    });
  } else {
    logger.warn({ frontendDist }, "Frontend dist not found — skipping static file serving");
  }
}

export default app;
