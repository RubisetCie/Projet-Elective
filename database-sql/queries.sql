-- Select user by ID
SELECT "username", "usertype", "email", "password", "firstname", "lastname", "addressid", "country", "zipcode", "city", "address", "billingid", "number", "crypto", "owner"
FROM dbo.users
INNER JOIN dbo.useraddress ON dbo.useraddress.userid = dbo.users.id
INNER JOIN dbo.address ON dbo.address.id = dbo.useraddress.addressid
INNER JOIN dbo.userbilling ON dbo.userbilling.userid = dbo.users.id
INNER JOIN dbo.billing ON dbo.billing.id = dbo.userbilling.billingid
WHERE dbo.users.id = 0;