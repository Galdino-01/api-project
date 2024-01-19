import moment from 'moment';
import winston from 'winston';

// Dotenv
const CONSOLE_LOGS = process.env.CONSOLE_LOGS || 'true';
const CONSOLE_LOGS_LEVEL = process.env.CONSOLE_LOGS_LEVEL || '7';
const ARCHIVE_EMERGENCY_LOGS = process.env.ARCHIVE_EMERGENCY_LOGS || 'true';
const ARCHIVE_ALERT_LOGS = process.env.ARCHIVE_ALERT_LOGS || 'true';
const ARCHIVE_CRITICAL_LOGS = process.env.ARCHIVE_CRITICAL_LOGS || 'true';
const ARCHIVE_ERROR_LOGS = process.env.ARCHIVE_ERROR_LOGS || 'true';
const ARCHIVE_WARNING_LOGS = process.env.ARCHIVE_WARNING_LOGS || 'true';
const ARCHIVE_NOTICE_LOGS = process.env.ARCHIVE_NOTICE_LOGS || 'true';
const ARCHIVE_INFORMATIONAL_LOGS = process.env.ARCHIVE_INFORMATIONAL_LOGS || 'true';
const ARCHIVE_DEBUG_LOGS = process.env.ARCHIVE_DEBUG_LOGS || 'true';
const LOGS_PATH = process.env.LOGS_PATH || './logs';

const levels = ['emerg', 'alert', 'crit', 'error', 'warning', 'notice', 'info', 'debug'];

const currentDay = moment().format('DD');
const currentMonth = moment().format('MM');
const currentYear = moment().format('YYYY');

export const Logger = winston.createLogger({
    format: winston.format.json(),
    transports: (() => {
        const transports = [];

        if (ARCHIVE_EMERGENCY_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/emergency.log`,
                level: 'emerg',
                format: winston.format.json()
            }));
        }

        if (ARCHIVE_ALERT_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/alert.log`,
                level: 'alert',
                format: winston.format.json()
            }));
        }

        if (ARCHIVE_CRITICAL_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/critical.log`,
                level: 'crit',
                format: winston.format.json()
            }));
        }

        if (ARCHIVE_ERROR_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/error.log`,
                level: 'error',
                format: winston.format.json()
            }));
        }

        if (ARCHIVE_WARNING_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/warning.log`,
                level: 'warn',
                format: winston.format.json()
            }));
        }

        if (ARCHIVE_NOTICE_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/notice.log`,
                level: 'notice',
                format: winston.format.json()
            }));
        }

        if (ARCHIVE_INFORMATIONAL_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/informational.log`,
                level: 'info',
                format: winston.format.json()
            }));
        }

        if (ARCHIVE_DEBUG_LOGS === 'true') {
            transports.push(new winston.transports.File({
                filename: `${LOGS_PATH}/${currentYear}/${currentMonth}/${currentDay}/debug.log`,
                format: winston.format.json()
            }));
        }

        if (CONSOLE_LOGS === 'true') {
            transports.push(new winston.transports.Console({
                format: winston.format.cli(),
                level: levels[parseInt(CONSOLE_LOGS_LEVEL)],
            }));
        }

        return transports;
    })()
});

export default Logger;
