const fs = require('fs');

/**
 * ファイルにデータを書き出すクラス
 */

module.exports = class Writer {

	constructor(collector) {
		this.collector = collector;
		this.day = null;
		this.fileStream = null;
	}

	/**
	 * ファイル名にcollectorが集めたデータを書き出す。
	 */
	write(date) {
		const line = this.collector.getData(date);
		this.writeData(date, line);
	}

	/**
	 * ファイル名に１行分のデータを書き出す
	 */
	writeData(date, line) {
		const fileStream = this.getFileStream(date);
		fileStream.write(line);
	}

	/**
	 * 日付からFileStreamを返します。
	 */
	getFileStream(date) {
		const newDay = date.getDate();
		if (this.day === newDay) return this.fileStream;
		if (this.fileStream) this.fileStream.end('');  // day change close stream
		this.day = newDay;
		this.fileName = this.newFileName(date, newDay);
		this.fileStream = fs.createWriteStream(this.fileName, { flags: 'a' });
		return this.fileStream;
	}

	/**
	 * 日付からファイル名を返します。
	 */
	newFileName(date, day) {
		return 'log/log_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + day + '.csv';
	}

}
