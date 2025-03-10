PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_web_builds` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`domain` integer,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`blob_path` text NOT NULL,
	`owned_by` text NOT NULL,
	FOREIGN KEY (`domain`) REFERENCES `domains`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_web_builds`("id", "name", "description", "domain", "status", "created_at", "blob_path", "owned_by") SELECT "id", "name", "description", "domain", "status", "created_at", "blob_path", "owned_by" FROM `web_builds`;--> statement-breakpoint
DROP TABLE `web_builds`;--> statement-breakpoint
ALTER TABLE `__new_web_builds` RENAME TO `web_builds`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `web_builds_name_unique` ON `web_builds` (`name`);