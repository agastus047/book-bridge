import { useState } from "react";
import { useRouter } from "next/router";

export default function DonateBook() {
    const router = useRouter();

    const [bookData,setBookData] = useState({
        author: null,
        name: null,
        amount: null,
        courseCode: null,
    });
    
    const donateBook = async (data) => {
        const user = await fetch('/api/donate',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });
        return user.json();
    };

    async function handleSubmit() {
        if(!bookData.author||!bookData.name||!bookData.amount||!bookData.courseCode) {
            console.log('fill all fields');
        }
        else {
            const response = await donateBook(bookData);
            if(response.id) 
                router.push("/");
                
        }
    }

    function handleChange(evt) {
        const value = evt.target.value;

        setBookData({
        ...bookData,
        [evt.target.name]: value,
        });
    }

    return(
        <div class="editfulldonate">
            <br></br>
        <div className="flex flex-col items-center mt-10">
            <div class="edithead">Donate Book</div>
            <div className="branch grid grid-rows-2 w-3/4 pb-7 ">
            <span className="pb-3">
            <label>Course Code</label>
            </span>
            <div>
            <select
                onChange={handleChange}
                name="courseCode"
                className="items name grid grid-rows-2 w-3/4 pb-4 w-full max-w-xs border border-black rounded-md"
                defaultValue={"null"}
            >
                <option class="items"  value={"null"} disabled>
                choose code
                </option>
                <option class="items"value={"CS-201"}>CS-201</option>
                <option class="items"value={"CS-203"}>CS-203</option>
                <option class="items"value={"CS-210"}>CS-210</option>
                <option class="items"value={"CS-305"}>CS-305</option>
            </select>
            </div>
            </div>
            <div className="name grid grid-rows-2 w-3/4 pb-7">
                <span className="pb-3">
                <label>Amount</label>
                </span>
                <input
                className="items input w-full max-w-xs border border-black rounded-md"
                type={"number"}
                name="amount"
                onChange={handleChange}
                ></input>
            </div>
            <div className="name grid grid-rows-2 w-3/4 pb-7">
                <span className="pb-3">
                <label>Author</label>
                </span>
                <input
                className="items input w-full max-w-xs border border-black rounded-md"
                type={"text"}
                name="author"
                onChange={handleChange}
                ></input>
            </div>
            <div className="name grid grid-rows-2 w-3/4 pb-7">
                <span className="pb-3">
                <label>Name</label>
                </span>
                <input
                className="items input w-full max-w-xs border border-black rounded-md"
                type={"text"}
                name="name"
                onChange={handleChange}
                ></input>
            </div>
            <button onClick={handleSubmit} className="bg-yellow-950 hover:bg-yellow-900 text-white border border-slate-950 font-bold py-2 px-4 rounded">Submit</button>
            <br>
            </br>
        </div>
        </div>
    );
}