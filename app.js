d3.json("samples.json").then(function(data) {
    // Build the dropdown
    for (i=0; i<data.names.length; i++) {
        d3.select("#selDataset").append("option").text(data.names[i]);
    }

    // Initialize the plot
    updatePloty()

    // Set the change conditions to update the bar chart, etc.
    d3.selectAll("#selDataset").on("change", updatePloty);

    // Define the id of the subject
    function getId() {
        for (r=0; r<data.names.length; r++) {
            if (data.names[r] == d3.selectAll("#selDataset").property("value")) {
                return r;
            }
        }
    }

    // Prepare the demographic info
    function demoInfo() {
        d3.select("#sample-metadata").html("");
        d3.select("#sample-metadata").append("ul");
        d3.select("ul").append("li").text("id: " + data.metadata[getId()].id);
        d3.select("ul").append("li").text("ethnicity: " + data.metadata[getId()].ethnicity);
        d3.select("ul").append("li").text("gender: " + data.metadata[getId()].gender);
        d3.select("ul").append("li").text("age: " + data.metadata[getId()].age);
        d3.select("ul").append("li").text("location: " + data.metadata[getId()].location);
        d3.select("ul").append("li").text("bbtype: " + data.metadata[getId()].bbtype);
        d3.select("ul").append("li").text("wfreq: " + data.metadata[getId()].wfreq);
    }

    // Generate the plot
    function updatePloty() {
        // Update the demo info box
        demoInfo()
        // Format the data for the selected subject into a workable, sorted, and sliced form
        var workingArray = [data.samples[getId()].otu_ids,data.samples[getId()].sample_values,data.samples[getId()].otu_labels];
        for (i=0; i<workingArray[0].length; i++) {
            workingArray.sort((a, b) => {
                return b[1] - a[1];
            })
        }
        let slicedArray = [workingArray[0].slice(0,10),workingArray[1].slice(0,10),workingArray[2].slice(0,10)]
        for (i=0; i<10; i++) {
            slicedArray[0][i] = "OTU " + slicedArray[0][i]
        }
        // Generate the bar plot
        let trace1 = {
            x: slicedArray[1].reverse(),
            y: slicedArray[0].reverse(),
            orientation: 'h',
            hovertext: slicedArray[2].reverse(),
            type: 'bar'
        }
        Plotly.newPlot('bar',[trace1])
        // Generate the bubble plot
        let trace2 = {
            x: workingArray[0],
            y: workingArray[1],
            mode: 'markers',
            marker: {
                size: workingArray[1],
                color: workingArray[0]
            },
            text: workingArray[2]
        }
        Plotly.newPlot('bubble',[trace2])

    }
})
