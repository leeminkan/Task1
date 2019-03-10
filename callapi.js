const request = require('request');

function call(url, callback){
    let data = '';
    request({
    url: 'https://safebrowsing.googleapis.com/v4/threatMatches:find',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    form: {
      key: 'AIzaSyAEhnte4U_q62d5hxZIhfsADBif5uMSVPc'
    },
    body: {
    "client": {
      "clientId":      "yourcompanyname",
      "clientVersion": "1.5.2"
    },
    "threatInfo": {
      "threatTypes":      ["MALWARE", "SOCIAL_ENGINEERING", "THREAT_TYPE_UNSPECIFIED", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      "platformTypes":    ["WINDOWS"],
      "threatEntryTypes": ["URL"],
      "threatEntries": [
        {"url": "https://www.urltocheck1.org/"}
      ]
    }
    }
    }
, function(err, res, body) {
    //nếu có lỗi
    if (err){
        data = `Error: ${err}`;
        return callback(data);
    }
    if (body.trim() === '{}'){
      data = `An toan: ${body}`;
      return callback(data);
    }
    else{
      data = `Khong an toan: ${body}`;
      callback(data);
    }
  });
};


exports.call = call;