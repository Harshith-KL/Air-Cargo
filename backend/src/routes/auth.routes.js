const express = require("express");
const {signUp, signIn, profile} = require("../controllers/auth.controller");
const {authenticate} = require("../middleware/auth.middleware");
const {loginLimiter} = require("../middleware/rateLimiter");
const validate = require("../middleware/validate.middleware");
const {signupSchema, loginSchema} = require("../schemas/auth.schema")

const router = express.Router();

router.post("/signup",validate(signupSchema),signUp);
router.post("/signin",validate(loginSchema), loginLimiter, signIn);
router.get("/profile", authenticate, profile);

module.exports = router;
