BEGIN;
CREATE DATABASE danti;
DROP TABLE IF EXISTS userinfo, category, product, address CASCADE;
CREATE TABLE userinfo (
    userid SERIAL PRIMARY KEY,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    roles BOOLEAN NOT NULL,
    password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);


CREATE TABLE category (
    categoryid SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);


CREATE TABLE product (
    productid SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES userinfo(userid),
	category_id INTEGER NOT NULL REFERENCES category(categoryid),
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    illustration BYTEA NOT NULL,
    price DECIMAL NOT NULL,
    tva DECIMAL NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);




CREATE TABLE address (
   addressid SERIAL PRIMARY KEY,
   user_id INTEGER NOT NULL REFERENCES userinfo(userid),
    phone VARCHAR(15) NOT NULL,
    codepostal VARCHAR(5) NOT NULL,
    city VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

COMMIT;

