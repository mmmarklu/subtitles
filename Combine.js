fs = require('fs');
iconv = require('iconv-lite');
util = require('util');

var files = [];
for (var i = 3; i < process.argv.length; i=i+2){
	var map = {};
	map.fn = process.argv[i-1];
	map.enc = process.argv[i];
	files.push(map);
}

files.forEach(function(e,i,a){
	e.file = fs.readFileSync(e.fn);
	e.str = iconv.decode(e.file,e.enc);
	e.str = e.str.replace(/(\r\n)/gm,"\n");
	if ((/.*.srt$/).test(e.fn)) e.txtarr = ParseSRTString(e.str);
	else if ((/.*.ssa|.ass$/).test(e.fn)) e.txtarr = ParseSSAString(e.str);
	e.count =0;
	e.max = e.txtarr.length-1;
});

while (true){

	if (checkBreak()) break;

	removeEmpty();

	var min = Infinity;
	var mini = 0;
	for (var i = 0; i < files.length; i++){
		//console.log(i + ' ' + files[i].txtarr[(files[i].count)].time);
		if (files[i].txtarr[(files[i].count)].time < min) {
			min = files[i].txtarr[(files[i].count)].time;
			mini = i;
		}
	}

	console.log(files[mini].txtarr[(files[mini].count)].text)
	if (files[mini].count <= files[mini].max) files[mini].count++;
}

function removeEmpty(){
	for (var i = 0; i < files.length; i++){
		if (files[i].count > files[i].max) {
			files.splice(i,1);
		}
	}
}

function checkBreak(){
	for (var i = 0; i < files.length; i++){
		if (files[i].count <= files[i].max) return false;
	}
	return true;
}

function ParseSSAString(str, deletespace){
	deletespace = typeof deletespace !== 'undefined' ? deletespace : false;
	var i = 0;
	var filearray = [];
	while (i < str.length)
	{
	    var j = str.indexOf("\n", i);
	    if (j == -1)  j = str.length;
	    var temp = str.substr(i, j-i);
	    //console.log(temp);

	    var re = /^Dialogue: /;
	    if (re.test(temp)){
	    	//console.log(temp);
	    	re = /^Dialogue:[^,]+,([0-9]+):([0-9]+):([0-9]+).([0-9]+),[0-9]+:[0-9]+:[0-9]+.[0-9]+,[^,]*,[^,]*,[^,]*,[^,]*,[^,]*,[^,]*,(.*)$/;
	    	var result = re.exec(temp);
			//console.log(util.inspect(result, {showHidden: false, depth: null}));
			var time = (parseInt(result[1]) * 60 * 60 * 1000) +  (parseInt(result[2]) * 60 * 1000) + (parseInt(result[3]) * 1000) +  parseInt(result[4]);
			//console.log(d);

			var text = RemoveNestedChars(result[5],'{','}');
			text = RemoveNestedChars(text,'<','>');
			text = text.replace(/}/, "");
			if (deletespace) text = text.replace(/ /g,"");
			var map = {}; map.time = time; map.text = text;
			filearray.push(map);
	    }
	    i = j+1;
	}
	return filearray;
}

function ParseSRTString(str){
	var i = 0;
	var filearray = [];
	var digitre = /^[0-9]+$/;
	var timere = /^[^0-9]*([0-9]+):([0-9]+):([0-9]+),([0-9]+)[^0-9]+[0-9]+:[0-9]+:[0-9]+,[0-9]+[^0-9]*$/;
	var emptyre = /^$/;
	var map = {};
	while (i < str.length)
	{
	    var j = str.indexOf("\n", i);
	    if (j == -1)  j = str.length;
	    var temp = str.substr(i, j-i);

	    if  (digitre.test(temp)){
	    	//console.log("digit: "+ temp);
	    }
	    else if (timere.test(temp)){
	    	var result = timere.exec(temp);
	    	map.time = (parseInt(result[1]) * 60 * 60 * 1000) +  (parseInt(result[2]) * 60 * 1000) + (parseInt(result[3]) * 1000) +  parseInt(result[4]);
	    	//if (map.time ==558000000) console.log("time: " + util.inspect(result));
	    	//console.log("time: " + map.time);
	    }
	    else if (emptyre.test(temp)){
	    	//console.log("empty");
	    	if (map.text && map.time) {
				map.text = RemoveNestedChars(map.text,'{','}');
				map.text = RemoveNestedChars(map.text,'<','>');
	    		filearray.push(map);
	    	}
			map = {};
	    }
	    else{
	    	//console.log(temp);
	    	if (map.text) map.text = map.text + '\n' + temp;
	    	else map.text = temp;
	    }
	    i = j+1;
	}
	return filearray;
}


function RemoveNestedChars(s,a,b){
	var out = [];
	var count = 0;
	for (var i =0; i < s.length ; i++){
		//console.log(s[i] + ' ' + count);
		if (s[i] == a) {
			count++;
		}
		else if (s[i] == b){
			if(count > 0) {
				count--;
			}
			else {
				return s;
			}
		}
		else {
			if(count == 0) {
				out.push(s[i]);
			}
		}
	}
	if (count == 0)  return out.join('');
	else return s;
}
