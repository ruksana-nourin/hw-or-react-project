import { useState } from "react";
import PageHeading from "../../../components/PageHeading";

function Settings() {

    const [currency, setCurrency] = useState("BDT");
    const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
    const [language, setLanguage] = useState("English");

    const [libraryName, setLibraryName] = useState("ABC Public Library");
    const [address, setAddress] = useState("Dhaka, Bangladesh");
    const [phone, setPhone] = useState("01700000000");
    const [email, setEmail] = useState("library@example.com");
    const [description, setDescription] = useState(
        "A public library management system."
    );

    const [membershipFee, setMembershipFee] = useState(500);
    const [membershipDuration, setMembershipDuration] = useState(12);

    const [loanDuration, setLoanDuration] = useState(7);
    const [maximumBooks, setMaximumBooks] = useState(3);
    const [finePerDay, setFinePerDay] = useState(10);


    const handleReset = () => {

        setCurrency("BDT");
        setDateFormat("DD/MM/YYYY");
        setLanguage("English");
    };

    const handleSaveSettings = () => {

        const settings = {
            currency,
            dateFormat,
            language,

            libraryName,
            address,
            phone,
            email,
            description,

            membershipFee,
            membershipDuration,

            loanDuration,
            maximumBooks,
            finePerDay
        };

        console.log("All Settings:", settings);

        alert("All settings saved successfully!");
    };

    return (
        <>
            <main className="dashboard-content">

                <div className="container-fluid">

                    <PageHeading
                        icon="gear"
                        subtitle="System"
                        title="Settings"
                        desc="Manage your library system settings"
                    />

                    {/* General Settings */}
                    <div className="card border-0 shadow-sm mt-4">

                        <div className="card-header bg-transparent py-3">

                            <div className="d-flex align-items-center">

                                <i className="bi bi-sliders fs-4 text-primary me-2"></i>

                                <div>
                                    <h5 className="fw-bold mb-1">
                                        General Settings
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        Configure general preferences for your library.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="card-body">

                            <div className="row g-4">

                                {/* Currency */}
                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="currency"
                                        className="form-label fw-semibold"
                                    >
                                        Currency
                                    </label>

                                    <select
                                        id="currency"
                                        className="form-select"
                                        value={currency}
                                        onChange={(e) =>
                                            setCurrency(e.target.value)
                                        }
                                    >
                                        <option value="BDT">
                                            BDT (৳)
                                        </option>

                                        <option value="USD">
                                            USD ($)
                                        </option>

                                        <option value="EUR">
                                            EUR (€)
                                        </option>

                                        <option value="GBP">
                                            GBP (£)
                                        </option>
                                    </select>

                                    <div className="form-text">
                                        Currency used for membership fees and fines.
                                    </div>

                                </div>


                                {/* Date Format */}
                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="dateFormat"
                                        className="form-label fw-semibold"
                                    >
                                        Date Format
                                    </label>

                                    <select
                                        id="dateFormat"
                                        className="form-select"
                                        value={dateFormat}
                                        onChange={(e) =>
                                            setDateFormat(e.target.value)
                                        }
                                    >

                                        <option value="DD/MM/YYYY">
                                            DD/MM/YYYY
                                        </option>

                                        <option value="MM/DD/YYYY">
                                            MM/DD/YYYY
                                        </option>

                                        <option value="YYYY-MM-DD">
                                            YYYY-MM-DD
                                        </option>

                                    </select>

                                    <div className="form-text">
                                        Format used to display dates.
                                    </div>

                                </div>


                                {/* Language */}
                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="language"
                                        className="form-label fw-semibold"
                                    >
                                        Default Language
                                    </label>

                                    <select
                                        id="language"
                                        className="form-select"
                                        value={language}
                                        onChange={(e) =>
                                            setLanguage(e.target.value)
                                        }
                                    >

                                        <option value="English">
                                            English
                                        </option>

                                        <option value="Bangla">
                                            বাংলা
                                        </option>

                                    </select>

                                    <div className="form-text">
                                        Default language for the library system.
                                    </div>

                                </div>

                            </div>


                            {/* Buttons */}
                            <div className="d-flex flex-column flex-sm-row gap-2 mt-4 pt-3 border-top">



                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleReset}
                                >
                                    <i className="bi bi-arrow-counterclockwise me-1"></i>
                                    Reset
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Library Information */}
                    <div className="card border-0 shadow-sm mt-4">

                        <div className="card-header bg-transparent py-3">

                            <div className="d-flex align-items-center">

                                <i className="bi bi-building fs-4 text-primary me-2"></i>

                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Library Information
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        Manage your library's basic information.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="card-body">

                            <div className="row g-4">

                                {/* Library Name */}
                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="libraryName"
                                        className="form-label fw-semibold"
                                    >
                                        Library Name
                                    </label>

                                    <input
                                        type="text"
                                        id="libraryName"
                                        className="form-control"
                                        value={libraryName}
                                        onChange={(e) =>
                                            setLibraryName(e.target.value)
                                        }
                                        placeholder="Enter library name"
                                    />

                                </div>


                                {/* Phone */}
                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="phone"
                                        className="form-label fw-semibold"
                                    >
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        id="phone"
                                        className="form-control"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        placeholder="Enter phone number"
                                    />

                                </div>


                                {/* Email */}
                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="email"
                                        className="form-label fw-semibold"
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter email address"
                                    />

                                </div>


                                {/* Address */}
                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="address"
                                        className="form-label fw-semibold"
                                    >
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        id="address"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        placeholder="Enter library address"
                                    />

                                </div>


                                {/* Description */}
                                <div className="col-12">

                                    <label
                                        htmlFor="description"
                                        className="form-label fw-semibold"
                                    >
                                        Library Description
                                    </label>

                                    <textarea
                                        id="description"
                                        className="form-control"
                                        rows={4}
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        placeholder="Enter library description"
                                    ></textarea>

                                </div>

                            </div>


                            {/* Buttons */}
                            <div className="d-flex flex-column flex-sm-row gap-2 mt-4 pt-3 border-top">



                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => {

                                        setLibraryName("ABC Public Library");
                                        setAddress("Dhaka, Bangladesh");
                                        setPhone("01700000000");
                                        setEmail("library@example.com");
                                        setDescription(
                                            "A public library management system."
                                        );

                                    }}
                                >
                                    <i className="bi bi-arrow-counterclockwise me-1"></i>
                                    Reset
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Membership Settings */}
                    <div className="card border-0 shadow-sm mt-4">

                        <div className="card-header bg-transparent py-3">

                            <div className="d-flex align-items-center">

                                <i className="bi bi-person-badge fs-4 text-primary me-2"></i>

                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Membership Settings
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        Manage membership fee and membership duration.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="card-body">

                            <div className="row g-4">

                                {/* Membership Fee */}
                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="membershipFee"
                                        className="form-label fw-semibold"
                                    >
                                        Membership Fee
                                    </label>

                                    <div className="input-group">

                                        <span className="input-group-text">
                                            ৳
                                        </span>

                                        <input
                                            type="number"
                                            id="membershipFee"
                                            className="form-control"
                                            min="0"
                                            value={membershipFee}
                                            onChange={(e) =>
                                                setMembershipFee(
                                                    Number(e.target.value)
                                                )
                                            }
                                        />

                                    </div>

                                    <div className="form-text">
                                        Amount charged when a member registers.
                                    </div>

                                </div>


                                {/* Membership Duration */}
                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="membershipDuration"
                                        className="form-label fw-semibold"
                                    >
                                        Membership Duration
                                    </label>

                                    <div className="input-group">

                                        <input
                                            type="number"
                                            id="membershipDuration"
                                            className="form-control"
                                            min="1"
                                            value={membershipDuration}
                                            onChange={(e) =>
                                                setMembershipDuration(
                                                    Number(e.target.value)
                                                )
                                            }
                                        />

                                        <span className="input-group-text">
                                            Months
                                        </span>

                                    </div>

                                    <div className="form-text">
                                        How long the membership remains active.
                                    </div>

                                </div>

                            </div>


                            {/* Buttons */}
                            <div className="d-flex flex-column flex-sm-row gap-2 mt-4 pt-3 border-top">




                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => {

                                        setMembershipFee(500);
                                        setMembershipDuration(12);

                                    }}
                                >
                                    <i className="bi bi-arrow-counterclockwise me-1"></i>
                                    Reset
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Circulation Settings */}
                    <div className="card border-0 shadow-sm mt-4 mb-4">

                        <div className="card-header bg-transparent py-3">

                            <div className="d-flex align-items-center">

                                <i className="bi bi-arrow-repeat fs-4 text-primary me-2"></i>

                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Circulation Settings
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        Manage book borrowing and fine settings.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="card-body">

                            <div className="row g-4">

                                {/* Loan Duration */}
                                <div className="col-12 col-md-4">

                                    <label
                                        htmlFor="loanDuration"
                                        className="form-label fw-semibold"
                                    >
                                        Loan Duration
                                    </label>

                                    <div className="input-group">

                                        <input
                                            type="number"
                                            id="loanDuration"
                                            className="form-control"
                                            min="1"
                                            value={loanDuration}
                                            onChange={(e) =>
                                                setLoanDuration(
                                                    Number(e.target.value)
                                                )
                                            }
                                        />

                                        <span className="input-group-text">
                                            Days
                                        </span>

                                    </div>

                                    <div className="form-text">
                                        Number of days a member can keep a book.
                                    </div>

                                </div>


                                {/* Maximum Books */}
                                <div className="col-12 col-md-4">

                                    <label
                                        htmlFor="maximumBooks"
                                        className="form-label fw-semibold"
                                    >
                                        Maximum Books
                                    </label>

                                    <div className="input-group">

                                        <input
                                            type="number"
                                            id="maximumBooks"
                                            className="form-control"
                                            min="1"
                                            value={maximumBooks}
                                            onChange={(e) =>
                                                setMaximumBooks(
                                                    Number(e.target.value)
                                                )
                                            }
                                        />

                                        <span className="input-group-text">
                                            Books
                                        </span>

                                    </div>

                                    <div className="form-text">
                                        Maximum books a member can borrow at once.
                                    </div>

                                </div>


                                {/* Fine Per Day */}
                                <div className="col-12 col-md-4">

                                    <label
                                        htmlFor="finePerDay"
                                        className="form-label fw-semibold"
                                    >
                                        Fine Per Day
                                    </label>

                                    <div className="input-group">

                                        <span className="input-group-text">
                                            ৳
                                        </span>

                                        <input
                                            type="number"
                                            id="finePerDay"
                                            className="form-control"
                                            min="0"
                                            value={finePerDay}
                                            onChange={(e) =>
                                                setFinePerDay(
                                                    Number(e.target.value)
                                                )
                                            }
                                        />

                                    </div>

                                    <div className="form-text">
                                        Fine charged for each late day.
                                    </div>

                                </div>

                            </div>


                            {/* Buttons */}
                            <div className="d-flex flex-column flex-sm-row gap-2 mt-4 pt-3 border-top">




                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => {

                                        setLoanDuration(7);
                                        setMaximumBooks(3);
                                        setFinePerDay(10);

                                    }}
                                >
                                    <i className="bi bi-arrow-counterclockwise me-1"></i>
                                    Reset
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
                <div className="d-flex justify-content-end gap-2 mt-4 mb-5">

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                            setCurrency("BDT");
                            setDateFormat("DD/MM/YYYY");
                            setLanguage("English");

                            setLibraryName("Nourin Public Library");
                            setAddress("Dhaka, Bangladesh");
                            setPhone("01700000000");
                            setEmail("library@example.com");
                            setDescription("A public library management system.");

                            setMembershipFee(500);
                            setMembershipDuration(12);

                            setLoanDuration(7);
                            setMaximumBooks(3);
                            setFinePerDay(10);
                        }}
                    >
                        <i className="bi bi-arrow-counterclockwise me-1"></i>
                        Reset
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveSettings}
                    >
                        <i className="bi bi-check-lg me-1"></i>
                        Save All Settings
                    </button>

                </div>

            </main>
        </>
    );
}

export default Settings;