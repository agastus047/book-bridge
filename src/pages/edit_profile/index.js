import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export default function EditProfile() {
    const router = useRouter();

    const {userState} = useContext(UserContext);
    const [userDetails, setUserDetails] = userState;

    const [profile,setProfile] = useState({
        branch: null,
        sem: null,
        phone: null,
    });

    const updateProfile = async (profile) => {
        const user = await fetch('/api/user',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...profile,isProfileCompleted:true}),
        });
        return user.json();
      };

    function handleChange(evt) {
        const value = evt.target.value;

        setProfile({
        ...profile,
        [evt.target.name]: value,
        });
    }

    async function handleSubmit() {
        if(!profile.branch||!profile.sem||!profile.phone) {
            console.log('fill all fields');
        }
        else {
            const response = await updateProfile(profile);
            if(response.user.isProfileCompleted===true) {
                setUserDetails({...response.user});
                router.push("/");
            }
        }
    }

    return(
        <div class="editfull">
            <br></br>
        <div className="flex flex-col items-center mt-10">
            <div class="edithead">Edit Profile</div>
            <div className="branch grid grid-rows-2 w-3/4 pb-7 ">
            <span className="pb-3">
            <label>Branch</label>
            </span>
            <div>
            <select
                onChange={handleChange}
                name="branch"
                className=" items w-3/4 py-4 px-1 rounded-lg gray-bg opacity-75"
                defaultValue={"null"}
            >
                <option class="items"value={"null"} disabled>
                choose branch
                </option>
                <option class="items"value={"ece"}>ECE (T)</option>
                <option class="items"value={"mech"}>Mech (M)</option>
                <option class="items"value={"civil"}>Civil (C)</option>
                <option class="items"value={"cs"}>CS (R)</option>
                <option class="items"value={"eee"}>EEE (E)</option>
                <option class="items"value={"chem"}>Chem(H)</option>
                <option class="items"value={"arch"}>Arch(A)</option>
                <option class="items"value={"mech-pro"}>Mech Pro</option>
                <option class="items"value={"electrical&computer"}>ERE</option>
            </select>
            </div>
            </div>
            <div className="items branch grid grid-rows-2 w-3/4 pb-7 ">
            <span className="pb-3">
            <label className="text-white" >Year</label>
            </span>

            <div>
            <select
                onChange={handleChange}
                name="sem"
                className="items w-3/4 py-4 rounded-lg gray-bg opacity-75"
                defaultValue={"null"}
            >
                <option class="items" value={"null"} disabled >
                choose sem
                </option>
                <option class="items" value={"1"}>1</option>
                <option class="items"value={"2"}>2</option>
                <option class="items" value={"3"}>3</option>
                <option class="items"value={"4"}>4</option>
                <option class="items"value={"5"}>5</option>
                <option class="items"value={"6"}>6</option>
                <option class="items"value={"7"}>7</option>
                <option class="items"value={"8"}>8</option>
            </select>
            </div>
            </div>
            <div className="name grid grid-rows-2 w-3/4 pb-7">
                <span className="pb-3">
                <label>Phone</label>
                </span>
                <input 
                  className="items  w-3/4 py-4 rounded-lg gray-bg opacity-75"
                type={"text"}
                name="phone"
                onChange={handleChange}
                ></input>
            </div>
            <button onClick={handleSubmit} className="bg-yellow-950 hover:bg-yellow-900 text-white border border-slate-950 font-bold py-2 px-4 rounded">Submit</button>
            <br></br>
        </div>
        </div>
    );
}