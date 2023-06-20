const isHermes = () => !!globalThis.HermesInternal;

const oldConsole = globalThis.console ?? {};
if (isHermes() && !globalThis.console) {
	globalThis.console = {
		...oldConsole,
		log: (...args: any[]) => print('\n\x1b[32m\x1b[7m LOG \x1b[0m', ...args),
		warn: (...args: any[]) => print('\n\x1b[93m\x1b[7m WARN \x1b[0m\x1b[93m', ...args, '\x1b[0m'),
		error: (...args: any[]) => print('\n\x1b[31m\x1b[7m ERROR \x1b[0m\x1b[31m', ...args, '\x1b[0m'),
	};
}


import { MockDataNestedPromisesService } from './MockDataNestedPromisesService';

async function main(): Promise<void> {
	const mockDataNestedPromisesService = new MockDataNestedPromisesService();
	mockDataNestedPromisesService.onGet10kObjectCells();
	await mockDataNestedPromisesService.format();
	await mockDataNestedPromisesService.format();
	await mockDataNestedPromisesService.format();
	await mockDataNestedPromisesService.format();
}

main();
