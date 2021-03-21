const SerialPort = require('@serialport/stream')
const MockBinding = require('@serialport/binding-mock')
const Readline = require('@serialport/parser-readline')
const Ready = require('@serialport/parser-ready')
SerialPort.Binding = MockBinding;
 MockBinding.createPort('/dev/test', { echo: true, record: true })
const Reader = require ('./Reader.js');
const Collector = require ('./Collector');
const Writer = require ('./Writer');

const collector = new Collector ();
const reader = new Reader (collector,SerialPort);
const writer = new Writer (collector);

function sleep(waitMsec) {
  var startMsec = new Date();

  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}


const intervalObj = setInterval(() => {
	writer.write (new Date());
}, 10000);

async function pre_test () {
	await reader.start();
	reader.port.write('#01234567\n');
	reader.port.write('$1001000\n');
	reader.port.write('%3100132\n');
}

pre_test();


