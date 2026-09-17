import z from "zod";

const registerBodySchema = z.object({
    email: z.email("Invalid email type"),
    password: z.string().min(6, "Password must have at least 6 characters").max(30, "Password can not be more than 30 characters")
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
            message: "Password must include a special character and a number at least"
        }),
    confirm_password: z.string("Enter confirm password")
}).refine(data => data.password === data.confirm_password, {
    message: "Confirm password doesn't match",
    path: ["confirmPassword"]
}).strict();

const sendCodeSchema = z.object({
    email: z.email(),
}).strict();

const checkCodeSchema = z.object({
    email: z.email(),
    code: z.string().length(5, "Code must have 5 characters")
        .regex(/^\d+$/, "Code must contain only digits")
}).strict();

export { registerBodySchema, sendCodeSchema, checkCodeSchema };