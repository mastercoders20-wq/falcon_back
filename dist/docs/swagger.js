"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSetup = exports.swaggerMiddleware = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const openapi_1 = require("./openapi");
exports.swaggerMiddleware = swagger_ui_express_1.default.serve;
exports.swaggerSetup = swagger_ui_express_1.default.setup(openapi_1.openApiDocument, {
    explorer: true,
});
//# sourceMappingURL=swagger.js.map