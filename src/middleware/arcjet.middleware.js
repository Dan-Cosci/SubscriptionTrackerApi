import aj from "../config/arcjet.js";


const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {requested: 1});

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) return res.status(429).json({ success: false, message: "Too many requests. Please try again later." });
      if (decision.reason.isBot()) return res.status(403).json({ success: false, message: "Access denied for bots." });
      if (decision.reason.isShield()) return res.status(403).json({ success: false, message: "Access denied due to security rules." });

      return res.status(403).json({ success: false, message: "Access denied." });
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    res.status(500).json({ success: false, message: "Internal server error."});
    next(error);
  }
};

export default arcjetMiddleware;