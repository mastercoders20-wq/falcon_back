"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.body = void 0;
const body = (schema) => ({
    body: {
        required: true,
        content: {
            "application/json": {
                schema,
            },
        },
    },
});
exports.body = body;
const response = (status, description, example, schema) => {
    const media = {};
    if (schema) {
        media.schema = schema;
    }
    if (example !== undefined) {
        media.example = example;
    }
    return {
        [status]: {
            description,
            content: {
                "application/json": media,
            },
        },
    };
};
exports.response = response;
//# sourceMappingURL=openapi.js.map