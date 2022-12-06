CREATE SCHEMA biblioteca;

CREATE TABLE biblioteca.usuarios (
  id SERIAL NOT NULL PRIMARY key,
  nome varchar(255) default NULL,
  telefone varchar(100) default NULL,
  email varchar(255) default NULL,
  cidade varchar(50) default NULL,
  estado varchar(100) default NULL
);


CREATE TABLE biblioteca.livros (
  id SERIAL  NOT NULL primary KEY,
  nome varchar(255) default NULL,
  autor varchar(100) default NULL,
  ano varchar(255) default NULL, 
  quantidade varchar(50) default NULL
);

CREATE TABLE biblioteca.emprestimos (
	id serial4 NOT NULL,
	id_livro int4 NOT NULL,
	id_cliente int4 NOT NULL,
	data_emprestimo timestamp NOT NULL,
	data_devolucao timestamp NULL,
	CONSTRAINT emprestimos_pkey PRIMARY KEY (id)
);

ALTER TABLE biblioteca.emprestimos ADD CONSTRAINT id_cliente FOREIGN KEY (id_cliente) REFERENCES biblioteca.usuarios(id);
ALTER TABLE biblioteca.emprestimos ADD CONSTRAINT id_livro FOREIGN KEY (id_livro) REFERENCES biblioteca.livros(id);