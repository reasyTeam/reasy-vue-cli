let Mock = require("mockjs")

module.exports = {
	 ip: function(str) {
		 if(!str) {
			 return this.natural(0,255) + "." + this.natural(0,255) + "." + this.natural(0,255) + "." + this.natural(0,255);
		 }
		let str1 =  str.replace(/\d+-\d+/, function($1) {
			let arr = $1.split("-");
			return Mock.Random.int(arr[0], arr[1]);
		 });
		 return str1;
	 },
	 mac: function() {
		return Mock.mock(/([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}/)
	 }
 }


