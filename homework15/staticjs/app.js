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
    
  //bar chart
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

      //bubble chart 

 var LayoutBubble = {
    margin: { t: 0 },
    xaxis: { title: "OTU Id's" },
    hovermode: "closest",
    };

    var DataBubble = [
    {
        y: sampleValues, //sample values for y value
        x:labels, //otu_ids for the x values.
      text: hover, //labels for text value 
      mode: "markers",
      marker: {
        color: labels, //otu ids for marker color
        size: sampleValues, //sample value for maker size
        }
    }
  ];

  Plotly.plot("bubble", DataBubble, LayoutBubble);



//do dropdown menu! 

var selector = d3.select("#selDataset");

  var sampleNames = sampledata.names;  //get names 
  sampleNames.forEach((sample) => {
    selector
      .append("option")    //select fill 
      .text(sample)
      .property("value", sample);
  });

  // Use the first sample from the list to build the initial plots
  const firstSample = sampleNames[0]; 
  buildMetadata(firstSample)
 

  //Display the sample metadata, i.e., an individual's demographic information.
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var resultsarray= metadata.filter(sampleobject => sampleobject.id == sample);
      var result= resultsarray[0]
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
      });
    });

  }




});









