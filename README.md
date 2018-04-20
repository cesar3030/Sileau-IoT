# Sileau tbnk
## Project description
The greatest silo monitoring system ever created!
## How to install
### :pushpin: For all environments
Create a `.env` file out of `.env.example`.  
`cp ./express-server/.env.example ./express-server/.env`
### Using Docker :whale2:
To be able to use the Docker environment, you need to have both [Docker](https://www.docker.com/community-edition) and [Docker Compose](https://docs.docker.com/compose/install/#install-compose) installed on your computer.  
__Note__: Docker Compose is included in Docker installation if you're using MacOS or Windows. Only Linux users need to download it separetely.  
1. Install node dependencies locally  
` cd ./angular-client`  
`npm install`  
2. Build Docker images  
`cd ..`  
`docker-compose build`
3. Run containers  
`docker-compose up`
4. Access a container  
If you want to execute some commands inside a container run:  
 * `docker-compose exec express bash` to have acces to the express server container
 * `docker-compose exec angular bash` to have acces to the angular client container  
  When you want to quit the container, just type `exit`
5. Stop containers  
`docker-compose down`

:warning: **Important**: When you want to execute a `docker-compose [whatever]` command, you need to be in the project root folder. The one where 
`docker-compose.yml` is located.

## Services
### Backend REST API
The REST API is using Node.JS and Express.JS.  
URL: [http://localhost:9000](http://localhost:9000)
### Frontend SPA
The frontend client is a Angular 5 Application.  
URL: [http://localhost:4200](http://localhost:4200)
### Database 
The Database is a MongoDB database.  
URL: [http://localhost:27017](http://localhost:27017)

## Application
Here is some screenshot of the application running on Heroku.
# Desktop version

# Tablet version
# Mobile version
