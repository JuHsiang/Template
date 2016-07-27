var fs = require('fs');
var process = require('process');
var path = require('path');

var projectDir = process.argv[2];

console.log('projectDir: ' + projectDir);

if (!projectDir) {
    throw new Error('没有指定项目根目录');
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var rootPath = path.join(projectDir, 'src', 'app');
var dirList = [];

function readDir(root) {
    var files = fs.readdirSync(root);

    files.forEach(function (file) {
        var fullPath = path.join(root, file);
        var states = fs.statSync(fullPath);
        if (states.isDirectory()) {
            dirList.push(fullPath);
            readDir(fullPath);
        }
    });
}

var routeDirList = [];
var routes = []; // 最终被保存的路由规则数组

function checkIsController(dir) {
    var files = fs.readdirSync(dir);

    var hasConfig = false;
    var hasIndexJs = false;
    var hasIndexHtml = false;

    files.forEach(function (file) {
        if (file.toLowerCase() === "route.json") {
            //如果有明确的路由配置文件，则使用该配置文件
            var routeJson = fs.readFileSync(path.join(dir, file));
            var routeRules = JSON.parse(routeJson);
            routes = routes.concat(routeRules);

            hasConfig = true;
        }

        if (file.toLowerCase() === "index.js") {
            hasIndexJs = true;
        }
        if (file.toLowerCase() === "index.html") {
            hasIndexHtml = true;
        }
    });

    if (!hasConfig && hasIndexJs && hasIndexHtml) {
        return true;
    }

    return false;
}

readDir(rootPath);

dirList.forEach(function (path, i) {
    var needRoute = checkIsController(path);
    if (needRoute) {
        routeDirList.push(path);
    }
});

console.log(routeDirList);

//generateRoutes
//生成数组的代码
routeDirList.forEach(function (winDir) {
    var dir = winDir.split(path.sep).join('/');
    console.log(dir);
    var relaventPath = dir.replace(projectDir.split(path.sep).join('/') + 'src/', ''); //去掉头缀
    console.log(projectDir.split(path.sep).join('/') + 'src/');
    var routeRule = {
        stateName: relaventPath.replace('app/', '').replaceAll('/', '-'),
        url: relaventPath.replace('app', ''),
        templateUrl: relaventPath + '/index.html',
        controllerUrl: relaventPath + '/index'
    };

    routes.push(routeRule);
});

var descs = [
   '/**',
   ' * 该文件为自动生成，请不要手动修改。',
   ' * 生成时间： ' + (new Date()),
   ' */',
];

var templateString = descs.join('\r\n') + '\r\ndefine([], function() {return $rules ;});';

var ruleFile = templateString.replace('$rules', JSON.stringify(routes));

fs.writeFile(path.join(projectDir, 'src', 'tools', 'routeRules.js'), ruleFile, function (err) {
    if (err) throw err;
    console.log('新的路由规则文件已经生成'); //文件被保存
});


//下面的方式为生成打包所需要的路由配置文件
//var template = fs.readFileSync(path.join(projectDir, 'src', 'tools', 'template.txt'), {
//    encoding: 'utf8'
//});

//var code = '';
//routes.forEach(function (routeRule) {
//    code += template
//		.replace('_stateName_', routeRule.stateName)
//		.replaceAll('_url_', routeRule.url)
//		.replace('_tplHtml_', routeRule.templateUrl)
//		.replace('_tplCtrl_', routeRule.controllerUrl) + '\r\n';
//});

//var descs = [
//	'/**',
//	' * 该文件为自动生成，请不要手动修改。',
//	' * 生成时间： ' + (new Date()),
//	' */',
//];

//var templateString = descs.join('\r\n') + '\r\n' + 'define([], function(){\r\n' + code + '\r\n});';

//fs.writeFile(path.join(projectDir, 'src', 'routeConfig.js'), templateString, function (err) {
//    if (err) throw err;
//    console.log('新的路由规则文件已经生成'); //文件被保存
//});