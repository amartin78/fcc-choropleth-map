

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

    const svg = d3.select('body')
                    .append('svg')
                    // .attr('width', width)
                    // .attr('height', height)
                    .attr('viewBox', dataset['bbox'])

    
                    







}






