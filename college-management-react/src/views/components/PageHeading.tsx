
import { Link } from "react-router";

type PageHeadingProps = {
    title: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    buttonColor?: string;
    icon?: "plus" | "edit" | "download" | "back" | "none";
};

const icons = {
    plus: (
        <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
        />
    ),
    edit: (
        <path
            fillRule="evenodd"
            d="M13.586 3.586a2 2 0 012.828 2.828l-8.5 8.5a1 1 0 01-.414.243l-3 1a1 1 0 01-1.265-1.265l1-3a1 1 0 01.243-.414l8.5-8.5z"
            clipRule="evenodd"
        />
    ),
    download: (
        <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 11.586V3a1 1 0 011-1zM4 14a1 1 0 011 1v2h10v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z"
            clipRule="evenodd"
        />
    ),
    back: (
        <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 01-.75.75H5.56l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 111.06 1.06l-3.22 3.22h10.69A.75.75 0 0117 10z"
            clipRule="evenodd"
        />
    ),
};

export default function PageHeading({
    title,
    subtitle,
    buttonText,
    buttonLink,
    buttonColor = "purple",
    icon = "plus",
}: PageHeadingProps) {
    const colors: Record<string, string> = {
        purple: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-400",
        blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400",
        green: "bg-green-600 hover:bg-green-700 focus:ring-green-400",
        red: "bg-red-600 hover:bg-red-700 focus:ring-red-400",
        indigo: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400",
        gray: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-400",
        teal: "bg-teal-600 hover:bg-teal-700 focus:ring-teal-400",
    };

    return (
        <div className="my-6 flex w-full items-start justify-between gap-4">
            <div className="min-w-0">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    {title}
                </h2>

                {subtitle && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {subtitle}
                    </p>
                )}
            </div>

            {buttonText && buttonLink && (
                <Link
                    to={buttonLink}
                    className={`inline-flex shrink-0 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 ${colors[buttonColor] ?? colors.purple}`}
                >
                    {icon !== "none" && (
                        <svg
                            className="mr-2 h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            {icons[icon]}
                        </svg>
                    )}

                    {buttonText}
                </Link>
            )}
        </div>
    );
}
