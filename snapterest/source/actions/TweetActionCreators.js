var AppDispatcher = require('../dispatcher/AppDispatcher');

function recieveTweet(tweet) {
	
	var action = {
		type: 'recieve_tweet',
		tweet: tweet
	};
	
	console.log('new tweet')
	
	AppDispatcher.dispatch(action);
}

module.exports = {
	recieveTweet: recieveTweet
};