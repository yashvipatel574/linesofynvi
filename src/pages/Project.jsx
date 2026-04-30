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
            <iframe
                width="100%"
                height="480"
                src={url}
                title={block.alt || "Project video"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ marginBottom: '24px', borderRadius: '8px', border: '1px solid var(--project-border-color)', display: 'block' }}
            ></iframe>
        );
    }

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                marginBottom: '24px',
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--project-border-color)',
                backgroundColor: '#000'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={url}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                onEnded={() => setIsPlaying(false)}
                playsInline
            />
            {/* Play/Pause Overlay */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(0, 174, 239, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: (!isPlaying || isHovered) ? 1 : 0,
                transition: 'all 0.3s ease',
                pointerEvents: 'none',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                zIndex: 2
            }}>
                {isPlaying ? (
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <div style={{ width: '6px', height: '24px', background: 'white', borderRadius: '2px' }}></div>
                        <div style={{ width: '6px', height: '24px', background: 'white', borderRadius: '2px' }}></div>
                    </div>
                ) : (
                    <div style={{
                        width: 0,
                        height: 0,
                        borderTop: '15px solid transparent',
                        borderBottom: '15px solid transparent',
                        borderLeft: '25px solid white',
                        marginLeft: '6px'
                    }}></div>
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
        <div style={{ marginBottom: '24px', position: 'relative' }}>
            <div
                ref={scrollRef}
                onScroll={onScroll}
                className="carousel"
                style={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    gap: 0,
                    border: '1px solid var(--project-border-color)',
                    paddingBottom: 0
                }}
            >
                {block.carousel.map((item, idx) => (
                    <div key={idx} style={{ flex: '0 0 100%', scrollSnapAlign: 'start', display: 'flex' }}>
                        <img
                            src={item.url}
                            alt={item.alt || "Carousel image"}
                            style={{ width: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            {block.carousel.length > 1 && (
                <>
                    <button
                        onClick={() => scrollToIndex(currentIndex - 1)}
                        className="carousel-btn prev icon-trigger"
                        style={{
                            position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)',
                            background: 'var(--primary-background)', border: '1px solid var(--project-border-color)', borderRadius: '50%', width: '44px', height: '44px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                            opacity: currentIndex === 0 ? 0 : 1, pointerEvents: currentIndex === 0 ? 'none' : 'auto',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            zIndex: 10,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                        }}
                    >
                        <Icon name="arrow-left" hoverable={true} style={{ width: '20px', height: '20px', filter: 'brightness(1.5)' }} />
                    </button>
                    <button
                        onClick={() => scrollToIndex(currentIndex + 1)}
                        className="carousel-btn next icon-trigger"
                        style={{
                            position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
                            background: 'var(--primary-background)', border: '1px solid var(--project-border-color)', borderRadius: '50%', width: '44px', height: '44px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                            opacity: currentIndex === block.carousel.length - 1 ? 0 : 1, pointerEvents: currentIndex === block.carousel.length - 1 ? 'none' : 'auto',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            zIndex: 10,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                        }}
                    >
                        <Icon name="arrow-right" hoverable={true} style={{ width: '20px', height: '20px', filter: 'brightness(1.5)' }} />
                    </button>

                    {/* Dots */}
                    <div style={{
                        position: 'absolute', bottom: '-28px', left: '50%', transform: 'translateX(-50%)',
                        display: 'flex', gap: '10px', zIndex: 2, padding: '8px 16px', borderRadius: '20px',
                        background: 'rgba(255,255,255,0.03)'
                    }}>
                        {block.carousel.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => scrollToIndex(idx)}
                                style={{
                                    width: currentIndex === idx ? '20px' : '6px',
                                    height: '6px',
                                    borderRadius: '3px',
                                    background: currentIndex === idx ? 'var(--highlight-color)' : 'rgba(255,255,255,0.2)',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
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
                <div className="cell" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 32px' }}>
                    <span className="logo-text" style={{ color: 'var(--theme-color)', fontSize: '32px', fontWeight: 600 }}>{project.title}</span>
                </div>

                {/* ROW 2: Back Arrow */}
                <div className="cell" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 32px' }}>
                    <Link to="/" className="icon-trigger" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <Icon name="arrow-left" hoverable={true} style={{ width: '24px', height: '24px', filter: 'brightness(0.8)' }} />
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
                                        return <span key={i} style={{ display: 'block', color: 'var(--highlight-color)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px', fontWeight: 600 }}>{block.text}</span>;
                                    }
                                    if (block.type === 'paragraph') {
                                        return <p key={i} style={{ color: 'var(--secondary-text)', lineHeight: 1.6, marginBottom: '24px', fontSize: '15px' }}>{block.text}</p>;
                                    }
                                    if (block.type === 'subtitle') {
                                        return <h3 key={i} style={{ color: 'var(--highlight-color)', marginBottom: '16px', fontWeight: 500, fontSize: '20px' }}>{block.text}</h3>;
                                    }
                                    if (block.type === 'image') {
                                        return <img key={i} src={block.url} alt={block.alt || "Project media"} style={{ width: '100%', marginBottom: '24px', objectFit: 'cover', border: '1px solid var(--project-border-color)' }} />;
                                    }
                                    if (block.type === 'video') {
                                        return <VideoBlock key={i} block={block} />;
                                    }
                                    if (block.type === 'link') {
                                        return (
                                            <div key={i} style={{ marginBottom: '48px' }}>
                                                <div style={{
                                                    width: '100%',
                                                    height: '600px',
                                                    borderRadius: '12px',
                                                    overflow: 'hidden',
                                                    border: '1px solid var(--project-border-color)',
                                                    background: '#fff',
                                                    position: 'relative'
                                                }}>
                                                    <iframe
                                                        src={block.url}
                                                        width="100%"
                                                        height="100%"
                                                        style={{ border: 'none' }}
                                                        title={block.text || "Embedded Content"}
                                                    ></iframe>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                                                    <span style={{ color: 'var(--secondary-text)', opacity: 0.6, fontSize: '14px' }}>
                                                        {block.text || "Interactive Archive"}
                                                    </span>
                                                    <a href={block.url} target="_blank" rel="noopener noreferrer" style={{
                                                        color: 'var(--highlight-color)',
                                                        fontSize: '14px',
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        fontWeight: 500
                                                    }}>
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
                                            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
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
                                            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '16px', marginBottom: '48px' }}>
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
                                            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '48px' }}>
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
                                            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '48px' }}>
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
                                            <div key={i} style={{ marginBottom: '48px', width: '100%' }}>
                                                <iframe
                                                    src={block.src}
                                                    width="100%"
                                                    height={block.src.includes('linkedin') ? "600" : "500"}
                                                    frameBorder="0"
                                                    allowFullScreen
                                                    title="Embedded Content"
                                                    style={{ display: 'block' }}
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
