import rateLimit from "express-rate-limit";

const rateLimiter = (time, amount) => {
    return rateLimit({
        windowMs: time,
        limit: amount,
        standardHeaders: true,
        legacyHeaders: false,
        ipv6Subnet: 56,
        message: "Too many requests.Please try again later."
    })
}

export default rateLimiter;