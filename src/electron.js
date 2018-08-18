var electron = require('electron');

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

// require('crash-reporter').start();

// 非正式环境重写LocalStorage路径
if(process.env.NODE_ENV !== 'production'){
	var env = process.env.NODE_ENV || 'dev';
	app.setPath('userData', app.getPath('userData') + '-' + env);
}

var mainWindow = null;

app.on('window-all-closed', function() {
	app.quit();
});

app.on('ready', function() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		'use-content-size':true,
		resizable:true,
		icon: __dirname + '/images/logo@64.png'
	});
	let htmlUrl = 'file://' + __dirname + '/main.html';
	if(process.env.NODE_ENV !== 'production'){
		htmlUrl = 'file://' + __dirname + '/main-dev.html';
	}
	mainWindow.loadURL(htmlUrl);
	mainWindow.on('closed', function() {
		mainWindow = null;
	});

	// 开发环境打开调试工具
	if(!/app$/.test(__dirname) && process.env.NODE_ENV !== 'test'){
	// if(0){
		mainWindow.openDevTools();
		let devInstaller = require('electron-devtools-installer');
		// import installExtension, { REACT_DEVELOPER_TOOLS } from ;

		devInstaller.default(devInstaller.VUEJS_DEVTOOLS)
			.then((name) => console.log(`Added Extension:  ${name}`))
			.catch((err) => console.log('An error occurred: ', err));
	}
});
