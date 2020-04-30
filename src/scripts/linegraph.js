document.addEventListener('DOMContentLoaded', () => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#line-graph").append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.bottom + ',' + margin.top + ')');

    const xScale = d3.scaleBand().range([0, width])
    const yScale = d3.scaleLinear().range([height, 0]);

    const addLine = function(pathname, className) {
        console.log('hit')
        d3.csv(`/src/data/${pathname}data.csv`, function (data) {
            let stats = [];
            data.forEach(ele => {
                if (typeof ele.year !== 'career') {
                    let obj = {};
                    obj['year'] = ele.year;
                    obj['ppg'] = parseFloat(ele.ppg);
                    stats.push(obj);
                }
            })

            console.log(stats);
            xScale.domain(stats.map(function (d) { return d.year }))
            yScale.domain([0, 40])

            const xAxis = d3.axisBottom()
                .scale(xScale);

            const yAxis = d3.axisLeft()
                .scale(yScale);

            svg.append('g').call(yAxis);

            svg.append('g')
                .attr("transform", "translate(0, 500)") // shifts x axis to bottom
                .call(xAxis);

            const line = d3.line()
                .x(function (d) {
                    console.log(d.year)
                    return xScale(d.year)
                })
                .y(function (d) { return yScale(d.ppg) })

            const path = svg.append('path')
                .datum(stats)
                .attr('class', className)
                .attr('d', d3.line()
                    .x(function (d) {
                        console.log(d.year)
                        return xScale(d.year)
                    })
                    .y(function (d) {
                        console.log(d.ppg)
                        return yScale(d.ppg)
                    }))
                
            const totalLength = path.node().getTotalLength();

            path
                .attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .duration(4000)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)
                .on("end", repeat);
        })
    }

        addLine('jordan', 'MJ-line')
        let larryBird = d3.select('#larry-stats')
        larryBird.on("click", () => addLine('bird', 'LB-line'))
        let magicJohnson = d3.select('#magic-stats')
        magicJohnson.on("click", () => addLine('johnson', 'Magic-line'))
        let lebronJames = d3.select('#lebron-stats')
        lebronJames.on("click", () => addLine('james', 'Lebron-line'))
});