var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var $ = require('jQuery');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var collectionTweets = {};
var collectionName = 'new';

function addTweetToCollection(tweet) {
	collectionTweets[tweet.id] = tweet;
	likeTweet(tweet.id, tweet.user.id);
}

function removeTweetFromCollection(tweet) {
	console.log('TWEEEEEEEEEEEET');
	console.log(tweet);
	delete collectionTweets[tweet.id];
	unlikeTweet(tweet.id, tweet.user.id)
}

function removeAllTweetsFromCollection() {
	unretweetAll(collectionTweets);
	collectionTweets = {};
}

function setCollectionName(name) {
	collectionName = name;
}

function emitChange() {
	CollectionStore.emit(CHANGE_EVENT);
}

var CollectionStore = assign({}, EventEmitter.prototype, {
	
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	
	getCollectionTweets: function(){
		return collectionTweets;
	},
	
	getCollectionName: function() {
		return collectionName;
	}
	
});

function handleAction(action) {
	
	switch(action.type) {
		
		case 'add_tweet_to_collection':
			addTweetToCollection(action.tweet);
			emitChange();
			break;
			
		case 'remove_tweet_from_collection':
			removeTweetFromCollection(action.tweet);
			emitChange();
			break;
			
		case 'remove_all_tweets_from_collection':
			removeAllTweetsFromCollection();
			emitChange();
			break;
			
		case 'set_collection_name':
			setCollectionName(action.collectionName);
			emitChange();
			break;
			
		default: // do nothing
	}
}

$(document).ready(function() {
	var info;
	
	window.likeTweet = function (tweetId, userId) {
		
		var tweetUrl = "http://localhost:8080/log/AddToCollection.php?tweetId=";
		tweetUrl += tweetId+"&userId="+userId;
		
		$.ajax({
			type: "GET",
			url: tweetUrl,
			timeout: 15000,
		});
	}
	
	window.unlikeTweet = function (tweetId, userId) {
		
		var tweetUrl = "http://localhost:8080/log/RemoveFromCollection.php?tweetId=";
		tweetUrl += tweetId+"&userId="+userId;
		
		$.ajax({
			type: "GET",
			url: tweetUrl,
			timeout: 15000
		});
	}
	
	window.unretweetAll = function (collectionTweets) {
		
		var tweetUrl = "http://localhost:8080/log/RemoveFromCollection.php?userId=";
		var user = collectionTweets[0].user.id;
		tweetUrl += user;
		
		for(i=0; i < collectionTweets.length; i++){
			tweetUrl += ("&id[" + collectionTweets([i])+ "]=" +i);
		}
		
		$.ajax({
			type: "GET",
			url: tweetUrl,
			timeout: 15000
		});
	}
});

CollectionStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = CollectionStore;