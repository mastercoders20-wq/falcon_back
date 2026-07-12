"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApiDocument = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const registry_1 = require("./registry");
require("../modules/user/user.openapi");
require("../modules/auth/auth.openapi");
exports.openApiDocument = new zod_to_openapi_1.OpenApiGeneratorV3(registry_1.registry.definitions).generateDocument({
    openapi: "3.0.3",
    info: {
        title: "Falcon Delivery API",
        version: "1.0.0",
        description: "Falcon Backend API",
    },
    servers: [
        {
            url: "http://localhost:5000/api/v1",
        },
    ],
});
//# sourceMappingURL=openapi.js.map