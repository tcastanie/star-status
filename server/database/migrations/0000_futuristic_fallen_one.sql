CREATE TABLE `check` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	`site_id` integer NOT NULL,
	`success` integer,
	`response_time` integer NOT NULL,
	`error` text,
	FOREIGN KEY (`site_id`) REFERENCES `site`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `site` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`project` text,
	`sort` integer
);
