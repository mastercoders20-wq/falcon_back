"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorSchema = void 0;
const zod_1 = require("zod");
exports.ErrorSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    message: zod_1.z.string(),
    errors: zod_1.z
        .array(zod_1.z.object({
        field: zod_1.z.string(),
        message: zod_1.z.string(),
    }))
        .optional(),
});
//# sourceMappingURL=common.schema.js.map