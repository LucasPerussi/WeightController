// routes.js
const express = require("express");
const router = express.Router();

// Import route handlers for each theme
const userRoutes = require("./users/usersRouter.js");
const apiKeysRoutes = require("./api-keys/keysRouter.js");

// Mount the route handlers for each theme
router.use("/users", userRoutes);
router.use("/api-keys", apiKeysRoutes);


module.exports = router;