import moment from 'moment';
import winston from 'winston';

// Dotenv
const CONSOLE_LOGS = process.env.CONSOLE_LOGS || 'true';
const CONSOLE_LOGS_LEVEL = process.env.CONSOLE_LOGS_LEVEL || '7';
const FILE_EMERGENCY_LOGS = process.env.FILE_EMERGENCY_LOGS || 'true';
const FILE_ALERT_LOGS = process.env.FILE_ALERT_LOGS || 'true';
const FILE_CRITICAL_LOGS = process.env.FILE_CRITICAL_LOGS || 'true';
const FILE_ERROR_LOGS = process.env.FILE_ERROR_LOGS || 'true';
const FILE_WARNING_LOGS = process.env.FILE_WARNING_LOGS || 'true';
const FILE_NOTICE_LOGS = process.env.FILE_NOTICE_LOGS || 'true';
const FILE_INFORMATIONAL_LOGS = process.env.FILE_INFORMATIONAL_LOGS || 'true';
const FILE_DEBUG_LOGS = process.env.FILE_DEBUG_LOGS || 'true';
const LOGS_PATH = process.env.LOGS_PATH || './logs';

const levels = ['emerg', 'alert', 'crit', 'error', 'warning', 'notice', 'info', 'debug'];

const currentDay = moment().format('DD');
const currentMonth = moment().format('MM');
const currentYear = moment().format('YYYY');

export const Logger = winston.createLogger({
    transports: (() => {
        const transports = [];

        if (FILE_EMERGENCY_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/emergency.log`,
                level: 'emerg',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }));
        }

        if (FILE_ALERT_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/alert.log`,
                level: 'alert',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }));
        }

        if (FILE_CRITICAL_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/critical.log`,
                level: 'crit',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }));
        }

        if (FILE_ERROR_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/error.log`,
                level: 'error',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }));
        }

        if (FILE_WARNING_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/warning.log`,
                level: 'warn',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }));
        }

        if (FILE_NOTICE_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/notice.log`,
                level: 'notice',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }));
        }

        if (FILE_INFORMATIONAL_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/informational.log`,
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }));
        }

        if (FILE_DEBUG_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/debug.log`,
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }));
        }

        if (CONSOLE_LOGS === 'true') {
            transports.push(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.json(),
                    winston.format.printf(info => {
                        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
                        return `${currentDate} || PID:[${process.pid}] || ${info.level}: ${info.message}`;
                    }),
                    winston.format.prettyPrint(),
                    winston.format.colorize({ all: true })
                ),
                level: levels[parseInt(CONSOLE_LOGS_LEVEL)],
            }));
        }

        return transports;
    })()
});

export default Logger;
