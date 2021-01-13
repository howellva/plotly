//Use the D3 library to read in samples.json.

d3.json("./samples.json").then(function(sampledata){
    console.log(sampledata)
//Use sample_values as the values for the bar chart.
    var sampleValues =  sampledata.samples[0].sample_values
    console.log(sampleValues)
//Use otu_ids as the labels for the bar chart.
    var labels =  sampledata.samples[0].otu_ids  
    console.log(labels)
//Use otu_labels as the hovertext for the chart.
    var hover =  sampledata.samples[0].otu_labels  
    console.log(hover)
    
  
    var trace1 = {
       
        x: sampleValues.slice(0, 10).reverse(),
        y:labels.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(), 
        text: hover.slice(0,10).reverse() , 
        mode: 'markers',
        marker: {
        color: 'blue'},
        type:"bar",
        orientation: "h", 
    
      };
      
      var data = [trace1];
      
      var layout = {
        title: "'Bar' Chart"
      };
      
      Plotly.newPlot("bar", data, layout);

});

