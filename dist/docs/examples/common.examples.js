"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverErrorExample = exports.tooManyRequestsExample = exports.conflictExample = exports.notFoundExample = exports.forbiddenExample = exports.unauthorizedExample = exports.validationErrorExample = void 0;
exports.validationErrorExample = {
    success: false,
    message: "Validation Error",
    errors: [
        {
            field: "email",
            message: "Invalid email",
        },
    ],
};
exports.unauthorizedExample = {
    success: false,
    message: "Unauthorized",
};
exports.forbiddenExample = {
    success: false,
    message: "Forbidden",
};
exports.notFoundExample = {
    success: false,
    message: "Resource not found",
};
exports.conflictExample = {
    success: false,
    message: "Already exists",
};
exports.tooManyRequestsExample = {
    success: false,
    message: "Too many attempts, try later",
};
exports.serverErrorExample = {
    success: false,
    message: "Internal server error",
};
//# sourceMappingURL=common.examples.js.map