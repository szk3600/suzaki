/**
 * シリアルポートから１行ずつデータを読み込みます。
 *
 */
const Readline = require('@serialport/parser-readline')
const Ready = require('@serialport/parser-ready')

module.exports = class Reader {
	constructor(collector, SerialPort) {
		this.SerialPort = SerialPort;
		this.collector = collector;
	}

	/**
	 * シリアルポートからの読み込みを開始する。
	 */
	async start() {
		const me = this;
		this.port = await this.findPort();
		var parser = this.port.pipe(new Readline({ delimiter: "\r" }));
		parser.on('data', (line) => {
			me.collector.readLine(line);
		});

	};

	/**
	 * ポートを自動検索する。
	 */
	async findPort() {
		const ports = await this.SerialPort.list();
		// 複数ポートがある場合には、スザキのポートを判定する処理を入れる
		const result = ports.find(port => port.manufacturer === process.env.MANUFACTURER)
		console.log(result);
		if (result) return new this.SerialPort(result.path);
		throw Error('シリアルポートが見つかりません！');
	}
}

