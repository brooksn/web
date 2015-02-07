var port = process.env.PORT|| process.env.port || process.env.npm_package_config_port || 3000;
var mount = require('koa-mount');
var koa = require('koa');
var app = koa();
var appsparameters = (process.env.apps || process.env.npm_package_config_apps).split(' ');

for(i in appsparameters){
	var appsplit = appsparameters[i].split(':');
	app.use(mount( appsplit[0], require(appsplit[1]) ));
}

app.listen(port);
console.log('web listening on port ' + port);