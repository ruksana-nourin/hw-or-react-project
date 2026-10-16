import { Link } from "react-router";

function AccessDenied() {
    return ( 
        <>
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9D7] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#F15412]/10 flex items-center justify-center">
            {/* <ShieldX size={44} className="text-[#F15412]" /> */}
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Access Denied
        </h1>

        <p className="text-gray-500 leading-relaxed mb-2">
          Sorry! You don't have permission to access this page.
        </p>

        <p className="text-sm text-gray-400 mb-8">
          Please log in with an authorized account or contact
          your administrator for assistance.
        </p>

        {/* Error Code */}
        <div className="bg-[#F8F9D7] rounded-lg py-3 px-4 mb-8">
          <p className="text-sm text-gray-600">
            Error Code: <span className="font-bold text-[#F15412]">
              403 - Forbidden
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-2
            bg-[#F15412] border-2 border-[#F15412]
            hover:bg-[#F8F9D7] hover:text-[#F15412]
            text-[#F8F9D7] font-bold py-3 px-4 rounded-lg
            transition duration-300"
          >
            {/* <ArrowLeft size={18} /> */}
            Back to Login
          </Link>

          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2
            border-2 border-gray-200 hover:border-[#F15412]
            hover:text-[#F15412] text-gray-600 font-semibold
            py-3 px-4 rounded-lg transition duration-300"
          >
            {/* <Home size={18} /> */}
            Go to Home
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-8">
          If you believe this is a mistake, please contact support.
        </p>

      </div>
    </div>
        </>
     );
}

export default AccessDenied;