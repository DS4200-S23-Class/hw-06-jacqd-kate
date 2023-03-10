// declare constants 
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 400;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;


const speciesColor = {
	setosa: "slateblue",
	versicolor: "indianred",
	virginica: "indigo"
};

// frame for scatter plot 1 
const SCATTER1 = 
d3.select("#vis1")
	.append("svg")
		.attr("width", FRAME_WIDTH)
		.attr("height", FRAME_HEIGHT)
		.attr("class", "frame");

// frame for scatter plot 2
const SCATTER2 =
d3.select("#vis2")
	.append("svg")
		.attr("width", FRAME_WIDTH)
		.attr("height", FRAME_HEIGHT)
		.attr("class", "frame");

// opening the file
d3.csv("data/iris.csv").then((data) => {

	// scaling 
	const LENGTH_X = d3.max(data, (d) => {return parseInt(d.Sepal_Length)});
	const LENGTH_Y = d3.max(data, (d) => {return parseInt(d.Petal_Length)});

	const SCALE_LENGTH_X = d3.scaleLinear()
						.domain([0, LENGTH_X + 1])
						.range([0, VIS_WIDTH]);
	const SCALE_LENGTH_Y = d3.scaleLinear()
						.domain([0, LENGTH_Y + 1])
						.range([VIS_HEIGHT, 0]);

	// labels for scatter plot
	SCATTER1.append("text")
        .attr("x", (FRAME_WIDTH / 2))             
        .attr("y", 0 + (MARGINS.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("font-weight", "bold")
        .text("Sepal_Length vs. Petal_Length");

	// scatter plot 
	let s1 = SCATTER1.selectAll("points")
			.data(data)
			.enter()
			.append("circle")
				.attr("class", "point")
				.attr("cx", (d) => {return SCALE_LENGTH_X(d.Sepal_Length) 
									+ MARGINS.left})
				.attr("cy", (d) => {return SCALE_LENGTH_Y(d.Petal_Length) 
									+ MARGINS.top})
				.attr("r", 5)
				.style("fill", (d) => {return speciesColor[d.Species]})
				.style("opacity", .5);

	// x axis
	SCATTER1.append("g")
			.attr("transform", 
					"translate(" + MARGINS.left + "," + (FRAME_HEIGHT - MARGINS.top) + ")")
				.call(d3.axisBottom(SCALE_LENGTH_X).ticks(10))
					.attr("font-size", "10px");

	// y axis
	SCATTER1.append("g")
			.attr("transform", 
					"translate(" + MARGINS.left + "," + MARGINS.top + ")")
				.call(d3.axisLeft(SCALE_LENGTH_Y).ticks(10))
					.attr("font-size", "10px");


	// scatter plot 2
	// labels for scatter plot
	const WIDTH_X = d3.max(data, (d) => {return parseInt(d.Sepal_Width)});
	const WIDTH_Y = d3.max(data, (d) => {return parseInt(d.Petal_Width)});

	const SCALE_WIDTH_X = d3.scaleLinear()
						.domain([0, WIDTH_X + 1])
						.range([0, VIS_WIDTH]);
	const SCALE_WIDTH_Y = d3.scaleLinear()
						.domain([0, WIDTH_Y + 1])
						.range([VIS_HEIGHT, 0]);

	SCATTER2.append("text")
        .attr("x", (FRAME_WIDTH / 2))             
        .attr("y", 0 + (MARGINS.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("font-weight", "bold")
        .text("Sepal_Width vs. Petal_Width");

	// scatter plot 
	let s2 = SCATTER2.selectAll("points")
			.data(data)
			.enter()
			.append("circle")
				.attr("class", "point")
				.attr("cx", (d) => {return SCALE_WIDTH_X(d.Sepal_Width) 
									+ MARGINS.left})
				.attr("cy", (d) => {return  SCALE_WIDTH_Y(d.Petal_Width) 
									+ MARGINS.top})
				.attr("r", 5)
				.style("fill", (d) => {return speciesColor[d.Species]})
				.style("opacity", .5);

	// x axis
	SCATTER2.append("g")
			.attr("transform", 
					"translate(" + MARGINS.left + "," + (FRAME_HEIGHT - MARGINS.top) + ")")
				.call(d3.axisBottom(SCALE_WIDTH_X).ticks(10))
					.attr("font-size", "10px");

	// y axis
	SCATTER2.append("g")
			.attr("transform", 
					"translate(" + MARGINS.left + "," + MARGINS.top + ")")
				.call(d3.axisLeft(SCALE_WIDTH_Y).ticks(10))
					.attr("font-size", "10px");

	// bar chart -> plot 3
	const BAR3 = d3.select("#vis3")
		.append("svg")
			.attr("width", FRAME_WIDTH)
			.attr("height", FRAME_HEIGHT)
			.attr("class", "frame");

	const MAX_Y = 50;
	const X_SCALE = d3.scaleBand()
						.domain(data.map((d) => {return d.Species}))
    					.range([0, VIS_WIDTH]);
	const Y_SCALE = d3.scaleLinear()
						.domain([0, MAX_Y + 1])
						.range([VIS_HEIGHT, 0]);

	// labels for bar chart
	BAR3.append("text")
        .attr("x", (FRAME_WIDTH / 2))             
        .attr("y", 0 + (MARGINS.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("font-weight", "bold")
        .text("Counts of Species");


    // bar chart
	b1 = BAR3.selectAll("bars")
			.data(data)
			.enter()
			.append("rect")
				.attr("class", "bar")
				.attr("x", (d) => {return X_SCALE(d.Species) + MARGINS.left})
				.attr("y", 50)
				.attr("width", X_SCALE.bandwidth() - 10)
				.attr("height", (d) => {return VIS_HEIGHT})
				.style("fill", (d) => {return speciesColor[d.Species]});


	// x axis
	BAR3.append("g")
			.attr("transform", "translate(" + MARGINS.left + "," + (FRAME_HEIGHT - MARGINS.top) + ")")
				.call(d3.axisBottom(X_SCALE))
					.attr("font-size", "10px"); 

	// y axis
	BAR3.append("g")
			.attr("transform", 
					"translate(" + MARGINS.left + "," + MARGINS.top + ")")
				.call(d3.axisLeft(Y_SCALE).ticks(10))
					.attr("font-size", "10px");

	// brushing and linking 
	SCATTER2.append("g").call(d3.brush()
				.extent([[MARGINS.left, MARGINS.top], 
						   [VIS_WIDTH + MARGINS.left, VIS_HEIGHT + MARGINS.top]])
		.on("start brush", updateChart));

	// when brushed
	function updateChart(event) {
		// get area brushed over
    	const extent = event.selection;

    	// highlight and outline scatter 1 points if selected
    	s1.classed("selected", (d) => {return brushed(extent,
    									SCALE_WIDTH_X(d.Sepal_Width) + MARGINS.left, 
    									SCALE_WIDTH_Y(d.Petal_Width) + MARGINS.top)})

    	// highlight and outline scatter 2 points if selected
    	s2.classed("selected", (d) => {return brushed(extent, 
    									SCALE_WIDTH_X(d.Sepal_Width) + MARGINS.left, 
    									SCALE_WIDTH_Y(d.Petal_Width) + MARGINS.top)})

    	// highlight and outline bars if selected
    	b1.classed("selected_bar", (d) => {return brushed(extent, 
    									SCALE_WIDTH_X(d.Sepal_Width) + MARGINS.left, 
    									SCALE_WIDTH_Y(d.Petal_Width) + MARGINS.top)})


    };

    // check if point was selected
	function brushed(coords, cx, cy) {
		// selected area
		const x0 = coords[0][0],
        	x1 = coords[1][0],
        	y0 = coords[0][1],
        	y1 = coords[1][1];

        // returns True point in area, False otherwise
    	return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1
	};




});