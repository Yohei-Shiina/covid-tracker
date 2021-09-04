# Getting started
Clone this repository
```
git clone [repository url]
```

Create and name your react application (default react application name is 'my-react-app')

To name your react application, change the name 'my-react-app' to anything you want in the following three things:
```
1 - Dockerfile
2 - docker-compose.yml
3 - command that you are going to run next (docker-compose-run ... my-react-app)
```
Create react application
```
# This command takes time as react applpication builds up from scratch
# Do not forget to change the name 'my-react-app' if you wish to name your react application
docker-compose run --rm node sh -c "npx create-react-app my-react-app"

# Type 'y' to proceed
Need to install the following packages:
  create-react-app
Ok to proceed? (y) y
```
To start react server, run:
```
docker-compose up
```

To access the container shell, run:
```
docker-compose exec node sh
```
