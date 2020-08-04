if(!window.Intl){
    window.Intl = require('intl')
    require('intl/locale-data/jsonp/en-US.js')
    require('intl/locale-data/jsonp/es.js')
}

let IntlRelativeFormant = window.IntlRelativeFormant = require('intl')
let IntlMessageFormat = require('intl-messageformat')

require('intl/locale-data/jsonp/en-US.js')
require('intl/locale-data/jsonp/es.js')

let rf = new IntlRelativeFormant('es')
