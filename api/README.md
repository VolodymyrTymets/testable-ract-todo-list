# TODO list APi

## DEPLOY
This api deployed on heroku.com. To deploy just run

```sh deplloy```

### Config Vars
- HOST  - for swaget (heroku api path)
- MONGODB_URI - provided by heroku
- DATA_BASE_NAME - data base name that will ne used (last in MONGODB_URI)

### MONGO
- connection string https://docs.mongodb.com/manual/reference/connection-string/

> if occur this error https://stackoverflow.com/questions/23943651/mongodb-admin-user-not-authorized
> it means you use wrong database that provided in MONGODB_URI (last param) in DATA_BASE_NAME 