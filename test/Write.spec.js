const Writer = require ('../Writer');

describe("Unit testing for Writer", () => {
    let writer = new Writer ();

//  beforeEach(() => {
//	
//  });

  it("write data", () => {
		let date = new Date ('2021-03-20T02:12:54.871Z');
		writer.writeData (date, "11時12分,%1500676,%3200895,%3100450\n");
		let date2 = new Date ('2021-03-20T02:13:54.871Z');
		writer.writeData (date2, "11時13分,%1500676,%3200895,%3100450\n");
		let date3 = new Date ('2021-03-21T02:13:54.871Z');
		writer.writeData (date3, "11時13分,%1500676,%3200895,%3100450\n");

  });
});
