-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS basquiat_paintings;

CREATE TABLE basquiat_paintings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  year SMALLINT NOT NULL,
  dimensions VARCHAR NOT NULL,
  image VARCHAR NOT NULL
);

INSERT INTO
  basquiat_paintings (title, year, dimensions, image)
VALUES
  (
    'Riding with Death',
    1988,
    '249 x 289.5 cm',
    'https://blog.singulart.com/wp-content/uploads/2020/02/riding-with-death.jpg'
  ),
  (
    'Skull',
    1981,
    '207 x 175.9 cm',
    'https://uploads5.wikiart.org/images/jean-michel-basquiat/head.jpg!Large.jpg'
  ),
  (
    'Tuxedo',
    1982,
    '260.8 x 151.8 cm',
    'https://uploads7.wikiart.org/images/jean-michel-basquiat/tuxedo.jpg!Large.jpg'
  ),
  (
    'Sugar Ray Robinson',
    1982,
    '106.5 x 106.5 cm',
    'https://uploads1.wikiart.org/images/jean-michel-basquiat/sugar-ray-robinson.jpg!Large.jpg'
  ),
  (
    'King Alphonso',
    1983,
    '57 x 76.5 cm',
    'https://uploads5.wikiart.org/images/jean-michel-basquiat/king-alphonso.jpg!Large.jpg'
  );