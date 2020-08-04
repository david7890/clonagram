let page = require('page')
let empty = require('empty-element')
let template = require('./template')
let title = require('title')

page('/signup', function(ctx, next){ 
    title('Platzigram - Signup')
    let main = document.getElementById('main-container');
    empty(main).appendChild(template);

})