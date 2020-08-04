//logica js del lado del cliente
let page = require('page');
require('moment/locale/es')

require('./header')
require('./homepage')
require('./signup')
require('./user-page')
require('./signin')//busca index.js en /signin

page();