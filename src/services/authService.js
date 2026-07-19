import bcrypt from "bcryptjs";
import { userService } from "./userService";

// bcryptjs password hashing
export function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function verifyPassword(password, storedPasswordHash) {
  try {
    if (storedPasswordHash.includes(":")) {
      const crypto = require("crypto");
      const [salt, originalHash] = storedPasswordHash.split(":");
      if (!salt || !originalHash) return false;
      const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
      return hash === originalHash;
    }
    return bcrypt.compareSync(password, storedPasswordHash);
  } catch (error) {
    console.error("Password Verification Error:", error);
    return false;
  }
}

export const authService = {
  // Login verification
  async login(email, password) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isValid = verifyPassword(password, user.password_hash);
    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};
