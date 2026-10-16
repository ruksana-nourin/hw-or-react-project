import { useMemo, useState } from "react";

type Student = {
    id: number;
    name: string;
    studentId: string;
    phone: string;
    course: string;
    className: string;
    section: string;
    status: "Active" | "Inactive" | "Pending";
};

const initialStudents: Student[] = [
    {
        id: 1,
        name: "Ayesha Rahman",
        studentId: "STU-2026-001",
        phone: "01712345678",
        course: "Science",
        className: "Class 11",
        section: "A",
        status: "Active",
    },
    {
        id: 2,
        name: "Tanvir Ahmed",
        studentId: "STU-2026-002",
        phone: "01812345678",
        course: "Humanities",
        className: "Class 12",
        section: "B",
        status: "Active",
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        studentId: "STU-2026-003",
        phone: "01912345678",
        course: "Commerce",
        className: "Class 11",
        section: "A",
        status: "Pending",
    },
    {
        id: 4,
        name: "Sakib Hasan",
        studentId: "STU-2026-004",
        phone: "01612345678",
        course: "Science",
        className: "Class 12",
        section: "C",
        status: "Inactive",
    },
    {
        id: 5,
        name: "Mim Akter",
        studentId: "STU-2026-005",
        phone: "01512345678",
        course: "Humanities",
        className: "Class 11",
        section: "B",
        status: "Active",
    },
];

