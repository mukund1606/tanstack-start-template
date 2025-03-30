CREATE TABLE `tanstack_start_accounts` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp,
	`refresh_token_expires_at` timestamp,
	`scope` text,
	`password` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tanstack_start_accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tanstack_start_rate_limits` (
	`id` varchar(36) NOT NULL,
	`key` text,
	`count` int,
	`last_request` bigint,
	CONSTRAINT `tanstack_start_rate_limits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tanstack_start_sessions` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`token` varchar(255) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tanstack_start_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `tanstack_start_sessions_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `tanstack_start_two_factors` (
	`id` varchar(36) NOT NULL,
	`secret` text NOT NULL,
	`backup_codes` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	CONSTRAINT `tanstack_start_two_factors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tanstack_start_users` (
	`id` varchar(36) NOT NULL,
	`name` text NOT NULL,
	`username` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL,
	`image` text,
	`max_sessions` int NOT NULL DEFAULT 1,
	`two_factor_enabled` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tanstack_start_users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tanstack_start_verifications` (
	`id` varchar(36) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tanstack_start_verifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `tanstack_start_accounts` ADD CONSTRAINT `tanstack_start_accounts_user_id_tanstack_start_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `tanstack_start_users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tanstack_start_sessions` ADD CONSTRAINT `tanstack_start_sessions_user_id_tanstack_start_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `tanstack_start_users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tanstack_start_two_factors` ADD CONSTRAINT `tanstack_start_two_factors_user_id_tanstack_start_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `tanstack_start_users`(`id`) ON DELETE cascade ON UPDATE no action;