Create database projetoindividual;
use projetoindividual;


create table usuario(
idusuario int primary key auto_increment,
username varchar(45),
email varchar(45),
senha varchar(45));

create table jogoDaMemoria(
idjogo int primary key auto_increment,
tempo TIME,
fk_usuario int,
constraint fk_usuario foreign key (fk_usuario) references usuario(idusuario));

insert into usuario values 
(default, 'Romerinho cheira gol', 'romero@sptech.school', 'romero1234');

insert into jogoDaMemoria values
(default, '50', 1);

select * from usuario;
select * from jogoDaMemoria;

select * from usuario join jogoDaMemoria
on usuario.idusuario = jogoDaMemoria.fk_usuario;

  Select idusuario, username, email, senha, min(tempo) FROM usuario
  join jogoDaMemoria on usuario.idusuario = jogoDaMemoria.fk_usuario
	WHERE username = 'Romerinho cheira gol' AND senha = 'romero1234'
    group by idusuario;
    
    select tempo from jogoDaMemoria join usuario
		on usuario.idusuario = jogoDaMemoria.fk_usuario where idusuario = 1
        limit 5;
        
        
    
    
    
    
    






