module.exports = {
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://admin:admin1@ds047955.mongolab.com:47955/yp-dev',
  sessionSecret: process.env.SESSION_SECRET || 'b0RPN5FTovVykqPwhfvG8VPdcsI='
};