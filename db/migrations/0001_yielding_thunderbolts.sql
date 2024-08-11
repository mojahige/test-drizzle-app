ALTER TABLE `users` RENAME COLUMN `username` TO `name`;--> statement-breakpoint
DROP INDEX IF EXISTS `users_username_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_name_unique` ON `users` (`name`);