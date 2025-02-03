CREATE TABLE if not exists teams
(
    id INT GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0,
    ties INT DEFAULT 0
);
