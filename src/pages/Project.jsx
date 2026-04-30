import { useState, useEffect, useRef } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { galleryData } from "../data";
import Icon from "../components/Icon";

const VideoBlock = ({ block }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const url = block.url;
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be') || url.includes('embed');

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    if (isYouTube) {
        return (
            <div className="project-video-wrapper project-youtube-wrapper">
                <iframe
                    className="project-video-iframe"
                    src={url}
                    title={block.alt || "Project video"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        );
    }

    return (
        <div
            className="project-video-wrapper project-local-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={url}
                className="project-local-video"
                onEnded={() => setIsPlaying(false)}
                playsInline
            />
            {/* Play/Pause Overlay */}
            <div className={`project-video-overlay ${(!isPlaying || isHovered) ? 'visible' : ''}`}>
                {isPlaying ? (
                    <div className="project-pause-icon">
                        <div className="pause-bar"></div>
                        <div className="pause-bar"></div>
                    </div>
                ) : (
                    <div className="project-play-icon"></div>
                )}
            </div>
        </div>
    );
};

const CarouselBlock = ({ block }) => {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const onScroll = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            const index = Math.round(scrollRef.current.scrollLeft / width);
            setCurrentIndex(index);
        }
    };

    const scrollToIndex = (index) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: index * scrollRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="project-carousel-wrapper">
            <div
                ref={scrollRef}
                onScroll={onScroll}
                className="project-carousel"
            >
                {block.carousel.map((item, idx) => (
                    <div key={idx} className="project-carousel-item">
                        <img
                            src={item.url}
                            alt={item.alt || "Carousel image"}
                            className="project-carousel-image"
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            {block.carousel.length > 1 && (
                <>
                    <button
                        onClick={() => scrollToIndex(currentIndex - 1)}
                        className={`carousel-btn prev icon-trigger ${currentIndex === 0 ? 'disabled' : ''}`}
                    >
                        <Icon name="arrow-left" hoverable={true} />
                    </button>
                    <button
                        onClick={() => scrollToIndex(currentIndex + 1)}
                        className={`carousel-btn next icon-trigger ${currentIndex === block.carousel.length - 1 ? 'disabled' : ''}`}
                    >
                        <Icon name="arrow-right" hoverable={true} />
                    </button>

                    {/* Dots */}
                    <div className="carousel-dots-container">
                        {block.carousel.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => scrollToIndex(idx)}
                                className={`carousel-dot ${currentIndex === idx ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default function Project() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 950);

    const currentIndex = galleryData.findIndex(item => item.id === id);
    const project = galleryData[currentIndex];

    // Initialize data gracefully
    const details = project?.details || {};
    const tabs = details.tabs || [];
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
    const scrollContainerRef = useRef(null);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const containerTop = container.getBoundingClientRect().top;

        let currentActive = activeTab;
        for (const tab of tabs) {
            const el = document.getElementById(`section-${tab.id}`);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= containerTop + 150 && rect.bottom > containerTop + 150) {
                    currentActive = tab.id;
                    break;
                }
            }
        }

        if (currentActive !== activeTab) {
            setActiveTab(currentActive);
        }
    };

    const handleTabClick = (id) => {
        const el = document.getElementById(`section-${id}`);
        if (el && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollTo({
                top: el.offsetTop - container.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (tabs.length > 0) {
            setActiveTab(tabs[0].id);
        }
        // Reset scroll when navigating to a new project
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo(0, 0);
        }
    }, [id, tabs]);

    if (!project) return <Navigate to="/" />;

    const prevProject = currentIndex > 0 ? galleryData[currentIndex - 1] : null;
    const nextProject = currentIndex < galleryData.length - 1 ? galleryData[currentIndex + 1] : null;

    const themeColor = project.themeColor;
    const rightPanelColor = project.rightPanelColor || project.rightPanel || themeColor;
    const tagColor = project.tagColor || themeColor;
    const highlightColor = project.highlightColor || themeColor;

    return (
        <div className="pad-wrapper" style={{
            '--theme-color': themeColor,
            '--right-panel-color': rightPanelColor,
            '--tag-color': tagColor,
            '--highlight-color': highlightColor,
            '--primary-border': 'var(--blue-50)',
            '--project-border-color': project.projectborderColor
        }}>
            <main className={`grid-table grid-table-project ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                {/* Top extensions */}
                <div className="ext-line top-ext"></div>
                <div className="ext-line bottom-ext"></div>
                <div className="ext-line left-ext"></div>
                <div className="ext-line right-ext"></div>

                {/* ROW 1: Title */}
                <div className="cell project-title-cell">
                    <span className="logo-text project-title">{project.title}</span>
                </div>

                {/* ROW 2: Back Arrow */}
                <div className="cell project-back-cell">
                    <Link to="/" className="icon-trigger project-back-link">
                        <Icon name="arrow-left" hoverable={true} />
                    </Link>
                </div>

                {/* ROW 3: Content */}
                {/* Left Sidebar */}
                {isSidebarOpen && (
                    <div className="cell project-sidebar no-pad custom-scrollbar">
                        <div
                            onClick={() => setIsSidebarOpen(false)}
                            className="sidebar-toggle-btn"
                            title="Collapse Sidebar"
                        >
                            <Icon name="sidebar" active={isSidebarOpen} />
                        </div>

                        <div style={{ padding: '32px', width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div className="p-row">
                                <span className="p-lbl">Date</span>
                                <span className="p-val v-white">{project.date}</span>
                            </div>
                            <div className="p-row">
                                <span className="p-lbl">Tags</span>
                                <div className="p-tags">
                                    <span className="p-tag" style={{ color: 'var(--secondary-text)', backgroundColor: 'var(--tag-color)' }}>{project.project}</span>
                                    {details.tags?.map((tag, i) => (
                                        <span key={i} className="p-tag" style={{ color: 'var(--tag-color)', backgroundColor: 'color-mix(in srgb, var(--tag-color) 20%, var(--primary-background))' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-row">
                                <span className="p-lbl">Softwares</span>
                                <div className="p-softwares" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: '8px' }}>
                                    {details.softwares?.map((sw, i) => (
                                        <img key={i} src={sw} alt="sw" style={{ width: 40, height: 40, objectFit: 'contain' }} />
                                    ))}
                                    {(!details.softwares || details.softwares.length === 0) && (
                                        <>
                                            <div style={{ width: 40, height: 40 }}></div>
                                            <div style={{ width: 40, height: 40 }}></div>
                                        </>
                                    )}
                                </div>
                            </div>
                            {details.course && (
                                <div className="p-row">
                                    <span className="p-lbl">Course</span>
                                    <span className="p-val v-white">{details.course}</span>
                                </div>
                            )}
                            {details.mentor && (
                                <div className="p-row">
                                    <span className="p-lbl">Mentor</span>
                                    <span className="p-val v-white">{details.mentor}</span>
                                </div>
                            )}
                            {details.achievements && (
                                <div className="p-row">
                                    <span className="p-lbl">Achievements</span>
                                    <span className="p-val v-white">{details.achievements}</span>
                                </div>
                            )}
                            {details.peers && details.peers.length > 0 && (
                                <div className="p-row">
                                    <span className="p-lbl">Peers</span>
                                    {details.peers.map((peer, i) => (
                                        <span key={i} className="p-val v-white" style={{ display: 'block' }}>{peer}</span>
                                    ))}
                                </div>
                            )}
                            {details.similarProjects && details.similarProjects.length > 0 && (
                                <div className="p-row">
                                    <span className="p-lbl">Similar Projects</span>
                                    {details.similarProjects.map((sp, i) => (
                                        <span key={i} className="p-val v-white" style={{ display: 'block' }}>{sp}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Text Content */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="cell project-main-content custom-scrollbar"
                >
                    {!isSidebarOpen && (
                        <div
                            onClick={() => setIsSidebarOpen(true)}
                            className="sidebar-toggle-btn-expand"
                            title="Expand Sidebar"
                        >
                            <Icon name="sidebar" active={isSidebarOpen} />
                        </div>
                    )}
                    <div className={`project-content-inner project-${project.id} layout-${project.layout || 'default'}`} style={{ width: '100%', paddingLeft: !isSidebarOpen ? '48px' : '0' }}>
                        {tabs.map((tab) => (
                            <div key={tab.id} id={`section-${tab.id}`} style={{ marginBottom: '64px', minHeight: '100px' }}>
                                {tab.content?.map((block, i) => {
                                    if (block.type === 'subtext') {
                                        return <span key={i} className="project-subtext">{block.text}</span>;
                                    }
                                    if (block.type === 'paragraph') {
                                        return <p key={i} className="project-paragraph">{block.text}</p>;
                                    }
                                    if (block.type === 'subtitle') {
                                        return <h3 key={i} className="project-subtitle">{block.text}</h3>;
                                    }
                                    if (block.type === 'image') {
                                        return <img key={i} src={block.url} alt={block.alt || "Project media"} className="project-image" />;
                                    }
                                    if (block.type === 'video') {
                                        return <VideoBlock key={i} block={block} />;
                                    }
                                    if (block.type === 'link') {
                                        return (
                                            <div key={i} className="project-link-wrapper">
                                                <div className="project-link-container">
                                                    <iframe
                                                        src={block.url}
                                                        className="project-iframe-full"
                                                        title={block.text || "Embedded Content"}
                                                    ></iframe>
                                                </div>
                                                <div className="project-link-footer">
                                                    <span className="project-link-text">
                                                        {block.text || "Interactive Archive"}
                                                    </span>
                                                    <a href={block.url} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                                                        Visit Website
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                            <polyline points="15 3 21 3 21 9"></polyline>
                                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    }
                                    if (block.type === 'poster-grid') {
                                        return (
                                            <div key={i} className="project-poster-grid">
                                                {block.posters?.map((poster, pIdx) => (
                                                    <div key={pIdx} className="poster-card">
                                                        <img src={poster.url} alt={poster.title} />
                                                        <div className="poster-overlay">
                                                            <h4>{poster.title}</h4>
                                                            <p>{poster.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    }
                                    if (block.type === 'image-grid') {
                                        return (
                                            <div key={i} className="project-image-grid">
                                                {block.image?.map((image, pIdx) => (
                                                    <div key={pIdx} className="image-card">
                                                        <img src={image.url} alt={image.title} />
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    }
                                    if (block.type === 'heuristics-research-grid') {
                                        return (
                                            <div key={i} className="project-heuristics-research">
                                                {block.heuristics?.map((heuristic, pIdx) => (
                                                    <div key={pIdx} className="heuristic-card">
                                                        <img src={heuristic.url} alt={heuristic.title} />
                                                        <div className="heuristic-overlay">
                                                            <h4>{heuristic.title}</h4>
                                                            <p>{heuristic.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }
                                    if (block.type === 'heuristics-concept-grid') {
                                        return (
                                            <div key={i} className="project-heuristics-concept">
                                                {block.heuristics?.map((heuristic, pIdx) => (
                                                    <div key={pIdx} className="heuristic-card">
                                                        <img src={heuristic.url} alt={heuristic.title} />
                                                        <div className="heuristic-overlay">
                                                            <h4>{heuristic.title}</h4>
                                                            <p>{heuristic.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }
                                    if (block.type === 'html') {
                                        return (
                                            <div key={i} className="project-html-wrapper">
                                                <iframe
                                                    src={block.src}
                                                    className={`project-html-iframe ${block.src.includes('linkedin') ? 'linkedin' : ''}`}
                                                    title="Embedded Content"
                                                ></iframe>
                                            </div>
                                        );
                                    }
                                    if (block.type === 'carousel') {
                                        return <CarouselBlock key={i} block={block} />;
                                    }
                                    return null;
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tabs (Table of Contents) */}
                <div className="cell project-tabs-column no-pad custom-scrollbar">
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            style={{
                                width: '100%',
                                padding: '24px',
                                borderBottom: '1px solid var(--primary-border)',
                                background: activeTab === tab.id ? 'linear-gradient(to right, color-mix(in srgb, var(--right-panel-color) 20%, var(--primary-background)), var(--right-panel-color))' : 'transparent',
                                color: activeTab === tab.id ? 'var(--secondary-text)' : 'var(--secondary-text)',
                                fontWeight: activeTab === tab.id ? 500 : 400,
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>

                {/* ROW 4: FOOTER */}
                <div className="cell no-pad project-footer-socials" style={{ gridColumn: '1 / 2' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', width: '100%', height: '100%' }}>
                        <a href="https://www.linkedin.com/in/yashvi-patel-512a33253/" target="_blank" rel="noopener noreferrer" className="icon-trigger" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid var(--primary-border)', textDecoration: 'none' }}>
                            <Icon name="linkedin" hoverable={true} />
                        </a>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=patelyashvi754@gmail.com" target="_blank" rel="noopener noreferrer" className="icon-trigger" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>
                            <Icon name="mail" hoverable={true} />
                        </a>
                    </div>
                </div>

                <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="cell no-pad project-footer-resume" style={{ gridColumn: '2 / 3', display: 'flex', justifyContent: 'flex-start', padding: '0 32px', textDecoration: 'none' }}>
                    <div className="icon-trigger" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Icon name="resume" hoverable={true} />
                        <span style={{ color: 'var(--secondary-text)', fontWeight: 500 }}>Resume</span>
                    </div>
                </a>

                <div className="cell no-pad project-footer-nav" style={{ gridColumn: '3 / 4' }}>
                    <div className="icon-trigger" style={{ display: 'flex', width: '100%', height: '100%' }}>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid var(--primary-border)', cursor: prevProject ? 'pointer' : 'default', opacity: prevProject ? 1 : 0.3 }} onClick={() => prevProject && navigate(`/project/${prevProject.id}`)}>
                            <Icon name="arrow-left" hoverable={!!prevProject} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: nextProject ? 'pointer' : 'default', opacity: nextProject ? 1 : 0.3 }} onClick={() => nextProject && navigate(`/project/${nextProject.id}`)}>
                            <Icon name="arrow-right" hoverable={!!nextProject} />
                        </div>
                    </div>
                </div>

            </main >
        </div >
    );
}
