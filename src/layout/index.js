let yo = require('yo-yo')

module.exports = function layout(content){//regresa el encabezado con el timeline
    return yo`<div class="content">
                    ${content}
                </div>`;
}