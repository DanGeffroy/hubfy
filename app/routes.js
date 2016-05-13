module.exports = function (app, passport) {
    var User = require('../app/models/user');
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index.ejs', {
            message: req.flash('loginMessage')
        }); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('index.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/hub', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('index.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/hub', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/hub', isLoggedIn, function (req, res) {
        res.render('hub.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    // =====================================
    // Persist widget position and size ====
    // =====================================
    app.get('/hub/persistewidget', function (req, res) {
        var id = req.query._id;
        var widgetName = req.query.widgetName;
        var col=  req.query.col;
        var row = req.query.row;
        var sizex = req.query.sizex;
        var sizey = req.query.sizey;
        var width = req.query.width;
        var height = req.query.height;

        var conditions = { "_id": id };
        var updateStr = '{"'+widgetName+'":{"col":'+col+',"row":'+row+',"sizex":'+sizex+',"sizey":'+sizey+',"height":'+height+',"width":'+width+'}}';
        var update = JSON.parse(updateStr);

        User.findOneAndUpdate(conditions, update, {upsert:true}, function(err, doc){
          if (err) return res.send(500, { error: err });
          console.log("User :" + id+ " updated");
          res.send(200);
        });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
