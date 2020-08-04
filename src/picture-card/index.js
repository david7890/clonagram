let yo = require('yo-yo');
let moment = require('moment');

module.exports = function pictureCard(pic){

    let el;
    function render(picture){ 
        return yo`<div class="card ${picture.liked ? 'liked' : ''}">
                        <div class="card-image">
                            <img class="activator" src="${picture.url}" ondblclick=${like.bind(null, null, true)}>
                            <i class="fas fa-heart like-heart ${picture.likedHeart ? 'liked' : ''}"></i>
                        </div>
                        <div class="card-content">
                            <a href="/${picture.user.username}" class="card-title">
                                <img src="${picture.user.avatar}" class="avatar" />
                                <span class="username">${picture.user.username}</span>
                            </a>
                            <small class="right time">${moment(picture.createdAt).fromNow()}</small>
                            <p>
                                <a class="left" href="#" onclick=${like.bind(null, true)}><i class="far fa-heart"></i></a>
                                <a class="left" href="#" onclick=${like.bind(null, false)}><i class="fas fa-heart"></i></a>
                                <span class="left likes">${picture.likes} me gusta</span>
                            </p>
                        </div>
                    </div>`
    }

    function like(liked, dblclick, ){
        if(dblclick){
            pic.likedHeart = pic.liked = !pic.liked
            liked = pic.liked
        }else{
            pic.liked = liked
        }
        pic.liked = liked
        pic.likes += liked ? 1 : -1

        function doRender(){
            let newEl = render(pic)
            yo.update(el, newEl)
        }

        doRender()

        setTimeout(function(){
            pic.likedHeart = false
            doRender()
        }, 1000)

        return false
    }
    el=render(pic)
    return el
}
