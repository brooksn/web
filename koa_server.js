var port = process.env.port || process.env.npm_package_config_port || 3000;
var mount = require('koa-mount');
var koa = require('koa');
var app = koa();
var apps = [];
var appsparameters = (process.env.apps || process.env.npm_package_config_apps).split(' ');
console.log(appsparameters);

for(i in appsparameters){
	var appsplit = appsparameters[i].split(':');
	apps.push( new Map().set('path', appsplit[0]).set('app', require(appsplit[1]+'/koa_service')) );
	app.use(mount( apps[i].get('path'), apps[i].get('app')() ));
}

app.listen(port);
console.log('web listening on port ' + port);