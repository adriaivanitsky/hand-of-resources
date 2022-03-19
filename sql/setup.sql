-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS rocks;

CREATE TABLE rocks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    crystal_system TEXT NOT NULL,
    hardness TEXT NOT NULL
);

INSERT INTO 
    rocks (name, crystal_system, hardness)
VALUES
    ('pyrite', 'cubic', 6),
    ('labradorite', 'triclinic', 6),
    ('amethyst', 'trigonal', 7);










DROP TABLE IF EXISTS guitars;

CREATE TABLE guitars (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    year TEXT NOT NULL
);

INSERT INTO 
    guitars (name, year)
VALUES
    ('gibson les paul', '1982'),
    ('fender mustang', '1974'),
    ('rickenbacker', '1974');








    DROP TABLE IF EXISTS journals;

CREATE TABLE journals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    pages INT NOT NULL
);

INSERT INTO 
    journals (name, pages)
VALUES
    ('moleskine', 100),
    ('leuchtturm', 250),
    ('hobonichi', 300);







    DROP TABLE IF EXISTS coffees;

CREATE TABLE coffees (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    roast TEXT NOT NULL
);

INSERT INTO 
    coffees (name, roast)
VALUES
    ('stumptown', 'light'),
    ('coava', 'medium'),
    ('portland coffee roasters', 'dark');








--     DROP TABLE IF EXISTS games;

-- CREATE TABLE games (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     name TEXT NOT NULL,
--     system TEXT NOT NULL
-- );

-- INSERT INTO 
--     games (name, system)
-- VALUES
--     ('ocarina of time', 'N64'),
--     ('breath of the wild', 'nintendo switch'),
--     ('metroid', 'NES');




