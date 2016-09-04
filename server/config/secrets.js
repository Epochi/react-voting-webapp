module.exports = {
  db: process.env.DATABASE_URL || "postgres://users:pass1@0.0.0.0:5432/yp0",
  sessionSecret: process.env.SESSION_SECRET || 'b0RPN5FTovVykqPwhfvG8VPdcsI=',
  postgresGuest: {
    host: '127.0.0.1',
    port: 5432,
    database: 'up',
    user: 'guest',
    password: 'g123',
    ssl:true
  },
    postgresUser: {
    host: '127.0.0.1',
    port: 5432,
    database: 'up',
    user: 'registered',
    password: 'u123',
    ssl:true
  },
    postgresAuth: {
    host: '127.0.0.1',
    port: 5432,
    database: 'up',
    user: 'auth',
    password: 'auth123',
    ssl:true
    },
  redisdb: {
    host: process.env.HOSTNAME,
    port: 6379,
    pass: '',
    ttl: 6000
  }
};
