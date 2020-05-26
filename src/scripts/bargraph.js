document.addEventListener('DOMContentLoaded', () => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    let graphArea = document.getElementById('bar-graph');
    let graphWidth = graphArea.offsetWidth - margin.left - margin.right;

    const svg = d3.select("#bar-graph").append('svg')
        .attr("width", '100%')
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.bottom + ',' + margin.top + ')')

    const xScale = d3.scaleBand().range([0, graphWidth]).padding(0.4);
    const yScale = d3.scaleLinear().range([height, 0]);

    d3.csv('https://connorbrabant.github.io/GOAT/src/data/jordandata.csv', function (data) {
        const dropdown = d3.select('#year')
        const allData = data;
        let subData = [];
        for (ele in allData[allData.length-1]) {
            let obj = {}
            obj['stat'] = ele
            obj['value'] = parseFloat(allData[allData.length-1][ele])
            subData.push(obj);
            }
            
        data = subData.slice(1); 
        xScale.domain(data.map(function (d) { return d.stat }))
        yScale.domain([0, 40])

        const xAxis = d3.axisBottom()
            .scale(xScale);

        const yAxis = d3.axisLeft()
            .scale(yScale);

        svg.append('g')
            .call(yAxis);

        svg.append('g')
            .attr("transform", "translate(0, 500)") // shifts x axis to bottom
            .call(xAxis);

        const bar = svg.selectAll('.bar');
        bar
            .data(data)
            .enter().append('rect')
            .attr("x", function (d) {
                return xScale(d.stat)
            })
            .attr("y", function (d) { 
                return yScale(d.value) })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(d.value) })
    
        dropdown.on("change", function () {

            year = d3.event.target.value;
            let subData = [];
            for (ele in allData[year-1]) {
                let obj = {}
                obj['stat'] = ele
                obj['value'] = parseFloat(allData[year-1][ele])
                subData.push(obj);
            }
            data = subData.slice(1);
            
            const bar = svg.selectAll('rect')
            bar
                .data(data)
                .enter()
                .append('rect')
                .merge(bar)
                .transition()
                .duration(1000)
                .attr("y", function (d) {
                    return yScale(d.value)
                })
                .attr("height", function (d) { return height - yScale(d.value) });  

        });
    });  
});