export default function Students() {
    const [students, setStudents] = useState(initialStudents);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const perPage = 5;

    const filteredStudents = useMemo(() => {
        const keyword = search.toLowerCase().trim();


        return students.filter((student) => {
            const matchesSearch = [
                student.name,
                student.studentId,
                student.phone,
                student.course,
                student.className,
                student.section,
            ].some((value) => value.toLowerCase().includes(keyword));

            const matchesStatus =
                statusFilter === "All" || student.status === statusFilter;

            return matchesSearch && matchesStatus;
        });


    }, [students, search, statusFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredStudents.length / perPage)
    );

    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const handleDelete = (student: Student) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${student.name}?`
        );


        if (confirmed) {
            setStudents((previous) =>
                previous.filter((item) => item.id !== student.id)
            );
        }


    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const statusClasses: Record<Student["status"], string> = {
        Active:
            "text-green-700 bg-green-100 dark:text-green-100 dark:bg-green-700",
        Inactive:
            "text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700",
        Pending:
            "text-orange-700 bg-orange-100 dark:text-orange-100 dark:bg-orange-700",
    };

    return (
        <main className=" w-full min-w-0">
            <div className="grid w-full min-w-auto px-6">



                {/* Page Heading */}
                <div className="my-6 flex w-full items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            Students
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Manage student records and academic information.
                        </p>
                    </div>

                    {/* Add Student Button */}
                    <a
                        href="/students/create"
                        className="inline-flex shrink-0 items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Add Student
                    </a>
                </div>



                {/* Student Table */}
                <div className="w-full overflow-hidden rounded-lg shadow-xs bg-white dark:bg-gray-800">

                    {/* Search and Filter */}
                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="relative w-full sm:max-w-md">
                            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.817-4.817A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search name, student ID, phone..."
                                className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-lg dark:placeholder-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label
                                htmlFor="student-status"
                                className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
                            >
                                Status:
                            </label>

                            <select
                                id="student-status"
                                value={statusFilter}
                                onChange={(e) => handleStatusFilter(e.target.value)}
                                className="px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:border-purple-400"
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>

                    {/* Responsive Table */}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                    <th className="px-4 py-3">#</th>
                                    <th className="px-4 py-3">Student</th>
                                    <th className="px-4 py-3">Student ID</th>
                                    <th className="px-4 py-3">Phone</th>
                                    <th className="px-4 py-3">Course</th>
                                    <th className="px-4 py-3">Class</th>
                                    <th className="px-4 py-3">Section</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                {paginatedStudents.map((student, index) => (
                                    <tr
                                        key={student.id}
                                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            {(currentPage - 1) * perPage + index + 1}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 mr-3 font-semibold text-purple-700 bg-purple-100 rounded-full dark:text-purple-100 dark:bg-purple-700">
                                                    {student.name
                                                        .split(" ")
                                                        .map((part) => part[0])
                                                        .slice(0, 2)
                                                        .join("")
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="font-semibold">{student.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Student
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 text-sm">
                                            {student.studentId}
                                        </td>

                                        <td className="px-4 py-3 text-sm">
                                            {student.phone}
                                        </td>

                                        <td className="px-4 py-3 text-sm">
                                            {student.course}
                                        </td>

                                        <td className="px-4 py-3 text-sm">
                                            {student.className}
                                        </td>

                                        <td className="px-4 py-3 text-sm">
                                            {student.section}
                                        </td>

                                        <td className="px-4 py-3 text-xs">
                                            <span
                                                className={`px-2 py-1 font-semibold leading-tight rounded-full ${statusClasses[student.status]}`}
                                            >
                                                {student.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <a
                                                    href={`/students/${student.id}`}
                                                    title="View student"
                                                    aria-label={`View ${student.name}`}
                                                    className="p-2 text-purple-600 rounded-lg hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-gray-700"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                </a>

                                                <a
                                                    href={`/students/${student.id}/edit`}
                                                    title="Edit student"
                                                    aria-label={`Edit ${student.name}`}
                                                    className="p-2 text-blue-600 rounded-lg hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-gray-700"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                                                        />
                                                    </svg>
                                                </a>

                                                <button
                                                    type="button"
                                                    title="Delete student"
                                                    aria-label={`Delete ${student.name}`}
                                                    onClick={() => handleDelete(student)}
                                                    className="p-2 text-red-600 rounded-lg hover:bg-red-100 dark:text-red-400 dark:hover:bg-gray-700"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3 6h18M8 6V4h8v2m-9 0l1 14h8l1-14M10 11v5m4-5v5"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedStudents.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-4 py-10 text-sm text-center text-gray-500 dark:text-gray-400"
                                        >
                                            No students found. Try another search or filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-2 dark:bg-gray-800 dark:text-gray-400">
                        <span className="flex items-center">
                            Showing{" "}
                            {filteredStudents.length === 0
                                ? 0
                                : (currentPage - 1) * perPage + 1}
                            {" - "}
                            {Math.min(currentPage * perPage, filteredStudents.length)}
                            {" of "}
                            {filteredStudents.length} students
                        </span>

                        <span className="flex mt-2 sm:mt-auto sm:justify-end">
                            <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center gap-1">
                                    <li>
                                        <button
                                            type="button"
                                            disabled={currentPage === 1}
                                            onClick={() =>
                                                setCurrentPage((page) => Math.max(1, page - 1))
                                            }
                                            className="px-3 py-1 rounded-md hover:bg-purple-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                                            aria-label="Previous page"
                                        >
                                            &larr;
                                        </button>
                                    </li>

                                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                        (page) => (
                                            <li key={page}>
                                                <button
                                                    type="button"
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-3 py-1 rounded-md transition-colors ${currentPage === page
                                                        ? "text-white bg-purple-600 border border-purple-600"
                                                        : "hover:bg-purple-100 dark:hover:bg-gray-700"
                                                        }`}
                                                    aria-current={
                                                        currentPage === page ? "page" : undefined
                                                    }
                                                >
                                                    {page}
                                                </button>
                                            </li>
                                        )
                                    )}

                                    <li>
                                        <button
                                            type="button"
                                            disabled={currentPage === totalPages}
                                            onClick={() =>
                                                setCurrentPage((page) =>
                                                    Math.min(totalPages, page + 1)
                                                )
                                            }
                                            className="px-3 py-1 rounded-md hover:bg-purple-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                                            aria-label="Next page"
                                        >
                                            &rarr;
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
}
