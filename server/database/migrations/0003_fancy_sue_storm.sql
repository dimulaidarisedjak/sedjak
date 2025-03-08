ALTER TABLE `domains` ADD `bill` integer REFERENCES bills(id);--> statement-breakpoint
ALTER TABLE `email_domains` ADD `bill` integer REFERENCES bills(id);