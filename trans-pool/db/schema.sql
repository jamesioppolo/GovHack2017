drop table if exists `users`;
create table `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`username` varchar(100) NOT NULL,
	`password` char(60) NOT NULL,
	`created` datetime NOT NULL,
	`modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8
