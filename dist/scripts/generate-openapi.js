"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const openapi_1 = require("../docs/openapi");
const outputDir = path_1.default.resolve(process.cwd(), "docs");
console.log("Output Dir:", outputDir);
if (!fs_1.default.existsSync(outputDir)) {
    fs_1.default.mkdirSync(outputDir, { recursive: true });
}
const outputFile = path_1.default.join(outputDir, "openapi.json");
fs_1.default.writeFileSync(outputFile, JSON.stringify(openapi_1.openApiDocument, null, 2));
console.log("Generated:", outputFile);
//# sourceMappingURL=generate-openapi.js.map