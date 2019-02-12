const proxy = require('http-proxy-middleware');
const express = require('express');

let app = express();

app.use(express.static('./'))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");

    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});

// 服务器代理
//如果请求以/sinaapi开头，则进入代理模式
// http://localhost:4008/sinaapi/api/config/list 转成 https://m.weibo.cn/sinaapi/api/config/list
app.use('/zdmapi', proxy({
    "target": "http://www.zhongdamen.com/mobile/index.php",
    "changeOrigin": true,
    "pathRewrite": {
        "^/zdmapi" : "/"
    }
  }));

// app.use('/api', proxy({
//     "target": "https://m.xx.cn",
//     "changeOrigin": true,
//     "pathRewrite": {
//         "^/api" : "/"
//     }
// }));

app.listen(5008, function(){
    console.log('Server running on http://localhost:5008');
});