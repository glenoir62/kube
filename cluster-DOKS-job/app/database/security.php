<?php

class AuthDB
{
    private PDOStatement $statementRegister;
    private PDOStatement $statementReadSession;
    private PDOStatement $statementReadUser;
    private PDOStatement $statementReadUserFromEmail;
    private PDOStatement $statementCreateSession;
    private PDOStatement $statementDeleteSession;


    function __construct(private PDO $pdo)
    {
        $this->statementRegister = $pdo->prepare('INSERT INTO user VALUES (
            DEFAULT,
            :firstname,
            :lastname,
            :email,
            :password
        )');

        $this->statementReadSession = $pdo->prepare('SELECT * FROM session WHERE id=:id');
        $this->statementReadUser = $pdo->prepare('SELECT * FROM user WHERE id=:id');
        $this->statementReadUserFromEmail = $pdo->prepare('SELECT * FROM user WHERE email=:email');
        $this->statementCreateSession = $pdo->prepare('INSERT INTO session VALUES (
            DEFAULT,
            :userid
        )');
        $this->statementDeleteSession = $pdo->prepare('DELETE FROM session WHERE id=:id');
    }

    function login(string $userId): void
    {
        $this->statementCreateSession->bindValue(':userid', $userId);
        $this->statementCreateSession->execute();
        $sessionId = $this->pdo->lastInsertId();
        setcookie('session', $sessionId, time() + 60 * 60 * 24 * 14, '', '', false, true);
        return;
    }

    function register(array $user): void
    {

        $hashedPassword = password_hash($user['password'], PASSWORD_ARGON2I);
        $this->statementRegister->bindValue(':firstname', $user['firstname']);
        $this->statementRegister->bindValue(':lastname', $user['lastname']);
        $this->statementRegister->bindValue(':email', $user['email']);
        $this->statementRegister->bindValue(':password', $hashedPassword);
        $this->statementRegister->execute();
        return;
    }

    function isLoggedin(): array | false
    {
        $sessionId = $_COOKIE['session'] ?? '';
        if ($sessionId) {
            $this->statementReadSession->bindValue(':id', $sessionId);
            $this->statementReadSession->execute();
            $session =  $this->statementReadSession->fetch();
            if ($session) {
                $this->statementReadUser->bindValue(':id', $session['userid']);
                $this->statementReadUser->execute();
                $user = $this->statementReadUser->fetch();
            }
        }
        return $user ?? false;
    }

    function logout(string $sessionId): void
    {
        $this->statementDeleteSession->bindValue(':id', $sessionId);
        $this->statementDeleteSession->execute();
        setcookie('session', '', time() - 1);
        return;
    }

    function getUserFromEmail(string $email): array
    {
        $this->statementReadUserFromEmail->bindValue(':email', $email);
        $this->statementReadUserFromEmail->execute();
        return $this->statementReadUserFromEmail->fetch();
    }
}

return new AuthDB($pdo);


// function isLoggedin()
// {

// }
