// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var cors = require('cors');
var app        = express();                 // define our app using express
app.use(cors());
var bodyParser = require('body-parser');

var Bear     = require('./app/models/bear');
var Question     = require('./app/models/question');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:8900/test'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
// 任何路由的每次request都执行
router.use(function(req, res, next) {
    // 打印
    console.log('Something is happening.');
    next(); // 在这里会将request交给下一个中间件，如果这个中间件后面没有其他中间件，请求会交给匹配的路由作处理
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// 这里可以配置更多的路由
router.route('/bear')

    // 创建一条bear (用 POST动词访问uri http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();      // 创建一个Bear model的实例
        bear.name = req.body.name;  // 从request取出name参数的值然后设置bear的name字段

        // 保存bear，加入错误处理，即把错误作为响应返回
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    })

// 获取所有的 bears (用 GET动词访问uri http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

// 匹配 /bears/:bear_id 的路由
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // 根据id获取指定的bear (GET 请求 http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    });


router.route('/getQuestion')
    .get(function(req, res) {
        console.log('res');
        res.json({ message: 'hooray! welcome to our api!' });   
    })
    .post(function(req, res) {
        var question = new Question();      // 创建一个Question model的实例
        question.hi = req.body.hi;  
        question.name = req.body.name;  // 从request取出name参数的值然后设置question的name字段
        question.content = req.body.content;  

        // 保存bear，加入错误处理，即把错误作为响应返回
        question.save(function(err) {
            if (err)
                res.send(err);

            res.json({ status:0, message: 'Question created!' });
        });
        
    });

// 注册我们的路由 -------------------------------
// 所有的路由都会加上前缀 /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);