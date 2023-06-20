import {IObjectCell} from './IObjectCell';
import {getObjectCells as get1kObjectCells} from './MockDataServiceObjectCells1k';
import {getObjectCells as get10kObjectCells} from './MockDataServiceObjectCells10k';

export type Reporter = (msg: string) => void;

export class MockDataFlatPromisesService {
	private _toUpper: boolean = true;
	private _objectCells: IObjectCell[] = [];

	constructor(private _reporter?: Reporter) {}

	public get objectCells() {
		return this._objectCells;
	}

	private fieldValueToUpper(objectCell: IObjectCell, key: string) {
		if (!(key in objectCell)) {
			return;
		}
		const value = objectCell[key];
		objectCell[key] = this._toUpper ? value.toUpperCase() : value.toLowerCase();
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
		const promiseArray: Array<Promise<void>> = [];

		for (const objectCell of this.objectCells) {
			for (const key of Object.keys(objectCell)) {
				promiseArray.push(
					new Promise(resolve => {
						this.fieldValueToUpper(objectCell, key);
						resolve();
					}),
				);
			}
		}

		this._toUpper = !this._toUpper;
		return Promise.all(promiseArray).then(() => {
			const end = new Date();
			const durationMs = end.getTime() - start.getTime();
			console.log(
				`formatted ${this.objectCells.length} object cells in ${durationMs} ms via flat promises.`,
			);

			if (this._reporter) {
				this._reporter(`formatted ${this.objectCells.length} object cells in ${durationMs} ms via flat promises.`);
			}
		});
	}
}