# Hubfy (WIP)
![alt text](/preview.png)
## What?
I want to create a platform that allow a user to create his own 'hub' with any componant
## Why?
I'm starting this project because i want to upgrade my skill with nodeJS and mongoDB database
## How?
To do this I will probably use 
  - MongoDB
  - NodeJS
  - Angular2 <3
  - angular2-grid
  - Materializecss

## SetUp
Start a mongodb database
```bash
mongod
```

Install the dependencies
```bash
npm run installAll
```

Run the server
```bash
npm start
```
The app is now running on : http://localhost:8080/

## Available widgets for now : 
 - youtube playlist player
 - twitch player
 - twitch chat (independent of the twitch player)
 - simple todo list
 - weather widget where you can select your city

## Idea for futur widgets : 
 - quicknote widget
 - timer
 - G-map widget
Feel free to contribute! I will accept any pull request if they are intresting :D

## How to add a new widget : 
 - put your widget file in public/app/widgets/{{widgetName}}
 - import your widget in app.component.ts
  <br/>
    ```bash
  import { {{Widget}} } from "./widgets/{{widgetName}}/{{widgetName}}";
  ```
  <br/>
  ```bash
      add it to the directives : directives:[..,{{Widget}}]
  ```
 - add the selector of your widget inside app.component.html
    - See how works the others widgets
 - add the widget db structure inside public/app/user.ts and app/models/user.js
 - init your widget value inside config/passport.js
  <br/>
    ```bash
    newUser.{{widgetName}} = {'dragHandle': '.handle','fixed': true}; ~line 111
  ```
you are done :D (you may need to drop the user db if you change it's model)

## TODO
 - add persisance for widget spacifique data
 - Make more screen of the app
 - <del>update youtubeplayer widget</del>
 - Make a new landing page with screen and texts
 - re-Make the weather widget using angular2
 - Make a live version of the app (without dbs)

Made with :heart: by Dan
