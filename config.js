/** Shared config for application; can be required many places. */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "pixly_test"
      : process.env.DATABASE_URL || "pixly";
}

module.exports = {
  SECRET_KEY,
  getDatabaseUri,
};
