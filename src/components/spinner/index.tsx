const Spinner = ({ size = 10, className='', color='black'}: { size: number, className: string, color: string }) => {
    return (
        <svg
            className={`${className} animate-spin mr-3 text-black`}
            viewBox="0 0 24 24"
            style={{ width: `${size}rem`, height: `${size}rem` }}
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="4"
                fill="none"
            ></circle>
            <path
                className="opacity-75"
                fill={color}
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};

export default Spinner;
