let page = require('page')
let empty = require('empty-element')
let template = require('./template.js')
let title = require('title')

page('/signin', function(ctx, next){ 
    title('Platzigram - Signin')
    let main = document.getElementById('main-container');
    empty(main).appendChild(template);
})