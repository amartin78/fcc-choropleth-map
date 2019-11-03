

// d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
//     .then(result => {
//         cMap(result);
//     });

d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
    .then(result => {
        cMap(result);
    });



function cMap(dataset) {

    console.log(dataset['bbox'])

    const us = dataset;

    d3.select('body')
        .append('h1')
        .attr('id', 'title')
        .text('United States Educational Attainment')

    d3.select('body')
        .append('h2')
        .attr('id', 'description')
        .text('Percentage of adults age 25 and older with a bachelor\'s degree or higher (2010-2014)')

    
    const width = 1200
    const height = 500
    const padding = 80

    const color = d3.scaleQuantize([1, 10], d3.schemeBlues[9])

    const svg = d3.select('body')
                    .append('svg')
                    // .attr('width', width)
                    // .attr('height', height)
                    .attr('viewBox', dataset['bbox'])

    const path = d3.geoPath();

    svg.append('g')
       .selectAll('path')
       .data(topojson.feature(us, us.objects.counties).features)
       .join('path')
    //    .attr('fill', d => color(dataset.get(d.id)))
       .attr('class', 'county')
       .attr('d', path)

    svg.append('path')
       .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
       .attr('fill', 'none')
       .attr('stroke', 'white')
       .attr('stroke-linejoin', 'round')
       .attr('d', path)

    return svg.node();


    
                    







}






