CREATE DATABASE IF NOT EXISTS nodedb;
USE nodedb;
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255)
);

INSERT INTO usuarios(nome) values ('Dilean');
INSERT INTO usuarios(nome) values ('Lais');