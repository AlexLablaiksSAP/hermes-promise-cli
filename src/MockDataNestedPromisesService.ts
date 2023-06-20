import { IObjectCell } from './IObjectCell';
import { getObjectCells as get1kObjectCells } from './MockDataServiceObjectCells1k';
import { getObjectCells as get10kObjectCells } from './MockDataServiceObjectCells10k';

export type Reporter = (msg: string) => void;

export class MockDataNestedPromisesService {
	private _toUpper: boolean = true;
	private _objectCells: IObjectCell[] = [];

	constructor(private _reporter?: Reporter) {}

	private formatKeyValue(
		key: string,
		value: string,
	): Promise<[string, string]> {
		return new Promise(resolve => {
			const resolvedValue = this._toUpper
				? value.toUpperCase()
				: value.toLowerCase();
			resolve([key, resolvedValue]);
		}); 
	}

	private formatObjectCell(objectCell: IObjectCell): Promise<IObjectCell> {
		const fieldPromises: Array<Promise<[string, string]>> = [];

		for (const key of Object.keys(objectCell)) {
			fieldPromises.push(this.formatKeyValue(key, objectCell[key]));
		}

		return new Promise(resolve => {
			Promise.all(fieldPromises).then((tuples: [string, string][]) => {
				const objectCell: Record<string, string> = {};
				for (const tuple of tuples) {
					objectCell[tuple[0]] = tuple[1];
				}

				resolve(objectCell as IObjectCell);
			});
		});
	}

	private async getObjectCells(
		getObjectCells: () => Array<IObjectCell>,
	): Promise<void> {
		const start = new Date();
		this._objectCells = getObjectCells();
		const end = new Date();
		const durationMs = end.getTime() - start.getTime();

		console.log(
			`populated ${this._objectCells.length} object cells in ${durationMs} ms`,
		);
	}

	public onGet1kObjectCells(): void {
		this.getObjectCells(get1kObjectCells);
	}

	public onGet10kObjectCells(): void {
		this.getObjectCells(get10kObjectCells);
	}
	
	public format(): Promise<void> {
		const start = new Date();

		const objectCellPromises: Array<Promise<IObjectCell>> = [];
		for (const objectCell of this._objectCells) {
			objectCellPromises.push(this.formatObjectCell(objectCell));
		}

		this._toUpper = !this._toUpper;
		
		return Promise.all(objectCellPromises).then((objectCells: Array<IObjectCell>) => {
			const end = new Date();
			const durationMs = end.getTime() - start.getTime();
			console.log(
				`formatted ${objectCells.length} object cells in ${durationMs} ms`,
			);

			if (this._reporter) {
				this._reporter(`formatted ${objectCells.length} object cells in ${durationMs} ms`);
			}
			

			this._objectCells = objectCells;
		});
	}
}