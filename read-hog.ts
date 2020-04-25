const BinaryFile = require('binary-file');

// https://stackoverflow.com/questions/22809401/removing-a-null-character-from-a-string-in-javascript
function trimNull(a: string) {
	var c = a.indexOf('\0');
	if (c > -1) {
		return a.substr(0, c);
	}
	return a;
}

(async function () {
	try {
		// const fp = new BinaryFile('/Users/depidsvy/Downloads/descent-pc-shareware/descent.hog', 'r', true);
		const fp = new BinaryFile('/Users/depidsvy/Downloads/Descent2/DESCENT2.HOG', 'r', true);
		await fp.open();
		const size = await fp.size();
		const dhf = await fp.readString(3);
		console.log(dhf);
		do {
			const filename = trimNull(await fp.readString(13));
			// console.log(filename, filename.length);
			const fileLength = await fp.readUInt32();
			console.log(filename, filename.length, fileLength);
			const fileData = await fp.readString(fileLength);

			// save
			const newFile = new BinaryFile('./files2/' + filename, 'w', true);
			await newFile.open();
			await newFile.writeString(fileData);
			await newFile.close();

			const ftell = fp.tell();
			//console.log(ftell, size);
		} while (fp.tell() < size);
	} catch (err) {
	console.error(err);
	}
})();

