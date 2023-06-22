const isHermes = () => !!globalThis.HermesInternal;

const oldConsole = globalThis.console ?? {};
if (isHermes() && !globalThis.console) {
	globalThis.console = {
		...oldConsole,
		log: (...args: any[]) => print('\x1b[32m\x1b[7m LOG \x1b[0m', ...args),
		warn: (...args: any[]) => print('\x1b[93m\x1b[7m WARN \x1b[0m\x1b[93m', ...args, '\x1b[0m'),
		error: (...args: any[]) => print('\x1b[31m\x1b[7m ERROR \x1b[0m\x1b[31m', ...args, '\x1b[0m'),
	};
}


import { MockDataNestedPromisesService } from './MockDataNestedPromisesService';
import { MockDataFlatPromisesService } from './MockDataFlatPromisesService';

async function main(): Promise<void> {
	const mockDataNestedPromisesService = new MockDataNestedPromisesService();
	const mockDataFlatPromisesService = new MockDataFlatPromisesService();

	mockDataFlatPromisesService.populate10kObjectCells();
	await mockDataFlatPromisesService.format();
	await mockDataFlatPromisesService.format();
	await mockDataFlatPromisesService.format();
	await mockDataFlatPromisesService.format();
	await mockDataFlatPromisesService.format();

	mockDataNestedPromisesService.populate10kObjectCells();
	await mockDataNestedPromisesService.format();
	await mockDataNestedPromisesService.format();
	await mockDataNestedPromisesService.format();
	await mockDataNestedPromisesService.format();
	await mockDataNestedPromisesService.format();
}

main();
