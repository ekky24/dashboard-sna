$(document).ready (function (){
	// time constant to animate background color change on words when page is loaded
	const COLOR_CHANGE_TIME = 1000
	// hold reference to clicked word
	let $clickedWordContainer = null
	// hold original state reference
	let sentenceOriginalState = []
	
	// for items inside modal
	let tagsetDetail = {
		'CC':	'coordinating conjunction',
		'CD':	'cardinal number',
		'OD':	'ordinal number',
		'DT':	'determiner / article',
		'FW':	'foreign word',
		'IN':	'preposition',
		'JJ':	'adjective',
		'MD':	'modal and auxiliary verb',
		'NEG':	'negation',
		'NN':	'noun',
		'NNP':	'proper noun',
		'NND':	'classifier, partitive and measurement noun',
		'PR':	'demonstrative pronoun',
		'PRP':	'personal pronoun',
		'RB':	'adverb',
		'RP':	'particle',
		'SC':	'subordinating conjunction',
		'SYM':	'symbol',
		'UH':	'interjection',
		'VB':	'verb',
		'WH':	'question',
		'X':	'unknown',
		'Z':	'punctuation',
		'AT':	'mention',
		'DISC':	'discourse maker',
		'HASH': 'hastag',
		'URL':	'uniform resource locator',
		'EMO':	'emoticon'
	}
	
	let tagsetColor = {
		'CC':	'#C91F37',
		'CD':	'#CF000F',
		'OD':	'#8F1D21',
		'DT':	'#D24D57',
		'FW':	'#F47983',
		'IN':	'#C93756',
		'JJ':	'#F62459',
		'MD':	'#875F9A',
		'NEG':	'#5D3F6A',
		'NN':	'#8D608C',
		'NNP':	'#5B3256',
		'NND':	'#8E44AD',
		'PR':	'#763568',
		'PRP':	'#BF55EC',
		'RB':	'#4D8FAC',
		'RP':	'#22A7F0',
		'SC':	'#59ABE3',
		'SYM':	'#19B5FE',
		'UH':	'#48929B',
		'VB':	'#317589',
		'WH':	'#4B77BE',
		'X':	'#1F4788',
		'Z':	'#044F67',
		'AT':	'#7A942E',
		'DISC':	'#5B8930',
		'HASH': '#407A52',
		'URL':	'#F9690E',
		'EMO':	'#2ABB9B'
	}
	
	function attachEventListener () {
		$('.sentence-part-words').on('click', onSentencePartClicked)
		
		$('.tagset-item').on('click', function () {
			
			if (!$(this).hasClass('active')){
				// change highlighted word
				$('.active').removeClass('active')
				$(this).addClass('active')
								
				// change color
				let sentencePartWords = $clickedWordContainer.children().slice(0, -1)
				let bgColor = tagsetColor[$(this).attr('id')]
				changeSentencePartbgColor (sentencePartWords, bgColor)

				// change tag
				$sentencePartTag = $clickedWordContainer.children().last()
				$sentencePartTag.text($(this).attr('id'))
				
				$('#modal .close').click()
			}
		})
		
		$('#split-btn').on('click', function () {
			// get this sentence part word(s)
			$sentencePart = $clickedWordContainer.parent()
			sentencePartWords = $clickedWordContainer.children().slice(0, -1)
			
			// get this sentence part tag
			$sentencePartTag = $clickedWordContainer.children().last()
			
			for (let i = 0; i < sentencePartWords.length; i++) {
				// create new sentence part
				$newSentencePart = $('<div></div>').addClass('sentence-part')
				$wordSet = $('<div></div>').addClass('sentence-part-words')
				$bottomPart = $('#bottom').clone()
				
				// add word to sentence-part-word div
				$wordSet.append($(sentencePartWords[i]))
				
				// create new sentence tag and add to sentence-part-word div
				$wordSet.append($sentencePartTag.clone())
				
				// add callback when new sentence part clicked
				$wordSet.on('click', onSentencePartClicked)
				
				// add sentence-part-word and bottom div to new container
				$newSentencePart.append($wordSet)
				$newSentencePart.append($bottomPart)
				
				// add new container before selected container
				$newSentencePart.insertBefore($sentencePart)
			}
			
			$sentencePart.remove()
			$('#modal .close').click()	
		})
		
		$('#merge-left-btn').on('click', function () {
			let $sentencePart = $clickedWordContainer.parent()

			// get previous sentence part word(s)
			let $prevSentencePart = $sentencePart.prev()
			let prevSentencePartWords = $($prevSentencePart.children()[0]).children().slice(0, -1)
			
			// append at the beginning of this sentence part
			for (let i = prevSentencePartWords.length; i > -1; i--) {
				$clickedWordContainer.prepend($(prevSentencePartWords[i]))
			}
			
			// change sentence part word(s) color
			let $sentencePartTag = $clickedWordContainer.children().last()
			let bgColor = tagsetColor[$sentencePartTag.text()]
			changeSentencePartbgColor (prevSentencePartWords, bgColor)
			
			$prevSentencePart.remove()
			$('#modal .close').click()
			
		})
		
		$('#merge-right-btn').on('click', function () {
			let $sentencePart = $clickedWordContainer.parent()
			
			// get next sentence part word(s)
			let $nextSentencePart = $sentencePart.next()
			let nextSentencePartWords = $($nextSentencePart.children()[0]).children().slice(0, -1)
		
			// get this sentence part word tag
			let $sentencePartTag = $($sentencePart.children()[0]).children().last()

			// append before next tag div of this sentence part
			for (let i = 0; i < nextSentencePartWords.length; i++){
				$(nextSentencePartWords[i]).insertBefore($sentencePartTag)	
			}
			
			// change sentence part word(s) color
			let bgColor = tagsetColor[$sentencePartTag.text()]
			changeSentencePartbgColor (nextSentencePartWords, bgColor)
			
			$nextSentencePart.remove()
			$('#modal .close').click()
		})
		
		$('.submit-btn').on('click', function () {
			let $sentence = $($(this).closest('.sentence'))
			let sentenceParts = $sentence.children().slice(0, -1)
			let sentencePartsIobes = []
			
			for (let i=0; i < sentenceParts.length; i++) {
				// get this sentence part word(s)
				let $sentencePart = $(sentenceParts[i])
				let sentencePartWords = $($sentencePart.children()[0]).children().slice(0, -1)
				
				// get this sentence part word tag text
				let sentencePartTag = $($sentencePart.children()[0]).children().last().text()
				
				// get IOBES tag
				let sentencePartIobes = getAppliedIobesTag(sentencePartWords, sentencePartTag)
				
				// push to array IOBES
				sentencePartsIobes.push(...sentencePartIobes)
			}
			
			let dataToSend = {
				'user': $('#user_id').text(),
				'oid': $sentence.attr('oid'),
				'eval': sentencePartsIobes
			}
			
			$.ajax({
				type: 'POST',
				url: '/postagger/submit/',
				data: JSON.stringify(dataToSend),
				beforeSend: function(xhr, settings) {
					xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'))
				},
				success: function (result) {
					showNotificationDialog ({
						'icon': '&#xE876',
						'background': '#26C281',
						'text1': 'Success!', 'text2': 'Your review has been submitted'
					})
					
					$('#action-button-container').hide()
					
					let userid = $('#user_id').text()
					$.get('/postagger/fetch/' + userid, function (sentence, status) {
						$('.sentence-part').remove()
						loadUnevaluatedSentence(sentence)
						changeBgWordsColor()
					})
					
				},
				error: function (xhr) {
					showNotificationDialog ({
						'icon': '&#xE5CD',
						'background': '#e85e6c',
						'text1': 'Ooops!', 'text2': 'Something is wrong. Please check your connection'
					})
				},
				timeout: 10000
			})
		})
		
		$('.reset-btn').on('click', function () {

			// fade out changed sentence
			let $sentence = $($(this).closest('.sentence'))
			let sentenceParts = $sentence.children().slice(0, -1)
			
			// remove sentence part word(s)
			for (let i=0; i < sentenceParts.length; i++) {
				let $sentencePart = $(sentenceParts[i])
				$sentencePart.hide()
				$sentencePart.remove()
			}
			console.log(sentenceOriginalState)
			// recover sentence part state
			let $actionButtonsContainer = $('#action-button-container')
			
			for (let i = 0; i < sentenceOriginalState.length; i++) {
				// create new original sentence part container
				let sentencePartHtml = sentenceOriginalState[i]
				let $sentencePartOriginal = $('<div></div>').addClass('sentence-part').hide()
				$sentencePartOriginal.html(sentencePartHtml)
				
				// add click listener to sentence-part-word
				$($sentencePartOriginal.children()[0]).on('click', onSentencePartClicked)
				
				// change new sentence part container bg color
				let sentencePartWords = $($sentencePartOriginal.children()[0]).children().slice(0, -1)
				let $sentencePartTag = $($sentencePartOriginal.children()[0]).children().last()
				let bgColor = tagsetColor[$sentencePartTag.text()]
				changeSentencePartbgColor (sentencePartWords, bgColor)
				
				// add new container to sentence
				$sentence.prepend($sentencePartOriginal)
				$sentencePartOriginal.fadeIn('slow')
				$sentencePartOriginal.insertBefore($actionButtonsContainer)
			}
			
			changeBgWordsColor()
			
		})
		
		function onSentencePartClicked () {
			// hold reference to use when modal is shown
			$clickedWordContainer = $(this)
			
			// remove previous selection
			$('.active').css('background-color', '')
			$('.active').removeClass('active')
					
			// set selected tag
			let tagIndex = $clickedWordContainer.children().length - 1
			let clickedWordTagId = '#' + $($clickedWordContainer.children()[tagIndex]).text()
			$(clickedWordTagId).addClass('active')
						
			// set split, merge to left, merge to right btn to active
			$('#split-btn').prop('disabled', false)
			$('#merge-left-btn').prop('disabled', false)
			$('#merge-right-btn').prop('disabled', false)

			// get sibling word count
			let $sentence = $('.sentence')
			let lastSentencePartIndex = $sentence.children().length - 2
			let sentencePartIndex = $clickedWordContainer.parent().index()
			
			// set disabled button
			if (sentencePartIndex === lastSentencePartIndex)
				$('#merge-right-btn').prop('disabled', true);
			if (sentencePartIndex === 0) 				
				$('#merge-left-btn').prop('disabled', true);
			if (!splittable($clickedWordContainer))
				$('#split-btn').prop('disabled', true);
			
			$('#modal').modal('show')
		}
		
		function showNotificationDialog (specification) {
			$('.material-icons').html(specification['icon'])
			$('.dialog-modal-confirm .dialog-modal-header').css('background', specification['background'])
			$('.dialog-modal-body h4').text(specification['text1'])
			$('.dialog-modal-body p').text(specification['text2'])
			$('#submit-notify-modal').modal('show')
		}
	}
		
	function getAppliedIobesTag (sentencePartWords, sentencePartTag) {
		
		// push S-XX if single
		if (sentencePartWords.length == 1) {
			return [{
				"word": $(sentencePartWords[0]).text(),
				"tag": "S-" + sentencePartTag
			}]
		}
		
		let words = []
		
		// push B-XX
		words.push({"word": $(sentencePartWords[0]).text(), "tag": "B-" + sentencePartTag })
		
		// push I-XX
		for (let i=1; i < sentencePartWords.length - 1; i++) {
			words.push({"word": $(sentencePartWords[i]).text(), "tag": "I-" + sentencePartTag})
		}
		
		// push E-XX
		let last = sentencePartWords.length - 1
		words.push({"word": $(sentencePartWords[last]).text(), "tag": "E-" + sentencePartTag})
		
		return words
	}
		
	function splittable ($container) {
		return $container.children().length > 2 // true if container contains more than one word and one tag
	}
	
	function changeSentencePartbgColor (sentencePartWords, bgColor) {
		for (let j=0; j < sentencePartWords.length; j++) {
			$(sentencePartWords[j]).animate({
				'background-color': bgColor + ' !important', 
				'border-color': bgColor
			}, COLOR_CHANGE_TIME)
		}
	}
	
	function createCurlyBraceDiv () {
		let bottomDiv = $('<div></div>').attr('id', 'bottom')
		
		let brace = $('<div></div>').addClass('brace')
		let leftBrace = brace.clone().attr('id', 'left')
		let rightBrace = brace.clone().attr('id', 'right')
		
		bottomDiv.append(leftBrace)
		bottomDiv.append(rightBrace)
		
		return bottomDiv
	}
	
	function createSentenceDivs (wordTagPairs) {
		let sentenceParts = []
		
		for (let p=0; p < wordTagPairs.length; p++){
			let word = wordTagPairs[p]["word"]
			let tags = wordTagPairs[p]["tags"]
			
			let $sentencePartDiv = $('<div></div>').addClass('sentence-part')
			let $sentencePartWordDiv = $('<div></div>').addClass('sentence-part-words')
			let $curlyBraceDiv = createCurlyBraceDiv()
			
			if (tags[0] == "S") { 
				
				let $sentencePartWord = $('<span></span>').addClass('btn btn-primary word').text(word)
				let $sentencePartTag = $('<span></span>').addClass('badge badge-pill tag').text(tags.substr(2))
				
				// append word and tag to sentence part word div
				$sentencePartWordDiv.append($sentencePartWord).append($sentencePartTag)
				// append sentence part word div and curly brace to sentence part div
				$sentencePartDiv.append($sentencePartWordDiv).append($curlyBraceDiv)
				// append sentence part div to array div
				sentenceParts.push($sentencePartDiv)
				continue
			}
			
			// reach here if B-XX found
			let $sentencePartWord = $('<span></span>').addClass('btn btn-primary word').text(word)
			$sentencePartWordDiv.append($sentencePartWord)
			
			while(tags[0] != 'E'){
				p += 1
				word = wordTagPairs[p]["word"]
				tags = wordTagPairs[p]["tags"]
				
				let $sentencePartWord = $('<span></span>').addClass('btn btn-primary word').text(word)
				$sentencePartWordDiv.append($sentencePartWord)
			}
			
			let $sentencePartTag = $('<span></span>').addClass('badge badge-pill tag').text(tags.substr(2))
			
			$sentencePartWordDiv.append($sentencePartTag)
			$sentencePartDiv.append($sentencePartWordDiv).append($curlyBraceDiv)			
			sentenceParts.push($sentencePartDiv)
		}
		
		return sentenceParts
	}
	
	function loadUnevaluatedSentence (sentence) {

		let $sentenceDiv = $('.sentence')
		$sentenceDiv.attr('oid', sentence['unevaluated']['_id'])
		
		let $actionButtonsContainer = $('#action-button-container')
		let wordTagPairs = sentence['unevaluated']['auto_tag']

		let sentenceParts = createSentenceDivs(wordTagPairs)
		
		for(let s=0; s < sentenceParts.length; s++){
			sentenceParts[s].insertBefore($actionButtonsContainer)
		}
		
		$actionButtonsContainer.show()
	}
	
	function changeBgWordsColor () {

		let $sentence = $('.sentence')
		let sentenceParts = $($sentence).children().slice(0, -1)
		
		for (let j=0; j < sentenceParts.length; j++) {
			
			// get sentence part word tag
			let $sentencePart = $(sentenceParts[j])
			let $sentencePartTag = $($sentencePart.children()[0]).children().last()
			
			// change bg color based on tag
			let sentencePartWords = $($sentencePart.children()[0]).children().slice(0, -1)
			let bgColor = tagsetColor[$sentencePartTag.text()]
			changeSentencePartbgColor (sentencePartWords, bgColor)
		}

	}
		
	function saveSentencesOriginalState () {
			
		// get this sentence parts
		let sentenceParts = $('.sentence').children().slice(0, -1)
		
		// save sentence parts original state
		for (let j=0; j < sentenceParts.length; j++) {
			sentenceOriginalState.push($(sentenceParts[j]).html())
		}
	}
	
	function hideTagsetExplanationIfDesktop () {
		if ($(window).width() > 960)
			$('.tagset-explain').hide()
	}
	
	function init () {
		let userid = $('#user_id').text()

		$.get('/postagger/fetch/' + userid, function (sentence, status) {
			loadUnevaluatedSentence(sentence)
			changeBgWordsColor()
			saveSentencesOriginalState()
			attachEventListener()
			hideTagsetExplanationIfDesktop()
			$('[data-toggle="tooltip"]').tooltip(); 
		})
	}
	
	init()
})
