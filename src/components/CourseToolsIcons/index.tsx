import React from 'react';

const CourseToolsIcon = ({
    color = 'currentColor',
    className='',
}:{
    color?: string,
    className?: string,
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke={color}
            fill="none"
            className={className}
        >
            <ellipse
                cx="12"
                cy="12"
                rx="11"
                ry="4.5"
                stroke={color}
                strokeWidth="1.3"
                transform="rotate(-90 12 12)"
            />
            <ellipse
                cx="12"
                cy="12"
                rx="4.5"
                ry="11"
                stroke={color}
                strokeWidth="1.3"
                transform="rotate(-35 12 12)"
            />
            <ellipse
                cx="12"
                cy="12"
                rx="4.5"
                ry="11"
                stroke={color}
                strokeWidth="1.3"
                transform="rotate(-70 12 12)"
            />

            <circle cx="12" cy="12" r="1.5" fill={color} />
        </svg>
    );
};

export default CourseToolsIcon;
