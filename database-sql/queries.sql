-- Select by ID
SELECT "username", "usertype", "email", "password", "firstname", "lastname", "country", "zipcode", "city", "address", "billingnumber", "billincrypto", "billinowner"
FROM dbo.users
WHERE "id" = 0;

CREATE TABLE dbo.users (
	id BIGINT PRIMARY KEY IDENTITY(0, 1),
	username VARCHAR(255) NOT NULL,
	usertype TINYINT NOT NULL,	-- 0: Admin, 1: Commercial, 2: Technique, 3: Restaurateur, 4: Livreur, 5: User, 6: Developpeur
	email VARCHAR(100) NOT NULL,
	password VARCHAR(255) NOT NULL,
	firstname VARCHAR(50) NULL,
	lastname VARCHAR(50) NULL,
	country VARCHAR(30) NULL,
	zipcode VARCHAR(8) NULL,
	city VARCHAR(40) NULL,
	address VARCHAR(100) NULL,
	billingnumber CHAR(16) NULL,
	billincrypto CHAR(3) NULL,
	billinowner VARCHAR(255) NULL
);