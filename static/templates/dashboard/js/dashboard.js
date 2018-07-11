let ACCURACY_COLOR = {
	"accuracy-total": "#3498db",
	"accuracy-pos": "#2ecc71",
	"accuracy-iobes": "#95a5a6"
}

let globalVarPage = 1
let globalVarMaxPage = 1

function displaySearchResult (searchResultJson) {
	$('#table-results').hide()
	
	let matchedTotal = searchResultJson['matched'].length
	if (matchedTotal == 0){
		let $notFound = $('<h1 style="text-align:center;color:grey;margin:100px;"><b>Not Found</b></h1>')
		$('#search-result').html($notFound)
		
		return
	}
	
	let $tableBody = $('#table-results').find('tbody')
	$tableBody.empty()
	
	for (let i=0; i < matchedTotal; i++) {
		let thisSearchResultRow = searchResultJson['matched'][i]
		let $tableRow = $('<tr></tr>').attr('oid', thisSearchResultRow['_id'])
		let tableDataList = [$('<td></td>'), $('<td></td>'), $('<td></td>'), $('<td></td>')]
		
		// sentence number
		tableDataList[0].text((i + 1) + (globalVarPage - 1) * 10)
		
		// display sentence word		
		let autoTag = searchResultJson['matched'][i]['auto_tag']
		for (let j=0; j < autoTag.length; j++) {
			// create word span
			let $wordSpan = $('<span class="label"></span>').text(autoTag[j]['word'])
			// if this word accuracy below 70%, this word will be marked with red color
			$wordSpan.addClass( autoTag[j]['accuracy'] > 0.7 ? 'label-primary' : 'label-danger' )
			// whitespace is important !! 
			tableDataList[1].append($wordSpan).append(" ")
		}
		
		// is this sentence completed? mark if completed
		let status = (typeof thisSearchResultRow['status'] !== 'undefined') && (thisSearchResultRow['status'] === 'completed')
		let $checkBox = $('<input type="checkbox">Completed</input>').prop('checked', status)
		let $label = $('<label class="checkbox-inline"></label>').append($checkBox)
		
		tableDataList[2].append($label)
		
		// add save button
		let $saveButton = $('<button class="btn btn-primary btn-xs">Save</button>')
		$saveButton.click( onSaveClicked )
		tableDataList[3].append($saveButton)

		$tableRow.append(tableDataList)
		$tableBody.append($tableRow)
	}

	$('#table-results').show()
}

function displayPagination () {
	// remove page number
	$('.page-number').remove()
	$('#prev-btn').show()
	$('#next-btn').show()
	
	let supposedMaxPagination = Math.floor(globalVarPage / 10) * 10 + 10
	let endPagination = Math.min(supposedMaxPagination, globalVarMaxPage)

	if (globalVarPage == 1)
		$('#prev-btn').hide()
	
	// add page numbers
	for (let i = globalVarPage; i <= endPagination; i++){
		let pageNumber = $('<a></a>').text(i)
		pageNumber.click(onPageClicked)
		
		let listItem = $('<li></li>').addClass('page-number').append(pageNumber)
		listItem.insertBefore($('#next-btn'))
	}
	
	if (globalVarMaxPage <= supposedMaxPagination)
		$('#next-btn').hide()
	
	// add active page
	$($('#prev-btn').next()).addClass('active')
}

function searchSentenceOnPage (page, callback) {
	let selected = $('#select-category').val()
	let searchThis = $('#search-bar').val().replace(" ","%20")
	
	$.get("/postagger/search/" + searchThis + "/" + selected + "/" + page + "/", function (result, status) {
		callback(result)
		displaySearchResult(result)
	})
}

// called when user click previoius or next
function onPaginationChange (direction) {
	let beginPagination = parseInt($($('#prev-btn').next()).text())
	let nextPage = direction == 'next' ? beginPagination + 10 : beginPagination - 10

	searchSentenceOnPage(nextPage, function (result) {
		globalVarPage = nextPage
		displayPagination()
	})
}

// called when user click save
function onSaveClicked () {
	
}

// called when user click a page number
function onPageClicked () {
	let $pageNumber = $(this)
	let nextPage = parseInt($pageNumber.text())
	
	searchSentenceOnPage(nextPage, function (result) {
		globalVarPage = nextPage
		
		// change active page
		$('.active').removeClass('active')
		$pageNumber.closest('li').addClass('active')
	})
}

// called when user search reviewed sentence based on word
function onSearchClick () {
	searchSentenceOnPage(1, function (result) {
		globalVarPage = 1
		globalVarMaxPage = result['max_page']

		displayPagination()
	})
}

function displayAccuracyChart (chartDivName, percentage) {
	var opts = {
	  angle: 0.0,
	  lineWidth: 0.54,
	  radiusScale: 1,
	  pointer: {
		length: 0.7,
		strokeWidth: 0.035,
		color: '#000000'
	  },
	  limitMax: false,
	  limitMin: false,
	  generateGradient: true,
	  highDpiSupport: true,
	};

	let ctx = document.getElementById(chartDivName + "-chart")
	$('#' + chartDivName + "-chart").before("<center><h4>" + percentage + " %</h4></center>")

	let gauge = new Gauge(ctx).setOptions(opts)
	gauge.maxValue = 100
	gauge.setMinValue(0)
	gauge.animationSpeed = 32
	gauge
	gauge.set(percentage)
}

function getOverviewDetail () {
	$.get('/postagger/overview/', function (result) {
		$('#reviewed-count').text(result['evaluated_total'])
		displayAccuracyChart("accuracy-total", (result['accuracy_total'] * 100).toFixed(2))
		displayAccuracyChart("accuracy-iobes", (result['accuracy_iobes'] * 100).toFixed(2))
		displayAccuracyChart("accuracy-pos", (result['accuracy_pos'] * 100).toFixed(2))

		$('#reviewed-model-name').text(result['model_name'])
		$('#reviewed-model-version').text("VERSION: " + result['model_version'])
	}) 
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
	
$(document).ready(function(){
	initCustomizedChartConfig()
	getOverviewDetail()
})

