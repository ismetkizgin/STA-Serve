# STA RESTFUL API Project

Deploy methods of STA-Serve REST API project are given below.

### Project Publishing Instructions
The project can be published in two different ways.
* Docker
* NPM

#### Installation with Docker
To publish the project on Docker, go to the project directory and write the following codes;

```

  # deploy project with docker
  $ docker-compose up

  # install docker database backup
  $ cat <sql_filename> | docker exec -i <container_name> mysql -u root --password=root <database_name>

  ## Example
  $ cat ./dbBackup/sta_db.sql | docker exec -i sta-db mysql -u root --password=root sta_db
  
  # compile docker files
  $ docker-compose build
  
```

#### Installation with NPM
To publish the project in NPM, go to the project directory and write the following codes;

```

  # package install
  $ npm install

  # project start
  $ npm start
  
```

### Running the Project as a Developer
As a developer, to start the project and do the test operations, first go to the project directory and install the packages, then give the necessary command to start the mode.

```

  # package install
  $ npm install

  # project start
  $ npm run start:dev
  
```

## Useful resources
* [API Documentation](https://doc-sta-serve.herokuapp.com/)
* [Changelog](https://github.com/ismetkizgin/STA-Serve/blob/master/CHANGELOG.md)
