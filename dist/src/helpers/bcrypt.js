"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordHasher = void 0;
const bcrypt = require("bcrypt");
const passwordHasher = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};
exports.passwordHasher = passwordHasher;
//# sourceMappingURL=bcrypt.js.map