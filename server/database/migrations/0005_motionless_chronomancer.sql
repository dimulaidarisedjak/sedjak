ALTER TABLE `web_builds` ADD `domain` text REFERENCES domains(id);