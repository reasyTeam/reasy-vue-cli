/* 数据验证函数集合对象 */
var utils = {
    getUtf8Length: function(str) {
        var totalLength = 0,
            charCode,
            len = str.length,
            i;

        for (i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode < 0x007f) {
                totalLength++;
            } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
                totalLength += 2;
            } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
                totalLength += 3;
            } else {
                totalLength += 4;
            }
        }
        return totalLength;
    }
};

var valid = {
    len: function(str, min, max) {
        var len = str.length;

        if (len < min || len > max) {
            return _(' %s - %s characters are required.', [min, max]);
        }

    },

    byteLen: function(str, min, max) {
        var totalLength = utils.getUtf8Length(str);

        if (typeof min !== "undefined" && typeof max !== "undefined" && (totalLength < min || totalLength > max)) {
            return _(" %s - %s bytes are required.", [min, max]);
        }
    },

    num: {
        all: function(str, min, max) {

            if (!(/^[0-9]{1,}$/).test(str)) {
                return _("Integers only");
            }
            if (min && max) {
                if (parseInt(str, 10) < min || parseInt(str, 10) > max) {

                    return _("Input range: %s - %s", [min, max]);
                }
            }
        }
    },

    mac: {
        all: function(str) {
            var ret = this.specific(str);

            if (ret) {
                return ret;
            }

            if (!(/^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/).test(str) && !(/^([0-9a-fA-F]{2}-){5}[0-9a-fA-F]{2}$/).test(str)) {
                return _("Please enter a valid MAC address.");
            }
        },

        specific: function(str) {
            var subMac1 = str.split(':')[0];

            if (subMac1.charAt(1) && parseInt(subMac1.charAt(1), 16) % 2 !== 0) {
                return _('The second character must be an even number.');
            }
            if (str === "00:00:00:00:00:00") {
                return _('MAC can not be 00:00:00:00:00:00.');
            }
        }
    },

    ip: {
        all: function(str) {
            var ret = this.specific(str);

            if (ret) {
                return ret;
            }

            if (!(/^([1-9]|[1-9]\d|1\d\d|2[0-1]\d|22[0-3])\.(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/).test(str)) {
                return _("Please enter a valid IP address.");
            }
        },

        specific: function(str) {
            var ipArr = str.split('.'),
                ipHead = ipArr[0];

            if (ipArr[0] === '127') {
                return _("The IP address starting with 127 is a loopback address. Please try another.");
            }
            if (ipArr[0] > 223) {
                return _("The value %s is invalid. Please enter a value between 1-223.", [ipHead]);
            }
        }
    },

    dns: function() {},

    mask: {
        all: function(str) {
            var rel = /^(254|252|248|240|224|192)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(252|248|240|224|192|128|0))$/;
            if (!rel.test(str)) {
                return _("Please enter a valid subnet mask.");
            }
        }
    },

    email: function(str) {
        var rel = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!rel.test(str)) {
            return _("Please enter a valid E-mail address");
        }

    },

    time: function(str) {
        if (!(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/).test(str)) {
            return _("Please enter a valid time.");
        }
    },

    hex: function(str) {
        if (!(/^[0-9a-fA-F]{1,}$/).test(str)) {
            return _("HEX characters only");
        }
    },

    ascii: function(str, min, max) {
        if (!(/^[ -~]+$/g).test(str)) {
            return _("ASCII characters only");
        }
        if (min || max) {
            return valid.len(str, min, max);
        }
    },

    pwd: {
        all: function(str, minLen, maxLen) {
            var ret = this.specific(str);
            if (ret) {
                return ret;
            }

            if (minLen && maxLen) {
                ret = valid.len(str, minLen, maxLen);
                if (ret) {
                    return ret;
                }
            }
        },
        specific: function(str) {
            if (!(/^[0-9a-zA-Z]+$/).test(str)) {
                return _('Must be numbers and letters');
            }
        }
    },

    username: function(str) {
        if (!(/^\w{1,}$/).test(str)) {
            return _("Please enter a valid user name.");
        }
    },

    ssid: function(str) {
        var length = utils.getUtf8Length(str);
        if (length > 32) {
            return _("The length cannot be greater than %s characters.", [32]);
        }
    },
    ssidPasword: {
        all: function(str, minLen, maxLen) {
            var ret = this.specific(str);
            if (ret) {
                return ret;
            }
            if (minLen && maxLen) {
                ret = valid.len(str, minLen, maxLen);
                if (ret) {
                    return ret;
                }
            }

            return ret;
        },
        specific: function(str) {
            if (!(/^[ -~]+$/g).test(str)) {
                return _("ASCII characters only");
            }
        }
    },

    remarkTxt: function(str, banStr) {
        var len = banStr.length,
            curChar,
            i;

        for (i = 0; i < len; i++) {
            curChar = banStr.charAt(i);
            if (str.indexOf(curChar) !== -1) {
                return _("Invalid input: '%s'", [curChar]);
            }
        }
    },
    pppoe: {
        all: function(str) {
            var ret = this.specific(str);

            if (ret) {
                return ret;
            }
            if (!(/^[ -~]+$/g).test(str)) {
                return _("ASCII characters only");
            }
        },
        specific: function(str) {
            if ((/[\\'"]/g).test(str)) {
                return _("Invalid input: \\ ' \"");
            }
        }

    },

    domain: function(str) {
        if (!/^[\d\.]+$/.test(str)) {
            if (/^[0-9a-z]([0-9a-z-]+\.){1,}([0-9a-z])+$/i.test(str) || str == "localhost") {

            } else {
                return _("Please enter a valid domain name.");
            }
        } else {

            return _("Please enter a valid domain name.");
        }

    },



    ping: function(str) {
        var ip = valid.ip.all(str),
            domain = valid.domain(str);
        if (ip && domain) {
            return _("Please enter a valid IP address or domain name.");
        }

    }
};

export {
    valid
};