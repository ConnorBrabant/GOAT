document.addEventListener('DOMContentLoaded', () => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#bar-graph").append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.bottom + ',' + margin.top + ')');

    const xScale = d3.scaleBand().range([0, width]).padding(0.4);
    const yScale = d3.scaleLinear().range([height, 0]);

    
})