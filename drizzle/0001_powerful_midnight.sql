ALTER TABLE `tanstack_start_users` MODIFY COLUMN `username` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `tanstack_start_users` MODIFY COLUMN `two_factor_enabled` boolean NOT NULL DEFAULT false;--> statement-breakpoint
ALTER TABLE `tanstack_start_users` ADD CONSTRAINT `tanstack_start_users_username_unique` UNIQUE(`username`);