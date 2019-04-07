module.exports = {
	test: {
		"deviceNum|1-60": 1,
		"workMode": "router",
		"wanInfo": [
			{
				"wanDownloadSpeed|1-100000": 1,
				"wanUploadSpeed|1-100000": 1,
				"wanStatus|1": [
					"0",
					"1",
					"2"
				]
			}
		],
		"sn": 1,
		"devicename": "device1",
		"status|1": [
			"0",
			"1",
			"2"
		],
		"clientNum": "12"
	},
	table: {
		"list|4-10": [{
			"ssid": "@string(10)<input>",
			"name": "<script>alert(2)</script><$%#^%(*&()*)\"\">",
			"num|+1": 1,
			"success": "@string(5)"
		}]
	},
	getWizard: {
		"wifiScan|1-20": [{
			"wifiScanSSID": "@string(20)",
			"wifiScanMAC": "@mac",
			"wifiScanChannel|1-13": 8,
			"wifiScanSecurityMode": "@pick(['WPAWPA2/AES', 'WPA/AES', 'WPA2/AES', 'None'])",
			"wifiScanSignalStrength|-100--20": -84,
			"wifiScanChkHz": "5G",
			"wifiScanType": "clent+ap1"
		}]
	},
	getStatusBeforeBridge: {
		"extended|0-3": 1
	}
}