var express = require('express');
var router = express.Router();

//MongoDB
//Cách kết ối, thao tác với MôngDB
const mongodb = 'mongodb+srv://hung:202112@cluster0.ordmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoose = require('mongoose')
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
  console.log('Kết nối thành công MongoDB!');
}).catch(err => {
  console.log(err);
});

//Đã thành công
//query dữ liệu và hiển thị trên EJS
//query dữ liệu và trả về JSON từ MongoDB
//định nghĩa 1 collection trước
//Schema là khái niệm để định nghĩa 1 Collection
//Collection tên là Student
const studentSCHEMA = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
})
//Model : là khái niệm để thao              tác với Collection tên là Student
const STUDENT = mongoose.model('Student', studentSCHEMA)


router.get('/getData', (req, res) => {
  STUDENT.find({}).then(result => {
    res.send(result);
  })
})


router.get('/creatUser', (req, res) => {
  const random = Math.floor(Math.random() * 1000);
  const student = new STUDENT({
    name: "Hoàng Hưng" + random,
    address: random + "Ninh Bình",
    phone: "" + random
  })
  student.save().then(result => {
    res.send(result);
  })
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', message: 'Chao' });
});


router.get('/deleteUser', function(req, res) {
  const id = req.query.id;
  STUDENT.deleteOne({ _id: id }).then(result => {
    res.redirect('/disPlayUser')
  })
})


router.get('/updateUser', function (req, res){
  const id = req.query.id;
  STUDENT.findOne({ _id: id }).then(result => {
    res.render('updateForm', {data: result})
  })
})


router.post('/updateUser', function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  STUDENT.updateOne({ _id: id }, {name: name, address: address, phone: phone}).then(result => {
    res.redirect('/disPlayUser')
  }).catch(err => {
    console.log(err)
  })
})

router.get('/getAllUser', function (req, res
) {
  var jsondata = [
    {
      id: 1,
      name: "HÀ HOÀNG HƯNG",
      age: 21
    },
    {
      id: 2,
      name: "ĐẶNG LINH ANH",
      age: 20
    },
    {
      id: 3,
      name: "HÀ THỊ THÚY",
      age: 17
    }
  ]
  res.send(jsondata);
})


router.get('/getAUser', function (req, res
) {
  var jsondata = {
    id: 1,
    name: "HÀ HOÀNG HẢI",
    phone: 21
  }
  res.send(jsondata);
})


router.get('/disPlayUser', function (req, res
) {
  // var jsondata =[
  //   {
  //     id: 1,
  //     name: "HÀ HOÀNG HƯNG",
  //     age: 21
  //   },
  //   {
  //     id: 2,
  //     name: "ĐẶNG LINH ANH",
  //     age: 20
  //   },
  //   {
  //     id: 3,
  //     name: "HÀ THỊ THÚY",
  //     age: 17
  //   }
  // ]
  STUDENT.find({}).then(jsondata => {
    res.render("users", {
      name: "Hoang Hung",
      data: jsondata
    })
  })
})


router.post('/creatUser', function (req, res
) {
  //Thuộc tiính sau biến body là thuộc tính trong thẻ input
  // , giá trị thuộc tính name
  //Ví dụ:
  // <input name="name">
  // <input name="age">
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const random = Math.floor(Math.random() * 1000);
  const student = new STUDENT({
    name: name,
    address: address,
    phone: phone
  })
  student.save().then(result => {
    // res.render('index', { title: "Createn User", message: "Createn User success" });
    res.redirect('/disPlayUser')
  })
})


module.exports = router;
