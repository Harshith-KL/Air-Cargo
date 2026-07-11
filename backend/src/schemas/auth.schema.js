const {z} = require("zod");

const signupSchema = z.object({
    body: z.object({
        fullName: z.string().trim().min(3, "Full name must be at least 3 characters"),
        contactNumber: z.string().regex(/^[0-9]{10}$/, "Contact number must be exactly 10 digits"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        organizationName: z.string().trim().min(2, "Organization name is required"),
        organizationAddress: z.string().trim().min(5, "Organization address is required"),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(1),
    }),
});

module.exports = {
    signupSchema,
    loginSchema,
};