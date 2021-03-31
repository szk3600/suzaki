const config = require('./config.js');

/**
 * データ収集するクラス
 */
module.exports = class Collector {
	constructor() {
		this.collector = {};
		this.prevLine = null;
	}


	/**
	 * １行分のデータを収集する
	 */
	readLine(line) {
		const result = this.getKitaibango(line);
		if (!result) return; // 機体番号がfalseなら受信エラー
		const [kitaibango, syubetsu, number] = result;
		if (this.isBarcode(syubetsu)) {
			if (this.isJyufuku(line)) return;
			this.collect(line, line);
		} else {
			this.collect(kitaibango, line);
		}
	}

	/**
	 * 収集したデータを与えられた時間のヘッダーを付けて、カンマ区切りで返します。
	 */
	getData(date) {
		let results = this.makeData(date);
		this.collector = {};
		return results;
	}

	/**
	 * 受信したデータから機体番号を取得する
	 * 戻り値 [機体番号,種別,番号]
	 * エラーの場合は false
	 */
	getKitaibango(line) {

		if (line.length < 3) return false; // 文字数が3文字以下の場合エラー
		line = line.toString();
		const kitaibango = line.substring(0, 3);
		const syubetsu = line.substring(0, 1);
		const number = line.substring(1, 3);
		if (!config.syubetsuChars.includes(syubetsu)) return false;
		if (isNaN(number)) return false;
		return [kitaibango, syubetsu, number];
	};

	/**
	 * 機体番号をキーとして、データを保存する。
	 */
	collect(kitaibango, line) {
		this.collector[kitaibango] = line;
	}

	/**
	 * 機体番号がバーコードリーダーかどうかチェックする
	 */
	isBarcode(syubetsu) {
		return syubetsu === process.env.SYUBETSU;
	}

	/**
	 * 重複送信されたデータをチェックする
	 */
	isJyufuku(line) {
		if (this.prevLine === line) {
			return true;
		} else {
			this.prevLine = line;
			return false;
		}
	}

	/**
	 *  収集したデータを与えられた時間のヘッダーを付けて、カンマ区切りで返します。
	 */
	makeData(date) {
		return date.getHours() + '時' + date.getMinutes() + '分,' + Object.values(this.collector).join(',') + '\n';
	}

}
