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

            let yValues = function() {
                if (d3.selectAll('.line')._groups[0][0]) {
                    let elements = document.getElementsByClassName('line')
                    let values = [];
                    for (let i = 0; i < elements.length; i++) {
                        let minAndMax = elements[i].getAttribute('stats').split(",")
                        values.push(minAndMax[0])
                        values.push(minAndMax[1])
                    }
                    let currentStats = stats.map(ele => ele[`${stat}`])
                    values.push(Math.max.apply(Math, currentStats))
                    values.push(Math.min.apply(Math, currentStats))
                    return values
                }
            }

            let yAxisValues = yValues();
            let yMax;
            let yMin;
            if (yAxisValues) {
                yMax = Math.max.apply(Math, yAxisValues);
                yMin = Math.min.apply(Math, yAxisValues)
            } else {
                yMax = Math.max.apply(Math, stats.map(ele => ele[`${stat}`]))
                yMin = Math.min.apply(Math, stats.map(ele => ele[`${stat}`]))
            }

            let xAxisYears = function() {
                if (svg.selectAll('g')._groups[0].length) {
                    let xAxes = document.getElementsByClassName('x-axis')
                    for (let i = 0; i < xAxes.length;i++) {
                    maxYears = xAxes[i].getAttribute('year');
                    let maxYear = maxYears > stats.length ? stats.length : maxYears
                    return Array.from(new Array(maxYear - 1), (x, i) => i + 1 )
                    } 
                } else {
                    return Array.from(new Array(stats.length - 1), (x, i) => i + 1)
                }   
            }

            let xDomainValue = xAxisYears();
            xDomainValue.push('career')

            console.log(yMin);
            console.log(yMax);
            (xDomainValue.length)

            
            if (xDomainValue.length === stats.length) {
                d3.selectAll('.x-axis').remove()
                d3.selectAll('.y-axis').remove()

                xScale.domain(xDomainValue.map(ele => ele))
                yScale.domain([yMin, yMax])

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
                    .attr("transform", "translate(0, 500)") // shifts x axis to bottom
                    .call(xAxis);
            } else if (xDomainValue.length < stats.length) {
                stats = stats.slice(0, xDomainValue.length -1).concat(stats.pop())
            }

            const path = svg.append('path')
                .datum(stats.slice(0,xDomainValue.length))
                .attr('stats', d3.extent(stats, function(d) { return d[`${stat}`]}))
                .attr('year', data.length)
                .attr('id', className)
                .attr('class', `line ${className}`)
                .attr('d', d3.line()
                    .x(function (d) { return xScale(d.year) })
                    .y(function (d) { return yScale(d[stat])}))
                
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
                let playersOnDOM = document.getElementsByClassName('line')
                addLine(lastName, className, statChange)
                playersOnDOMNames = [];
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
            d3.selectAll('.line').remove()
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