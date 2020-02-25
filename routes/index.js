module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `user` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {

            res.render('index.ejs', {
                title: 'FDS' |  'You may download once you verify the file download'
                ,users: result
            });
        });
    },
    otpVerify: (req, res) => {

        res.render('otpVerify.ejs', {
                title: 'Enter' |  'You may download once you verify the file download'
              ,  message:''
              , params:req.params
            });

    }

};
