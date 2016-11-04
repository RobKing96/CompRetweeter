var React = require('react');
var StreamTweet = require('./StreamTweet.react');
var Header = require('./Header.react');
var TweetStore = require('../stores/TweetStore');

var Stream = React.createClass({
	
	getInitialState: function() {		
		return TweetStore.getStreamTweets();
	},
	
	componentDidMount: function() {
		TweetStore.addChangeListener(this.onTweetChange);
	},
	
	componentWillUnmount: function() {
		TweetStore.removeChangeListener(this.onTweetChange);
	},
	
	onTweetChange: function() {
		console.log('onTweetChange');
		this.setState({
			streamTweets: TweetStore.getStreamTweets()
		});
	},
	
	render: function() {
		var tweets = this.state.streamTweets;
		console.log(tweets);
		
		if(tweets) {
			return (<StreamTweet tweets={tweets} />);
		}
		
		return (
			<Header text="Waiting for public photos from Twitter..." />
		);
	}
});

module.exports = Stream;