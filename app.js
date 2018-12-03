var express = require('express');
var app = express();
var $ = require('jQuery');
const fs = require('fs');
var bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(express.static('.'))
app.use(express.static('node_modules'))
// app.get('/', function (req, res) {
//   res.send('./index.html');
// });
app.use(bodyParser.json())


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/pointSave', function (req, res) {
		let pointsdata = fs.readFileSync('points.json');  
		let points = JSON.parse(pointsdata);   
		
		res.send(points)
})

app.post('/pointSave', function (req, res) {
	let points = req.body
	var data = new Object();
	data.points = points;
	var toFile = JSON.stringify(data); 
	fs.writeFile('points.json',toFile , (err) => {  
    if (err) throw err;
    console.log('Data written to file');
    console.log(toFile);
	});
	
  res.send("req")
})

// let student = {  
//     name: 'Mike',
//     age: 23, 
//     gender: 'Male',
//     department: 'English',
//     car: 'Honda' 
// };

// let data = JSON.stringify(student, null, 2);

// fs.writeFile('points.json', data, (err) => {  
//     if (err) throw err;
//     console.log('Data written to file');
// });

// console.log('This is after the write call');  
