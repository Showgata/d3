url ="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(url,function(err,dataset){
	barGraph(dataset)});