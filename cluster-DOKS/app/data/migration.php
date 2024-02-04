<?php
$articles = json_decode(file_get_contents(__DIR__ . '/articles.json'), true);

$dns = 'mysql:host=mysql-service;dbname=blog';
$user = 'root';
$pwd = 'Pomme123;';

try {
  $dbh = new PDO($dns, $user, $pwd);
} catch (PDOException $e) {
  die("DB ERROR: " . $e->getMessage());
}

// Vérifier si la table article existe
$query = $dbh->prepare("SHOW TABLES LIKE 'user'");
$query->execute();
$result = $query->fetchAll();

// Si elle n'existe pas, on seed la base de données
if (count($result) === 0) {
  $statements = [
    'CREATE TABLE blog.article(
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        content LONGTEXT NOT NULL,
        category VARCHAR(45) NOT NULL,
        author INT NULL,
        PRIMARY KEY(id)
    );',
    'CREATE TABLE blog.user(
        id INT NOT NULL AUTO_INCREMENT,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX email_UNIQUE (email ASC)
    );',
    'CREATE TABLE blog.session(
        id CHAR(64) NOT NULL,
        userid INT NOT NULL,
        PRIMARY KEY (id)
    );',
    'ALTER TABLE blog.article ADD INDEX fk_article_user_idx (author ASC);',
    'ALTER TABLE blog.article ADD CONSTRAINT fk_article_user FOREIGN KEY (author) REFERENCES blog.user(id) ON DELETE NO ACTION ON UPDATE NO ACTION;'
  ];

  foreach ($statements as $statement) {
    $dbh->exec($statement);
  }


  $statement = $dbh->prepare('
  INSERT INTO article (
    title,
    category,
    content,
    image
  ) VALUES (
    :title,
    :category,
    :content,
    :image
)');

  foreach ($articles as $article) {
    $statement->bindValue(':title', $article['title']);
    $statement->bindValue(':category', $article['category']);
    $statement->bindValue(':content', $article['content']);
    $statement->bindValue(':image', $article['image']);
    $statement->execute();
  }
}