var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.react');
var Tweet = require('./Tweet.react');
var StreamList = require('./StreamList.react');
var TweetStore = require('../stores/TweetStore');


var StreamTweet = React.createClass({
	
	getInitialState: function(){
		console.log('[Snapterest] StreamTweet: 1. Running getInitialState()');
		
		return {
			numberOfCharactersIsIncreasing: null,
			headerText: null
		};
	},
	
	componentWillMount: function() {
		console.log('[Snapterest] StreamTweet: 2. Running componentWillMount()');
		
		this.setState({
			numberOfCharactersIsIncreasing: true,
			headerText: 'Latest public photo from Twitter'
		});
		
		window.snapterest = {
			numberOfRecievedTweets: 1,
			numberOfDisplayedTweets: 1
		};
	},
	
	componentDidMount: function() {
		console.log('[Snapterest] StreamTweet: 3. Running componentDidMount()');
		
		TweetStore.addChangeListener(this.onStreamChange);
		
		var componentDOMRepresentaion = ReactDOM.findDOMNode(this);
		
		console.log(componentDOMRepresentaion.children[0].outerHTML);
		
		window.snapterest.headerHtml = componentDOMRepresentaion.children[0].outerHTML;
		window.snapterest.tweetHtml = componentDOMRepresentaion.children[1].outerHTML;
	},
	
	/*componentWillReceiveProps: function(nextProps) {
		console.log('[Snapterest] StreamTweet: 4. Running componentWillReceiveProps()');
		console.log(nextProps);
		
		var currentTweetLength = this.props.tweet.text.length;
		var nextTweetLength = nextProps.tweet.text.length;
		var isNumberOfCharactersIncreasing = (nextTweetLength > currentTweetLength);
		var headerText;
		
		this.setState({
			numberOfCharactersIsIncreasing: isNumberOfCharactersIncreasing
		});
		
		if(isNumberOfCharactersIncreasing){
			headerText = 'Number of characters is increasing';
		}else{
			headerText = 'Latest public photo from Twitter'
		}
		
		this.setState({
			headerText: headerText
		});
		
		window.snapterest.numberOfRecievedTweets++;
	},
	
	shouldComponentUpdate: function(nextProps, nextState) {
		console.log('[Snapterest] StreamTweet: 5.Running shouldComponentUpdate()');
		
		return (nextProps.tweet.text.length > 1);
	},*/
	
	componentWillUpdate: function (nextProps, nextState) {
		console.log('[Snapterest] StreamTweet: 6. Running componentWillUpdate()');
	},
	
	componentDidUpdate: function(prevProps, prevState) {
		console.log('[Snapterest] StreamTweet: 7. Running componentDidUpdate()');
		
		window.snapterest.numberOfDisplayedTweets++;
	},
	
	componentWillUnmount: function() {
		console.log('[Snapterest] StreamTweet: 8. Running componentWillUnmount()');
		
		TweetStore.removeChangeListener(this.onStreamChange);
		delete window.snapterest;
	},
	
	onStreamChange: function() {
		console.log('change');
		this.setState({
			streamTweets: TweetStore.getStreamTweets()
		});
	},
	
	render: function() {
		console.log('[Snapterest] StreamTweet: Running render()');
		console.log(this.props.tweets);
		if(this.props.tweets !== null)
		{
			console.log('not null');
			return(
				<section>
					<Header text={this.state.headerText} />
					<StreamList
						streamTweets={this.props.tweets}
					/>
				</section>
			);
		}
	}
});

module.exports = StreamTweet;