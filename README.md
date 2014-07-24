```
    _/_/_/    _/_/_/_/    _/_/    _/_/_/    _/      _/      _/_/_/_/    _/_/    _/_/_/
   _/    _/  _/        _/    _/  _/    _/    _/  _/        _/        _/    _/  _/    _/
  _/_/_/    _/_/_/    _/_/_/_/  _/    _/      _/          _/_/_/    _/    _/  _/_/_/
 _/    _/  _/        _/    _/  _/    _/      _/          _/        _/    _/  _/    _/
_/    _/  _/_/_/_/  _/    _/  _/_/_/        _/          _/          _/_/    _/    _/

    _/    _/  _/    _/    _/_/    _/      _/
   _/  _/    _/    _/  _/    _/  _/_/    _/
  _/_/      _/_/_/_/  _/_/_/_/  _/  _/  _/
 _/  _/    _/    _/  _/    _/  _/    _/_/
_/    _/  _/    _/  _/    _/  _/      _/

      _/_/      _/_/_/    _/_/    _/_/_/    _/_/_/_/  _/      _/  _/      _/
   _/    _/  _/        _/    _/  _/    _/  _/        _/_/  _/_/    _/  _/
  _/_/_/_/  _/        _/_/_/_/  _/    _/  _/_/_/    _/  _/  _/      _/
 _/    _/  _/        _/    _/  _/    _/  _/        _/      _/      _/
_/    _/    _/_/_/  _/    _/  _/_/_/    _/_/_/_/  _/      _/      _/
```

### Application Layout

```
/
|-- README.md
|-- package.json
|-- Gruntfile.js
|
|-- app.js
|
|-- assets/
|   |
|   |--  css/
|   |--  fonts/
|   |--  js/
|   |--  scss/
|        |
|        |-- main.scss
|        |-- base/
|        |-- lib/
|        |-- modules/
|
|-- views/
|   |
|   |-- includes/
|   |-- modules/
|
```

### Development
The staging environment for this application is located at
[http://readyforkhanacademy.herokuapp.com/](http://readyforkhanacademy.herokuapp.com/)

#### Installation
```
npm i 
```

#### Starting the App
```
npm start
```
or
```
node app.js
```

#### Pushing to Stage
```
git push heroku stage
```

### Production

#### Installation
```
npm i --production
```


