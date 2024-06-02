CREATE DATABASE IF NOT EXISTS `Data`;
USE `Data`;

CREATE TABLE IF NOT EXISTS Montature (
    Modello			char(20)	PRIMARY KEY,
    Brand			char(15)	NOT NULL,
    Prezzo	        int(10)		NOT NULL,
    Versione		char(20)	NOT NULL,
    Calibro			char(10)	NOT NULL,
    Ponte			char(10)	NOT NULL,
    Aste			char(10)	NOT NULL,
    Materiale		char(10)	NOT NULL,
    Colore			char(10)	NOT NULL,												
    Immagine        varchar(255) NOT NULL                                              );

CREATE TABLE IF NOT EXISTS LAC (
    Modello			char(20)	PRIMARY KEY,
    Brand			char(15)	NOT NULL,
    Prezzo      	int(10)		NOT NULL,
    Durata			char(15)	NOT NULL,
    Fascia			char(10)	NOT NULL,
    Focale			char(10)	NOT NULL,
    Immagine        varchar(255) NOT NULL	    									    );

CREATE TABLE IF NOT EXISTS Utenze (
    IDUtente        int         AUTO_INCREMENT PRIMARY KEY,
    Nome            varchar(100),
    Cognome         varchar(100),
    Mail          varchar(100),
    Telefono        varchar(20),
    Indirizzo       varchar(100),
    Role           ENUM("admin", "user") default "user"                                  );

CREATE TABLE IF NOT EXISTS Ordini (
    IDOrdine        int          AUTO_INCREMENT PRIMARY KEY,
    IDUtente        int          REFERENCES Utenze(Modello),
    Data            char(20)
                                                                                        );

CREATE TABLE IF NOT EXISTS dettOrdini (
    IDOrdine        int,         FOREIGN KEY (IDOrdine) REFERENCES Ordini(IDOrdine),
    IDProdotto      char(20),
    Categoria       varchar(20)  NOT NULL,
    Quantita        int          NOT NULL,
    PRIMARY KEY(IDOrdine, IDProdotto)                                                   );

INSERT INTO Montature (Modello, Brand, Prezzo, Versione, Calibro, Ponte, Aste, Materiale, Colore, Immagine)
VALUES ('CCC00', 'RayBan', 180, 'da vista', 52, 16, 135, 'metallo', 'bianco', '1.avif'),
('CCC01', 'EA', 250, 'da vista', 58, 22, 142, 'acetato', 'rosso', '2.avif'),
('CCC02', 'Vogue', 220, 'da sole', 60, 18, 140, 'composito', 'verde', '3.avif'),
('CCC03', 'Gucci', 150, 'da vista', 55, 20, 138, 'metallo', 'blu', '4.avif'),
('CCC04', 'SL', 200, 'da vista', 58, 22, 145, 'acetato', 'giallo', '5.avif'),
('CCC05', 'BV', 280, 'da sole', 62, 21, 142, 'composito', 'rosa', '6.avif'),
('CCC06', 'Dior', 190, 'da vista', 54, 17, 140, 'metallo', 'grigio', '7.avif'),
('CCC07', 'Tiffany', 150, 'da vista', 57, 19, 140, 'acetato', 'oro', '8.avif'),
('CCC08', 'D&G', 220, 'da vista', 59, 23, 140, 'composito', 'argento', '9.avif'),
('CCC09', 'Persol', 200, 'da vista', 58, 22, 142, 'metallo', 'fucsia', '10.avif'),
('CCC10', 'Tom Ford', 180, 'da sole', 50, 15, 135, 'acetato', 'azzurro', '11.avif'),
('CCC11', 'GA', 240, 'da vista', 56, 21, 138, 'composito', 'marrone', '12.jpg'),
('CCC12', 'GA', 260, 'da vista', 61, 24, 142, 'metallo', 'bianco', '13.jpg');

INSERT INTO LAC (Modello, Brand, Prezzo, Durata, Fascia, Focale, Immagine)
VALUES ('AAA00', 'Alcon', 42, 'giornaliere', 'bassa', 'monofocale', 'a.avif'),
('AAA01', 'B&L', 60, 'settimanali', 'media', 'bifocale', 'a.avif'),
('AAA02', 'Iridia', 28, 'mensili', 'alta', 'monofocale', 'a.avif'),
('AAA03', 'Alcon', 32, 'giornaliere', 'bassa', 'bifocale', 'a.avif'),
('AAA04', 'B&L', 48, 'settimanali', 'media', 'monofocale', 'a.avif'),
('AAA05', 'Iridia', 65, 'mensili', 'alta', 'bifocale', 'a.avif'),
('AAA06', 'Alcon', 36, 'giornaliere', 'bassa', 'monofocale', 'a.avif'),
('AAA07', 'B&L', 54, 'settimanali', 'media', 'bifocale', 'a.avif'),
('AAA08', 'Iridia', 42, 'mensili', 'alta', 'monofocale', 'a.avif'),
('AAA09', 'Alcon', 30, 'giornaliere', 'bassa', 'bifocale', 'a.avif'),
('AAA10', 'B&L', 75, 'settimanali', 'media', 'monofocale', 'a.avif'),
('AAA11', 'Iridia', 40, 'mensili', 'alta', 'bifocale', 'a.avif'),
('AAA12', 'Alcon', 22, 'giornaliere', 'bassa', 'monofocale', 'a.avif'),
('AAA13', 'B&L', 52, 'settimanali', 'media', 'bifocale', 'a.avif'),
('AAA14', 'Iridia', 62, 'mensili', 'alta', 'monofocale', 'a.avif'),
('AAA15', 'Alcon', 36, 'giornaliere', 'bassa', 'bifocale', 'a.avif'),
('AAA16', 'B&L', 45, 'settimanali', 'media', 'monofocale', 'a.avif'),
('AAA17', 'Iridia', 32, 'mensili', 'alta', 'bifocale', 'a.avif'),
('AAA18', 'Alcon', 24, 'giornaliere', 'bassa', 'monofocale', 'a.avif'),
('AAA19', 'B&L', 68, 'settimanali', 'media', 'bifocale', 'a.avif');

INSERT INTO Utenze (Nome, Cognome, Role)
VALUES ("User", "user", "admin");

CREATE USER 'Arrighi'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON Data.* TO 'Arrighi'@'%';