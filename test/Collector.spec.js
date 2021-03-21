const Collector = require ('../Collector');

describe("Unit testing for Collector", () => {
    let collector = new Collector ();

//  beforeEach(() => {
//	
//  });

  it("read 上書き", () => {
		collector.readLine ('%1500676');
		collector.readLine ('%3200895');
		collector.readLine ('%3100450');
		collector.readLine ('%1500676');
		expect(Object.values (collector.collector).length).toEqual (3);
		let date = new Date ('2021-03-20T02:12:54.871Z');
		let data = collector.getData (date);
		console.log (data);
//		expect(collector.getData (date)).toBe ("11時12分,%1500676,%3200895,%3100450");
//		expect(data).toBe ("foo");
  });

  it("read error", () => {
		collector.readLine ('%1500676');
		collector.readLine ('%3200895');
		collector.readLine ('A3200895');
		collector.readLine ('');
		collector.readLine ('..%1500676');
		expect(Object.values (collector.collector).length).toEqual (2);
		let date = new Date ('2021-03-20T02:12:54.871Z');
		let data = collector.getData (date);
		console.log (data);
  });

  it("read 併記", () => {
		collector.readLine ('&39P4027');
		collector.readLine ('');
		collector.readLine ('&39P4027');
		collector.readLine ('');
		collector.readLine ('&39PT064');
		collector.readLine ('');
		collector.readLine ('&39PT064');
		collector.readLine ('');
		collector.readLine ('&39PT064');
		expect(Object.values (collector.collector).length).toEqual (2);
		let date = new Date ('2021-03-20T02:12:54.871Z');
		let data = collector.getData (date);
		console.log (data);


  });

});
