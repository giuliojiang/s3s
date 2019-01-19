# User interface

## /v/home

Home page: shows a token entry field

If token is valid, show list of collections

## /v/collection/:name

Show list of files

Each file has a download link

## /v/upload

Input field for collection name

Upload button for file select

# Mongo

## file

id, name, collectionid

## collection

id, name

# backend

## POST /api/upload

upload a file

## POST /api/newcollection

create a new collection if not exists

# s3

files stored by their mongo id