require('dotenv').config();
const SerialPort = require('serialport')
const Reader = require('./Reader.js');
const Collector = require('./Collector');
const Writer = require('./Writer');

const collector = new Collector();
const reader = new Reader(collector, SerialPort);
const before = async () => {
	await reader.start();
};

before();

const writer = new Writer(collector);

const intervalObj = setInterval(() => {
	writer.write(new Date());
}, 60000);

