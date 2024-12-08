#!/bin/sh

cd $(dirname "$0")/..
mysql -u url_shortener url_shortener -p < db/001_create_tables.sql
