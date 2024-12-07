DROP TABLE IF EXISTS links CASCADE;
CREATE TABLE links (
    name            varchar(20) UNIQUE NOT NULL,
    user_token      text NOT NULL,
    redirect_url    text NOT NULL,
    expires         date,
    PRIMARY KEY (name)
);
