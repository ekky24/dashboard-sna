let ACCURACY_COLOR = {
	"accuracy-total": "#3498db",
	"accuracy-pos": "#2ecc71",
	"accuracy-iobes": "#95a5a6"
}

function onSearchClick () {
	let selected = $('#select-category').val()
	let searchThis = $('#search-bar').val()
	
	console.log(selected + ' ' + searchThis)
}

function initCustomizedChartConfig () {
	Chart.pluginService.register({
	beforeDraw: function (chart) {
		if (!chart.config.options.elements.center) return 

		//Get ctx from string
		let ctx = chart.chart.ctx
		
		//Get options from the center object in options
		let centerConfig = chart.config.options.elements.center
		let fontStyle = centerConfig.fontStyle || 'Roboto'
		let txt = centerConfig.text
		
		let color = centerConfig.color || '#000'
		let sidePadding = centerConfig.sidePadding || 20
		let sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
		//Start with a base font of 30px
		ctx.font = "30px " + fontStyle
		
		//Get the width of the string and also the width of the element minus 10 to give it 5px side padding
		let stringWidth = ctx.measureText(txt).width
		let elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated

		// Find out how much the font can grow in width.
		let widthRatio = elementWidth / stringWidth
		let newFontSize = Math.floor(30 * widthRatio)
		let elementHeight = (chart.innerRadius * 2)

		// Pick a new font size so it will not be larger than the height of label.
		let fontSizeToUse = Math.min(newFontSize, elementHeight)

		//Set font settings to draw it correctly.
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		let centerX = ((chart.chartArea.left + chart.chartArea.right) / 2)
		let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2)
		ctx.font = fontSizeToUse+"px " + fontStyle
		ctx.fillStyle = color
		
		//Draw text in center
		ctx.fillText(txt, centerX, centerY)
		
	}
})
}

function displayAccuracyChart (chartDivName, percentage) {
	let ctx = document.getElementById(chartDivName + "-chart").getContext('2d')
	let myChart = new Chart(ctx, {
	  type: 'doughnut',
	  data: {
		labels: [],
		datasets: [{
			backgroundColor: [
				ACCURACY_COLOR[chartDivName],
				"#ffffff"
			],
			data: [percentage, 100 - percentage]
		}]
	  },
	  options: {
		  maintainAspectRatio: false,
		  tooltips: {enabled: false},
		  elements: {
			center: {
				text: String(percentage) + '%',
				color: '#000000', // Default is #000000
				fontStyle: 'Arial', // Default is Arial
				sidePadding: 20 // Defualt is 20 (as a percentage)
			}
		}
	  }
	})
}

function getOverviewDetail () {
	$.get('/postagger/overview/', function (result){
		$('#reviewed-count').text(result['evaluated_total'])
		displayAccuracyChart("accuracy-total", (result['accuracy_total'] * 100).toFixed(1))
		displayAccuracyChart("accuracy-iobes", (result['accuracy_iobes'] * 100).toFixed(1))
		displayAccuracyChart("accuracy-pos", (result['accuracy_pos'] * 100).toFixed(1))
	}) 
}
	
$(document).ready(function(){
	initCustomizedChartConfig()
	getOverviewDetail()
})

