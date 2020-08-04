let yo = require('yo-yo')
let layout = require('../layout')

module.exports = function userPageTemplate(user){
    let el = yo`<div class="container user-page section">
        <div class="row">
            <div class="col s12 m10 offset-m1 l8 offset-l2 center-align heading">
                <div class="row">
                    <div class="col s12 m10 offset-m1 l3 offset-l3 center">
                        <img src="${user.avatar}" class="responsive-img circle" alt="img-perfil">
                    </div>
                    <div class="col s12 m10 offset-m1 l6 left-align">
                        <h2 class="hide-on-large-only center-align">${user.username}</h2>
                        <h2 class="hide-on-med-and-down left-align">${user.username}</h2>
                    </div>
                </div>
            </div>
                <div class="row">
                    ${user.pictures.map(function(picture){
                        return yo`<div class="col s12 m6 l4">
                            <div class="card">
                                <a href="/${user.username}/${picture.id}" class="card-image">
                                  <img src="${picture.src}">
                                </a>
                                <div class="card-content">
                                    <p>
                                        <a class="left" href="#"><i class="far fa-heart"></i></a>
                                        <span class="left likes">${picture.likes} Me gusta</span>
                                    </p>
                                </div>
                            </div>
                             <!-- Modal Structure -->
                            <div id="modal${picture.id}" class="modal modal-fixed-footer">
                                <div class="modal-content">
                                    <img src="${picture.src}">
                                </div>
                                <div class="modal-footer">
                                    <div class="btn btn-flat likes">
                                        <i class="far fa-heart"></i>  ${picture.likes} Me gusta
                                    </div>
                                </div>
                            </div>
                        </div>`
                    })}
                </div>
        </div>
    </div>`

    return layout(el)
}
