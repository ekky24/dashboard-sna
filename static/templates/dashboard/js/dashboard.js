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

function initTwitterPage() {
	if (window.location.href.indexOf("/jobs") > -1 && window.location.href.indexOf("/edit") > -1) {
		var table = $(".x_panel.twitter_data").attr('id')
		refreshPage(table, 2)

		setInterval(function() {
			refreshPage(table, 2)
		}, 3000);
	}

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
})

