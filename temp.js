fs = require('fs');
iconv = require('iconv-lite');
util = require('util');

/*
var files = [];
for (var i = 3; i < process.argv.length; i=i+2){
	var map = {};
	map.fn = process.argv[i-1];
	map.enc = process.argv[i];
	files.push(map);	
}

console.log(util.inspect(files));
)/ 

/*

var str = "Dialogue: Marked=0,0:01:34.56,0:01:38.32,Default,NTP,0000,0000,0000,!Effect,第二話\N小鬼武士   小偷門生";
var re = /^Dialogue: Marked=0,([0-9]+):([0-9]+):([0-9]+).([0-9]+),[0-9]+:[0-9]+:[0-9]+.[0-9]+,[^,]+,[^,]+,[^,]+,[^,]+,[^,]+,[^,]+,(.*)$/;
var result = re.exec(str);


console.log(util.inspect(re, {showHidden: false, depth: null}));

console.log(util.inspect(result, {showHidden: false, depth: null}));

*/



/*
str = "fjoeiwjfoiwjef{fjeowijfoiwejf{fewoeifjoweifj}{{{eoiwjef}}}}owiejfoiwejf";
console.log(str + '\n' + RemoveCurlyBrace(str));

function RemoveCurlyBrace(s){
	var out = [];
	var count = 0;
	for (var i =0; i < s.length ; i++){
		console.log(s[i] + ' ' + count);
		if (s[i] == "{") {
			count++;
		}
		else if (s[i] == "}"){
			if(count > 0) { 
				count--;
			}
			else {
				count = 0;
			}
		}
		else {
			if(count == 0) { 
				out.push(s[i]); 
			}
		}
	}
	return out.join('');
}
*/
//fs.appendFile('message.txt', 'data to append', function (err) {});