
let p1 = d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
let p2 = d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')

Promise.all([p1, p2])
        .then(result => {
            cMap(result);
        })


function cMap(dataset) {

        const us = dataset[0];
        const ed = dataset[1];

        d3.select('body')
            .append('h2')
            .attr('id', 'title')
            .text('United States Educational Attainment')
    
        d3.select('body')
            .append('h3')
            .attr('id', 'description')
            .text('Percentage of adults age 25 and older with a bachelor\'s degree or higher (2010-2014)')
    
        
        const width = 1200
        const height = 500
        const padding = 80
    
        const color = d3.scaleQuantize([3, 75], d3.schemeBlues[8])
    
        const svg = d3.select('body')
                        .append('svg')
                        .attr('viewBox', us['bbox'])
    
        const path = d3.geoPath();

        let tooltip = d3.select('body')
                        .append('div')
                        .attr('id', 'tooltip')
                        .style('position', 'absolute')
                        .attr('fill', 'aliceblue')
                        .style('opacity', '0.7')
                        .style('border-radius', '5px')
                        .style('visibility', 'hidden')


    
        svg.append('g')
           .selectAll('path')
           .data(topojson.feature(us, us.objects.counties).features)
           .join('path')
            .attr('class', 'county')
            .attr('fill', d => {
                        // console.log(color(ed.filter(o => o['fips'] === d['id'])[0]['bachelorsOrHigher']))
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

                let dEdu = ed.filter(o => o['fips'] === d['id'])[0]['bachelorsOrHigher'];
                console.log(dEdu)
                tooltip.style('visibility', 'visible')
                tooltip.attr('data-education', dEdu)
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


        let colors = ['green', 'red', 'blue', 'yellow', 'pink']

        svg.append('div')
           .attr('id', 'legend')
           .selectAll('rect')
           .data(colors)
           .enter()
           .append('rect')
            .attr('width', '1rem')
            .attr('height', '1rem')
            .attr('fill', d => d)

        
           
    
        return svg.node();


        

    


}






