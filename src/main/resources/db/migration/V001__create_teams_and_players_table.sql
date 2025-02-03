CREATE TABLE if not exists teams
(
    id INT GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0,
    ties INT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE if not exists players
(
    id INT GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    team_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);
