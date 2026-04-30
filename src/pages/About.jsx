import Header from "../components/Header";
import Icon from "../components/Icon";
import { Link } from "react-router-dom";

export default function About() {
    const experience = [
        {
            role: "UI/UX Designer",
            company: "Ibdå",
            date: "May 2025 – Feb 2026",
            desc: "Spearheaded the design of thoughtful, user-centered digital experiences, moving fluidly from initial concept and wireframing to high-fidelity prototyping. Collaborated within a multidisciplinary team to translate complex user needs into intuitive interfaces that prioritize accessibility and engagement.",
            skills: "UI Design, UX Design, Wireframing, Prototyping"
        },
        {
            role: "Animation Designer",
            company: "Ibdå",
            date: "Dec 2024 – Jan 2025",
            desc: "Partnered with team members to produce high-impact video content for exhibitions at Alserkal Avenue, focusing on narrative-driven motion design. Managed the full animation pipeline, ensuring visual assets aligned with the studio's brand identity and exhibition goals.",
            skills: "Premiere Pro, After Effects, Motion Graphics"
        },
        {
            role: "Participant",
            company: "Prototypes for Humanity",
            date: "Nov 2025",
            desc: "Selected for a global program focusing on design-led solutions for social impact. Utilized Figma to prototype systems aimed at improving mental healthcare delivery, emphasizing empathy and user safety.",
            skills: "Social Impact, Systems Thinking, Rapid Prototyping"
        },
        {
            role: "Student Ambassador",
            company: "Design4Health Bootcamp (MBRU)",
            date: "Feb 2025",
            desc: "Collaborated in a cross-functional environment to develop human-centered solutions for clinical challenges. Facilitated communication between technical teams and advocated for design-thinking methodologies.",
            skills: "Healthcare Innovation, Public Speaking, Collaboration"
        }
    ];

    const toolkit = {
        design: [
            { name: "Rhino", icon: "/assets/softwares/Rhino.svg" },
            { name: "Figma", icon: "/assets/softwares/figma.svg" },
            { name: "Illustrator", icon: "/assets/softwares/AI.svg" },
            { name: "Photoshop", icon: "/assets/softwares/PS.svg" },
            { name: "InDesign", icon: "/assets/softwares/indesign11 1.svg" },
            { name: "After Effects", icon: "/assets/softwares/After Effects.svg" },
            { name: "Blender", icon: "/assets/softwares/blender6 1.svg" },
            { name: "Maya", icon: "/assets/softwares/maya.svg" },
        ],
        code: [
            { name: "React", icon: "/assets/softwares/React.svg" },
            { name: "JavaScript", icon: "/assets/softwares/JS.svg" },
            { name: "Python", icon: "/assets/softwares/numpy.svg" },
            { name: "VS Code", icon: "/assets/softwares/vs code.svg" },
            { name: "Arduino", icon: "/assets/softwares/arduino8 1.svg" },
            { name: "p5.js", icon: "/assets/softwares/P5.svg" },
        ],
        fabrication: [
            { name: "SolidWorks", icon: "/assets/softwares/soliworks.svg" },
            { name: "Fusion 360", icon: "/assets/softwares/fusion5 1.svg" },
            { name: "Grasshopper", icon: "/assets/softwares/grasshopper.svg" },
            { name: "KICAD", icon: "/assets/softwares/KICAD.svg" },
        ]
    };

    const softSkills = [
        { title: "Strategic Problem Solving", desc: "Applying design thinking to complex industrial and digital challenges." },
        { title: "Technological Synthesis", desc: "Bridging physical fabrication and digital interfaces." },
        { title: "Human-Centric Research", desc: "Deep user analysis to build products that serve real human needs." },
        { title: "Adaptive Learning", desc: "Continuously evolving my toolkit to master emerging technologies." }
    ];

    return (
        <div className="pad-wrapper">
            <main className="grid-table about-layout-new">
                {/* ROW 1 */}
                <Header minimal={true} />

                {/* LEFT COLUMN: IMAGE (Fixed) */}
                <div className="cell span-3 about-image-cell no-pad">
                    <div className="about-image-wrapper">
                        <img src="/assets/yashvi.jpg" alt="Yashvi Patel" className="about-portrait" onError={(e) => e.target.style.display = 'none'} />
                        <div className="about-image-overlay">
                            <span className="about-name-vertical">Yashvi Patel</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: SCROLLABLE CONTENT */}
                <div className="cell span-5 about-content-cell no-pad">
                    <div className="about-scroll-container custom-scrollbar">

                        {/* SECTION 1: INTRO */}
                        <section className="about-section intro-section">
                            <span className="section-tag">INTRODUCTION</span>
                            <h2 className="about-main-title">Bridging <span className="text-blue">Physical Form</span> & <br /><span className="text-blue">Digital Logic</span>.</h2>
                            <p className="about-bio-text">
                                I am a multidisciplinary designer at the Dubai Institute of Design and Innovation (DIDI),
                                focusing on the intersection of systems, emotions, and technology.
                                My practice explores how complex industrial processes can be translated into intuitive human experiences.
                            </p>
                        </section>

                        {/* SECTION 2: EXPERIENCE */}
                        <section className="about-section">
                            <span className="section-tag">EXPERIENCE</span>
                            <div className="experience-timeline">
                                {experience.map((exp, i) => (
                                    <div key={i} className="timeline-item">
                                        <div className="timeline-header">
                                            <h4 className="timeline-role">{exp.role} <span className="text-grey-sep">|</span> {exp.company}</h4>
                                            <span className="timeline-date">{exp.date}</span>
                                        </div>
                                        <p className="timeline-desc">{exp.desc}</p>
                                        <div className="timeline-skills">
                                            <span className="skills-lbl">Key Skills:</span> {exp.skills}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* SECTION 3: SKILLS (TOOLKIT) */}
                        <section className="about-section">
                            <span className="section-tag">TECHNICAL TOOLKIT</span>
                            <div className="toolkit-grid-new">
                                <div className="tool-category">
                                    <span className="cat-label">Design</span>
                                    <div className="tool-icons-flex">
                                        {toolkit.design.map((t, i) => (
                                            <div key={i} className="tool-icon-box" title={t.name}><img src={t.icon} alt={t.name} /></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="tool-category">
                                    <span className="cat-label">Creative Coding</span>
                                    <div className="tool-icons-flex">
                                        {toolkit.code.map((t, i) => (
                                            <div key={i} className="tool-icon-box" title={t.name}><img src={t.icon} alt={t.name} /></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="tool-category">
                                    <span className="cat-label">Fabrication</span>
                                    <div className="tool-icons-flex">
                                        {toolkit.fabrication.map((t, i) => (
                                            <div key={i} className="tool-icon-box" title={t.name}><img src={t.icon} alt={t.name} /></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 4: SOFT SKILLS */}
                        <section className="about-section">
                            <span className="section-tag">SOFT SKILLS</span>
                            <div className="soft-skills-grid-new">
                                {softSkills.map((skill, i) => (
                                    <div key={i} className="soft-skill-item">
                                        <h4 className="skill-title-new">{skill.title}</h4>
                                        <p className="skill-desc-new">{skill.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>

                {/* ROW 5: FOOTER (Desktop only) */}
                <div className="cell span-2 footer footer-about no-pad">
                    <div className="socials-grid-about">
                        <a href="https://www.linkedin.com/in/yashvi-patel-512a33253/" target="_blank" rel="noopener noreferrer" className="social-cell-about icon-trigger" style={{ textDecoration: 'none' }}>
                            <Icon name="linkedin" hoverable={true} />
                        </a>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=patelyashvi754@gmail.com" target="_blank" rel="noopener noreferrer" className="social-cell-about icon-trigger" style={{ textDecoration: 'none' }}>
                            <Icon name="mail" hoverable={true} />
                        </a>
                    </div>
                </div>
                <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="cell span-2 footer footer-about footer-resume-about icon-trigger" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Icon name="resume" hoverable={true} />
                    <span className="resume-text-about">Resume</span>
                </a>
                <div className="cell span-3 footer footer-about no-pad">
                    <div className="back-gallery-container">
                        <Link to="/" className="back-link-pill icon-trigger">
                            <Icon name="arrow-left" hoverable={true} />
                            <span>Back to Gallery</span>
                        </Link>
                    </div>
                </div>
                <div className="cell span-1 footer footer-about header-empty"></div>
            </main>

            {/* MOBILE STICKY FOOTER */}
            <div className="mobile-footer">
                <div className="mobile-footer-left">
                    <a href="https://www.linkedin.com/in/yashvi-patel-512a33253/" target="_blank" rel="noopener noreferrer" className="mobile-footer-cell">
                        <Icon name="linkedin" />
                    </a>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=patelyashvi754@gmail.com" target="_blank" rel="noopener noreferrer" className="mobile-footer-cell">
                        <Icon name="mail" />
                    </a>
                    <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="mobile-footer-cell mobile-footer-resume">
                        <Icon name="resume" />
                        <span>Resume</span>
                    </a>
                </div>
                <div className="mobile-footer-pages">
                    <Link to="/" className="mobile-back-link">
                        <Icon name="arrow-left" />
                        <span>Gallery</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
