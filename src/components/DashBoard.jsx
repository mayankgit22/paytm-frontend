import { useEffect,useState } from "react";

function DashBoard() {
    const [users, setUsers] = useState([]);
        const [log,setlog]=useState("");
    const [loading, setLoading] = useState(true);
       const [balance, setBalance] = useState("₹0.00");
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await fetch('https://paytm-backend-1-6y9o.onrender.com/user/account/balance', {
                    credentials: 'include' // Include cookies in the request
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBalance("₹" + (data.balance || "0.00"));
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };
        fetchBalance();
    }, []);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://paytm-backend-1-6y9o.onrender.com/users', {
                    credentials: 'include' // Include cookies in the request
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }
        const handlelogout = async () => {
             if (!currentUserId) {
                 setlog('LogIn')
            alert("You are not logged in");
           window.location.href = '/signin';
        }
        if(log==="Login"){
            window.location.href = '/signin'; }
            
        // setlog("Logging out...")
            else
        
        try {
            const response = await fetch('https://paytm-backend-1-6y9o.onrender.com/user/logout', {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
                // setShowPopup(false);
            localStorage.removeItem('userId');
            setTimeout(() => {
                setlog("Login");
            }, 1000);
            // setlog("Login") 
            // window.location.href = '/signin'; 
        }
        catch(err){console.error('Error logging out:', err);
            return ;

        }}
    const currentUserId = localStorage.getItem('userId'); // Assuming you store the current user's ID in localStorage
    console.log("Current User ID:", currentUserId);
  return (<>

        <h1 className="text-4xl font-bold mt-2">Transfer Money to Your Friends</h1>
    <p className="text-lg mt-2">Your current balance is: <span className="font-semibold">{balance}</span></p>
          <button className="bg-red-500 text-black font-lg rounded-lg font-semibold p-2 font-xl cursor-pointer" onClick={handlelogout}>{log}</button>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {users.map(user => (
            user._id !== currentUserId ? (
                <Card key={user.id} id={user._id} Name={user.name} picUrl={user.picUrl ? user.picUrl : "https://imgs.search.brave.com/NLvoeeWrIirNTadp9zD1n3QlRhPHiZdYWPt3IlWSM9k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzYyLzYzLzY1/LzM2MF9GXzQ2MjYz/NjUwMl85Y0RBWXV5/VnZCWTRxWUpsSGpX/N3ZxYXI1SFlTOGg4/eC5qcGc"} />
            ) : null
        ))}
    </div>
  </>
  )
}
function Card({ Name, picUrl,id }) {
    const [amount ,setAmount] = useState('');
      const [showPopup, setShowPopup] = useState(false);
    const handleSend =  async (e) => {
        e.preventDefault();
        
        if (amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }
        else {
            try {
                const to=id;
                const response = await fetch('https://paytm-backend-1-6y9o.onrender.com/user/account/transfer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', 
                    body: JSON.stringify({ to, amount }),
                });
                if (!response.ok) {
                     setShowPopup(false);
                    throw new Error('Network response was not ok');
                }
                else{
                    // alert(`You sent $${amount} to ${Name}`);
                    setShowPopup(true);
                    
                    setTimeout(() => setShowPopup(false), 5000);
                }
                setTimeout(() => {
                    // setShowPopup(false);
                    setAmount(""); 
                }, 5000);
                // const data = await response.json();
                // console.log(data);
            }
            catch(err){
                console.error('Error sending money:', err);
                return;
            }
            // alert(`You are sending $${amount} to ${Name}`);

        }
    };
 
  return (
    <>
    <div className="bg-white w-64 h-80 rounded-lg shadow-md p-2 flex flex-col items-center justify-between mx-auto mt-5 border border-gray-200">
      <div>
        <h1 className="text-xl font-bold mb-2 text-center">Send Money to</h1>
        <div className="flex flex-col items-center mb-2">
          <img src={picUrl} alt={Name} className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-full mb-1" />
          <h2 className="text-sm font-semibold sm:text-lg text-center truncate w-full capitalize">{Name}</h2>
          
          <p className="truncate italic">{id}</p>
        </div>
      </div>
      <div className="w-full flex flex-col  gap-2">
        <input  value={amount} onChange={(w)=>setAmount(w.target.value)}  type="number" placeholder="Enter amount" className="border border-blue-300 rounded-md p-2 w-full" />
        <button  onClick={handleSend} className="bg-blue-500 text-white rounded-md p-2 w-1/2 cursor-pointer">Send</button>
      </div>
    </div>
 {showPopup && (
  <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
    ✅ ₹{amount} sent successfully! to {Name}
  </div>


      )}
    </>
  );
}


export default DashBoard
