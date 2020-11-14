d3.json("samples.json").then(function(data) {
    // Build the dropdown
    for (i=0; i<data.samples.length; i++) {
        d3.select("#selDataset").append("option").text(data.samples[i].id);
    }

    // Set the change conditions
    d3.selectAll("#selDataset").on("change", updatePloty);

    // Define the id
    function getId() {
        var subject_id = d3.selectAll("#selDataset").property("value");
        for (r=0; r<data.samples.length; r++) {
            if (data.samples[r].id === subject_id) {
                return r;
            }
        }
    }

    // Plot bar chart
    function updatePloty() {
        //
        var example = data.samples[getId()];
        delete example.id;
        //
        sortableArray = [];
        for (i=0; i<example.sample_values.length; i++) {
            let arrayObj = {sample_value: example.sample_values[i], otu_id: example.otu_ids[i], otu_label: example.otu_labels[i]};
            sortableArray.push(arrayObj)
        };
        //
        sortableArray.sort((a, b) => {
            return b.sample_value - a.sample_value;
        });
        //
        topTenArray = sortableArray.slice(0,10);
        //
        var sample_values = [];
        var otu_ids = [];
        var otu_labels = [];
        for (i=0; i<10; i++) {
            sample_values.push(topTenArray[i].sample_value);
            otu_ids.push("OTU " + topTenArray[i].otu_id);
            otu_labels.push(topTenArray[i].otu_label);
        }
        //
        var trace1 = {
            y: otu_ids.reverse(),
            x: sample_values.reverse(),
            orientation: 'h',
            type: "bar"
        }
        //
        Plotly.newPlot("bar",[trace1])
    }

});

