import sqlite3
DATABASE = 'app.db'
db = sqlite3.connect(DATABASE)

cursor = db.cursor()



# Creation of table "USER".
# If it existed already, we delete the table and create a new one
cursor.execute('DROP TABLE IF EXISTS user')
cursor.execute("""CREATE TABLE user (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            email VARCHAR(300) NOT NULL,
                            password VARCHAR(256) NOT NULL,
                            profilePic VARCHAR(512) NOT NULL,
                            gender VARCHAR(32) NOT NULL,
                            name VARCHAR(128) NOT NULL,
                            surname VARCHAR(128) NOT NULL,
                            birthdayDate VARCHAR(10) NOT NULL,
                            profileCreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            lastEdites TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            status VARCHAR(32)
                            )""")


cursor.execute('DROP TABLE IF EXISTS favoris')
cursor.execute("""CREATE TABLE favoris (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            idUser INTEGER,
                            idRecipe INTEGER,
                            CONSTRAINT fk_user
                            FOREIGN KEY (idUser) 
                            REFERENCES user(id))""")

cursor.execute('DROP TABLE IF EXISTS recipes')
cursor.execute("""CREATE TABLE recipes (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            idUser INTEGER,
                            titre VARCHAR(300) NOT NULL,
                            description VARCHAR(500) NOT NULL,
                            ingredient1 VARCHAR(100), 
                            quantite1 VARCHAR(50), 
                            ingredient2 VARCHAR(100), 
                            quantite2 VARCHAR(50),
                            ingredient3 VARCHAR(100), 
                            quantite3 VARCHAR(50),
                            ingredient4 VARCHAR(100), 
                            quantite4 VARCHAR(50),
                            ingredient5 VARCHAR(100), 
                            quantite5 VARCHAR(50),
                            ingredient6 VARCHAR(100), 
                            quantite6 VARCHAR(50),
                            ingredient7 VARCHAR(100), 
                            quantite7 VARCHAR(50),
                            ingredient8 VARCHAR(100), 
                            quantite8 VARCHAR(50),
                            ingredient9 VARCHAR(100), 
                            quantite9 VARCHAR(50),
                            ingredient10 VARCHAR(100), 
                            quantite10 VARCHAR(50),
                            ingredient11 VARCHAR(100), 
                            quantite11 VARCHAR(50),
                            ingredient12 VARCHAR(100), 
                            quantite12 VARCHAR(50),
                            ingredient13 VARCHAR(100), 
                            quantite13 VARCHAR(50),
                            ingredient14 VARCHAR(100), 
                            quantite14 VARCHAR(50),
                            ingredient15 VARCHAR(100), 
                            quantite15 VARCHAR(50),
                            ingredient16 VARCHAR(100), 
                            quantite16 VARCHAR(50),
                            ingredient17 VARCHAR(100), 
                            quantite17 VARCHAR(50),
                            ingredient18 VARCHAR(100), 
                            quantite18 VARCHAR(50),
                            ingredient19 VARCHAR(100), 
                            quantite19 VARCHAR(50),
                            ingredient20 VARCHAR(100), 
                            quantite20 VARCHAR(50),
                            CONSTRAINT fk_user
                            FOREIGN KEY (idUser)
                            REFERENCES user(id))""")




db.commit()

# We close the connection to the database
db.close()
