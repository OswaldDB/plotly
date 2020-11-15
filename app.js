d3.json("samples.json").then(function(data) {
    // Build the dropdown
    for (i=0; i<data.samples.length; i++) {
        d3.select("#selDataset").append("option").text(data.samples[i].id);
    }

    // Set the change conditions to update the bar chart, etc.
    d3.selectAll("#selDataset").on("change", updatePloty);

    // Define the id of the subject
    function getId() {
        for (r=0; r<data.samples.length; r++) {
            if (data.samples[r].id == d3.selectAll("#selDataset").property("value")) {
                return r;
            }
        }
    }

    // Generate the plot
    function updatePloty() {
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
        // Generate the plot itself
        let trace = {
            x: slicedArray[1].reverse(),
            y: slicedArray[0].reverse(),
            orientation: 'h',
            type: 'bar'
        }
        Plotly.newPlot('bar',[trace])
    
    }
})