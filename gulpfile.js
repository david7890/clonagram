let gulp = require('gulp');//require busca en node modules el directorio
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let babel = require('babelify');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let watchify = require('watchify');

gulp.task('styles', () =>{
    return gulp
            .src('index.scss')
            .pipe(sass())//preprocesa en sass
            .pipe(rename('app.css'))
            .pipe(gulp.dest('public'));//despues ponlo en public
})

gulp.task('assets', ()=>{
    return gulp
            .src('assets/*')
            .pipe(gulp.dest('public'));
})

function compile(watch){
    let bundle = watchify(browserify('./src/index.js', {debug: true}));

    function rebundle(){
        const newLocal = 'app.js';
        return bundle
            .transform(babel)
            .bundle()
            .on('error', function (err){//callback cuando haya el evento error ejecuta function
                console.log(err)
                this.emit('end');
            })
            .pipe(source('index.js'))
            .pipe(rename(newLocal))
            .pipe(gulp.dest('public'));
    }
    if (watch){
        bundle.on('update', ()=>{
            console.log('--> BUNDLING...')
            rebundle();
        });
    }

    rebundle();
}

gulp.task('build', ()=> {
     return compile();
    });
gulp.task('watch', () => { 
     return compile(true); 
    });
gulp.task('default', gulp.parallel('styles', 'assets','build'));//ejecuta tarea de styles