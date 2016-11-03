var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var tweet = null;

function setTweet(recievedTweet) {
	tweet = recievedTweet;
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
	
	getTweet: function () {
		return tweet;
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