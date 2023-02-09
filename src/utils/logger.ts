import winston, {
	format, createLogger, config, transports,
} from 'winston';
import { isProd } from '@utils/get-env';

interface IErrorStack {
  stack?: string;
}

function getParentFunctionCall(): string {
	const actualFunctionLine = 11;
	Error.stackTraceLimit = actualFunctionLine;
	const obj: IErrorStack = {};
	Error.captureStackTrace(obj, getParentFunctionCall);
	const { stack } = obj;
	if (!stack) return '';

	const parentLine = stack.split('\n')[actualFunctionLine];
    if (!parentLine) return '';

	const parentFunctionMatch = parentLine.match(/\s*at (.*)/);
	if (!parentFunctionMatch) return '';

	return parentFunctionMatch[1];
}

const { levels } = config.syslog;
const logLevel = isProd ? 'info' : 'debug';
const customFormat: Array<winston.Logform.Format> = [
	format.printf(({ ...args }) => {
		args['time'] = new Date().toISOString(); // eslint-disable-line no-param-reassign
		args['module'] = getParentFunctionCall(); // eslint-disable-line no-param-reassign
		return JSON.stringify(args, null, isProd ? 0 : 2);
	}),
	isProd ? undefined! : format.colorize({ all: true }),
].filter((formatEntry) => formatEntry !== undefined);

export const logger = createLogger({
	levels,
	level: logLevel,
	format: format.combine(
		...customFormat,
	),
	transports: [
		new transports.Console({
			silent: process.argv.indexOf('--silent') >= 0,
		}),
	],
});
