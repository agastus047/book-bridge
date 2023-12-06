import { useState,useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";

export default function Search() {

    const router = useRouter();

    const {userState} = useContext(UserContext);
    const [userDetails, setUserDetails] = userState;

    const [sem,setSem] = useState(null);
    const [books,setBooks] = useState(null);
    
    function handleChange(evt) {
        const value = evt.target.value;

        setSem(value);
    }

    const buyBook = async (data) => {
        const user = await fetch('/api/buy',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });
        return user.json();
    };

    const handleBuy = async (sellerId,buyerId,amount,bookId) => {
        const response = await buyBook({sellerId,buyerId,amount,bookId});
        if(response.donationDetails) {
            router.push("/");
        }
    };

    const searchBook = async (data) => {
        const user = await fetch('/api/search',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });
        return user.json();
    };

    async function handleSearch() {
        if(!sem) {
            console.log('enter semester');
        }
        else {
            const response = await searchBook(sem);
            setBooks(response);
        }
    }

    return(
        <div class="editfullsearch">
        <div className="flex flex-col items-center mt-10">
            <div class="edithead">Search For A Book</div>
            <div className="branch grid grid-rows-2 w-3/4 pb-7 ">
            <span className="pb-3">
            <label>Semester</label>
            </span>
            <div>
            <select
                onChange={handleChange}
                name="branch"
                className="items w-3/4 py-4 px-1 rounded-lg gray-bg opacity-75"
                defaultValue={"null"}
            >
                <option class="items"value={"null"} disabled>
                enter sem
                </option>
                <option class="items"value={"3"}>3</option>
                <option class="items"value={"4"}>4</option>
            </select>
            </div>
            </div>
            
            <button onClick={handleSearch} class="bg-yellow-950 hover:bg-yellow-900 text-white border border-slate-950 font-bold py-2 px-4 rounded">Search</button>
            {books &&
                <div className="bg-stone-950 mt-5 p-7 border border-black flex flex-col gap-4">
                    {books.map((book,index) => <div key={index} className="flex gap-4 justify-between">
                        <span>{book.name}</span>
                        <span>{book.author}</span>
                        <span>Rs.{book.amount}</span>
                        <button  class="bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded "onClick={() => handleBuy(book.user.id,userDetails.id,book.amount,book.id)} >Buy</button>
                    </div>)}
                </div>
            }
            </div>
        </div>
        
    );
}