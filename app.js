d3.json("samples.json").then(function(data) {
    
    var sample_values = data.samples[0].sample_values
    var otu_ids = data.samples[0].otu_ids
    var otu_labels = data.samples[0].otu_labels

    console.log(sample_values)

    // sample_values = []
    // otu_ids = []
    // otu_labels = []
    // for (i=0; i<data.samples.length; i++) {
    //     // console.log(data.samples[i].sample_values.length);
    //     for (j=0; j<data.samples[i].sample_values.length; j++) {
    //         sample_values.push(data.samples[i].sample_values[j]);
    //     };
    //     for (j=0; j<data.samples[i].otu_ids.length; j++) {
    //         otu_ids.push(data.samples[i].otu_ids[j]);
    //     };
    //     for (j=0; j<data.samples[i].otu_labels.length; j++) {
    //         otu_labels.push(data.samples[i].otu_labels[j]);
    //     };
    // };

    var trace1 = {
        x: otu_labels,
        y: sample_values,
        type: "bar"
    }

    Plotly.newPlot("bar",[trace1])

});

