import winston from 'winston'
import config from './config.js'

function buildProdLogger() {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: './logs/warning.log', level: 'warn' }),
      new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
      new winston.transports.Console({level:"info"}),
    ],
  })
  return prodLogger
}

function buildDevLogger() {
  const devLogger = winston.createLogger({
    transports: [new winston.transports.Console({ level: 'info' })],
  })
  return devLogger
}

let logger = null

if (config.production === 'PRODUCTION') {
  logger = buildProdLogger()
} else {
  logger = buildDevLogger()
}

export default logger
