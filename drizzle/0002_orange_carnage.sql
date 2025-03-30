ALTER TABLE `tanstack_start_users` MODIFY COLUMN `email_verified` boolean NOT NULL DEFAULT false;--> statement-breakpoint
ALTER TABLE `tanstack_start_users` ADD `display_username` text;