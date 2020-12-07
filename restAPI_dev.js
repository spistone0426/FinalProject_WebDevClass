var express = require("express");
var app = express();

const fs = require('fs');
const { parse } = require("path");
let rawdata = fs.readFileSync('./courses.json');
let course = JSON.parse(rawdata);

app.get('/api', (req,res) => {
    let outputJSON = {
        courses : course["courses"]
    }
    res.json(outputJSON);
})

app.get('/api/by_course_code/:qcode', (req,res) => {
    let query = req.params['qcode']
    filtered_courses = course["courses"].filter(q => q.course_code.includes(query))
    let outputJSON = {
        courses : filtered_courses
    }
    res.json(outputJSON);
})


app.get('/api/by_title/:qtitle', (req,res) => {
    let query = req.params['qtitle']
    filtered_courses = course["courses"].filter(q => q.title.includes(query))
    let outputJSON = {
        courses : filtered_courses
    }
    res.json(outputJSON);
})

app.get('/api/by_instructor/:qname', (req,res) => {
    let query = req.params['qname']
    filtered_courses = course["courses"].filter(q => q.instructor.includes(query))
    let outputJSON = {
        courses : filtered_courses
    }
    res.json(outputJSON);
})


app.get('/api/by_level/:qlevel', (req,res) => {
    let query = req.params['qlevel']
    filtered_courses = course["courses"].filter(q => q.course_level.includes(query))
    let outputJSON = {
        courses : filtered_courses
    }
    res.json(outputJSON);
})

app.get('/api/combined_query/:qname/:qlevel', (req,res) => {
    let name = req.params['qname']
    let level = req.params['qlevel']
    filtered_courses = course["courses"].filter(
        q => {
            if ((q.instructor.includes(name)) && (q.course_level.includes(level))){
                return true;
            }
            return false;
        }
    );
    let outputJSON = {
        courses : filtered_courses
    }
    res.json(outputJSON);
})

app.use('/demo',express.static('front_end'));

app.listen(3000, function() {
    console.log("Server is running");
})