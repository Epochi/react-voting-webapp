module.exports = {
  db: process.env.DATABASE_URL || "postgres://users:pass1@0.0.0.0:5432/yp0",
  sessionSecret: process.env.SESSION_SECRET || 'b0RPN5FTovVykqPwhfvG8VPdcsI='
};
