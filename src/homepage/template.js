let yo = require('yo-yo')//devolvera yo al hacer require
let layout = require('../layout')
let picture = require('../picture-card')
let request = require('superagent')

module.exports = function (pictures){
    let el = yo`<div class="container timeline">
                        <div id="modalCamara" class="modal center-align">
                            <div class="modal-content">
                                <div class="camara-picture" id ="camara-input"></div>
                            </div>
                            <div class="modal-footer center-align">
                                <button class="waves-effect waves-green btn" id="shoot">
                                    <i class="fas fa-camera"></i>
                                </button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
                                <form enctype="multipart/form-data" class="form-upload" id="formUpload" onsubmit=${onsubmit}>
                                    <!-- Modal Trigger -->
                                    <button data-target="modalCamara" class="btn modal-trigger"><i class="fas fa-camera"></i></button>
                                    <div id="fileName" class="fileUpload btn btn-flat cyan">
                                        <span><i class="fas fa-cloud-upload-alt"></i> Subir Foto</span>
                                        <input name="picture" id="file" type="file" class="upload" onchange=${onchange}/>
                                    </div>
                                    <button id="btnUpload" type="submit" class="btn btn-flat cyan hide">Subir</button>
                                    <button id="btnCancel" type="button" class="btn btn-flat red hide" onclick=${cancel}><i class="fas fa-times"></i></button>
                                </form>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m10 offset-m1 l6 offset-l3">
                                ${pictures.map(function(pic){
                                    return picture(pic);
                                })}
                            </div>
                        </div>
                    </div>`;

    function toggleButtons(){
        document.getElementById('fileName').classList.toggle('hide')
        document.getElementById('btnUpload').classList.toggle('hide')
        document.getElementById('btnCancel').classList.toggle('hide')
    }

    function cancel(){
        toggleButtons()
        document.getElementById('formUpload').reset()
    }

    function onchange(){
        toggleButtons()
    }

    function onsubmit(ev){
        ev.preventDefault()
        let data = new FormData(this)
        request
            .post('/api/pictures')
            .send(data)
            .end(function(err, res){
                console.log(arguments)
            })
    }
    
    return layout(el);//llama al layout y le pasa lo que esta en template el timline
}

