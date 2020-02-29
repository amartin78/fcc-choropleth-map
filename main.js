
let p1 = d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
let p2 = d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')

Promise.all([p1, p2])
        .then(result => {
            cMap(result);
        })


function cMap(dataset) {

        const us = dataset[0];
        const ed = dataset[1];
    
        const path = d3.geoPath();
        const color = d3.scaleQuantize([3, 75], d3.schemePuBu[8])

        d3.select('body')
            .append('h2')
            .attr('id', 'title')
            .text('United States Educational Attainment')
    
        d3.select('body')
            .append('h3')
            .attr('id', 'description')
            .text('Percentage of adults age 25 and older with a bachelor\'s degree or higher (2010-2014)')
    
        const svg = d3.select('body')
                        .append('svg')
                        .attr('viewBox', us['bbox'])

        svg.append('g')
            .attr('id', 'legend')
            .attr('transform', 'translate(950, 350)')
            .call(d3.legendColor().scale(color))
    
        let tooltip = d3.select('body')
                        .append('div')
                        .attr('id', 'tooltip')
                        .style('position', 'absolute')
                        .style('background-color', 'aliceblue')
                        .style('opacity', '0.85')
                        .style('border-radius', '5px')
                        .style('padding', '1rem')
                        .style('visibility', 'hidden')
    
        svg.append('g')
           .selectAll('path')
           .data(topojson.feature(us, us.objects.counties).features)
           .join('path')
            .attr('class', 'county')
            .attr('fill', d => {
                        return color(ed.filter(o => o['fips'] === d['id'])[0]['bachelorsOrHigher'])
            })
            .attr('data-fips', d => {
                return d['id']
            })
            .attr('data-education', d => {
                return ed.filter(o => o['fips'] === d['id'])[0]['bachelorsOrHigher'];
            })
            .attr('d', path)
            .on('mouseover', d => {
                tooltip.style('visibility', 'visible')
                tooltip.attr('data-education', ed.filter(o => o['fips'] === d['id'])[0]['bachelorsOrHigher'])
                tooltip.html(ed.filter(o => o['fips'] === d['id'])[0]['area_name'] + ', ' + 
                             ed.filter(o => o['fips'] === d['id'])[0]['state'] + ' - ' + 
                             ed.filter(o => o['fips'] === d['id'])[0]['bachelorsOrHigher'] + '%')
                        .style('top', (d3.event['screenY'] - 145) + 'px')
                        .style('left', (d3.event['screenX'] + 15) + 'px')
            })
            .on('mouseout', d => {
                tooltip.style('visibility', 'hidden')
            })
    
        svg.append('path')
           .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
           .attr('fill', 'none')
           .attr('stroke', 'white')
           .attr('stroke-linejoin', 'round')
           .attr('d', path)
   
        return svg.node();


}






