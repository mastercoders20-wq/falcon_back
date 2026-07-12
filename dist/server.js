"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const database_1 = require("./core/database");
const startServer = async () => {
    await (0, database_1.connectDatabase)();
    app_1.default.listen(Number(env_1.env.PORT), () => {
        console.log(`server is running on port ${env_1.env.PORT}`);
    });
};
startServer().catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map