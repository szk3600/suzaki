const SerialPort = require('@serialport/stream')
const MockBinding = require('@serialport/binding-mock')
// const Collector = require ('../Collector');
const Reader = require ('../Reader');

SerialPort.Binding = MockBinding;
MockBinding.createPort('/dev/test', { echo: true, record: true })

class MockCollector {

	constructor () {
		this.lines = [];
	}

	readLine (line) {
			console.log (line);
		this.lines.push (line);
	}

}

function sleep(waitMsec) {
  var startMsec = new Date();

  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}

let collector = new MockCollector ();
let reader = new Reader (collector,SerialPort);

const before =  async () => {
		await reader.start();
		reader.port.write('#01234567\n');
		reader.port.write('$1001000\n');
		reader.port.write('%3100132\n');
	};

before();

describe("Unit testing for Collector", () => {

	it("read ", () => {
		expect(collector.lines.length).toEqual (0);
	});

});

