CREATE TABLE schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name TEXT NOT NULL,
     address TEXT NOT NULL,
     city TEXT NOT NULL,
     state TEXT NOT NULL,
     contact VARCHAR(20),
     image TEXT,
     email_id VARCHAR(255) UNIQUE
)