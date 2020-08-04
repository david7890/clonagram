let yo = require('yo-yo')
let empty = require('empty-element')

let el = yo`<nav class="header">
                    <div class="nav-wrapper">
                        <div class="container">
                            <div class="row">
                                <div class="col s12 m6 offset-m1">
                                    <a href="/" class="brand-logo title">Clonagram</a>
                                </div>
                                <div class="col s2 m6 push-s10 push-m10">
                                    <!-- Dropdown Trigger -->
                                    <a class='dropdown-trigger btn btn-large btn-flat' href='#' data-target='drop-user'>
                                        <i class="far fa-user"></i><!-- logo user -->
                                    </a>
                                    <!-- Dropdown Structure -->
                                    <ul id='drop-user' class="dropdown-content">
                                        <li><a href="#!">Salir</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>`;

module.exports = function header(ctx, next){
    let container = document.getElementById('header-container')
    empty(container).appendChild(el);
    next()
}
