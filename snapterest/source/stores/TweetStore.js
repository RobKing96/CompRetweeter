var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var streamTweets = {};

function setTweet(recievedTweet) {
	console.log('setTweet - tweetstore');
	console.log(recievedTweet.id);
	streamTweets[recievedTweet.id] = recievedTweet;
}

function emitChange() {
	TweetStore.emit('change');
}

var TweetStore = assign({}, EventEmitter.prototype, {
	
	addChangeListener: function (callback) {
		this.on('change', callback);
	},
	
	removeChangeListener: function (callback) {
		this.removeListener('change', callback);
	},
	
	getStreamTweets: function () {
		return streamTweets;
	}
});

function handleAction(action) {
	if(action.type === 'recieve_tweet') {
		setTweet(action.tweet);
		emitChange();
	}
}

TweetStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = TweetStore; 