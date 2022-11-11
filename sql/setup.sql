-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS basquiat_paintings;
DROP TABLE IF EXISTS albums;

CREATE TABLE basquiat_paintings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  year SMALLINT NOT NULL,
  dimensions VARCHAR NOT NULL,
  image VARCHAR NOT NULL
);

CREATE TABLE albums (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  artist VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  year SMALLINT NOT NULL,
  spotify_link VARCHAR NOT NULL
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

INSERT INTO
  albums (artist, title, year, spotify_link)
VALUES
  (
    '9th Wonder',
    'ZION VII',
    2022,
    'https://open.spotify.com/album/4KKqugfLVZaDA62xZPJnEz?si=mSOaIzrSTTSfa-fjHP-tpg'
  ),
  (
    'Björk',
    'Fossora',
    2022,
    'https://open.spotify.com/album/5NchVUjB8yqNhqSeBYaFVy?si=Req9nVdtQ8a20CgK0_7uzQ'
  ),
  (
    'Freddie Gibbs',
    '$oul $old $eparately',
    2022,
    'https://open.spotify.com/album/3PZx4Vntcp5T7UgdfjnFDa?si=eeTJJflLSl-R7_1A1FMzFg'
  ),
  (
    'Meshell Ndegeocello',
    'The World Has Made Me The Man Of My Dreams',
    2007,
    'https://open.spotify.com/album/2AaWyePc8ZelBtReUpDZXw?si=W-27VnpJSNatVqllqG9v_A'
  ),
  (
    'Erykah Badu',
    'Mama''s Gun',
    2000,
    'https://open.spotify.com/album/3cADvHRdKniF9ELCn1zbGH?si=NmgCoAHeQT2GNAX985xD-g'
  );