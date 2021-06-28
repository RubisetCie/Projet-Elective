-- Add users into database
INSERT INTO dbo.users("username", "usertype", "email", "password", "firstname", "lastname", "country", "zipcode", "city", "address", "billingnumber", "billincrypto", "billinowner")
VALUES
	('dupontmark', 0, 'mark.dupont@yopmail.com', 'bcrypt', 'Dupont', 'Mark', 'France', '75003', 'Paris', '42 rue du General de Gaule', '4242424242424242', '042', 'Mohamed Belgacem'),
	('jeanmichel123', 1, 'jeanmichel@yopmail.com', 'azerty', 'Jean', 'Michel', 'France', '75003', 'Paris', '42 rue du General de Gaule', '4242424242424242', '042', 'Mohamed Belgacem'),
	('francisboulanger', 3, 'francisboulanger@yopmail.com', 'incorrect', 'Francis', 'Boulanger', 'France', '75003', 'Paris', '42 rue du General de Gaule', '4242424242424242', '042', 'Mohamed Belgacem'),
	('natasha', 5, 'n.anselm@yopmail.com', 'h1ghl@nd3r', 'Natasha', 'Anselm', 'France', '75003', 'Paris', '42 rue du General de Gaule', '4242424242424242', '042', 'Mohamed Belgacem')