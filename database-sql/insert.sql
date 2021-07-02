-- Add adresses into database
SET IDENTITY_INSERT dbo.address ON;
INSERT INTO dbo.address("id", "country", "zipcode", "city", "address")
VALUES
	(0, 'France', '75003', 'Paris', '42 rue du General de Gaule'),
	(1, 'France', '92000', 'Nanterre', '93 Boulevard de la Seine');
SET IDENTITY_INSERT dbo.address OFF;

-- Add billings into database
SET IDENTITY_INSERT dbo.billing ON;
INSERT INTO dbo.billing("id", "number", "crypto", "owner")
VALUES
	(0, '4242424242424242', '042', 'Mohamed Belgacem');
SET IDENTITY_INSERT dbo.billing OFF;

-- Add users into database
SET IDENTITY_INSERT dbo.users ON;
INSERT INTO dbo.users("id", "username", "usertype", "email", "password", "firstname", "lastname")
VALUES
	(0, 'dupontmark', 0, 'mark.dupont@yopmail.com', '$2a$10$P51adU7vvsqS2uaxYUddSe7solBKrZZbKE1TzkCAV7nEHr.ISeCtO', 'Dupont', 'Mark'),
	(1, 'jeanmichel123', 1, 'jeanmichel@yopmail.com', '$2a$10$PNchg0B5fuICA75HIJDeb.7LlEZztd/ubHwRfJEy3t0WS8qB.Odam', 'Jean', 'Michel'),
	(2, 'francisboulanger', 3, 'francisboulanger@yopmail.com', '$2a$10$NYWHg8Of8JMECDm68J0SjeyiZDb/r9SDXcxwZR.hLkyVH4eiSHpyO', 'Francis', 'Boulanger'),
	(3, 'natasha', 5, 'n.anselm@yopmail.com', '$2a$10$KuJ9zFh7lOk4G6eGE0SBW.JphQVgpOKscWZ75kxRGoblSO165bgFC', 'Natasha', 'Anselm'),
	(4, 'admin', 0, 'test.admin@yopmail.com', '$2a$10$W3wn61ZVTJUmjj.RXDlfheo5bkzXyC/GfjqnBQzQTHKu1xa/9lZZq', 'Test', 'Admin'),
	(5, 'commercial', 1, 'test.commercial@yopmail.com', '$2a$10$W3wn61ZVTJUmjj.RXDlfheo5bkzXyC/GfjqnBQzQTHKu1xa/9lZZq', 'Test', 'Commercial'),
	(6, 'technical', 2, 'test.technical@yopmail.com', '$2a$10$W3wn61ZVTJUmjj.RXDlfheo5bkzXyC/GfjqnBQzQTHKu1xa/9lZZq', 'Test', 'Technical'),
	(7, 'restaurant', 3, 'test.restaurant@yopmail.com', '$2a$10$W3wn61ZVTJUmjj.RXDlfheo5bkzXyC/GfjqnBQzQTHKu1xa/9lZZq', 'Test', 'Restaurant'),
	(8, 'delivery', 4, 'test.delivery@yopmail.com', '$2a$10$W3wn61ZVTJUmjj.RXDlfheo5bkzXyC/GfjqnBQzQTHKu1xa/9lZZq', 'Test', 'Delivery'),
	(9, 'user', 5, 'test.user@yopmail.com', '$2a$10$W3wn61ZVTJUmjj.RXDlfheo5bkzXyC/GfjqnBQzQTHKu1xa/9lZZq', 'Test', 'Standard'),
	(10,'developer', 6, 'test.developer@yopmail.com', '$2a$10$W3wn61ZVTJUmjj.RXDlfheo5bkzXyC/GfjqnBQzQTHKu1xa/9lZZq', 'Test', 'Developer');
SET IDENTITY_INSERT dbo.users OFF;

-- Link the Users to the Addresses
INSERT INTO dbo.useraddress("userid", "addressid")
VALUES
	(0, 0),
	(1, 0),
	(2, 1),
	(3, 0),
	(3, 1),
	(4, 1),
	(5, 1),
	(6, 1),
	(7, 1),
	(8, 1),
	(9, 1),
	(10,1);

-- Link the Users to the Billings
INSERT INTO dbo.userbilling("userid", "billingid")
VALUES
	(0, 0),
	(1, 0),
	(2, 0),
	(3, 0),
	(4, 0),
	(5, 0),
	(6, 0),
	(7, 0),
	(8, 0),
	(9, 0),
	(10,0);