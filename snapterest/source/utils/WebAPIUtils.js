var SnapkiteStreamClient = require('snapkite-stream-client');
var TweetActionCreators = require('../actions/TweetActionCreators');

function initializeStreamOfTweets() {
	SnapkiteStreamClient.initializeStream(TweetActionCreators.recieveTweet);
}

module.exports = {
	initializeStreamOfTweets: initializeStreamOfTweets
};