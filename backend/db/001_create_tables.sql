DROP TABLE IF EXISTS links CASCADE;
CREATE TABLE links (
    name            varchar(20) UNIQUE NOT NULL,
    user_token      varchar(36) NOT NULL,
    redirect_url    text NOT NULL,
    expires         date,
    PRIMARY KEY (name)
);

DROP TABLE IF EXISTS trusted_links CASCADE;
CREATE TABLE trusted_links (
    user_token      varchar(36) NOT NULL,
    name            varchar(20) NOT NULL,
    PRIMARY KEY (user_token, name),
    FOREIGN KEY (name) REFERENCES links (name) ON DELETE CASCADE
);
