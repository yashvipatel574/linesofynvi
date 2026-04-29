const fs = require('fs');

let content = fs.readFileSync('src/data.js', 'utf8');

const detailsTemplate = `details: {
        tags: ["Your Tag 1", "Your Tag 2"],
        softwares: ["/assets/softwares/AI.svg", "/assets/softwares/PS.svg"],
        course: "Course Name",
        mentor: "Mentor Name",
        peers: ["Peer 1", "Peer 2"],
        achievements: ["Achievement 1"],
        similarProjects: ["Project 1", "Project 2"],
        tabs: [
            {
                id: "brief",
                label: "Project Brief",
                content: [
                    { type: "subtext", text: "Project Brief" },
                    { type: "paragraph", text: "Project description goes here..." }
                ]
            },
            {
                id: "research",
                label: "Research",
                content: [
                    { type: "subtitle", text: "Research Phase" },
                    { type: "paragraph", text: "Research details go here..." }
                ]
            },
            {
                id: "analysis",
                label: "Analysis",
                content: [
                    { type: "subtitle", text: "Analysis Phase" },
                    { type: "paragraph", text: "Analysis details go here..." }
                ]
            },
            {
                id: "concept",
                label: "Concept",
                content: [
                    { type: "subtitle", text: "Concept Phase" },
                    { type: "image", url: "/assets/image.png", alt: "Concept Image" },
                    { type: "paragraph", text: "Concept details go here..." }
                ]
            },
            {
                id: "development",
                label: "Development",
                content: [
                    { type: "paragraph", text: "Development details go here..." }
                ]
            }
        ]
    }`;

content = content.replace(/(themeColor:\s*['"].*?['"])/g, '$1,\n        ' + detailsTemplate);

fs.writeFileSync('src/data.js', content);
