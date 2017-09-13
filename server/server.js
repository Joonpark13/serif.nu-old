import express from 'express';
import path from 'path';

const app = express();

app.use(express.static('dist'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

const dataPath = '../app/data';
const getPaths = ['/', '/about', '/faq', '/bug', '/contact', '/tos', '/regal', '/acknowledgements'];
const faviconPaths = [
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
    '/manifest.json',
    '/safari-pinned-tab.svg'
];

app.get(getPaths, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'app', 'index.html'));
});

app.get(faviconPaths, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'app', 'favicons', req.path));
});

// Load terms data
const termsData = require(`${dataPath}/terms.json`);

// Set current term as most recent term (term with highest ID)
let maxTermId = 0;
termsData.forEach(term => {
    if (parseInt(term.id, 10) > maxTermId) maxTermId = parseInt(term.id, 10);
});
let currentTerm = termsData.find(term => parseInt(term.id, 10) === maxTermId).id;

// Placeholders for data corresponding to current term
let schoolsData;
let subjectsData;
let coursesData;
let sectionsData;

const loadDataForTerm = (termId) => {
    schoolsData = require(`${dataPath}/${termId}/schools.json`);
    subjectsData = require(`${dataPath}/${termId}/subjects.json`);
    coursesData = require(`${dataPath}/${termId}/courses.json`);
    sectionsData = require(`${dataPath}/${termId}/sections.json`);
    currentTerm = termId;
};

// Load data for most recent term
loadDataForTerm(currentTerm);

app.get('/data/terms', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(termsData));
});

app.get('/data/:term/schools', (req, res) => {
    if (req.params.term !== currentTerm) {
        loadDataForTerm(req.params.term);
    }

    const matching = schoolsData.filter(school => school.term === req.params.term);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(matching));
});

app.get('/data/:term/subjects/:school', (req, res) => {
    if (req.params.term !== currentTerm) {
        loadDataForTerm(req.params.term);
    }

    const matching = subjectsData.filter(subject => (
        subject.term === req.params.term && subject.school === req.params.school
    ));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(matching));
});

app.get('/data/:term/courses/:school/:subject', (req, res) => {
    if (parseInt(req.params.term, 10) !== currentTerm) {
        loadDataForTerm(req.params.term);
    }

    const matching = coursesData.filter(course => (
        course.term === req.params.term
        && course.school === req.params.school
        && course.subject === req.params.subject
    ));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(matching));
});

app.get('/data/:term/sections/:school/:subject/:course', (req, res) => {
    if (parseInt(req.params.term, 10) !== currentTerm) {
        loadDataForTerm(req.params.term);
    }

    const matching = sectionsData.filter(section => (
        section.term === req.params.term
        && section.school === req.params.school
        && section.subject === req.params.subject
        && section.course === req.params.course
    ));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(matching));
});

app.get('/data/:term/search', (req, res) => {
    if (parseInt(req.params.term, 10) !== currentTerm) {
        loadDataForTerm(req.params.term);
    }

    const prepared = [];

    sectionsData.forEach((section) => {
        const searchObj = section;
        // For sections with a non empty topic field (such as EECS 395, THEATRE 330 or other special
        // courses), It's better to title it using the topic field instead of the name field.
        let title = `${section.subject} ${section.course}`;
        if (section.topic) title = `${title} ${section.topic}`;
        else title = `${title} ${section.name}`;
        searchObj.title = title;

        prepared.push(searchObj);
    });

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(prepared));
});
