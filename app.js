var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    originalName = "",
    url = "";

app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/', function(req, res){
//     res.send("Home");
// });

app.get('/', function(req,res){
    res.render("index");
});

app.post('/', function(req, res){
    var search = req.body.search;
    originalName = search.split(' ').join('');
    url = "https://api.github.com/users/"+originalName;
    res.redirect("/gitfind/" + originalName);
    // search = " ";
});

app.get('/gitfind/:login', function(req, res){
    axios.get(url)
    .then(function(response){
        var target = {
            avatar: response.data.avatar_url,
            name: response.data.name,
            html: response.data.html_url,
            login: response.data.login,
            location: response.data.location,
            created: response.data.created_at,
            repo: response.data.public_repos,
            followers: response.data.followers,
            following: response.data.following
        };
        console.log(target);
        res.render('result', {target:target});
    })
    .catch(function(err){
        console.log(err);
        res.render('error');
    })
});

var port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Deploying Port 5000");
});