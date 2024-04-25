DROP TABLE IF EXISTS `up_relation_user_subscription`, `up_chat`, `up_message`,
	`up_image`, `up_relation_person_parent`, `up_person`,
	`up_family_tree`, `up_user`, `up_subscription`, `up_relation_married`,
	`up_relation_user_single_purchase`, `up_single_purchase`;

DELETE
FROM b_file
WHERE `b_file`.`ID` = 1