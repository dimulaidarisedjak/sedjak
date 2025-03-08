CREATE TABLE `bills` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`status` text NOT NULL,
	`amount` integer NOT NULL,
	`created_at` integer NOT NULL,
	`due_at` integer NOT NULL,
	`owned_by` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bills_name_unique` ON `bills` (`name`);--> statement-breakpoint
CREATE TABLE `domains` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`expired_at` integer NOT NULL,
	`owned_by` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `domains_name_unique` ON `domains` (`name`);--> statement-breakpoint
CREATE TABLE `email_domains` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`expired_at` integer NOT NULL,
	`owned_by` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_domains_name_unique` ON `email_domains` (`name`);--> statement-breakpoint
CREATE TABLE `web_builds` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`blob_path` text NOT NULL,
	`owned_by` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `web_builds_name_unique` ON `web_builds` (`name`);--> statement-breakpoint
DROP TABLE `users`;