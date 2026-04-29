const ICON_MAP = {
    instagram: 'iconstack.io - (Brand Instagram)',
    linkedin: 'iconstack.io - (Brand Linkedin)',
    mail: 'iconstack.io - (Mail 01)',
    resume: 'iconstack.io - (File Type Pdf)',
    about: 'iconstack.io - (User Square Rounded)',
    search: 'iconstack.io - (Search)',
    filter: 'iconstack.io - (Filters)',
    'arrow-right': 'iconstack.io - (Square Rounded Arrow Right)',
    'arrow-left': 'iconstack.io - (Square Rounded Arrow Left)',
    sidebar: 'iconstack.io - (Sidebar Minimalistic)',
    check: 'iconstack.io - (Square Rounded Check)',
};

const ACTUAL_NAMES = {
    instagram: 'iconstack.io - (Instagram)',
};

export default function Icon({ 
    name, 
    hoverable = false, 
    active = false, 
    className = "", 
    style = {}, 
    onClick,
    alt = ""
}) {
    const baseName = ACTUAL_NAMES[name] || ICON_MAP[name] || name;

    const getSrc = (isHoverState = false) => {
        if (name === 'sort') {
            const sortIcon = active === 'asc' ? 'Frame 427318247' : 'Frame 427318169';
            return `/assets/icons and icon states/${sortIcon}.svg`;
        }

        let currentBase = baseName;
        let suffix = "";

        // If it's the hover state image OR the icon is currently active, use the -1/-2 version
        if (isHoverState || active) {
            if (name === 'arrow-left') {
                currentBase = 'iconstack.io - (Square Rounded Arrow Right)';
                suffix = "-2";
            } else {
                suffix = "-1";
            }
        }

        return `/assets/icons and icon states/${currentBase}${suffix}.svg`;
    };

    const defaultSrc = getSrc(false);
    const hoverSrc = getSrc(true);

    return (
        <div 
            className={`icon-wrapper ${className} ${active ? 'active' : ''} ${hoverable ? 'hoverable' : ''}`} 
            style={{ 
                ...style,
                cursor: (onClick || hoverable) ? 'pointer' : 'default',
            }}
            onClick={onClick}
        >
            <img
                src={defaultSrc}
                alt={alt || name}
                className="icon-img icon-base"
            />
            <img
                src={hoverSrc}
                alt={`${alt || name} hover`}
                className="icon-img icon-hover-state"
            />
        </div>
    );
}
