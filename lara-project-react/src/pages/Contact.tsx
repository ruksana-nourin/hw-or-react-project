import { useState } from "react";
import { defaultContact, type Contact } from "../interfaces/contact";

function Contact() {
    const [contact, setContact] = useState<Contact>(defaultContact);
    const handleSubmit = () => {
        console.log(contact);

    }
    return (
        <>
        <div className="w-1/2 mx-auto p-4 mt-4 ">
            <h1>Contact Us</h1>
            <form action="">

                <input type="text" className="w-full p-1 border border-1 border-gray-300 focus:border-2 focus:border-[#F15412] focus:outline-none rounded" placeholder="Name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} /><br /><br />

                <input type="email" className="w-full p-1 border border-1 border-gray-300 focus:border-2 focus:border-[#F15412] focus:outline-none rounded" placeholder="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} /><br /><br />

                <textarea id="message" className="w-full p-1 border border-1 border-gray-300 focus:border-2 focus:border-[#F15412] focus:outline-none rounded" placeholder="Message" rows={5} value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })}></textarea><br /> <br />
                <div className="flex justify-center">
                <button onClick={handleSubmit} type="submit" className="bg-[#F15412] border-[#F15412] border-3 hover:bg-[#F8F9D7] hover:text-[#F15412] text-[#F8F9D7] font-bold py-2 px-4 rounded 
                duration-300">
                    Submit
                </button>
                </div>
            </form>
        </div>
        </>
    );
}

export default Contact;