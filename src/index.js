// import './styles/index.scss'
document.addEventListener('DOMContentLoaded', () => {
    const margin = { top:50, right:50, bottom:50, left:50},
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const svg = d3.select("body").append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.bottom + ',' + margin.top + ')');

    const xScale = d3.scaleBand().range([0, width]).padding(0.4);
    const yScale = d3.scaleLinear().range([height, 0]);
    // scale creates a function thats takes in an input and returns a value 
    // range determines how far to map out the data 
    // domain takes input that is then scaled to the range 


    d3.csv('/src/data/data.csv', function(data) {
        // let year = document.getElementById('year').getAttribute('value')
        console.log(data.length);
        console.log(data[data.length-1])
        let subData = [];
        for (ele in data[15]) {
            let obj = {}
            obj['stat'] = ele 
            obj['value'] = parseFloat(data[data.length-1][ele])
            subData.push(obj);
        }

        data = subData;

        // xScale.domain(Object.keys(subData).map(ele => ele))
        xScale.domain(data.map(function(d) {return d.stat}))
        // yScale.domain([0, d3.max(data, function(d) { return d.ppg })]) //returns highest PPG
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

        svg.selectAll('.bar')
            .data(data) 
            .enter().append('rect') 
            .attr("x", function (d) { 
                console.log(data)
                console.log(d)
                return xScale(d.stat)})
            .attr("y", function (d) { return yScale(d.value)})
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(d.value)})
    });
});
