var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var button = $('.trigger');

function getQuote() {
	button.prop("disabled", true).html('<i class="fa fa-spinner fa-spin"></i>');
	$.getJSON(prefix + quoteUrl, createTweet);
	$.ajaxSetup({ cache: false });

	
}

function createTweet(input) {
	var data = input[0];
	

	var quoteText = $(data.content).text().trim();
	var quoteAuthor = data.title;

	if (!quoteAuthor.length) {
		quoteAuthor = 'Unknown Author';
	}
	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
	
	if (tweetText.lenght > 140) {
		getQuote();
	}
	else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.quote').text(quoteText);
		$('.author').text('Author: ' + quoteAuthor);
		$('.tweet').attr('href', tweet);
	}
	button.prop("disabled", false).html('Random quote');
}

$(document).ready(function() {
	getQuote();
	$('.trigger').click(function() {
		
		getQuote();
		
		
	});
});