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
	var hfound = false;
	var year, lat, lon, nam, crim, cols0, cols1;
	var ret = "";
	for (var i= 0; i<rows.length; i++){
		cols1 = rows[i].split(/,/);
		/*cols0 = rows[i].split(/,\"/);
		window.alert(cols0);
		for(var j = 0; j < cols0.length; j++){
			var temp = cols0[j].split(/\"/);
			 cols1.push(temp[0]);
			 if(temp[1]!==undefined && temp[1].length!=0){
			 	temp = temp[1].substring(1).split(/,/);
			 	for (var k = 0; k<temp.length; k++){
        			cols1.push(temp[k]);
        			//window.alert(temp[k]);
        		}
			 }
		}*/
		//document.write(cols.length+"<br>");
		if (hfound){
				year = cols1[yearpos];
				lat = randlat(); //cols1[latpos];
				lon =  randlon(); //cols1[lonpos];
				nam = cols1[nampos];
				crim = cols1[crimpos];
				ret+= '{"type": "Feature","properties": {"year": '+'"'+year+'"'+', "name": '+'"'+nam+'"'+', "crime": '+'"'+crim+'"'+'},';
				ret+= '"geometry": {"type": "Point", "coordinates": ['+lat+','+lon+']}}';
				if (i!=rows.length-1)
					ret+=',';
			}
			else if(cols1.indexOf("Year ") != -1){
					var yearpos = cols1.indexOf("Year ");
					var latpos = cols1.indexOf("Latitude");
					var lonpos = cols1.indexOf("Longitude"); 
					var nampos = cols1.indexOf("Individuals (all who are named)");
					var crimpos = cols1.indexOf("Crime (in Spanish)") ;
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
		/*
		var a = '1888,"Luis, y dos Compas","por avijeo, y robo",olaolaola,orange,banana,"Precidiados, 3",hola,Conclusa';
var b = a.split(/,\"/);
var c = [];
for (var i = 0; i<b.length; i++){
  		var temp = b[i].split(/\"/);
      c.push(temp[0]);
     if(temp[1]!==undefined && temp[1].length!=0){
      	//document.write(temp[1]); 
      	temp = temp[1].substring(1).split(/,/);
        for (var j = 0; j<temp.length; j++){
        	c.push(temp[j]);
        }
       }
  	}
  for (var i = 0;i<c.length; i++){
 	document.write(c[i]+"<p>");
}

var year, lat, lon, nam, crim, cols0;
var cols1=[];
var csvin = '7, james, jolly jerry, 45, a,"banana, mango"\n77, jack';
var rows = csvin.split(/\r\n|\n/);
for (var i= 0; i<rows.length; i++){
		cols0 = rows[i].split(/,\"/);
		for(var j = 0; j < cols0.length; j++){
			var temp = cols0[j].split(/\"/);
			cols1.push(temp[0]);
     
			 if(temp[1]!==undefined && temp[1].length!=0){
       console.log(cols1);
       window.alert(temp.length);
			 	temp = temp[1].substring(1).split(/,/);
        //window.alert(temp.length);
			 	for (var k = 0; k<temp.length; k++){
        		//window.alert(temp[k]);
        			//cols1.push(temp[k]);
        			//window.alert(temp[k]);
              console.log(temp[k]);
        		}
			 }
		}
    }
		*/
	}