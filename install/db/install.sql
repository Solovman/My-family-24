CREATE TABLE up_subscription(
	                            ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	                            LEVEL   VARCHAR(50) DEFAULT 'Free',
	                            PRICE INT NOT NULL DEFAULT 0,
	                            NUMBER_TREES INT(3) DEFAULT 1,
	                            NUMBER_NODES INT(3) DEFAULT 20,
	                            CUSTOMIZATION BOOL DEFAULT FALSE,
	                            SUBSCRIPTION_TYPE VARCHAR(50),
	                            START_DATE DATE,
	                            END_DATE DATE
);

CREATE TABLE up_relation_user_subscription(
                        USER_ID INT NOT NULL PRIMARY KEY,
                        COUNT_TREES INT DEFAULT 0,
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
	                      IMAGE_ID INT DEFAULT 0,
	                      NAME VARCHAR(50) NULL,
	                      SURNAME VARCHAR(50) NULL,
	                      BIRTH_DATE DATE,
	                      DEATH_DATE DATE,
	                      GENDER ENUM('male', 'female'),
	                      TREE_ID INT NOT NULL
);

CREATE TABLE up_relation_person_parent(
	                                      PARENT_ID INT NOT NULL,
	                                      CHILD_ID INT NOT NULL,
	                                      PRIMARY KEY (PARENT_ID, CHILD_ID)
);

CREATE TABLE up_relation_married (
		PERSON_ID INT NOT NULL ,
		PARTNER_ID INT NOT NULL ,
		PRIMARY KEY (PERSON_ID, PARTNER_ID)
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
