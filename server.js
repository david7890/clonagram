var express = require('express')
var multer  = require('multer')
var ext = require('file-extension')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, +Date.now() + '.' + ext(file.originalname))
    }
  })
   
var upload = multer({ storage: storage }).single('picture')

var app = express();

app.set('view engine', 'pug');//usar pug vistas
app.use(express.static('public')); 

function restrict (req, res, next){
    if(req.user) return next();
    res.redirect('/signup')
}

app.get('/', function(req, res){
    res.render('index', {title: 'Clonagram'}) //devuelve index.pug
})

app.get('/signup', function(req, res){
    res.render('index', {title: 'Clonagram - Signup'})
})

app.get('/signin', function(req, res){
    res.render('index', {title: 'Clonagram - Signin'})
})

app.get('/api/pictures', function(req, res){
    var pictures = [
        {
            user: {
                username: 'david',
                avatar: 'https://scontent.ftpf1-2.fna.fbcdn.net/v/t1.0-9/16998931_1864485533826354_5896778363470837436_n.jpg?_nc_cat=106&_nc_sid=85a577&_nc_eui2=AeHzhEek_wDHXprl7nMMZOENi3ne-J8vqnKLed74ny-qcm_1Tw0r_0bIIeCessHTyLEjULD2-EXECGY5YSlNKTK-&_nc_ht=scontent.ftpf1-2.fna&oh=9e60571639d7dc9c188fc96ab062aaa7&oe=5F34CD51'
            },
            url: 'https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/6VpF6x9o-Qe.png',
            likes: 10,
            liked: false,
            createdAt: new Date()
        },
        {
            user: {
                username: 'david',
                avatar: 'https://scontent.ftpf1-2.fna.fbcdn.net/v/t1.0-9/16998931_1864485533826354_5896778363470837436_n.jpg?_nc_cat=106&_nc_sid=85a577&_nc_eui2=AeHzhEek_wDHXprl7nMMZOENi3ne-J8vqnKLed74ny-qcm_1Tw0r_0bIIeCessHTyLEjULD2-EXECGY5YSlNKTK-&_nc_ht=scontent.ftpf1-2.fna&oh=9e60571639d7dc9c188fc96ab062aaa7&oe=5F34CD51'
            },
            url: 'https://materializecss.com/images/sample-1.jpg',
            likes: 1,
            liked: false,
            createdAt: new Date().setDate(new Date().getDate() - 10)
        }
    ];

    setTimeout(() => res.send(pictures), 1500);
})

app.post('/api/pictures', function(req, res){
    upload(req, res, function(err){
        if (err){
            return res.send(500, "Error uploading file")
        }
        res.send('File uploaded successfully')
    })
})

app.get('/api/user/:username', function(req,res){
    const user = {
        username: 'David',
        avatar: 'https://pbs.twimg.com/profile_images/519004731352821760/q991s949_400x400.png',
        pictures: [
            {
                id: 1,
                src: 'https://pbs.twimg.com/profile_banners/318868028/1594895614/1080x360',
                likes: 3
            },
            {
                id: 2,
                src: 'https://pbs.twimg.com/profile_images/1283697117492588546/BYIDh37k_400x400.jpg',
                likes: 5
            },
            {
                id: 3,
                src: 'https://pbs.twimg.com/media/EBANb1mXsAEC4gj?format=jpg&name=small',
                likes: 76   
            },
            {
                id: 4,
                src: 'https://pbs.twimg.com/media/EdLK8xbXgAs5EBW?format=jpg&name=small',
                likes: 2   
            }
        ]
    }
    
    res.send(user)
})

app.get('/:username', function(req, res){
    res.render('index', {title: `Clonagram - ${req.params.username}`})
})

app.get('/:username/:id', function(req, res){
    res.render('index', {title: `Clonagram - ${req.params.username}`})
})

app.listen(3000, function(err){
    if(err) return console.log('Hubo un error'), process.exit(1);

    console.log('Clonagram escuchando en el puerto 3000')
})