DROP TABLE IF EXISTS trusted_links CASCADE;
DROP TABLE IF EXISTS links CASCADE;

CREATE TABLE links (
    name            varchar(20) UNIQUE NOT NULL,
    user_token      varchar(36) NOT NULL,
    redirect_url    text NOT NULL,
    expires         date,
    PRIMARY KEY (name)
);

CREATE TABLE trusted_links (
    user_token      varchar(36) NOT NULL,
    link_name       varchar(20) NOT NULL,
    PRIMARY KEY (user_token, link_name),
    FOREIGN KEY (link_name) REFERENCES links (name) ON DELETE CASCADE
);
