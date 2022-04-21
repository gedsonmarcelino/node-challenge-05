import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

import { usersRoutes } from "./routes/users.routes";

const app = express();
const swaggerDocument = YAML.load("./src/docs/openapi.yml");

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export { app };
