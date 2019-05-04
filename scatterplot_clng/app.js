var spGraph = function(dataset){
    
    const width = 600;
    const height=400;
    const padding = -3;
    

    format = d3.timeFormat("%M:%S");

    

    const svg=d3.select("#container")
    .append("svg")
    .attr("width",width)
    .attr("height",height)
    .attr("class","center");

    dataset.forEach(function (d) {
        var getTime = d.Time.split(':');
        d.Time = new Date('December 17, 1995 00:'+getTime[0]+':'+getTime[1]);
      });

    //Min and Max

    minYear = d3.min(dataset,function(d){
        return d.Year - 1;
    });

    maxYear=d3.max(dataset,function(d){
        return (d.Year+1);
    });

    minTime= d3.min(dataset,function(d){
        return d.Time;
    });

    maxTime=d3.max(dataset,function(d){
        return d.Time;
    });
    
    //X axis
    scaleX = d3.scaleLinear()
                .domain([minYear,maxYear])
                .range([0,width]);

                
    
    const xAxis = d3.axisBottom(scaleX).tickFormat(d3.format("d"));
    svg.append("g")
    .attr("id","x-axis")
    .attr("transform","translate(0,"+(height-padding)+")")
    .call(xAxis);            


    // Y axis 
    scaleY = d3.scaleTime()
                .domain([minTime,maxTime])
                .range([0,height]);

    
                          
                   


    const yAxis = d3.axisLeft(scaleY).tickFormat(format);


    svg.append("g")
    .attr("id","y-axis")
    .attr("transform","translate(0,0)")
    .call(yAxis);
    
    console.log(minTime+"||"+maxTime+" "+minYear+"||"+maxYear);
    //Scatter Plots

    svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => scaleX(d.Year))
    .attr("cy", (d, i) => scaleY(d.Time))
    .attr("r", 10)
    .attr("class","dot")
    .attr("data-xvalue",(d, i) => d.Year)
    .attr("data-yvalue",function(d,i){

        return d.Time.toISOString();
    })
    .style("fill",function(d){
            if(d.Doping==="")
            {return "blue";}
            else{return "yellow";}
        })
    .on("mousemove",function(d){
        tooltip.style("opacity",1)
            .attr("data-year",()=>d.Year)
            .style("left",d3.event.x+"px")
            .style("top",d3.event.y+"px")
            .html(`
            <p><strong>${d.Name}</strong></p>
            <p>${d.Nationality}</p>
            <hr>
            <p>Time:${d.Time} Year:${d.Year}</p>
            <hr>
            <p>${d.Doping}</p>
            `);

            
    }).on("mouseout",()=>tooltip.style("opacity",0));    

    //Title and labels
    
    svg.append("text")
        .attr("x",width/2+padding)
        .attr("y",-10)
        .attr("id","title")
        .text("Doping in Professional Bicycle Racing")
        
    svg.append("text")
        .attr("x",- height/2)
        .attr("y",-padding-40)
        .attr("id","label")
        .text("Time in Minutes")


    //Tooltip
    
    var tooltip =d3.select("body")
                    .append("div")
                    .attr("id","tooltip");


    //Legend
    
    var Ymove = 60;                
    var Xmove =150;
    var extra=20;                
    
    var legend = svg.append("g")
        .attr("id","legend")
        
    l1 = legend.append("g");
    l1.append("rect")
    .attr("class","box")
    .attr("x",width-Xmove)
    .attr("y",Ymove)
    .style("fill","yellow");
    
    l1.append("text")
    .attr("class","legend-text")
    .attr("x",width-Xmove+extra)
    .attr("y",Ymove+13)
    .text("Riders with doping allegations");

    l2 = legend.append("g");

    l2.append("rect")
    .attr("class","box")
    .attr("x",width-Xmove)
    .attr("y",Ymove+extra)
    .style("fill","blue");

    l2.append("text")
    .attr("class","legend-text")
    .attr("x",width-Xmove+extra)
    .attr("y",Ymove+33)
    .text("Riders without doping allegations");  
        

}


