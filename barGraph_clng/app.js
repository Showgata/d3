var barGraph=function(dataset){

const width = 800;
const height = 400;
const padding =50;

const heightMod = 350 ;
const widthMod= 700 ;

var i=0;
var barInfo=[];

var margin={
    top:20,
    bottom:20,
    left:20,
    right:20
}

var tooltip = d3.select("body")
                .append("div")
                .attr("id","tooltip");
                
format = d3.timeFormat("%x");

while(i<dataset.data.length)
{
    date =new Date(dataset.data[i][0]);
    year = date.getFullYear();
    value=dataset.data[i][1];

    barInfo.push({
        "date":date,
        "value":value
    })

    i++;
}
// ===========================================
// D3 ahead
// ===========================================

barCount=Object.keys(barInfo).length;

// Scaling the values
svg=d3.select(".graph")
    .append("svg")
    .attr("width",width)
    .attr("height",height)
    .style("padding-left",padding+"px")
    .style("padding-top",padding+"px");
    

const maxDate = d3.max(barInfo,(d) => d.date);
const minDate = d3.min(barInfo,(d) => d.date);    
scaleX = d3.scaleTime()
            .domain([minDate,maxDate])
            .range([padding,widthMod]);


const maxValue = d3.max(barInfo,(d) => d.value);
const minValue = d3.min(barInfo,(d) => d.value);  
scaleY = d3.scaleLinear()
            .domain([minValue,maxValue])
            .range([heightMod,heightMod*(minValue/maxValue)]);
            
gdpScaled = d3.scaleLinear()
            .domain([minValue,maxValue])
            .range([heightMod*(minValue/maxValue),heightMod]);             


//Adding Axes
const xAxis = d3.axisBottom(scaleX);
svg.append("g")
    .attr("id","x-axis")
    .attr("transform","translate(0,"+heightMod+")")
    .call(xAxis);

const yAxis = d3.axisLeft(scaleY);
svg.append("g")
    .attr("id","y-axis")
    .attr("transform","translate("+padding+",0)")
    .call(yAxis);



//Plotting graph
rect=svg.selectAll("rect")
    .data(barInfo)
    .enter()
    .append("rect")
    .attr("class","bar");

rect.attr("x",(d, i) =>scaleX(d.date))
    .attr("y",(d, i) =>heightMod-(gdpScaled(d.value)))
    .attr("data-date",(d, i) =>dataset.data[i][0])
    .attr("data-gdp",(d, i) =>dataset.data[i][1])
    .attr("width",()=>widthMod/barCount)
    .attr("height",(d, i) =>(gdpScaled(d.value)))
    .attr("fill","#27ae60")
    .on("mouseover",function(d,i)
    {

        tooltip
        .style("opacity",1)
        .style("left",d3.event.x+"px")
        .style("top",d3.event.y+"px")
        .attr('data-date', dataset.data[i][0])
        .html(`
        <p><strong>${d.date.getFullYear()}</strong></p>
        <p>${"$"+d.value}</p>
        
        `);
        console.log(""+d.date);
    }).on('mouseout', function (d) {
        tooltip.style('opacity', 0);
      });;

    
      svg.append("text")
      .attr("x",-height/3)
      .attr("y",0)
      .attr("id","label")
      .text("Gross Domestic Product");


  
}