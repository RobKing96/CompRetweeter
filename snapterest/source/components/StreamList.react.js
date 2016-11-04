var React = require('react');
var Tweet = require('./Tweet.react.js');
var CollectionActionCreators = require('../actions/CollectionActionCreators');

var listStyle = {
	padding: '0'
};

var listItemStyle = {
	display: 'inline-block',
	listStyle: 'none'
};

var StreamList = React.createClass({
	
	addTweetToCollection: function(tweet) {
		CollectionActionCreators.addTweetToCollection(tweet);
	},
	
	getListOfTweetIds: function() {
		console.log(this.props.streamTweets);
		console.log('obj');
		return Object.keys(this.props.streamTweets);
	},
	
	getTweetElement: function(tweetId) {
		var tweet = this.props.streamTweets[tweetId];
		var tweetElement;
		
		tweetElement = 	<Tweet tweet={tweet} 
						onImageClick = {this.addTweetToCollection}/>;
		
		return <li style={listItemStyle} key={tweet.id}>{tweetElement}</li>;
	},
	
	render: function() {
	
		var tweetElements = this.getListOfTweetIds().map(this.getTweetElement);
	
		return(
			<ul style={listStyle}>
				{tweetElements}
			</ul>
		);
	}
});

module.exports = StreamList;