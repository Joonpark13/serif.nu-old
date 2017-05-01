import express from 'express';
import path from 'path';

const app = express();

app.use(express.static('dist'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

const dataPath = '../app/data/';
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

app.get('/data/terms', (req, res) => {
    const result = require(`${dataPath}terms.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.get('/data/:term/search', (req, res) => {
    const prepared = [];

    const schoolsData = require(`${dataPath}${req.params.term}/schools.json`);
    schoolsData.forEach((school) => {
        const subjectsData = require(`${dataPath}${req.params.term}/${school.id}/subjects.json`);
        subjectsData.forEach((subject) => {
            const coursesData = require(`${dataPath}${req.params.term}/${school.id}/${subject.abbv}/courses.json`);
            coursesData.forEach((course) => {
                const sectionsData = require(`${dataPath}${req.params.term}/${school.id}/${subject.abbv}/${course.abbv}/sections.json`);
                sectionsData.forEach((section) => {
                    // For sections with a non empty topic field (such as EECS 395, THEATRE 330 or other special courses),
                    // It's better to title it using the topic field instead of the name field.
                    let title = `${section.subject} ${section.course}`;
                    if (section.topic) title = `${title} ${section.topic}`;
                    else title = `${title} ${section.name}`;
                    const searchObj = {
                        title,
                        id: section.id,
                        class_mtg_info: section.class_mtg_info,
                        overview_of_class: section.overview_of_class,
                        instructors: section.instructor,
                        descriptions: section.descriptions,
                        school: course.school,
                        subject: course.subject,
                        course: course.abbv,
                        name: section.name,
                        topic: section.topic
                    };
                    prepared.push(searchObj);
                });
            });
        });
    });

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(prepared));
});

app.get('/data/:term/schools', (req, res) => {
    const result = require(`${dataPath}${req.params.term}/schools.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.get('/data/:term/subjects/:school', (req, res) => {
    const result = require(`${dataPath}${req.params.term}/${req.params.school}/subjects.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.get('/data/:term/courses/:school/:subject', (req, res) => {
    const result = require(`${dataPath}${req.params.term}/${req.params.school}/${req.params.subject}/courses.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.get('/data/:term/sections/:school/:subject/:course', (req, res) => {
    const result = require(`${dataPath}${req.params.term}/${req.params.school}/${req.params.subject}/${req.params.course}/sections.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});
