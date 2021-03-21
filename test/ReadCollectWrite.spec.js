const SerialPort = require('@serialport/stream')
const MockBinding = require('@serialport/binding-mock')
const Reader = require ('../Reader');
const Collector = require ('../Collector');
const Writer = require ('../Writer');
SerialPort.Binding = MockBinding;
 MockBinding.createPort('/dev/test', { echo: true, record: true })

function sleep(waitMsec) {
  var startMsec = new Date();

  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}


describe("Unit testing for Collector", () => {
	let collector = new Collector ();
  let reader = new Reader (collector,SerialPort);
  let writer = new Writer (collector);
	it("read 上書き", async () => {
		await reader.start();
		await	reader.port.write('#01234567\r\n');
		await reader.port.write('$1001000\r\n');
		await reader.port.write('%3100132\r\n');
		sleep (10000);
		let date = new Date ('2021-03-22T02:12:54.871Z');
		writer.write (date);
		expect(0).toEqual (0);
	});
});

