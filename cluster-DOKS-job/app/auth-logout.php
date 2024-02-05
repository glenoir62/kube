<?php
require_once __DIR__ . '/database/database.php';
$authDB = require_once __DIR__ . '/database/security.php';

$sessionId = $_COOKIE['session'];
if ($sessionId) {
    $authDB->logout($sessionId);
    header('Location: /auth-login.php');
}
