d3.json("samples.json").then(function(data) {
    var sample_values = data.samples.sample_values;
    var otu_ids = data.samples.otu_ids;
    var otu_labels = data.samples.otu_labels;

    var trace1 = {
        x: otu_ids,
        y: sample_values,
        type: "bar"
    }

    Plotly.newPlot("bar",[trace1])

});

