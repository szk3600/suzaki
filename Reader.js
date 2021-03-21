/**
 * シリアルポートから１行ずつデータを読み込みます。
 *
 */
const Readline = require('@serialport/parser-readline')
const Ready = require('@serialport/parser-ready')

module.exports = class Reader {
	constructor (collector,SerialPort) {
		this.SerialPort = SerialPort;
		this.collector = collector;
	}

	/**
	 * シリアルポートからの読み込みを開始する。
	 */
	async start () {
		this.port = await this.findPort ();
		const parser = new Readline();
		this.port.pipe(new Ready({ delimiter: 'READY' })).pipe(parser);
		parser.on('data', (line) => {
			this.collector.readLine (line);
		});
	};		

	/**
	 * ポートを自動検索する。
	 */
	async findPort () {
    const ports = await this.SerialPort.list();
		// 複数ポートがある場合には、スザキのポートを判定する処理を入れる
		if (ports.length > 0) {
			return new this.SerialPort(ports[0].path);
		}

		throw Error ('シリアルポートが見つかりません！');
	}
}

