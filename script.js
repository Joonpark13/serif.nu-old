const elasticlunr = require('elasticlunr');

const dataPath = './app/data/';

const prepared = [];

const req = {
    params: {
        term: '4660'
    }
};

const schoolsData = require(`${dataPath}${req.params.term}/schools.json`);
schoolsData.forEach((school) => {
    const subjectsData = require(`${dataPath}${req.params.term}/${school.id}/subjects.json`);
    subjectsData.forEach((subject) => {
        const coursesData = require(`${dataPath}${req.params.term}/${school.id}/${subject.abbv}/courses.json`);
        coursesData.forEach((course) => {
            const sectionsData = require(`${dataPath}${req.params.term}/${school.id}/${subject.abbv}/${course.abbv}/sections.json`);
            sectionsData.forEach((section) => {
                const searchObj = section;
                // For sections with a non empty topic field (such as EECS 395, THEATRE 330 or other special courses),
                // It's better to title it using the topic field instead of the name field.
                let title = `${section.subject} ${section.course}`;
                if (section.topic) title = `${title} ${section.topic}`;
                else title = `${title} ${section.name}`;
                searchObj.title = title;
                prepared.push(searchObj);
            });
        });
    });
});

const index = elasticlunr(function () {
    this.addField('title');
    this.addField('instructor');
    // this.addField('overview_of_class');
    // this.addField('descriptions');
    this.setRef('id');
});

prepared.forEach((doc) => {
    index.addDoc(doc);
});

const results = index.search('electricity magne', {
    fields: {
        title: { boost: 5 },
        instructor: { boost: 3 },
        // overview_of_class: { boost: 1 },
        // descriptions: { boost: 1 }
    }
});
results.slice(0, 10).forEach((result) => {
    console.log(prepared.find((obj) => obj.id === result.ref).title);
});
