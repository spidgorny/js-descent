// @ts-ignore
const BinaryFile = require('binary-file');

type Vertex = {
	x: number;
	y: number;
	z: number;
}

type Cube = {
	sideMask: number;
	// ...
}

class ReadSdl {

	// @ts-ignore
	fp: BinaryFile;

	/**
	 * char[4] signature;
long version;
long mineDataOffset;
long objectsOffset;
long fileSize;
	 */
	header?: {
		LVLP: string;
		version: number;
		mineDataOffset: number;
		objectsOffset: number,
		fileSize: number;
	};

	/**
	 * short vertexCount;
short cubeCount;
Vertex verticies[vertexCount];
Cube cubes[cubeCount];

	 */
	geometry?: {
		version: number;
		vertexCount: number;
		cubeCount: number;
	};

	vertices?: Vertex[];
	cubes?: Cube[];

	constructor(filename: string) {
		this.fp = new BinaryFile(filename, 'r', true);
	}

	async read() {
		await this.fp.open();
		console.log('size', await this.fp.size());
		this.header = await this.readHeader();
		this.fp.seek(this.header.mineDataOffset);
		this.geometry = await this.readPrefix();
	}

	async readHeader() {
		const LVLP = await this.fp.readString(4);
		const version = await this.fp.readUInt32();
		const mineDataOffset = await this.fp.readUInt32();
		// const junk1 = await this.fp.readUInt32();
		const objectsOffset = await this.fp.readUInt32();
		// const junk2 = await this.fp.readUInt32();
		const fileSize = await this.fp.readUInt32();
		return {
			LVLP, version, mineDataOffset, objectsOffset, fileSize
		}
	}

	async readPrefix() {
		const version = await this.fp.readUInt8();
		const vertexCount = await this.fp.readUInt16();
		const cubeCount = await this.fp.readUInt16();
		return {version, vertexCount, cubeCount};
	}

	async readVertices() {
		// verticies[vertexCount];
		// cubes[cubeCount];
	}

}

function dump(structure: any) {
	const json: any = {};
	for (const key in structure) {
		const val = structure[key];
		json[key] = val;
		if (typeof val === 'number') {
			json['0x' + key] = '0x' + val.toString(16);
		}
	}
	console.log(json);
}

(async function () {
	const reader = new ReadSdl('files/level01.sdl');
	await reader.read();
	dump(reader.header);
	dump(reader.geometry);
})();

