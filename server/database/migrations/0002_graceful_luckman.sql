PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_bills` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`status` text NOT NULL,
	`amount` integer NOT NULL,
	`created_at` integer NOT NULL,
	`due_at` integer NOT NULL,
	`owned_by` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_bills`("id", "name", "description", "status", "amount", "created_at", "due_at", "owned_by") SELECT "id", "name", "description", "status", "amount", "created_at", "due_at", "owned_by" FROM `bills`;--> statement-breakpoint
DROP TABLE `bills`;--> statement-breakpoint
ALTER TABLE `__new_bills` RENAME TO `bills`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `bills_name_unique` ON `bills` (`name`);--> statement-breakpoint
CREATE TABLE `__new_domains` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`expired_at` integer NOT NULL,
	`owned_by` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_domains`("id", "name", "status", "created_at", "expired_at", "owned_by") SELECT "id", "name", "status", "created_at", "expired_at", "owned_by" FROM `domains`;--> statement-breakpoint
DROP TABLE `domains`;--> statement-breakpoint
ALTER TABLE `__new_domains` RENAME TO `domains`;--> statement-breakpoint
CREATE UNIQUE INDEX `domains_name_unique` ON `domains` (`name`);--> statement-breakpoint
CREATE TABLE `__new_email_domains` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`expired_at` integer NOT NULL,
	`owned_by` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_email_domains`("id", "name", "status", "created_at", "expired_at", "owned_by") SELECT "id", "name", "status", "created_at", "expired_at", "owned_by" FROM `email_domains`;--> statement-breakpoint
DROP TABLE `email_domains`;--> statement-breakpoint
ALTER TABLE `__new_email_domains` RENAME TO `email_domains`;--> statement-breakpoint
CREATE UNIQUE INDEX `email_domains_name_unique` ON `email_domains` (`name`);