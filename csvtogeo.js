//var dragon = "DRAGON!";

function randlat(){
var mul = Math.random();
if (mul < 0.5)
	return -180*Math.random();
return 180*Math.random();
}

function randlon(){
var mul = Math.random();
if (mul < 0.5)
	return -90*Math.random();
return 90*Math.random();
} 

function handle(fils){
	//document.write(fils);
	if(window.FileReader){
		getText(fils[0]);
		
		/*getText(fils[0],function(){
			//g = sec;
			//$("#glob").html(g);
			g=document.getElementById('glob').innerHTML;
			//window.alert(g);
		});*/
	}
	else{
		window.alert('FileReader not supported in this browser?!?');	
	}
}

//function getText(fil,cb){
	function getText(fil){
	var infile = new FileReader();
	//infile.readAsText("/home/laurence/Desktop/JJOH/a.txt");
	infile.readAsText(fil);
	
	/*
	infile.onload = function(event) {
                var csvin = event.target.result;
                ctog(csvin);
                //var sec = ctog(csvin);
               // cb(sec);
               cb();
        };
    */
	infile.onload = loadHandle;
	infile.onerror = errorHandle;
}

function loadHandle(event){
	var csvin = event.target.result;
	ctog(csvin);
	
}

function errorHandle(evnt){
	if(evnt.target.error.name == "NotReadableError"){
	alert("Illegible file!?!");
}
}

function ctog(csvin){ //csvin,geoout) {
	var rows = csvin.split(/\r\n|\n/);
	//var re = /"[^"]*"|[^,]+/;
	//var re = /"[^"\\]*(?:\\.[^"\\]*)*"|[^,]+/;
	//var re = /",(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))"/;
	var re = /,/;
	//document.write("<br>");
	var hfound = false;
	var year;
	var lat;
	var lon;
	var nam;
	var crim;
	var cols;
	var ret = "";
	for (var i= 0; i<rows.length; i++){
		cols = rows[i].split(re); 
		//document.write(cols.length+"<br>");
		if (hfound){
				year = cols[yearpos];
				lat = randlat(); //cols[latpos];
				lon =  randlon(); //cols[lonpos];
				nam = cols[nampos];
				crim = cols[crimpos];
				ret+= '{"type": "Feature","properties": {"year": '+'"'+year+'"'+', "name": '+'"'+nam+'"'+', "crime": '+'"'+crim+'"'+'},';
				ret+= '"geometry": {"type": "Point", "coordinates": ['+lat+','+lon+']}}';
				if (i!=rows.length-1)
					ret+=',';
			}
			else if(cols.indexOf("Year ") != -1){
					var yearpos = cols.indexOf("Year ");
					var latpos = cols.indexOf("Latitude");
					var lonpos = cols.indexOf("Longitude"); 
					var nampos = cols.indexOf("Individuals (all who are named)");
					var crimpos = cols.indexOf("Crime (in Spanish)") ;
					hfound = true;
					ret += ('{"type": "FeatureCollection","features": [');
			}
		}
		ret+=("]}");
		window.g = ret;
		$("#glob").html(ret);
		//g=document.getElementById('glob').innerHTML;
		//return ret;
		//window.alert(ret);
		//secret(ret);
	}