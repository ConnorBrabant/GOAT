document.addEventListener('DOMContentLoaded', () => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    let graphArea = document.getElementById('line-graph');
    let graphWidth = graphArea.offsetWidth - margin.left - margin.right;

    const svg = d3.select("#line-graph").append('svg')
        .attr("width", '100%')
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.bottom + ',' + margin.top + ')')

    const xScale = d3.scaleBand().range([0, graphWidth])
    const yScale = d3.scaleLinear().range([height, 0]);

    const yAxisValues = {
        'max': null,
        'min': null
    };

    let xAxisValues = null;

    const addLine = function(pathname, className, stat) {
        d3.csv(`/src/data/${pathname}data.csv`, function (data) {
            let stats = [];
            data.forEach(ele => {
                if (typeof ele.year !== 'career') {
                    let obj = {};
                    obj['year'] = ele.year;
                    obj[stat] = parseFloat(ele[stat]);
                    stats.push(obj);
                }
            })

            let changed = false; 
            let statsMinAndMax = Object.values(stats).map(ele => ele[stat])
            if (!yAxisValues['max'] || yAxisValues['max'] < Math.max.apply(Math, statsMinAndMax)) {
                yAxisValues['max'] = Math.max.apply(Math, statsMinAndMax)
                changed = true;
            } 
            if (!yAxisValues['min'] || yAxisValues['min'] > Math.min.apply(Math, statsMinAndMax)) {
                yAxisValues['min'] = Math.min.apply(Math, statsMinAndMax)
                changed = true;
            } 

            let xAxisValuesArray;
            let statsToRender;

            if (!xAxisValues || xAxisValues > stats.length || changed) {
                xAxisValues = stats.length;
                xAxisValuesArray = Array.from(new Array(xAxisValues - 1), (x, i) => i + 1);
                xAxisValuesArray.push('career');
                statsToRender = stats;
                d3.selectAll('.x-axis').remove()
                d3.selectAll('.y-axis').remove()

                xScale.domain(xAxisValuesArray.map(ele => ele))
                yScale.domain([yAxisValues['min'] - 2 <= 0 ? 0 : yAxisValues['min'] - 2, yAxisValues['max'] + 2])

                const xAxis = d3.axisBottom()
                    .scale(xScale);

                const yAxis = d3.axisLeft()
                    .scale(yScale);

                svg.append('g')
                    .attr('class', 'y-axis')
                    .call(yAxis);

                svg.append('g')
                    .attr('class', 'x-axis')
                    .attr('year', stats.length)
                    .attr("transform", "translate(0, 500)") 
                    .call(xAxis);
            } else if (stats.length >= xAxisValues) {
                statsToRender = stats.slice(0, xAxisValues - 1).concat(Object.values(stats)[stats.length - 1]);
            }

            const path = svg.append('path')
                .datum(statsToRender)
                .attr('stats', d3.extent(stats, function(d) { return d[`${stat}`]}))
                .attr('year', stats.length)
                .attr('id', className)
                .attr('class', `line ${className}`)
                .attr('d', d3.line()
                    .x(function (d) { return xScale(d.year) })
                    .y(function (d) { return yScale(d[stat])}))
                .on("mouseover", function () {
                    d3.selectAll(`#stats-${className}`).style('display', 'block')
                })
                .on("mouseout", function () {
                    d3.selectAll(`#stats-${className}`).style('display', 'none')
                });

            svg.append('g')
                .classed('labels-group', true)
                .selectAll('text')
                .data(statsToRender)
                .enter()
                .append('text')
                .attr('id', `stats-${className}`)
                .attr('x', function (d) {
                        return xScale(d.year);
                    })
                .attr('y', function (d) {
                        return yScale(d[stat]);
                    })
                .text(function (d) { return d[stat]})
                .style("display", "none")      
            
            const totalLength = path.node().getTotalLength();

            path
                .attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .duration(4000)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)

        })
    }
 
        const toggleLine = function (lastName, className, statChange) {
            if (!d3.select(`#${className}`)._groups[0][0]) {
                d3.selectAll('.labels-group').remove()
                addLine(lastName, className, statChange)
                let playersOnDOM = document.getElementsByClassName('line')
                let playersOnDOMNames = [];
                for (let i = 0; i < playersOnDOM.length; i++) {
                    let name = playersOnDOM[i].getAttribute('id').split('-')[0]
                    playersOnDOMNames.push(name);
                }
                d3.selectAll('.line').remove();
                for (let i = 0; i < playersOnDOMNames.length; i++) {
                    addLine(playersOnDOMNames[i], `${playersOnDOMNames[i]}-line`, statChange)
                }
            } else {
                d3.select(`#${className}`).remove();
            }
        }

        let statsDropdown = d3.select('#stat')
        let statChange = ['ppg'];
        statsDropdown.on('change', function() {
            yAxisValues['max'] = null;
            yAxisValues['min'] = null;
            d3.selectAll('.line').remove()
            d3.selectAll('.labels-group').remove()
            statChange[0] = d3.event.target.value;
            addLine('jordan', 'jordan-line', statChange[0])
        })

        addLine('jordan', 'jordan-line', statChange)
        let larryBird = d3.select('#larry-stats')
        larryBird.on("click", () => toggleLine('bird', 'bird-line', statChange[0]))
        let magicJohnson = d3.select('#magic-stats')
        magicJohnson.on("click", () => toggleLine('johnson', 'johnson-line', statChange[0]))
        let lebronJames = d3.select('#lebron-stats')
        lebronJames.on("click", () => toggleLine('james', 'james-line', statChange[0]))

});
