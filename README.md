# COVID 19 TRACKER
https://covid-19-tracker-1a918.web.app/

# Getting started
- clone this repository
- run the command to create and start containers and start react server
```
docker-compose up
```

# What the app loks like
![スクリーンショット 2021-09-16 23 20 51](https://user-images.githubusercontent.com/35527421/133629324-4f9200b9-fa03-4f0c-b275-8a5e2b4dec3b.png)

# This app is created with
- react (create-react-app)
- css (not scss. usually use scss at work)
- material-ui (so I can focus on creating app. Desiging is not the first priority)
- some APIs (Map and chart)

# APIs
- [react-chartjs-2](http://reactchartjs.github.io/react-chartjs-2/#/) and [chart.js](https://www.chartjs.org/docs/latest/) for the Line graph
- [react-leaflet](https://react-leaflet.js.org/) and [leaflet](https://leafletjs.com/) for the Map
- [disease.sh](https://disease.sh/)
  - to fetch covid related data. 
  - number of recovery for a certain period is broken due to a lack of data provided by the API.

# Things I actively tried
- to avoid using magic number and hard coding by assigning them into constant variables
  - so that I don't mistakenly use wrong urls to fetch data
  - and also they are easy to reuse again
- to write readable codes by leaving comments
  - for easier and better understanding
- to use docker
  - it's my first time using docker
  - to keep my local machine clean by avoiding to have a lot of things installed for development.
  - turns out I knew it's great and now I have better understanding about docker (and k8s) used at my workplace.

# Things I actively avoid
- organizing files like src directory.
  - createing a runnable application was the first priority.
  - no plan to maintain this application in the future.

# deployment(TBD)
- will be going to deploy this appllication on firebase soon

# Just a memo
## optional chaining and nullish coalescing
- https://github.com/facebook/create-react-app/pull/8526
