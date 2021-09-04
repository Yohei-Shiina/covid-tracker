# Getting started
Clone this repository
```
git clone [repository url]
```

Create react application in your working dorectory
```
# This command takes time as react applpication builds up from scratch
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

If you wnat to access to the container shell, run:
```
docker-compose exec node sh
```
