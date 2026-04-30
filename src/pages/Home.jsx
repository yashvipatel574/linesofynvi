import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { galleryData } from "../data";
import Header from "../components/Header";
import Icon from "../components/Icon";

export default function Home() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 950);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const itemsPerPage = isMobile ? 9999 : 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortValue, setSortValue] = useState("custom");
    const [filterValues, setFilterValues] = useState(["All"]);
    const [searchTerm, setSearchTerm] = useState("");

    const getCategories = (project) => {
        // Use manual categories if they exist in data.js
        if (project.categories && project.categories.length > 0) {
            return project.categories;
        }

        const p = project.project.toLowerCase();
        const t = project.title.toLowerCase();
        const tags = (project.details?.tags || []).map(tag => tag.toLowerCase());
        const cats = [];

        // Disciplines
        if (p.includes("engineering") || p.includes("robotic") || p.includes("camera") || p.includes("fixture") || p.includes("cellular")) cats.push("Industrial Product Design");
        if (p.includes("film") || p.includes("mixed media") || p.includes("posters")) cats.push("Multimedia Design");
        if (p.includes("ui/ux") || p.includes("interactive") || p.includes("wellbeing")) cats.push("UI/UX Design");
        if (p.includes("logo") || p.includes("branding")) cats.push("Branding");
        if (p.includes("animation")) cats.push("Animation");
        
        // Themes (Pills)
        if (tags.some(tag => tag.includes("system")) || t.includes("system") || p.includes("system")) cats.push("Systems");
        if (tags.some(tag => tag.includes("fab")) || t.includes("fab") || p.includes("fab")) cats.push("Fabrications");
        if (tags.some(tag => tag.includes("emotion")) || t.includes("emotion") || p.includes("emotion")) cats.push("Emotions");
        if (tags.some(tag => tag.includes("narrative")) || t.includes("narrative") || p.includes("narrative")) cats.push("Narratives");
        if (tags.some(tag => tag.includes("collective")) || t.includes("collective") || p.includes("collective")) cats.push("Collectives");

        if (cats.length === 0) cats.push("Graphic Design");
        return cats;
    };

    const toggleThemeFilter = (theme) => {
        setFilterValues(prev => {
            if (prev.includes(theme)) {
                const next = prev.filter(f => f !== theme);
                return next.length === 0 ? ["All"] : next;
            } else {
                const next = prev.filter(f => f !== "All");
                return [...next, theme];
            }
        });
    };

    // Reset to first page when searching
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterValues]);

    const processedData = useMemo(() => {
        let data = [...galleryData];

        // Search filter
        if (searchTerm) {
            const query = searchTerm.toLowerCase();
            data = data.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.project.toLowerCase().includes(query) ||
                item.date.toLowerCase().includes(query) ||
                (item.details?.tags || []).some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Category filter
        if (!filterValues.includes("All") && filterValues.length > 0) {
            data = data.filter(item => {
                const itemCats = getCategories(item);
                return filterValues.some(f => itemCats.includes(f));
            });
        }

        if (sortValue === "a to z") {
            data.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortValue === "z to a") {
            data.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortValue === "newest first" || sortValue === "oldest first") {
            const getYear = (dateStr) => {
                const match = dateStr.match(/\b(20\d{2})\b/);
                return match ? parseInt(match[0]) : 0;
            };
            data.sort((a, b) => {
                const diff = getYear(b.date) - getYear(a.date);
                return sortValue === "newest first" ? diff : -diff;
            });
        }

        return data;
    }, [sortValue, filterValues, searchTerm]);

    const totalPages = Math.max(1, Math.ceil(processedData.length / itemsPerPage));

    // Ensure currentPage is valid when data shrinks
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = processedData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="pad-wrapper">
            <main className="grid-table">
                <Header
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                    filterValues={filterValues}
                    setFilterValues={setFilterValues}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {/* MOBILE BIO BLOCK */}
                <div className="mobile-bio-block">
                    Yashvi Patel | Bengaluru / Dubai | Product & Multimedia Design Student @ DIDI | Multidisciplinary Designer
                </div>

                {/* ROW 2 : HERO */}
                <div className="cell span-2 hero hero-info">
                    <div className="info-block"><span className="info-val">Yashvi Patel</span></div>
                    <div className="info-block"><span className="info-val">Bengaluru, India.<br />Dubai, UAE.</span></div>
                    <div className="info-block"><span className="info-val">Product & Multimedia Design Student @ Dubai Institute of Design and Innovation</span></div>
                    <div className="info-block"><span className="info-val">Multidisciplinary Designer</span></div>
                </div>
                <div className="cell span-4 hero hero-text">
                    <h1>Designing products that<br />translate systems,<br />emotions and<br />technologies into<br />experiences.</h1>
                </div>
                <div className="cell span-2 hero hero-pills no-pad">
                    <div className="pills-grid">
                        <div className={`pill-cell icon-trigger ${filterValues.includes("Systems") ? "selected" : ""}`} onClick={() => toggleThemeFilter("Systems")}>
                            <Icon name="check" active={filterValues.includes("Systems")} />
                            <span>Systems</span>
                        </div>
                        <div className={`pill-cell icon-trigger ${filterValues.includes("Fabrications") ? "selected" : ""}`} onClick={() => toggleThemeFilter("Fabrications")}>
                            <Icon name="check" active={filterValues.includes("Fabrications")} />
                            <span>Fabrications</span>
                        </div>
                        <div className={`pill-cell icon-trigger ${filterValues.includes("Emotions") ? "selected" : ""}`} onClick={() => toggleThemeFilter("Emotions")}>
                            <Icon name="check" active={filterValues.includes("Emotions")} />
                            <span>Emotions</span>
                        </div>
                        <div className={`pill-cell icon-trigger ${filterValues.includes("Narratives") ? "selected" : ""}`} onClick={() => toggleThemeFilter("Narratives")}>
                            <Icon name="check" active={filterValues.includes("Narratives")} />
                            <span>Narratives</span>
                        </div>
                        <div className={`pill-cell icon-trigger ${filterValues.includes("Collectives") ? "selected" : ""}`} onClick={() => toggleThemeFilter("Collectives")}>
                            <Icon name="check" active={filterValues.includes("Collectives")} />
                            <span>Collectives</span>
                        </div>
                        <Link to="/about" className="pill-cell icon-trigger" style={{ textDecoration: 'none' }}>
                            <Icon name="about" hoverable={true} />
                            <span>About ynvi</span>
                        </Link>
                    </div>
                </div>

                {/* ROW 3 : BANNER */}
                <div className="cell span-8 banner">
                    <span>An evolving archive of questions, processes and outcomes.</span>
                </div>

                {/* ROW 4 : GALLERY */}
                {pageItems.length > 0 ? (
                    pageItems.map((item) => (
                        <Link to={`/project/${item.id}`} key={item.id} style={{ textDecoration: 'none', '--theme-color': item.themeColor }} className="cell span-2 gallery-item no-pad">
                            <div className="gallery-img-container" style={{ position: 'relative', flex: 1, display: 'flex' }}>
                                <div className={item.imgClass} style={{ ...item.imgStyle, flex: 1 }}></div>
                                <div className="gallery-hover-overlay">
                                    <span className="gallery-tooltip">Click to view project</span>
                                </div>
                            </div>
                            {/* Desktop info panel */}
                            <div className="gallery-info" style={{ background: `linear-gradient(to bottom, var(--primary-background), color-mix(in srgb, var(--theme-color) 30%, var(--primary-background)))` }}>
                                <h3 className="g-title">{item.title}</h3>
                                <div className="g-meta-block">
                                    <div className="g-row"><span className="g-lbl">Date</span><span className="g-val v-white">{item.date}</span></div>
                                    <div className="g-row"><span className="g-lbl">Project</span><span className="g-val" style={{ color: 'var(--theme-color)' }}>{item.project}</span></div>
                                </div>
                            </div>
                            {/* Mobile info bar — shown below image */}
                            <div className="gallery-info-mobile">
                                <h3 className="g-title-mobile">{item.title}</h3>
                                <div className="g-meta-mobile">
                                    <span className="g-date-mobile">{item.date}</span>
                                    <span className="g-project-mobile">{item.project}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="cell span-8" style={{ padding: '80px', textAlign: 'center', color: 'var(--secondary-text)', fontSize: '18px' }}>
                        No projects found matching your search.
                    </div>
                )}

                {/* Fill empty spots if less than 4 items */}
                {Array.from({ length: 4 - pageItems.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="cell span-2 gallery-item no-pad" style={{ visibility: 'hidden' }}></div>
                ))}

                {/* ROW 5 : FOOTER */}
                <div className="cell span-2 footer footer-socials no-pad">
                    <div className="socials-grid">
                        <a href="https://www.linkedin.com/in/yashvi-patel-512a33253/" target="_blank" rel="noopener noreferrer" className="social-cell icon-trigger" style={{ textDecoration: 'none' }}>
                            <Icon name="linkedin" hoverable={true} />
                        </a>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=patelyashvi754@gmail.com" target="_blank" rel="noopener noreferrer" className="social-cell icon-trigger" style={{ textDecoration: 'none' }}>
                            <Icon name="mail" hoverable={true} />
                        </a>
                    </div>
                </div>
                <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="cell span-2 footer footer-resume align-left icon-trigger" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Icon name="resume" hoverable={true} /><span className="resume-text">Resume</span>
                </a>
                <div className="cell span-4 footer footer-pagination no-pad">
                    <div className="pagination-grid">
                        <div className="page-cell numbers-cell">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`page-num ${currentPage === i + 1 ? 'active-num' : 'hover-num'}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </span>
                            ))}
                        </div>
                        <div className="page-cell center-content icon-trigger">
                            <Icon
                                name="arrow-left"
                                hoverable={currentPage !== 1}
                                style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            />
                            <Icon
                                name="arrow-right"
                                hoverable={currentPage !== totalPages}
                                style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            />
                        </div>
                    </div>
                </div>
                <div className="mobile-pagination">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <span
                            key={i}
                            className={currentPage === i + 1 ? 'active' : ''}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </span>
                    ))}
                </div>
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
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <span
                            key={i}
                            className={currentPage === i + 1 ? 'active' : ''}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
