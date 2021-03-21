const Collector = require ('../Collector');
const Writer = require ('../Writer');

describe("Unit testing for Collector", () => {
	let collector = new Collector ();
  let writer = new Writer (collector);
	it("read 上書き", () => {
		collector.readLine ('%1500676');
		collector.readLine ('%3200895');
		collector.readLine ('%3100450');
		collector.readLine ('%1500676');
		let date = new Date ('2021-03-20T02:12:54.871Z');
		writer.write (date);
	});
});

