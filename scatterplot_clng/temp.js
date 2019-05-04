url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";


d3.json(url,function(err,dataset){
   
	spGraph(dataset)});