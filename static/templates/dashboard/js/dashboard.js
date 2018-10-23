let ACCURACY_COLOR = {
	"accuracy-total": "#3498db",
	"accuracy-pos": "#2ecc71",
	"accuracy-iobes": "#95a5a6"
}

let language_code = {
		'af': 'Afrikaans',
		'am': 'Amharic',
		'an': 'Aragonese',
		'ar': 'Arabic',
		'as': 'Assamese',
		'av': 'Avaric',
		'ay': 'Aymara',
		'az': 'Azerbaijani',
		'ba': 'Bashkir',
		'be': 'Belarusian',
		'bg': 'Bulgarian',
		'bh': 'Bihari languages',
		'bi': 'Bislama',
		'bm': 'Bambara',
		'bn': 'Bengali',
		'bo': 'Tibetan',
		'br': 'Breton',
		'bs': 'Bosnian',
		'ca': 'Catalan',
		'ce': 'Chechen',
		'ch': 'Chamorro',
		'co': 'Corsican',
		'cr': 'Cree',
		'cs': 'Czech',
		'cv': 'Chuvash',
		'cy': 'Welsh',
		'da': 'Danish',
		'de': 'German',
		'dv': 'Divehi; Dhivehi; Maldivian',
		'dz': 'Dzongkha',
		'ee': 'Ewe',
		'el': 'Greek',
		'en': 'English',
		'eo': 'Esperanto',
		'es': 'Spanish; Castilian',
		'et': 'Estonian',
		'eu': 'Basque',
		'fa': 'Persian',
		'ff': 'Fulah',
		'fi': 'Finnish',
		'fj': 'Fijian',
		'fo': 'Faroese',
		'fr': 'French',
		'fy': 'Western Frisian',
		'ga': 'Irish',
		'gd': 'Gaelic; Scottish Gaelic',
		'gl': 'Galician',
		'gn': 'Guarani',
		'gu': 'Gujarati',
		'gv': 'Manx',
		'ha': 'Hausa',
		'he': 'Hebrew',
		'hi': 'Hindi',
		'ho': 'Hiri Motu',
		'hr': 'Croatian',
		'ht': 'Haitian; Haitian Creole',
		'hu': 'Hungarian',
		'hy': 'Armenian',
		'hz': 'Herero',
		'in': 'Indonesian',
		'ie': 'Interlingue; Occidental',
		'ig': 'Igbo',
		'ii': 'Sichuan Yi; Nuosu',
		'ik': 'Inupiaq',
		'io': 'Ido',
		'is': 'Icelandic',
		'it': 'Italian',
		'iu': 'Inuktitut',
		'ja': 'Japanese',
		'jv': 'Javanese',
		'ka': 'Georgian',
		'kg': 'Kongo',
		'ki': 'Kikuyu; Gikuyu',
		'kj': 'Kuanyama; Kwanyama',
		'kk': 'Kazakh',
		'kl': 'Kalaallisut; Greenlandic',
		'km': 'Central Khmer',
		'kn': 'Kannada',
		'ko': 'Korean',
		'kr': 'Kanuri',
		'ks': 'Kashmiri',
		'ku': 'Kurdish',
		'kv': 'Komi',
		'kw': 'Cornish',
		'ky': 'Kirghiz; Kyrgyz',
		'la': 'Latin',
		'lb': 'Luxembourgish; Letzeburgesch',
		'lg': 'Ganda',
		'li': 'Limburgan; Limburger; Limburgish',
		'ln': 'Lingala',
		'lo': 'Lao',
		'lt': 'Lithuanian',
		'lu': 'Luba-Katanga',
		'lv': 'Latvian',
		'mg': 'Malagasy',
		'mh': 'Marshallese',
		'mi': 'Maori',
		'mk': 'Macedonian',
		'ml': 'Malayalam',
		'mn': 'Mongolian',
		'mr': 'Marathi',
		'ms': 'Malay',
		'mt': 'Maltese',
		'my': 'Burmese',
		'na': 'Nauru',
		'ne': 'Nepali',
		'ng': 'Ndonga',
		'nl': 'Dutch; Flemish',
		'nn': 'Norwegian Nynorsk; Nynorsk, Norwegian',
		'no': 'Norwegian',
		'nr': 'Ndebele, South; South Ndebele',
		'nv': 'Navajo; Navaho',
		'ny': 'Chichewa; Chewa; Nyanja',
		'oj': 'Ojibwa',
		'om': 'Oromo',
		'or': 'Oriya',
		'pi': 'Pali',
		'pl': 'Polish',
		'ps': 'Pushto; Pashto',
		'pt': 'Portuguese',
		'qu': 'Quechua',
		'rm': 'Romansh',
		'rn': 'Rundi',
		'ro': 'Romanian; Moldavian; Moldovan',
		'ru': 'Russian',
		'rw': 'Kinyarwanda',
		'sa': 'Sanskrit',
		'sc': 'Sardinian',
		'sd': 'Sindhi',
		'se': 'Northern Sami',
		'sg': 'Sango',
		'si': 'Sinhala; Sinhalese',
		'sk': 'Slovak',
		'sl': 'Slovenian',
		'sm': 'Samoan',
		'sn': 'Shona',
		'so': 'Somali',
		'sq': 'Albanian',
		'sr': 'Serbian',
		'ss': 'Swati',
		'st': 'Sotho, Southern',
		'su': 'Sundanese',
		'sv': 'Swedish',
		'sw': 'Swahili',
		'ta': 'Tamil',
		'te': 'Telugu',
		'tg': 'Tajik',
		'th': 'Thai',
		'ti': 'Tigrinya',
		'tk': 'Turkmen',
		'tl': 'Tagalog',
		'tn': 'Tswana',
		'tr': 'Turkish',
		'ts': 'Tsonga',
		'tt': 'Tatar',
		'tw': 'Twi',
		'ty': 'Tahitian',
		'uk': 'Ukrainian',
		'ur': 'Urdu',
		'uz': 'Uzbek',
		've': 'Venda',
		'vi': 'Vietnamese',
		'yo': 'Yoruba',
		'za': 'Zhuang; Chuang',
		'zh': 'Chinese',
		'zu': 'Zulu',
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
		let tableDataList = [$('<td></td>'), $('<td></td>'), $('<td></td>'), $('<td></td>'), $('<td></td>')]
		
		// sentence number
		tableDataList[0].text((i + 1) + (globalVarPage - 1) * 10)
		
		// display sentence word		
		let autoTag = searchResultJson['matched'][i]['auto_tag']
		for (let j=0; j < autoTag.length; j++) {
			// create tags span
			let tagsSpan = autoTag[j]['tags']
			//Tags 
			let tagss = tagsSpan.substring(2, 6)
			//sub Tags
			let subTagsSpan = tagsSpan.substring(0, 1)
			let $wordSpan = $('<button class="btn btn-xs" style="color:white"></button>').html(autoTag[j]['word'] +" "+ '<span class="badge" backgroundColor="white">' + tagss + '</span>')
			//label sentence
			switch (tagss) {
				case 'CC':
				case 'CD':
				case 'OD':
				case 'DT':
				case 'FW':
				case 'IN':
				case 'JJ':
					$wordSpan.addClass('label-success')
					break
				case 'MD':
				case 'NEG':
				case 'NN':
				case 'WH':
				case 'X' :
				case 'Z' :
				case 'AT':
					$wordSpan.addClass('label-warning')
					break
				case 'NNP':
				case 'NND':
				case 'PR' :
				case 'PRP':
				case 'RB' :
				case 'RP' :
				case 'SC' :
					$wordSpan.addClass('label-danger')
					break
				case 'SYM':
				case 'UH':
				case 'VB' :
				case 'DISC':
				case 'HASH' :
				case 'URL' :
				case 'EMO' :
					$wordSpan.addClass('label-info')
					break
			}
			// whitespace is important !!
			tableDataList[1].append($wordSpan).append(" ")
		}

		//Tagged Count
		let verifyTags = searchResultJson['matched'][i]['verify_tag']
		let $taggedCount = $('<label></label>').text(verifyTags.length)
		tableDataList[2].append($taggedCount)

		//accuracy
		let accuracy_sentence = (searchResultJson['accuracy'][i] * 100).toFixed(2)
		let $accuracy = $('<label></label>').text(accuracy_sentence + "%")
		tableDataList[3].append($accuracy)
		
		// add detail button
		let $detailButton = $('<a href="detail/' + searchResultJson['matched'][i]['_id'] + '/" class="btn btn-primary btn-xs">Detail</a>')
		//let $detailButton = $
		$detailButton.click(onDetailClicked)
		tableDataList[4].append($detailButton)

		$tableRow.append(tableDataList)
		$tableBody.append($tableRow)
	}
	$('#table-results').show()
}


