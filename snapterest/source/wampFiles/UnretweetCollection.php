<?php
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOauth;

echo "echo";

$consumer_key = "";
$consumer_secret = "";
$access_token = "";
$access_token_secret = "";

$tweetArray= $_GET["id"];

/*$connection = new TwitterOAuth($consumer_key, $consumer_secret, $access_token, $access_token_secret);
//$connection->post("favorites/destroy", ["id" => $tweetId]);
$connection->post("statuses/unretweet", ["id" => $tweetId]);
$connection->post("friendships/destroy", ["user_id" => $userId]);

$content = $connection->get("account/verify_credentials");

var_dump($content);
*/
?>