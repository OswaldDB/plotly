d3.json("samples.json").then(function(data) {

    var example = data.samples[0];
    delete example.id;

    sortableArray = [];
    for (i=0; i<example.sample_values.length; i++) {
        let arrayObj = {sample_value: example.sample_values[i], otu_id: example.otu_ids[i], otu_label: example.otu_labels[i]};
        sortableArray.push(arrayObj)
    };

    sortableArray.sort((a, b) => {
        return b.sample_value - a.sample_value;
    });

    topTenArray = sortableArray.slice(0,10);

    var sample_values = [];
    var otu_ids = [];
    var otu_labels = [];
    for (i=0; i<10; i++) {
        sample_values.push(topTenArray[i].sample_value);
        otu_ids.push("OTU" + topTenArray[i].otu_id);
        otu_labels.push(topTenArray[i].otu_label);
    }
    
    console.log(sample_values);
    console.log(otu_ids);

    var trace1 = {
        x: otu_ids,
        y: sample_values,
        type: "bar"
    }

    Plotly.newPlot("bar",[trace1])

});