function displayDetailSentence(resultJson) {
	//sentence
	let autoTag = resultJson['auto_tag']
	for (let a = 0; a < autoTag.length; a++){
		//word
		let wordAuto = autoTag[a]['word']

		//tags
		let tagAuto = autoTag[a]['tags']
		let tagAutoPos = tagAuto.substring(2, 6)

		let $detail_sentence = $('<button class="btn btn-xs" style="color: white"></button>').html(wordAuto + "  " + '<span class="badge">'+ tagAuto +'</span>')
		switch (tagAutoPos) {
			case 'CC':
			case 'CD':
			case 'OD':
			case 'DT':
			case 'FW':
			case 'IN':
			case 'JJ':
				$detail_sentence.addClass('label-success')
				break
			case 'MD':
			case 'NEG':
			case 'NN':
			case 'WH':
			case 'X' :
			case 'Z' :
			case 'AT':
				$detail_sentence.addClass('label-warning')
				break
			case 'NNP':
			case 'NND':
			case 'PR' :
			case 'PRP':
			case 'RB' :
			case 'RP' :
			case 'SC' :
				$detail_sentence.addClass('label-danger')
				break
			case 'SYM':
			case 'UH':
			case 'VB' :
			case 'DISC':
			case 'HASH' :
			case 'URL' :
			case 'EMO' :
				$detail_sentence.addClass('label-info')
				break
		}
		$('#dSentence').append($detail_sentence).append(" ")
	}

	//overall accuracy
	let accuracy_overall = (resultJson['accuracy'] * 100).toFixed(2)
	displayAccuracyChartDetail("accuracy-total", accuracy_overall)

	//IOBES accuracy
	let accuracy_iobes = (resultJson['accuracy_iobes'] * 100).toFixed(2)
	displayAccuracyChartDetail("accuracy-iobes", accuracy_iobes)

	//POS accuracy
	let accuracy_pos = (resultJson['accuracy_pos'] * 100).toFixed(2)
	displayAccuracyChartDetail("accuracy-pos", accuracy_pos)

	//table sentence & user
	let verifyTag = resultJson['verify_tag']
	let $tableBody1 = $('#table-detail').find('tbody')
	$tableBody1.empty()
	for (let i = 0; i < verifyTag.length; i++){

		let $tableRow1 = $('<tr></tr>')
		let tableDataList1 = [$('<td></td>'), $('<td></td>'), $('<td></td>')]

		let tagVerif = verifyTag[i]['tag']
		for (let j = 0; j < tagVerif.length; j++){
			//number
			tableDataList1[0].text((i + 1))

			//word & tags
			let tags_detail = tagVerif[j]['tags']
			let tags_pos = tags_detail.substring(2, 6)

			let $wordVerif = $('<button class="btn btn-xs" style="color: white"></button>').html(tagVerif[j]['word'] + "  " +'<span class="badge">'+ tags_detail+'</span>')
			//label sentence
			switch (tags_pos) {
				case 'CC':
				case 'CD':
				case 'OD':
				case 'DT':
				case 'FW':
				case 'IN':
				case 'JJ':
					$wordVerif.addClass('label-success')
					break
				case 'MD':
				case 'NEG':
				case 'NN':
				case 'WH':
				case 'X' :
				case 'Z' :
				case 'AT':
					$wordVerif.addClass('label-warning')
					break
				case 'NNP':
				case 'NND':
				case 'PR' :
				case 'PRP':
				case 'RB' :
				case 'RP' :
				case 'SC' :
					$wordVerif.addClass('label-danger')
					break
				case 'SYM':
				case 'UH':
				case 'VB' :
				case 'DISC':
				case 'HASH' :
				case 'URL' :
				case 'EMO' :
					$wordVerif.addClass('label-info')
					break
			}
			tableDataList1[1].append($wordVerif).append(" ")
		}

		//user
		let $userid = verifyTag[i]['user_id']
		tableDataList1[2].append($userid)

		$tableRow1.append(tableDataList1)
		$tableBody1.append($tableRow1)
	}
}

