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
    // Youtube ==============================
    // =====================================
    /*Edit change the youtube url used for the youtube player*/
    app.get('/youtubeplayer/edit', function (req, res) {
        console.log(req.query._id)
        User.findById(req.query._id, function (err, user) {
            user.componants.forEach(function (element) {
                if (element.name === "youtubeplayer") {
                    /*We remove the old element*/
                    var index = user.componants.indexOf(element);
                    if (index > -1) {
                        user.componants.splice(index, 1);
                    }
                    element.url = req.query.url
                    user.componants.push(element);
                    user.save(function (err) {
                        if (err) {
                            console.error('ERROR!');
                        }
                        res.send({
                            newUrl: req.query.url
                        });
                    });
                }
            });
        });
    });
    /*Edit change the youtube url used for the youtube player*/
    app.get('/youtubeplayer/add', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        console.log(req.query._id)
        User.findById(req.query._id, function (err, user) {
            var alradyContain = false;
            user.componants.forEach(function (element) {
                if (element.name === "youtubeplayer") {
                    alradyContain = true;
                }
            });
            if (!alradyContain) {
                user.componants.push({
                    name: "youtubeplayer"
                    , url: req.query.url
                });
                user.save(function (err) {
                    if (err) {
                        console.error('ERROR!');
                    }
                });
                res.render('hub.ejs', {
                    layout: false
                    , user: user
                });

            } else {
                res.send({
                    status: "error"
                });
            }
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