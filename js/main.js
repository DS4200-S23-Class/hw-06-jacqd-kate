// declare constants 
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 400;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// frame for scatter plot 
const SCATTER1 = 
d3.select("#vis1")
	.append("svg")
		.attr("width", FRAME_WIDTH)
		.attr("height", FRAME_HEIGHT)
		.attr("class", "frame");

// opening the file
d3.csv("data/iris.csv").then((data) => {

	// scaling 
	const MAX_X = d3.max(data, (d) => {return parseInt(d.Petal_Length)});
	const MAX_Y = d3.max(data, (d) => {return parseInt(d.Sepal_Length)});

	const X_SCALE = d3.scaleLinear()
						.domain([0, MAX_X + 1])
						.range([0, VIS_WIDTH]);
	const Y_SCALE = d3.scaleLinear()
						.domain([0, MAX_Y + 1])
						.range([VIS_HEIGHT, 0]);

	// scatter plot 
	SCATTER1.selectAll("points")
			.data(data)
			.enter()
			.append("circle")
				.attr("class", "point")
				.attr("cx", (d) => {return X_SCALE(d.Petal_Length) 
									+ MARGINS.left})
				.attr("cy", (d) => {return  Y_SCALE(d.Sepal_Length) 
									+ MARGINS.top})
				.attr("r", 10)
				.style("fill", "lightblue");

	// x axis
	SCATTER1.append("g")
			.attr("transform", 
					"translate(" + MARGINS.left + "," + (FRAME_HEIGHT - MARGINS.top) + ")")
				.call(d3.axisBottom(X_SCALE).ticks(10))
					.attr("font-size", "15px");

	// y axis
	SCATTER1.append("g")
			.attr("transform", 
					"translate(" + MARGINS.left + "," + MARGINS.top + ")")
				.call(d3.axisLeft(Y_SCALE).ticks(10))
					.attr("font-size", "15px");


}