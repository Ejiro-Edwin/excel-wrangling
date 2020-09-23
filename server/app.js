const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
let multer = require("multer");
let xlstojson = require("xls-to-json-lc");
let xlsxtojson = require("xlsx-to-json-lc");
var Excel = require('exceljs');
const variableRoute = require("./routes/variable");
const {response} = require("express");
const variablefunc = require("./controller/VariableController")
const mysql = require("sync-mysql");
const connection = new mysql({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pass,
    database: process.env.db_name
  });

// var wb = new Excel.Workbook();

let app = express();

app.use(cors());


app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var storage = multer.diskStorage({ // multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + "-" + datetimestamp + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
    }
});

var upload = multer({ // multer settings
    storage: storage,
    fileFilter: function (req, file, callback) { // file filter
        if (["xls", "xlsx"].indexOf(file.originalname.split(".")[file.originalname.split(".").length - 1]) === -1) {
            return callback(new Error("Wrong extension type"));
        }
        callback(null, true);
    }
}).single("file");
app.use(cors({origin: "*", methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS", preflightContinue: false, optionsSuccessStatus: 204}));

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.get("/", async (req, res) => {
    return res.status(200).json({msg: "Welcome to the AMI Financial Data Wrangling and Storage."});
});

app.post("/upload", async (req, res) => {
    var exceltojson;
    upload(req, res, function (err) {
        if (err) {
            res.json({error_code: 1, err_desc: err});
            return;
        }
        if (!req.file) {
            res.json({error_code: 1, err_desc: "No file passed"});
            return;
        }
        if (req.file.originalname.split(".")[req.file.originalname.split(".").length - 1] === "xlsx") {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path, output: null, // since we don't need output.json
                lowerCaseHeaders: true
            }, function (err,result) {
                if (err) {
                    return res.json({error_code: 1, err_desc: err, data: null});
                }
                 console.log(result)
                //  console.log(result.length);
                // res.json({error_code: 0, err_desc: null, data: result});
                var rarray = []
                let count = 0
                const varresult = variablefunc.getAllVariables()
                console.log(varresult)
                result.forEach(el => { // console.log(JSON.stringify(el.items) + "-----")
                    let r = varresult.filter(ell => {

                        // console.log(el.items)
                        // // // console.log("---------------------" )
                        // console.log(ell.Variable)
                        return el.items.toLowerCase() === ell.variables.toLowerCase()
                    })
                    // console.log(r.length)
                    if (r.length > 0) {
                        count++
                        rarray.push(el)

                    }
                })
            let years = Object.keys(rarray[0]).slice(2,6)
            console.log(years)
            let noc =  years.length
            console.log(noc)
            let allYears = []

            function getYears(array,year){
              let arr =[]
              array.forEach(el=>{
                arr.push(el[year])
              })
              return(arr)
            }

            for(var i =0; i < noc; i++){
                let ddd= getYears(rarray,years[i])
                ddd.unshift(years[i])
                ddd.unshift(req.body.company_name)
                allYears.push(ddd)
              }
              console.log(allYears)
            var sql = "INSERT INTO spread (company_name, year,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`, `9`,`10`,`11`,`12`,`13`,`14`,`15`,`16`,`17`,`18`,`19`,`20`,`21`,`22`,`23`,`24`,`25`,`26`,`27`,`28`,`29`,`30`,`31`,`32`,`33`,`34`,`35`,`36`,`37`,`38`,`39`,`40`,`41`,`42`,`43`,`44`,`45`,`46`,`47`,`48`,`49`,`50`,`51`,`52`,`53`,`54`,`55`,`56`,`57`,`58`,`59`,`60`,`61`,`62`,`63`,`64`,`65`,`66`,`67`,`68`,`69`,`70`,`71`,`72`,`73`,`74`,`75`,`76`,`77`,`78`,`79`,`80`,`81`,`82`,`83`,`84`,`85`,`86`,`87`,`88`,`89`,`90`,`91`,`92`,`93`,`94`,`95`,`96`,`97`,`98`,`99`,`100`,`101`,`102`,`103`,`104`,`105`,`106`,`107`,`108`,`109`,`110`,`111`,`112`,`113`,`114`,`115`,`116`,`117`,`118`,`119`,`120`,`121`,`122`,`123`,`124`,`125`,`126`,`127`,`128`,`129`,`130`,`131`,`132`,`133`,`134`,`135`,`136`,`137`,`138`,`139`,`140`,`141`,`142`,`143`,`144`,`145`,`146`,`147`,`148`,`149`,`150`,`151`,`152`,`153`,`154`,`155`,`156`,`157`,`158`,`159`,`160`,`161`,`162`,`163`,`164`,`165`,`166`,`167`,`168`,`169`,`170`,`171`,`172`,`173`,`174`,`175`,`176`,`177`,`178`,`179`,`180`,`181`,`182`,`183`,`184`,`185`,`186`,`187`,`188``189`,`190`,`191`,`192`,`193`,`194`,`195`,`196`,`197`,`198`,`199`,`200`,`201`,`202`,`203`,`204`,`205`,`206`,`207`,`208`,`209`,`210`,`211`,`212`,`213`,`214`,`215`,`216`,`217`,`218`,`219`,`220`,`221`,`222`,`223`,`224`,`225`,`226`,`227`,`228`,`229`,`230`,`231`,`232`,`233`,`234`,`235`,`236`,`237`,`238`,`239`,`240`,`241`,`242`,`243`,`244`,`245`,`246`,`247`,`248`,`249`,`250`,`251`,`252`,`253`,`254`,`255`,`256`,`257`,`258`,`259``260`,`261`,`262`,`263`,`264`,`265`,`266`,`267`,`268``269`,`270`,`271`,`272`,`273`,`274`) VALUES ?";
            var values = allYears;
            connection.query(sql, [values], function(err) {
                if (err){
                    console.log("error",err)
                }
                else{
                    console.log("Data Inserted")
                }

                connection.end();
            });

            });
        } catch (e) {
            res.json({error_code: 1, err_desc: "Corupted excel file"});
        }
    });
});
app.use(function (err, req, res, next) {
    res.status(500).send('Something wrong broke!');
})

app.get("/form", function (req, res) {
    res.sendFile(__dirname + "/form.html");
});

app.use("/variable", variableRoute);

module.exports = {
    path: "/api/v1",
    handler: app
  };

