CREATE TABLE up_subscription(
	                            ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	                            LEVEL   VARCHAR(50) DEFAULT 'Free',
	                            PRICE INT NOT NULL DEFAULT 0,
	                            NUMBER_TREES INT(3) NOT NULL DEFAULT 1
);

CREATE TABLE up_relation_user_subscription(
                        USER_ID INT NOT NULL,
	                    SUBSCRIPTION_ID INT NOT NULL DEFAULT 1,
	                    SUBSCRIPTION_BUY_TIME TIMESTAMP DEFAULT NULL
);

CREATE TABLE up_family_tree(
	                           ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	                           TITLE VARCHAR(100) NOT NULL,
	                           USER_ID INT NOT NULL,
	                           CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE up_person(
	                      ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	                      IMAGE_ID INT DEFAULT NULL,
	                      NAME VARCHAR(50) NOT NULL,
	                      SURNAME VARCHAR(50) NOT NULL,
	                      BIRTH_DATE DATE,
	                      DEATH_DATE DATE,
	                      GENDER ENUM('Male', 'Female'),
	                      TREE_ID INT NOT NULL
);

CREATE TABLE up_relation_person_parent(
	                                      PARENT_ID INT NOT NULL,
	                                      CHILD_ID INT NOT NULL,
	                                      PRIMARY KEY (PARENT_ID, CHILD_ID)
);

CREATE TABLE up_publication(
	                           ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	                           AUTHOR_ID INT NOT NULL,
	                           MESSAGE TEXT NOT NULL,
	                           CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE up_comment(
	                       ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	                       PUBLICATION_ID INT NOT NULL,
	                       AUTHOR_ID INT NOT NULL,
	                       COMMENT TEXT NOT NULL,
	                       CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