function displayAccuracyChartDetail(chartName, percentage){
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

	let ctx = document.getElementById(chartName + "-chart")
	$('#' + chartName + "-chart").before("<center><h4>" + percentage + " %</h4></center>")

	let gauge = new Gauge(ctx).setOptions(opts)
	gauge.maxValue = 100
	gauge.setMinValue(0)
	gauge.animationSpeed = 32
	gauge.set(percentage)
}

function getDetailSentence(){
	let $id = $('#searchid').text()
	$.get("/postagger/searchid/" + $id, function (result) {
		displayDetailSentence(result)
	})
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

function onDetailClicked(){
	window.location.href = 'detail'
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

function refreshPage(table, limit) {
	var url = '/twitter/refresh_data/' + table
	if (limit != -1) {
		url += '/' + limit
	}

	$.get(url, function (json, status) {
		for (var i=0; i<json['get_sentiment'].length; i++) {
			var tweet = json['get_sentiment'][i]
			status = '<span class="label label-success">Neutral</span>'
	    	if (tweet['sentiment'] == 'positive') {
	        	status = '<span class="label label-primary">Positive</span>';
	        } 
	        else if (tweet['sentiment'] == 'negative') {
	 			status = '<span class="label label-danger">Negative</span>';
			}
	                
	        row_tweet = "<tr id=" + tweet['id'] + "><td>" + tweet['text'] + "</td><td class='text-center'>" + status  +"</td></tr>";
	        data_len = $('table tr').length;

	        if ($('#no_data').length) {
				$('#no_data').remove().fadeOut(1000)
			}

			if ($('#' + tweet['id']).length == 0) {
				if (data_len > 10) {
					$('table tr:last').remove().fadeOut(1000)
				}
				$(row_tweet).hide().prependTo("table > tbody").fadeIn(1000);
			}
		}

		var positive = 0
		var neutral = 0
		var negative = 0

		for (var i=0; i<json['calculate_sentiment'].length; i++) {
			var sentiment = json['calculate_sentiment'][i]
			if (sentiment['_id'] == 'positive') {
				positive = sentiment['count']
			}
			else if (sentiment['_id'] == 'neutral') {
				neutral = sentiment['count']
			}
			else if (sentiment['_id'] == 'negative') {
				negative = sentiment['count']
			}
		}

		var total_data = positive + neutral + negative
		percentage_positif = positive / total_data * 100
		percentage_neutral = neutral / total_data * 100
		percentage_negative = negative / total_data * 100

		$('#count_positive').text(positive)
		$('#count_neutral').text(neutral)
		$('#count_negative').text(negative)
		$('#progress_positive').css('width', percentage_positif + "%")
		$('#progress_neutral').css('width', percentage_neutral + "%")
		$('#progress_negative').css('width', percentage_negative + "%")
	});
}

function refreshTask() {
	$.get('/twitter/refresh_task', function (json, status) {
		for (var i=0; i<json['result'].length; i++) {
			var data = json['result'][i]
			if (data['status'] == "PENDING") {
				$('#' + data['id']).text("PENDING")
				$('#' + data['id']).attr("class", "label label-default")
				$("#" + data['id'] + "_action_task").text("Start")
			}
			else if (data['status'] == "STARTED") {
				$('#' + data['id']).text("STARTED")
				$('#' + data['id']).attr("class", "label label-primary")
				$("#" + data['id'] + "_action_task").text("Stop")
			}
			else if (data['status'] == "RETRY") {
				$('#' + data['id']).text("RETRY")
				$('#' + data['id']).attr("class", "label label-warning")
				$("#" + data['id'] + "_action_task").text("Start")
			}
			else if (data['status'] == "FAILED") {
				$('#' + data['id']).text("FAILED")
				$('#' + data['id']).attr("class", "label label-danger")
				$("#" + data['id'] + "_action_task").text("Start")
			}
			else if (data['status'] == "SUCCESS") {
				$('#' + data['id']).text("SUCCESS")
				$('#' + data['id']).attr("class", "label label-success")
				$("#" + data['id'] + "_action_task").text("Done")
				$("#" + data['id'] + "_action_task").attr("disabled", "true")
			}
		}
	});
}

function initTwitterPage() {
	if (window.location.href.indexOf("/jobs") > -1 && window.location.href.indexOf("/edit") > -1) {
		var table = $(".x_panel.twitter_data").attr('id')
		refreshPage(table, 2)

		setInterval(function() {
			refreshPage(table, 2)
		}, 3000);
	}

	if (window.location.href.indexOf("twitter/monitor")) {
		setInterval(function() {
			refreshTask()
		}, 5000);
	}

	$(".action_task").click(function() {
		if ($(this).text() == "Stop") {
			$(this).text("Start")
			var task_id = $(this).attr("id")
			task_id = task_id.substring(0, 36)

			$.get('/twitter/stop_task/' + task_id, function (json, status) {
				refreshTask()
			});
		}
		else {
			$(this).text("Stop")
		}
	})

	$('.delete-data').click(function(e) {
		e.preventDefault()
		swal({
		 	title: 'Are you sure?',
			text: "You won't be able to revert this!",
			type: 'warning',
		  	showCancelButton: true,
		  	confirmButtonColor: '#3085d6',
		  	cancelButtonColor: '#d33',
		  	confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  	if (result.value) {
		  		window.location = $(this).attr("href")
		  	}
		})
	});

	let language_value = new Array();

	for(let key in language_code) {
		language_value.push(language_code[key])
	}

	$('#language_tag').tagsInput({
		width: 'auto',
		'interactive':true,
        'autocomplete_url': '',
        'autocomplete' :{
        	'source': language_value
    	},
	})
	$('#follow_tag').tagsInput({
		width: 'auto'
	})
	$('#track_tag').tagsInput({
		width: 'auto'
	})

	$('#create_jobs_submit').click(function(e) {
		if (!($('span.tag').length) && ($('#location_tag').val() == "")) {
			swal({
			  type: 'error',
			  title: 'Gagal...',
			  text: 'Field Follow, Track, Language, atau Location harus diisi'
			})
			e.preventDefault()
		}
		if ($('#language_tag_tagsinput').children('span.tag').length) {
			if (!($('#track_tag_tagsinput').children('span.tag').length)) {
				swal({
				  type: 'error',
				  title: 'Gagal...',
				  text: 'Bila menggunakan Language, Field Track harus diisi'
				})
				e.preventDefault()
			}
		}
		if ($('#location_tag').val() != "") {
			let text = $('#location_tag').val()
			text_length = text.split(',')
			if (!(text_length.length % 4 == 0)) {
				swal({
					type: 'error',
					title: 'Gagal...',
					text: 'Field Location harus 4 parameter'
				})
					e.preventDefault()
			}

			if ($('#track_tag_tagsinput').children('span.tag').length) {
				swal({
				  type: 'error',
				  title: 'Gagal...',
				  text: 'Bila menggunakan Location, Field Track tidak boleh diisi'
				})
				e.preventDefault()
			}
		}
	});
}
	
$(document).ready(function(){
	initTwitterPage()
	initCustomizedChartConfig()
	getOverviewDetail()
	getDetailSentence()
})

