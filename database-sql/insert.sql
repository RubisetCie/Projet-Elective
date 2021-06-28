-- Add adresses into database
INSERT INTO dbo.address("country", "zipcode", "city", "address")
VALUES
	('France', '75003', 'Paris', '42 rue du General de Gaule'),
	('France', '92000', 'Nanterre', '93 Boulevard de la Seine')

-- Add billings into database
INSERT INTO dbo.billing("number", "crypto", "owner")
VALUES
	('4242424242424242', '042', 'Mohamed Belgacem')

-- Add users into database
INSERT INTO dbo.users("username", "usertype", "email", "password", "firstname", "lastname")
VALUES
	('dupontmark', 0, 'mark.dupont@yopmail.com', 'bcrypt', 'Dupont', 'Mark'),
	('jeanmichel123', 1, 'jeanmichel@yopmail.com', 'azerty', 'Jean', 'Michel'),
	('francisboulanger', 3, 'francisboulanger@yopmail.com', 'incorrect', 'Francis', 'Boulanger'),
	('natasha', 5, 'n.anselm@yopmail.com', 'h1ghl@nd3r', 'Natasha', 'Anselm')

-- Link the Users to the Addresses
INSERT INTO dbo.useraddress("userid", "addressid")
VALUES
	(0, 0),
	(1, 0),
	(2, 1),
	(3, 0),
	(3, 1)

-- Link the Users to the Billings
INSERT INTO dbo.userbilling("userid", "billingid")
VALUES
	(0, 0),
	(1, 0),
	(2, 0),
	(3, 0)