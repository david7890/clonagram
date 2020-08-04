let page = require('page')
let empty = require('empty-element')
let template = require('./template')
let title = require('title')
let request = require('superagent')
let header = require('../header')
let Webcam = require('webcamjs')

page('/', header, loading, loadPicturesFetch, function(ctx, next){ 
    title('Clonagram')
    let main = document.getElementById('main-container');

    empty(main).appendChild(template(ctx.pictures));

    $(document).ready(function(){
        $('.modal').modal({
            ready: function disp(){
                Webcam.set({
                    width: 500,
                    height: 400,
                    image_format: "jpeg",
                    jpeg_quality: 90,
                    force_flash: false,
                    flip_horiz: true,
                    fps: 45
                });
                Webcam.attach('#camara-input');
            },
            complete: function(){
                Webcam.reset();
            }
        })
    })
})

function loading(ctx , next){
    let el = document.createElement('div')
    el.classList.add('loader')
    document.getElementById('main-container').appendChild(el)
    next()
}

function loadPictures(ctx, next){
    request
        .get('/api/pictures')
        .end(function(err, res){
            if(err) return console.log(err)
            ctx.pictures = res.body
            next()
        })
}

function loadPicturesFetch(ctx, next){
    fetch('/api/pictures')
        .then(function(res){
            return res.json()
        })
        .then(function(pictures){//pictures es lo que decuelve la promesa res.json()
            ctx.pictures = pictures
            next()
        })
        .catch(function(err){
            console.log(err)
        })
}