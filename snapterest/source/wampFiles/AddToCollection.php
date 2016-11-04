<?php
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOauth;

$consumer_key = "U0PTwQp5RJOYkYP99BpqgV0gm";
$consumer_secret = "VgxjNjSSRAqBCV0mPf0lVdStcRQdVr9HDpais49qJqIEo8mKnp";
$access_token = "793848989527539712-34aHleib8tKCyNxj1QI12IePOEh1Pt2";
$access_token_secret = "yySqQhzsrxfqA7Saz0CD9W8ZY11EPf9nLimOy0OrHoyug";

$tweetId = $_GET["tweetId"];
$userId = $_GET["userId"];

$connection = new TwitterOAuth($consumer_key, $consumer_secret, $access_token, $access_token_secret);
//$connection->post("favorites/create", ["id" => $tweetId]);
$connection->post("statuses/retweet", ["id" => $tweetId]);
$connection->post("friendships/create", ["user_id" => $userId]);

$content = $connection->get("account/verify_credentials");

?>