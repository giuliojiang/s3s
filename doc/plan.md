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

id, name, created

# backend

## POST /api/upload

upload a file

additional request headers:

```
S3S-api-upload-collectionid
S3S-api-upload-filename
```

## POST /api/newcollection

create a new collection if not exists

POST body schema

```
{
    name: string
}
```

# s3

files stored by their mongo id