const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Booking = require('./models/bookingModel');
const Consultants = require('./models/consultants');
const Groups = require('./models/group-info');
const Rooms = require('./models/room-info');
const Skills = require('./models/skills');
const trainerSkills = require('./models/trainer-skills');
const Trainers = require('./models/trainers');
var session = require('express-session');

const app = express();
app.set('view engine','ejs');
app.listen(8000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));

mongoose.connect('mongodb://admin:password1@ds046677.mlab.com:46677/booking-system',{useNewUrlParser:true});

app.get("/", function(req, res){
    res.render("index");
})

app.get("/booking", async function(req, res){
    let groups = await Groups.find().exec();
    let skills = await Skills.find({}).exec();
    console.log(groups);

    res.render("book", {"group":groups, "skills":skills});
})

app.post("/newbooking", async function(req, res) {
    req.session.group = parseInt(req.body.groups);
    req.session.skill = parseInt(req.body.skills);
    req.session.date = req.body.datepick;

    console.log(req.session.group +" " + req.session.skill + " " + req.session.date);
    let trainers = await trainerSkills.find({"sid":req.session.skill}).exec();
    console.log(trainers);

    let count = await Consultants.find({"gid": req.session.group}).count().exec();

    let rooms = await Rooms.find({"capacity":{$gte:count}}).exec();

    var trainersid = [];
    var roomsid = [];
    for (var i = 0; i<trainers.length; i++) {
        let available = await Booking.find({"tid":trainers[i].tid,"date":req.session.date}).exec();
        console.log(available);
        if (available.length==0) {
            trainersid.push(trainers[i].tid);
            console.log(trainersid);
        }
    }

    for (var i = 0; i<rooms.length; i++) {
        let available = await Booking.find({"rid":rooms[i]._id,"date":req.session.date}).exec();
        console.log(available);
        if (available.length==0) {
            roomsid.push(rooms[i]._id);
            console.log(roomsid);
        }
    }

    trainers = await Trainers.find({"_id":{$in:trainersid}}).exec();
    rooms = await Rooms.find({"_id":{$in:roomsid}}).exec();

    res.render("book2", {"trainers":trainers, "rooms":rooms});
})

app.post("/complete", function(req,res){
    req.session.rooms = parseInt(req.body.rooms);
    req.session.trainers = parseInt(req.body.trainers);

    var booking = new Booking({
        rid:req.session.rooms,
        tid:req.session.trainers,
        gid:req.session.group,
        sid:req.session.skill,
        date:req.session.date
    });

    booking.save();
    req.session.destroy();

    res.redirect("/schedule");
})

app.get("/schedule", async function(req,res){
    let booking = await Booking.find().exec();

    let bookings = [];
    for (var i = 0; i<booking.length; i++) {
        let book = {
            trainer: (await Trainers.findOne({"_id":booking[i].tid}).exec()).name,
            room: (await Rooms.findOne({"_id": booking[i].rid}).exec()).title,
            group: (await Groups.findOne({"_id":booking[i].gid}).exec()).name,
            skill: (await Skills.findOne({"_id":booking[i].sid}).exec()).skill,
            date: booking[i].date
        }
        bookings.push(book);
        
    }

    res.render("schedule", {"booking":bookings});
})

app.get("/newroom", function(req, res){
    res.render("newroom");
})

app.post("/newroom", function(req, res){
    var room = new Rooms({
        _id:req.body.roomid,
        title:req.body.roomtitle,
        capacity:req.body.roomcap
    })

    room.save();

    res.redirect("/");
})

app.get("/newtrainer", function(req, res){
    res.render("newtrainers");
})

app.post("/newtrainer", function(req, res){
    var trainer = new Trainers({
        _id:req.body.trainid,
        name:req.body.trainname
    })

    trainer.save();

    res.redirect("/");
})

app.get("/newgroup", function(req, res){
    res.render("newgroup");
})

app.post("/newgroup", function(req, res){
    var group = new Groups({
        _id:req.body.groupid,
        name:req.body.groupname
    })

    group.save();

    res.redirect("/");
})

app.get("/newskill", function(req, res){
    res.render("newskill");
})

app.post("/newskill", function(req, res){
    var skill = new Skills({
        _id:req.body.skillid,
        skill:req.body.skillname
    })

    skill.save();

    res.redirect("/");
})

app.get("/assign", async function(req, res){
    let trainer = await Trainers.find().exec();
    let skill = await Skills.find().exec();

    res.render("assign",{"skill":skill, "trainer":trainer});
})

app.post("/assign", function(req, res){
    var tSkill = new trainerSkills({
        tid:req.body.assigntrainer,
        sid:req.body.assignskill
    })

    tSkill.save();

    res.redirect("/");
})