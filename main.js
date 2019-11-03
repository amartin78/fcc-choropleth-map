
let p1 = d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
    // .then(result => {
    //     cMap(result, 'c');
    // });

let p2 = d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
    // .then(result => {
    //     cMap(result);
    // });

Promise.all([p1, p2])
        .then(result => {
            cMap(result);
            // console.log(result)
        })


function cMap(dataset) {

    // console.log(dataset)


        const us = dataset[0];
        const ed = dataset[1];

        // console.log(us.objects.counties.geometries[0].id)
        // console.log(ed[us.objects.counties.geometries[0].id]['fips'], ed[us.objects.counties.geometries[0].id]['bachelorsOrHigher'])

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
    
        // const color = d3.scaleQuantize([1, 10], d3.schemeBlues[9])
        const color = d3.scaleQuantize([1, 6], d3.schemeBlues[6])
    
        const svg = d3.select('body')
                        .append('svg')
                        .attr('viewBox', us['bbox'])
    
        const path = d3.geoPath();
    
        svg.append('g')
           .selectAll('path')
           .data(topojson.feature(us, us.objects.counties).features)
           .join('path')
            // .attr('fill', d => color(dataset.get(d.id)))
           .attr('fill', d => {

           })
           .attr('class', 'county')
           .attr('data-fips', d => {
            //    console.log(d)
               return d['id']
           })
           .attr('data-education', d => {
               return ed.filter(o => o['fips'] === d['id'])[0]['bachelorsOrHigher'];
            //    console.log(res[0]['bachelorsOrHigher'])
           })
           .attr('d', path)
    
        svg.append('path')
           .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
           .attr('fill', 'none')
           .attr('stroke', 'white')
           .attr('stroke-linejoin', 'round')
           .attr('d', path)
    
        return svg.node();

    


}






