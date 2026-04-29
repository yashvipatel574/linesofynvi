const fs = require('fs');

const data = [
    { title: "Hybrid Manufacturing", date: "Sep - Oct 2025", project: "Research", bgClass: "bg-brown-1", tagClass: "v-orange-1" },
    { title: "Noor Al Bahar", date: "Feb - March 2025", project: "Light Fixture", bgClass: "bg-brown-2", tagClass: "v-orange-2" },
    { title: "Cascader", date: "Sep - Dec 2024", project: "Cellular Structures", bgClass: "bg-purple", tagClass: "v-fuchsia" },
    { title: "Ibda", date: "May 2025 - Feb 2026", project: "UI/UX Intern", bgClass: "bg-blue", tagClass: "v-blue" },
    { title: "BlackBird", date: "Oct - Dec 2025", project: "Fashion Film", bgClass: "bg-brown-1", tagClass: "v-orange-1" },
    { title: "Everyday ft.DIDI", date: "Jan - May 2025", project: "Mixed Media Animation", bgClass: "bg-brown-2", tagClass: "v-orange-2" },
    { title: "DIDI Concept Library", date: "Sep - Oct 2024", project: "Interactive Archive Platform", bgClass: "bg-purple", tagClass: "v-fuchsia" },
    { title: "Turabh", date: "Oct - Dec 2024", project: "Interactive Awareness Platform", bgClass: "bg-blue", tagClass: "v-blue" },
    { title: "Heuristics", date: "Nov 2023 - Jan 2024", project: "Rule Based Design", bgClass: "bg-brown-1", tagClass: "v-orange-1" },
    { title: "Logo Collection 1", date: "2022 - Current", project: "Logo Design", bgClass: "bg-brown-2", tagClass: "v-orange-2" },
    { title: "Collage Collection 1", date: "Jun - Aug 2023", project: "Conceptual Mixed Media", bgClass: "bg-purple", tagClass: "v-fuchsia" },
    { title: "Poster Collection 1", date: "Jun - Aug 2023", project: "Experimental Posters", bgClass: "bg-blue", tagClass: "v-blue" }
];

let template = fs.readFileSync('project-circl.html', 'utf8');

data.forEach(item => {
    let filename = 'project-' + item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') + '.html';

    // Replace title
    let content = template.replace(/<title>.*?<\/title>/, `<title>linesofynvi - ${item.title} Project</title>`);

    // Replace h2
    content = content.replace(/<h2>circl\.<\/h2>/, `<h2>${item.title}</h2>`);

    // Replace Date
    content = content.replace(/<span class="g-val v-white">.*?<\/span>/, `<span class="g-val v-white">${item.date}</span>`);

    // Replace Project tag row
    content = content.replace(/<div class="g-row"><span class="g-lbl">Tag<\/span><span class="g-val v-blue">.*?<\/span><\/div>/, `<div class="g-row"><span class="g-lbl">Project</span><span class="g-val ${item.tagClass}">${item.project}</span></div>`);

    // Replace bg-blue classes with the current bgClass
    content = content.replace(/bg-blue/g, item.bgClass);

    fs.writeFileSync(filename, content);
    console.log(`Created ${filename}`);
});
