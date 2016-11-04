<?php
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOauth;

$consumer_key = "";
$consumer_secret = "";
$access_token = "";
$access_token_secret = "";

$tweetId = $_GET["tweetId"];
$userId = $_GET["userId"];

$connection = new TwitterOAuth($consumer_key, $consumer_secret, $access_token, $access_token_secret);
//$connection->post("favorites/destroy", ["id" => $tweetId]);
$connection->post("statuses/unretweet", ["id" => $tweetId]);
$connection->post("friendships/destroy", ["user_id" => $userId]);

$content = $connection->get("account/verify_credentials");

var_dump($content);

?>