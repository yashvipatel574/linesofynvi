import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function Header({
    sortValue,
    setSortValue,
    filterValues,
    setFilterValues,
    searchTerm,
    setSearchTerm,
    minimal = false
}) {
    // ... rest of the logic
    const [localSort, setLocalSort] = useState("custom");
    const [localFilters, setLocalFilters] = useState(["All"]);
    const [localSearch, setLocalSearch] = useState("");

    const currentSort = sortValue !== undefined ? sortValue : localSort;
    const currentSetSort = setSortValue || setLocalSort;

    const currentFilters = filterValues !== undefined ? filterValues : localFilters;
    const currentSetFilters = setFilterValues || setLocalFilters;

    const currentSearch = searchTerm !== undefined ? searchTerm : localSearch;
    const currentSetSearch = setSearchTerm || setLocalSearch;

    const [openSidebar, setOpenSidebar] = useState(null);

    const filters = [
        "All",
        "Industrial Product Design",
        "UI/UX Design",
        "Graphic Design",
        "Animation",
        "Branding"
    ];

    const sorts = [
        "custom",
        "a to z",
        "z to a",
        "newest first",
        "oldest first"
    ];

    const toggleFilter = (f) => {
        if (f === "All") {
            currentSetFilters(["All"]);
        } else {
            let next = currentFilters.includes("All")
                ? [f]
                : [...currentFilters];

            if (currentFilters.includes(f)) {
                next = next.filter(item => item !== f);
                if (next.length === 0) next = ["All"];
            } else if (!next.includes(f)) {
                next.push(f);
            }
            currentSetFilters(next);
        }
    };

    let filterText = "Disciplines";
    const activeFilterCount = currentFilters.filter(f => f !== "All").length;
    if (activeFilterCount > 0) {
        if (activeFilterCount === 1) {
            filterText = `${currentFilters.find(f => f !== "All")}`;
        } else {
            filterText = `${activeFilterCount} Disciplines`;
        }
    }

    // Determine if sort is ascending or descending
    const isSortAsc = currentSort === "a to z" || currentSort === "oldest first";

    return (
        <>
            <div className="ext-line top-ext"></div>
            <div className="ext-line bottom-ext"></div>
            <div className="ext-line left-ext"></div>
            <div className="ext-line right-ext"></div>

            <div className={`cell ${minimal ? 'span-3' : 'span-4'} header header-logo`}>
                <span className="logo-text">linesofynvi</span>
                <div className="header-mobile-icons">
                    <div
                        className="icon-trigger"
                        onClick={() => setOpenSidebar(openSidebar === 'sort' ? null : 'sort')}
                        style={{ cursor: 'pointer' }}
                        title="Sort & Filter"
                    >
                        <Icon name="sidebar" className="menu-icon" active={openSidebar === 'sort'} />
                    </div>
                    <Link to="/about" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <Icon name="about" className="menu-icon" hoverable={true} />
                    </Link>
                </div>
            </div>
            {minimal && <div className="cell span-5 header header-empty"></div>}
            {!minimal && (
                <>
                    <div className={`cell span-2 header header-search icon-trigger ${currentSearch ? 'active' : ''}`}>
                        <div className="search-container" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '12px' }}>
                            <Icon name="search" active={!!currentSearch} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={currentSearch}
                                onChange={(e) => currentSetSearch(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>
                    <div
                        className={`cell span-1 header header-menu dropdown-trigger icon-trigger ${openSidebar === 'sort' ? 'active' : ''}`}
                        onClick={() => setOpenSidebar(openSidebar === 'sort' ? null : 'sort')}
                    >
                        <div className="sort" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Icon
                                name="sort"
                                active={isSortAsc ? 'asc' : 'desc'}
                                className="menu-icon"
                            />
                            <span className="custom">{currentSort}</span>
                        </div>
                    </div>
                    <div
                        className={`cell span-1 header header-profile dropdown-trigger icon-trigger ${openSidebar === 'filter' ? 'active' : ''}`}
                        onClick={() => setOpenSidebar(openSidebar === 'filter' ? null : 'filter')}
                    >
                        <div className="filter" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Icon
                                name="filter"
                                active={openSidebar === 'filter' || activeFilterCount > 0}
                                className="menu-icon"
                            />
                            <span className="custom">{filterText}</span>
                        </div>
                    </div>
                </>
            )}

            {openSidebar === 'filter' && (
                <div className="sidebar filter-sidebar">
                    <div className="sidebar-list custom-scrollbar">
                        {filters.map(f => {
                            const isSelected = currentFilters.includes(f);
                            return (
                                <div
                                    key={f}
                                    className={`sidebar-item ${isSelected ? 'selected' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFilter(f);
                                    }}
                                >
                                    <div className="radio-circle">
                                        {isSelected && <div className="radio-inner"></div>}
                                    </div>
                                    {f}
                                </div>
                            )
                        })}
                    </div>
                    <div className="sidebar-overlay">
                        <button className="btn-sidebar-remove" onClick={(e) => { e.stopPropagation(); currentSetFilters(["All"]); setOpenSidebar(null); }}>Remove Filters</button>
                        <button className="btn-sidebar-secondary" onClick={(e) => { e.stopPropagation(); setOpenSidebar(null); }}>Cancel</button>
                        <button className="btn-sidebar-primary" onClick={(e) => { e.stopPropagation(); setOpenSidebar(null); }}>Apply</button>
                    </div>
                </div>
            )}

            {openSidebar === 'sort' && (
                <div className="sidebar sort-sidebar">
                    <div className="sidebar-list custom-scrollbar">
                        {sorts.map(s => {
                            const isSelected = currentSort === s;
                            return (
                                <div
                                    key={s}
                                    className={`sidebar-item ${isSelected ? 'selected' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        currentSetSort(s);
                                    }}
                                >
                                    <div className="radio-circle">
                                        {isSelected && <div className="radio-inner"></div>}
                                    </div>
                                    {s}
                                </div>
                            )
                        })}
                    </div>
                    <div className="sidebar-overlay">
                        <button className="btn-sidebar-remove" onClick={(e) => { e.stopPropagation(); currentSetSort("custom"); setOpenSidebar(null); }}>Remove Sort</button>
                        <button className="btn-sidebar-secondary" onClick={(e) => { e.stopPropagation(); setOpenSidebar(null); }}>Cancel</button>
                        <button className="btn-sidebar-primary" onClick={(e) => { e.stopPropagation(); setOpenSidebar(null); }}>Apply</button>
                    </div>
                </div>
            )}
        </>
    );
}
