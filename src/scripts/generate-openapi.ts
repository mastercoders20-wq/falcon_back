import fs from "fs";
import path from "path";

import { openApiDocument } from "../docs/openapi";

const outputDir = path.resolve(process.cwd(), "docs");

console.log("Output Dir:", outputDir);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputFile = path.join(outputDir, "openapi.json");

fs.writeFileSync(
  outputFile,
  JSON.stringify(openApiDocument, null, 2),
);

console.log("Generated:", outputFile);