
export default function Footer() {
    return (
        <footer className="mt-auto bg-white shadow-md dark:bg-gray-800 py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <div className="container flex flex-col sm:flex-row items-center justify-between mx-auto">
                <p>&copy; 2026 Windmill Dashboard. All rights reserved.</p>
                <div className="flex space-x-4 mt-2 sm:mt-0">
                    <a href="#" className="hover:text-purple-600 dark:hover:text-purple-300">Privacy Policy</a>
                    <a href="#" className="hover:text-purple-600 dark:hover:text-purple-300">Terms</a>
                </div>
            </div>
        </footer>
    );
}