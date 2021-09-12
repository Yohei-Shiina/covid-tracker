### To access the node container shell
```
docker-compose exec node sh
```
### create one time service container to execute command(s)
```
# example:
docker-compose run --rm node sh -c "cd react-app && yarn"
```

# memo
## optional chaining and nullish coalescing
- https://github.com/facebook/create-react-app/pull/8526
