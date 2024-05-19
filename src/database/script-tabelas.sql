create database projetoIndividual;
use projetoIndividual;


create table usuario(
idusuario int primary key auto_increment,
username varchar (45),
email varchar (45),
senha varchar (45));

insert into usuario (username, email, senha) values
('CCDMVK', 'carlos.eduardo@hotmail.com', '12345678');