let page = require('page')
let empty = require('empty-element')
let header = require('../header')
let title = require('title')
let template = require('./template')

page('/:username', loadUser, header, function(ctx, next){
    let main = document.getElementById('main-container')
    title(`Clonagram - ${ctx.params.username}`)
    empty(main).appendChild(template(ctx.user))

})

page('/:username/:id', loadUser, header, function(ctx, next){
    let main = document.getElementById('main-container')
    title(`Clonagram - ${ctx.params.username}`)
    empty(main).appendChild(template(ctx.user));
    
    $(document).ready(function(){
        $(`#modal${ctx.params.id}`).modal();
        $(`#modal${ctx.params.id}`).modal("open");
      });
})

async function loadUser(ctx, next){
    try{
        ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json())
        next() //llama al siguiente middleware
    }catch(err){
        console.log(err)
    }
}