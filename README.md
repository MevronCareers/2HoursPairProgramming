# Mevron API 
This is a simple Request Ride APIs built with NodeJs Express framework.

## Getting Started
You can download this repo or clone using below command. (folder-name will be project folder in which you want to start your project).
```
git clone https://github.com/dlakes/mevron.git <folder-name>
```
```
### Project Setup
Once you clone or download project go into you folder

>now cope **.env.local** file to **.env** file

### Installing
```
> npm install
```

### Database Config Setup
Create new database (let's say i'm going to use mysql and my database name is **mevron**).
so in my **.env** file will set below parameters.
```
DB_HOST=localhost               # database connection host
DB_USER=root                    # database username
DB_PASS=                        # database password
DB_NAME=mevron                  # database name
DB_PORT=3306                    # database port
```
some other inportant parameters/keys in **.env** file
```
SECRET=secret           # secret key for encrypt/decrypt JWT token
```

### Migration and Seeders run
After creating database and updating .env file run below commands
```
> npm run migrate
```
Migration will create users, oauth, ride_request and cars tables
If you encounter any issues in running the migrations, A copy of the database dump is available in the database folder.

### Log File
Create a file named as access.log in the root directory.
```

`npm start` to run your project 
Everythig is setup:)

```

## Documentation URL
```
https://documenter.getpostman.com/view/2108248/UVRHj3g3

### Contact 
* Email <ajobiewefemi@gmail.com>
