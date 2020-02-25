const http = require('http');
const https = require('https');
const open  = require('open')
const fs = require('fs');
module.exports = {
    resend  : (req, res) => {
      console.log(req.body)
      rand_otp=Math.floor(1000 + Math.random() * 9000);
      let query = "Insert INTO `users` (phone_number,verification_code) VALUES ("+req.params.phone_number+","+rand_otp +")"; // query database to get all the players
           db.query(query, (err, result) => {
             const options = {
                hostname: 'smsw.co.in',
                port: 443,
                path: '/API/WebSMS/Http/v1.0a/index.php?username=narayana&password=nar123&sender=DRMLKO&to='+req.params.phone_number+'&message=You%20OTP%20is%20'+rand_otp+'&reqid=1&format={json|text}&route_id=39&callback=Any+Callback+URL&unique=0&sendondate=04-11-2018T09:17:18"',
                method: 'GET'
              }
              const smsreq = https.request(options, res => {
                  console.log(`statusCodess: ${res.statusCode}`)
                    console.log(res)
                  smsreq.on('data', d => {
                    console.log(d)
                  process.stdout.write(d)
                })
              })

              smsreq.on('error', error => {
                console.error(error)
              })

              smsreq.end()
              console.log(err,result);

              res.send(result);
        });
    },
    verify  : (req, res) => {
      console.log(req.body);
      let query = "UPDATE `users` SET  `verification_status`=1 WHERE  `phone_number`="+req.body.phone_number+" AND `verification_code`="+req.body.otp;

           db.query(query, (err, result) => {
                console.log("daada",result,err)
              //  res.send(result)
                if(result.affectedRows==1)
                {
                  var tempFile="https://drive.google.com/file/d/1gab93K4c-e8MiOnfUMR1piArULntpk5Y/view";
                  fs.readFile(tempFile, function (err,data){
                     res.contentType("application/pdf");
                     res.send(data);
                  });
                  // res.render('openFile.ejs', {
                  //         title: 'Enter' |  'You may download once you verify the file download'
                  //       ,  message:result
                  //       ,  params:req.body
                  //       });
                        }
           })
    }

};
