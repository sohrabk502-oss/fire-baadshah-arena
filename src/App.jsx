import { useState, useEffect } from "react";

import {
  auth,
  database,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "./firebase";

import { onAuthStateChanged } from "firebase/auth";

import {
  ref,
  push,
  onValue,
  update,
  remove,
} from "firebase/database";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import {
  doc,
  onSnapshot,
  updateDoc,
  increment,
} from "firebase/firestore";

import {
  db,
  storage
} from "./firebase";
import { createWallet } from "./services/walletService";
import paymentQR from "./assets/paymentQR.png";
import soloImg from "./assets/solo.png";
import duoImg from "./assets/duo.png";
import squadImg from "./assets/squad.png";
import onevoneImg from "./assets/1v1.png";
import onevtwoImg from "./assets/1v2.png";
import threevthreeImg from "./assets/3v3.png";
import fourvfourImg from "./assets/4v4.png";
import logo from "./assets/logo.png";

export default function FireBaadshahArena() {

  // ================= ADMIN EMAIL =================

  const ADMIN_EMAIL = "sohrabk502@gmail.com";

  // ================= AUTH =================

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // ================= POPUPS =================

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // ================= LOGIN =================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [playerName,
  setPlayerName] =
  useState("");

  // =================  =================

  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [uid, setUid] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // ================= REGISTRATIONS =================

  const [registrations, setRegistrations] = useState([]);

  // ================= TOURNAMENT STATES =================

  const [tournamentTitle, setTournamentTitle] =
    useState("");

  // FIXED ENTRY FEE
  const [entryFee, setEntryFee] =
    useState("");

  // JOINED PLAYERS
  const [totalTeams, setTotalTeams] =
    useState("");

  const [matchTime, setMatchTime] =
    useState("");

    const [matchDate,
  setMatchDate] =
  useState("");

    const [tournamentType,
  setTournamentType] =
  useState("SOLO");

const [customWinners,
  setCustomWinners] =
  useState("");

const [customPrize,
  setCustomPrize] =
  useState("");

  const [selectedMap,
  setSelectedMap] =
  useState("Bermuda");
  // ================= AUTO PRIZE STATES =================

  const [totalPrizePool, setTotalPrizePool] =
    useState("");

  const [adminProfit, setAdminProfit] =
    useState("");

  const [top1, setTop1] =
    useState("");

  const [top2, setTop2] =
    useState("");

  const [top3, setTop3] =
    useState("");

  const [remainingPrize, setRemainingPrize] =
    useState("");

  const [perPlayerPrize, setPerPlayerPrize] =
    useState("");

  // ================= LIVE TOURNAMENTS =================

  const [liveTournaments, setLiveTournaments] =
    useState([]);
    const [coins, setCoins] =
  useState(0);

  const [playerData,
  setPlayerData] =
  useState(null);

  const [newPlayerName,
  setNewPlayerName] =
  useState("");

  const [topupAmount, setTopupAmount] =
  useState("");const [withdrawAmount,
  setWithdrawAmount] =
  useState("");

const [withdrawUpi,
  setWithdrawUpi] =
  useState("");

const [withdrawRequests,
  setWithdrawRequests] =
  useState([]);
  const [utrNumber, setUtrNumber] =
  useState("");
  const [searchQuery,
  setSearchQuery] =
  useState("");

const [fromDate,
  setFromDate] =
  useState("");

const [toDate,
  setToDate] =
  useState("");

const [paymentScreenshot,
  setPaymentScreenshot] =
  useState(null);

const [paymentRequests, setPaymentRequests] =
  useState([]);

  const [manualUid,
  setManualUid] =
  useState("");

const [manualCoins,
  setManualCoins] =
  useState("");

 const [joinData,
  setJoinData] =
  useState({});

  const [showWallet, setShowWallet] =
  useState(false);

  const [adminPage,
setAdminPage] =
useState("topup");

const [
searchWithdraw,
setSearchWithdraw
] = useState("");

const [
withdrawFromDate,
setWithdrawFromDate
] = useState("");

const [
withdrawToDate,
setWithdrawToDate
] = useState("");

const [showContact, setShowContact] =
  useState(false);

  const [showHistory, setShowHistory] =
  useState(false);

  const [showProfile,
  setShowProfile] =
  useState(false);

const [joinedHistory,
  setJoinedHistory] =
  useState([]);

  const [selectedMode, setSelectedMode] =
  useState("SOLO");

  const [showJoinPopup,
  setShowJoinPopup] =
  useState(false);

const [selectedTournament,
  setSelectedTournament] =
  useState(null);

const [joinedPlayers,
  setJoinedPlayers] =
  useState([]);

  const [matchResults,
  setMatchResults] =
  useState([]);

  const [playerResults,
setPlayerResults] =
useState([]);

const [matchRanks,
setMatchRanks] =
useState({});

const [winnerScreenshot,
  setWinnerScreenshot] =
  useState(null);

  const [roomId,
setRoomId] =
useState("");

const [roomPassword,
setRoomPassword] =
useState("");

const [selectedResultTournament,
  setSelectedResultTournament] =
  useState(null);

  const [resultPosition,
setResultPosition] =
useState("");

const [resultScreenshot,
setResultScreenshot] =
useState(null);
  // ================= AUTO PRIZE CALCULATION =================

  useEffect(() => {

    // FIXED ENTRY FEE
    const fee =
      Number(entryFee || 0);

    // JOINED PLAYERS
    const players =
      Number(totalTeams || 0);

    // TOTAL COLLECTION
    const totalCollection =
      fee * players;

    // ADMIN PROFIT 20%
    const profit =
      totalCollection * 0.20;

    // FINAL PRIZE POOL
    const prizePool =
      totalCollection - profit;

    // TOP 1 = 25%
    const firstPrize =
      prizePool * 0.25;

    // TOP 2 = 15%
    const secondPrize =
      prizePool * 0.15;

    // TOP 3 = 10%
    const thirdPrize =
      prizePool * 0.10;

    // REMAINING AMOUNT
    const remainPrize =
      prizePool -
      (
        firstPrize +
        secondPrize +
        thirdPrize
      );

    // REMAINING PLAYERS
    // 42% WINNERS

const totalWinners =
  Math.floor(
    players * 0.42
  );

// TOP 1,2,3 already fixed
const remainingPlayers =
  totalWinners - 3;

    // TOP 4-20 EACH PLAYER
    const eachPlayerPrize =
  remainingPlayers > 0
    ? remainPrize /
      remainingPlayers
    : 0;

    // SAVE STATES

    setAdminProfit(
      profit.toFixed(2)
    );

    setTotalPrizePool(
      prizePool.toFixed(2)
    );

    setTop1(
      firstPrize.toFixed(2)
    );

    setTop2(
      secondPrize.toFixed(2)
    );

    setTop3(
      thirdPrize.toFixed(2)
    );

    setRemainingPrize(
      remainPrize.toFixed(2)
    );

    setPerPlayerPrize(
      eachPlayerPrize.toFixed(2)
    );

  }, [entryFee, totalTeams]);

  // ================= AUTH STATE =================

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          if (currentUser) {

            setUser(currentUser);

            if (
              currentUser.email ===
              ADMIN_EMAIL
            ) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }

          } else {

            setUser(null);
            setIsAdmin(false);

          }
        }
      );

    return () => unsubscribe();

}, []);
// ================= WALLET =================

useEffect(() => {

  if (!user) return;

  const unsubscribe =
    onSnapshot(
      doc(db, "users", user.uid),
      (snapshot) => {

        if (snapshot.exists()) {

          setCoins(
            snapshot.data().coins
          );

          setPlayerData(
  snapshot.data()
);

        }

      }
    );

  return () => unsubscribe();

}, [user]);
  // ================= FETCH REGISTRATIONS =================

  useEffect(() => {

    const tournamentRef =
      ref(database, "tournaments");

    onValue(
      tournamentRef,
      (snapshot) => {

        const data =
          snapshot.val();

        if (data) {

          const loadedData =
            Object.keys(data).map(
              (key) => ({
                id: key,
                ...data[key],
              })
            );

          setRegistrations(
            loadedData
          );

        } else {

          setRegistrations([]);

        }
      }
    );

  }, []);

  // ================= FETCH LIVE TOURNAMENTS =================

  // ================= FETCH WITHDRAW REQUESTS =================

useEffect(() => {

  const withdrawRef =
    ref(
      database,
      "withdrawRequests"
    );

  onValue(
    withdrawRef,
    (snapshot) => {

      const data =
        snapshot.val();

      if (data) {

        const loadedData =
          Object.keys(data).map(
            (key) => ({
              id: key,
              ...data[key],
            })
          );

        setWithdrawRequests(
          loadedData
        );

      } else {

        setWithdrawRequests([]);

      }
    }
  );

}, []);
  useEffect(() => {

    const liveRef =
      ref(
        database,
        "liveTournaments"
      );

    onValue(
      liveRef,
      (snapshot) => {

        const data =
          snapshot.val();

        if (data) {

          const loadedData =
            Object.keys(data).map(
              (key) => ({
                id: key,
                ...data[key],
              })
            );

         setLiveTournaments(

loadedData.filter(
(item) =>

item.completed !== true &&

item.completed !== "true"
)

);

        } else {

          setLiveTournaments([]);

        }
      }
    );

  }, []);
// ================= FETCH PAYMENT REQUESTS =================

useEffect(() => {

  const paymentRef =
    ref(database, "paymentRequests");

  onValue(
    paymentRef,
    (snapshot) => {

      const data =
        snapshot.val();

      if (data) {

        const loadedData =
          Object.keys(data).map(
            (key) => ({
              id: key,
              ...data[key],
            })
          );

        setPaymentRequests(
          loadedData
        );

      } else {

        setPaymentRequests([]);

      }
    }
  );

}, []);

// ================= FETCH JOINED PLAYERS =================

useEffect(() => {

  const joinedRef =
    ref(
      database,
      "joinedPlayers"
    );

  onValue(
    joinedRef,
    (snapshot) => {

      const data =
        snapshot.val();

      if (data) {

        const loadedData =
          Object.keys(data).map(
            (key) => ({
              id: key,
              ...data[key],
            })
          );

        setJoinedPlayers(
          loadedData
        );

      } else {

        setJoinedPlayers([]);

      }

    }
  );

}, []);useEffect(() => {

const resultRef =
ref(
database,
"matchResults"
);

onValue(
resultRef,
(snapshot) => {

const data =
snapshot.val();

if (data) {

const loadedData =
Object.keys(data).map(
(key) => ({
id: key,
...data[key],
})
);

setMatchResults(
loadedData
);

} else {

setMatchResults([]);

}

}
);

}, []);

useEffect(() => {

const resultsRef =
ref(
database,
"playerResults"
);

onValue(
resultsRef,
(snapshot) => {

const data =
snapshot.val();

if (data) {

const loadedData =
Object.keys(data).map(
(key) => ({
id: key,
...data[key],
})
);

setPlayerResults(
loadedData
);

} else {

setPlayerResults([]);

}

}
);

}, []);

  // ================= REGISTER USER =================

  const registerUser = async () => {

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user =
  userCredential.user;

// AUTO CREATE WALLET
await createWallet(
  user.uid,
  playerName,
  email
);

      setUser(
        userCredential.user
      );

      if (
        email === ADMIN_EMAIL
      ) {
        setIsAdmin(true);
      }

      alert(
        "Account Created Successfully 🔥"
      );

      setShowRegister(false);

    } catch (error) {

      alert(error.message);

    }
  };

  // ================= LOGIN USER =================

  const loginUser = async () => {

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      setUser(
        userCredential.user
      );

      if (
        email === ADMIN_EMAIL
      ) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      alert(
        "Login Successful 🔥"
      );

      setShowLogin(false);

    } catch (error) {

      alert(error.message);

    }
  };

  // ================= LOGOUT =================

  const logoutUser =
    async () => {

      await signOut(auth);

      setUser(null);
      setIsAdmin(false);

      alert("Logged Out");
    };
    // ================= JOIN HISTORY =================

useEffect(() => {

  const historyRef =
    ref(
      database,
      "joinedPlayers"
    );

  onValue(
    historyRef,
    (snapshot) => {

      const data =
        snapshot.val();

      if (data) {

        const loadedData =
          Object.keys(data).map(
            (key) => ({
              id: key,
              ...data[key],
            })
          );

        setJoinedHistory(
          loadedData
        );

      } else {

        setJoinedHistory([]);

      }

    }
  );

}, []);
// ================= PAYMENT REQUEST =================

const selfTopup =
  async () => {

    try {

      if (!user) {

        alert("Login Required");

        return;

      }
if (
  !topupAmount ||
  !utrNumber ||
  !paymentScreenshot
) {

  alert(
    "Fill All Payment Details + Screenshot"
  );

  return;

}
      const paymentRef =
        ref(
          database,
          "paymentRequests"
        );
        // CHECK DUPLICATE UTR

const duplicateUTR =
  paymentRequests.find(
    (item) =>
      item.utr === utrNumber
  );

if (duplicateUTR) {

  alert(
    "Duplicate UTR Detected ❌"
  );

  return;

}
const imageRef =
storageRef(
storage,
`payments/${user.uid}/${Date.now()}`
);

await uploadBytes(
imageRef,
paymentScreenshot
);

const imageUrl =
await getDownloadURL(
imageRef
);

      await push(
        paymentRef,
        {
          email:
            user.email,

          amount:
            topupAmount,

          utr:
            utrNumber,

           screenshot:
imageUrl,

          status:
            "PENDING",

            requestId:
  `TOPUP-${Date.now()}`,

          userId:
            user.uid,

            userUid:
             user.uid,

            createdAt:
  new Date().toLocaleString(),
        }
      );
// TELEGRAM NOTIFICATION

await fetch(
  `https://api.telegram.org/bot8992852974:AAGlM5_2VojBzr8gRmQ9H3MYMz5-pffbTN8/sendMessage`,
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({

      chat_id:
        "5948674075",

     text:
`🔥 NEW PAYMENT REQUEST

👤 User:
${user.email}

💰 Amount:
${topupAmount} Coins

🧾 UTR:
${utrNumber}

📞 Support:
8085150673`,

    }),
  }
);
      alert(
 "Payment Request Submitted 🔥 Please wait 10 minutes for verification. If not completed, contact WhatsApp support: 8085150673"
);

      setTopupAmount("");
      setUtrNumber("");

    } catch (error) {

      alert(error.message);

    }
  };
  // ================= WITHDRAW REQUEST =================

const withdrawRequest =
  async () => {

    try {

      if (!user) {

        alert(
          "Login Required"
        );

        return;

      }

      if (
        !withdrawAmount ||
        !withdrawUpi
      ) {

        alert(
          "Fill All Details"
        );

        return;

      }

      if (
        Number(withdrawAmount) >
        Number(coins)
      ) {

        alert(
          "Insufficient Coins ❌"
        );

        return;

      }

      const withdrawRef =
        ref(
          database,
          "withdrawRequests"
        );

      await push(
        withdrawRef,
        {
          email:
            user.email,

          amount:
            withdrawAmount,

          upi:
            withdrawUpi,

          userId:
            user.uid,

            userUid:
              user.uid,

            createdAt:
  new Date().toLocaleString(),

          status:
            "PENDING",

            requestId:
  `WITHDRAW-${Date.now()}`,
        }
      );

      // AUTO COIN DEDUCT

      await updateDoc(
        doc(
          db,
          "users",
          user.uid
        ),
        {
          coins: increment(
            -Number(
              withdrawAmount
            )
          ),
        }
      );

      // TELEGRAM ALERT

      await fetch(
`https://api.telegram.org/bot8992852974:AAGlM5_2VojBzr8gRmQ9H3MYMz5-pffbTN8/sendMessage`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            chat_id:
              "5948674075",

            text:
`💸 NEW WITHDRAW REQUEST

👤 User:
${user.email}

💰 Amount:
${withdrawAmount}

🏦 UPI:
${withdrawUpi}

📞 Support:
8085150673`,

          }),
        }
      );

      alert(
        "Withdraw Request Submitted 🔥 Please wait 15 minutes for verification. If not completed, contact WhatsApp support: 8085150673"
);

      setWithdrawAmount("");
      setWithdrawUpi("");

    } catch (error) {

      alert(error.message);

    }
  };
  // ================= TEAM REGISTER =================

  const submitTournament =
    async () => {

      try {
        if (!user) {

  alert(
    "Login Required"
  );

  return;

}
        const tournamentRef =
          ref(
            database,
            "tournaments"
          );

        await push(
          tournamentRef,
          {
            teamName,
            leaderName,
            uid,
            whatsapp,
            status:
              "PENDING",
          }
        );

        alert(
          "Tournament Registered 🔥"
        );

        setTeamName("");
        setLeaderName("");
        setUid("");
        setWhatsapp("");

      } catch (error) {

        alert(error.message);

      }
    };
const submitPlayerResult =
async (tournament) => {

try {

if (!user) {

alert("Login Required");

return;

}

if (
!resultPosition ||
!resultScreenshot
) {

alert(
"Fill All Details"
);

return;

}

const imageRef =
storageRef(
storage,
`results/${tournament.id}/${user.uid}`
);

await uploadBytes(
imageRef,
resultScreenshot
);

const imageUrl =
await getDownloadURL(
imageRef
);

await push(
ref(
database,
"playerResults"
),
{
tournamentId:
tournament.id,

tournamentTitle:
tournament.tournamentTitle,

userId:
user.uid,

playerName:
playerData?.name ||
"Unknown",

position:
resultPosition,

screenshot:
imageUrl,

createdAt:
new Date()
.toLocaleString(),
}
);

alert(
"Result Submitted 🔥"
);

setResultPosition("");

setResultScreenshot(
null
);

} catch (error) {

alert(error.message);

}

};

  // ================= CREATE TOURNAMENT =================
const joinTournament =
  async (tournament) => {

    try {

      if (!user) {

        alert(
          "Login Required"
        );

        return;

      }

      if (
       !joinData[tournament.id]?.gameUid ||

!joinData[tournament.id]?.ingameName ||

!joinData[tournament.id]?.gameLevel ||

!joinData[tournament.id]?.selectedSlot
      ) {

        alert(
          "Fill All Details"
        );

        return;

      }

      if (
        Number(
  joinData[
    tournament.id
  ]?.gameLevel
) < 55
      ) {

        alert(
          "Minimum Level 55 Required ❌"
        );

        return;

      }
const alreadyJoined =
joinedPlayers.find(
(player) =>
player.tournamentId ===
tournament.id &&

player.userEmail ===
user.email
);

if (alreadyJoined) {

alert(
"You Already Joined This Tournament ❌"
);

return;

}
      if (
        Number(coins) <
        Number(
          tournament.entryFee
        )
      ) {

        alert(
          "Insufficient Coins ❌"
        );

        return;

      }

      // DEDUCT COINS

      await updateDoc(
        doc(
          db,
          "users",
          user.uid
        ),
        {
          coins: increment(
            -Number(
              tournament.entryFee
            )
          ),
        }
      );

      // SAVE JOIN DATA

      await push(
        ref(
          database,
          "joinedPlayers"
        ),
        {
          tournamentId:
            tournament.id,

          tournamentTitle:
            tournament.tournamentTitle,

          userEmail:
            user.email,
            userId:
            user.uid,

          gameUid:
joinData[
  tournament.id
]?.gameUid,

ingameName:
joinData[
  tournament.id
]?.ingameName,

gameLevel:
joinData[
  tournament.id
]?.gameLevel,

selectedSlot:
joinData[
  tournament.id
]?.selectedSlot,

          createdAt:
            new Date().toLocaleString(),
        }
      );

      alert(
        "Tournament Joined Successfully 🔥"
      );

    } catch (error) {

      alert(error.message);

    }

  };

  const createTournament =
    async () => {

      try {

        const liveRef =
          ref(
            database,
            "liveTournaments"
          );

        await push(
          liveRef,
          {
            tournamentTitle,
            entryFee,
            totalTeams,
            matchTime,
            matchDate,
           tournamentType,

selectedMap,

customWinners,

customPrize,

            adminProfit,
            totalPrizePool,

            top1,
            top2,
            top3,

            remainingPrize,
            perPlayerPrize,

            roomId: "",
            roomPassword: "",


          }
        );

        alert(
          "Tournament Created Successfully 🔥"
        );

      } catch (error) {

        alert(error.message);

      }
    };

  // ================= APPROVE TEAM =================

  const approveTeam =
    async (id) => {

      try {

        await update(
          ref(
            database,
            `tournaments/${id}`
          ),
          {
            status:
              "APPROVED",
          }
        );

      } catch (error) {

        alert(error.message);

      }
    };

  // ================= DELETE TEAM =================

  const deleteTeam =
    async (id) => {

      try {

        await remove(
          ref(
            database,
            `tournaments/${id}`
          )
        );

      } catch (error) {

        alert(error.message);

      }
    };
useEffect(() => {

if (
showProfile ||
showWallet ||
showHistory ||
showJoinPopup ||
showContact
) {

document.body.style.overflow =
"hidden";

} else {

document.body.style.overflow =
"auto";

}

return () => {

document.body.style.overflow =
"auto";

};

}, [
showProfile,
showWallet,
showHistory,
showJoinPopup,
showContact,
]);
  return (
   <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-orange-500/10">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between">

          <div className="flex items-center gap-3">

<img
src={logo}
alt="FIRE BAADSHAH ARENA"
className="w-14 h-14 object-contain"
/>

<div>

<h1 className="text-2xl font-black leading-none text-orange-500">
FIRE BAADSHAH
</h1>

<p className="text-white text-sm font-bold">
ARENA
</p>

</div>

</div>

          {user ? (

            <div className="flex flex-wrap items-center justify-center gap-3">
              
        <button
        onClick={() =>
        setShowWallet(true)
  }
          className="bg-orange-500/20 text-orange-400 px-5 py-2 rounded-2xl font-black hover:bg-orange-500 hover:text-black duration-300"
>         
        🪙 {coins} Coins
            </button>
            <button
  onClick={() =>
    setShowContact(true)
  }
  className="bg-green-500/20 text-green-400 px-5 py-2 rounded-2xl font-black hover:bg-green-500 hover:text-black duration-300"
>
  CONTACT
</button>
<button
  onClick={() =>
    setShowHistory(true)
  }
  className="bg-blue-500/20 text-blue-400 px-5 py-2 rounded-2xl font-black hover:bg-blue-500 hover:text-black duration-300"
>
 MATCHES HISTORY
</button>
<button
  onClick={() =>
    setShowProfile(true)
  }
  className="bg-purple-500/20 text-purple-400 px-5 py-2 rounded-2xl font-black hover:bg-purple-500 hover:text-black duration-300"
>
  PROFILE
</button>
              {isAdmin && (
                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-bold">
                  ADMIN
                </span>
              )}

              <button
                onClick={
                  logoutUser
                }
                className="bg-red-500 px-6 py-3 rounded-2xl font-black"
              >
                LOGOUT
              </button>

            </div>

          ) : (

            <div className="flex gap-4">

              <button
                onClick={() =>
                  setShowLogin(
                    true
                  )
                }
                className="border border-orange-500 text-orange-400 px-5 py-3 rounded-2xl"
              >
                LOGIN
              </button>

              <button
                onClick={() =>
                  setShowRegister(
                    true
                  )
                }
                className="bg-orange-500 text-black px-6 py-3 rounded-2xl font-black"
              >
                REGISTER
              </button>

            </div>

          )}

        </div>

      </nav>

      {/* HERO */}

      <section className="text-center py-24 px-6">

        <h1 className="text-4xl md:text-7xl font-black leading-tight">

          FIRE BAADSHAH <br />

          <span className="text-orange-500">
            ARENA
          </span>

        </h1>

        <p className="text-gray-400 text-lg md:text-2xl mt-4 font-semibold">
India's Free Fire Esports Tournament Platform
</p>

        <p className="text-orange-400 mt-6 text-xl font-bold">
  1 Coin = 1 INR Value Inside Platform
</p>

<p className="text-gray-500 mt-4 text-sm max-w-2xl mx-auto leading-7">
  Coins are virtual esports reward units used for tournaments,
  rankings, rewards, and competitive gameplay inside
  FIRE BAADSHAH ARENA.
</p>
<div className="max-w-4xl mx-auto px-6 pb-10">

  <div className="bg-[#111] border border-orange-500/10 rounded-3xl p-6 text-center">

    <h3 className="text-2xl font-black text-orange-500 mb-4">
      PLATFORM NOTICE
    </h3>

    <p className="text-gray-300 leading-8">
      Coins are virtual tournament reward units used inside
      FIRE BAADSHAH ARENA.
    </p>

    <p className="text-orange-400 mt-4">
      1 Coin = 1 INR Value Inside Platform
    </p>

    <p className="text-gray-500 mt-4 text-sm">
      FIRE BAADSHAH ARENA is a competitive esports platform
      based on skill matches and tournament gameplay.
    </p>

  </div>

</div>
      </section>
      {/* GAME MODES */}

<section className="max-w-7xl mx-auto px-6 pt-10">

  <div className="flex gap-4 overflow-x-auto pb-4">

   {[
  {
    name: "SOLO",
    image: soloImg,
  },

  {
    name: "DUO",
    image: duoImg,
  },

  {
    name: "SQUAD",
    image: squadImg,
  },

  {
    name: "1V1",
    image: onevoneImg,
  },

  {
    name: "1V2",
    image: onevtwoImg,
  },

  {
    name: "3V3",
    image: threevthreeImg,
  },

  {
    name: "4V4",
    image: fourvfourImg,
  },

].map((mode) => (

      <button
        key={mode}
       onClick={() =>
  setSelectedMode(
    mode.name
  )
}
        className={`px-8 py-4 rounded-2xl font-black whitespace-nowrap duration-300 ${
          selectedMode === mode.name
            ? "bg-orange-500 text-black"
            : "bg-[#111] text-white border border-orange-500/10"
        }`}
      >
        <div className="flex flex-col items-center gap-3">

  <img
    src={mode.image}
    alt={mode.name}
    className="w-16 h-16 object-contain"
  />

  <span>
    {mode.name}
  </span>

</div>
      </button>

    ))}

  </div>

</section>

{/* UPCOMING TOURNAMENTS */}

<section className="max-w-7xl mx-auto px-6 py-20">

  <h2 className="text-5xl font-black text-green-400 mb-12">
    {selectedMode} UPCOMING MATCHES
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    {liveTournaments
      .filter((item) => {

        const now =
          new Date();

       const tournamentTime =
  new Date(
    `${item.matchDate}T${item.matchTime}`
  );

        const diff =
          (
            tournamentTime -
            now
          ) / 1000 / 60;
console.log(
  item.tournamentType,
  selectedMode,
  diff
);

return (
  diff > 10 &&
  item.tournamentType
    ?.trim()
    .toUpperCase() ===
  selectedMode
    ?.trim()
    .toUpperCase()
);

      })
      .map((item) => (

        <div
          key={item.id}
          className="bg-[#111] rounded-[35px] p-5 md:p-8 border border-green-500/10"
        >

          <div className="flex justify-between mb-5">

            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-black">
              UPCOMING
            </span>

            <span>
              {item.matchTime}
            </span>

          </div>

          <h3 className="text-3xl font-black mb-6">
            {item.tournamentTitle}
          </h3>
          <p className="text-blue-400 mb-4 font-bold">
  🗺️ {item.selectedMap}
</p>
             <div className="space-y-4 text-lg">

                  <div className="flex justify-between">
                    <span>
                      Entry Fee
                    </span>

                    <span className="text-orange-400">
                      {item.entryFee} Coins
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Joined Players
                    </span>

                    <span>
                      {
                        item.totalTeams
                      }
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Prize Pool
                    </span>

                    <span className="text-orange-500">
                      {item.totalPrizePool} Coins
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Top 1
                    </span>

                    <span>
                      {item.top1} Coins
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Top 2
                    </span>

                    <span>
                      {item.top2} Coins
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Top 3
                    </span>

                    <span>
                      {item.top3} Coins
                    </span>
                  </div>

                  {
item.tournamentType ===
"SOLO" ||

item.tournamentType ===
"DUO" ||

item.tournamentType ===
"SQUAD"

? (

<div className="flex justify-between">

  <span>
    Top 4-
    {
      Number(
        item.totalTeams
      ) > 0

      ? Math.floor(
          Number(
            item.totalTeams
          ) * 0.42
        )

      : 0
    }
  </span>

  <span className="text-green-400">
    {item.perPlayerPrize}
    Coins each
  </span>

</div>

) : (

<div className="flex justify-between">

  <span>
    Winners:
    {
      item.customWinners
    }
  </span>

  <span className="text-green-400">
    {
      item.customPrize
    }
    Coins
  </span>

</div>

)}
<button
  onClick={() => {

    setSelectedTournament(
      item
    );

    setShowJoinPopup(
      true
    );

  }}
 className="w-full mt-6 bg-orange-500 text-black py-3 md:py-4 rounded-2xl font-black text-sm md:text-base"
>
  JOIN TOURNAMENT
</button>

                </div>

        </div>

      ))}

  </div>

</section>

      {/* LIVE TOURNAMENTS */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-5xl font-black text-orange-500 mb-12">
          LIVE MATCHES
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {liveTournaments
.filter((item) => {

  const now =
    new Date();

 const tournamentTime =
  new Date(
    `${item.matchDate}T${item.matchTime}`
  );

  const diff =
    (
      tournamentTime -
      now
    ) / 1000 / 60;

if (
item.completed === true ||
item.completed === "true"
) {
return false;
}

return (
diff <= 10 &&
diff > -7200
);

})
.map(
            (item) => (

              <div
                key={item.id}
                className="bg-[#111] rounded-[35px] p-5 md:p-8 border border-orange-500/10"
              >

                <div className="flex justify-between mb-5">

<span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-black">
LIVE
</span>
                  <span>
                    {
                      item.matchTime
                    }
                  </span>

                </div>

                <h3 className="text-3xl font-black mb-6">
                  {
                    item.tournamentTitle
                  }
                </h3>
                <p className="text-orange-400 mb-4">
  {item.tournamentType}
</p>
<p className="text-blue-400 mb-6 font-bold">
  🗺️ {item.selectedMap}
</p>
                <div className="space-y-4 text-lg">

                  <div className="flex justify-between">
                    <span>
                      Entry Fee
                    </span>

                    <span className="text-orange-400">
                      {item.entryFee} Coins
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Joined Players
                    </span>

                    <span>
                      {
                        item.totalTeams
                      }
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Prize Pool
                    </span>
                    {
joinedPlayers.find(
(player) =>

player.tournamentId ===
item.id &&

player.userEmail ===
user?.email
) && (

<div className="bg-black rounded-2xl p-5 border border-green-500/10 mt-5">

<h3 className="text-2xl font-black text-green-400 mb-4">
ROOM DETAILS
</h3>

<p className="text-orange-400 text-lg">
🎮 Room ID:
{" "}
{item.roomId || "Waiting..."}
</p>

<p className="text-blue-400 text-lg mt-2">
🔐 Password:
{" "}
{item.roomPassword || "Waiting..."}
</p>

</div>

)
}

                    <span className="text-orange-500">
                      {item.totalPrizePool} Coins
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Top 1
                    </span>

                    <span>
                      {item.top1} Coins
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Top 2
                    </span>

                    <span>
                      {item.top2} Coins
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Top 3
                    </span>

                    <span>
                      {item.top3} Coins
                    </span>
                  </div>

                  {
item.tournamentType ===
"SOLO" ||

item.tournamentType ===
"DUO" ||

item.tournamentType ===
"SQUAD"

? (

<div className="flex justify-between">

  <span>
    Top 4-
    {
      Number(
        item.totalTeams
      ) > 0

      ? Math.floor(
          Number(
            item.totalTeams
          ) * 0.42
        )

      : 0
    }
  </span>

  <span className="text-green-400">
    {item.perPlayerPrize}
    Coins each
  </span>

</div>

) : (

<div className="flex justify-between">

  <span>
    Winners:
    {
      item.customWinners
    }
  </span>

  <span className="text-green-400">
    {
      item.customPrize
    }
    Coins
  </span>

</div>


)}
{
isAdmin && (

<div className="bg-black rounded-2xl p-4 border border-orange-500/10 mb-4">

<input
type="text"
placeholder="Room ID"

value={roomId}

onChange={(e) =>
setRoomId(
e.target.value
)
}

className="w-full bg-[#111] rounded-2xl px-4 py-3 outline-none mb-3"
/>

<input
type="text"
placeholder="Room Password"

value={roomPassword}

onChange={(e) =>
setRoomPassword(
e.target.value
)
}

className="w-full bg-[#111] rounded-2xl px-4 py-3 outline-none"
/>

<button
onClick={async () => {

try {

await update(
ref(
database,
`liveTournaments/${item.id}`
),
{
roomId,
roomPassword,
}
);

alert(
"Room Details Published 🔥"
);

} catch (error) {

alert(error.message);

}

}}
className="w-full mt-4 bg-orange-500 text-black py-3 rounded-2xl font-black"
>
PUBLISH ROOM DETAILS
</button>

</div>

)
}
{
isAdmin && (


<button
onClick={() =>
setSelectedResultTournament(
item
)
}
className="w-full mt-6 bg-purple-500 text-black py-4 rounded-2xl font-black"
>
  
PUBLISH RESULT
</button>

)}
{
!isAdmin && (

<button
onClick={() =>
setSelectedResultTournament(
item
)
}
className="w-full mt-4 bg-green-500 text-black py-4 rounded-2xl font-black"
>
  


UPLOAD RESULT
</button>

)
}
                </div>

              </div>

            )
          )}

        </div>

      </section>
      {/* HISTORY POPUP */}

{
showHistory && user && (

<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4">

  <div className="bg-[#111] w-full max-w-4xl rounded-[40px] p-5 md:p-8 border border-blue-500/20 max-h-[90vh] overflow-y-auto">

    <div className="flex items-center justify-between mb-8">

      <h2 className="text-4xl font-black text-blue-400">
        MATCH HISTORY
      </h2>

      <button
        onClick={() =>
          setShowHistory(false)
        }
        className="bg-red-500 px-5 py-2 rounded-2xl font-black"
      >
        CLOSE
      </button>

    </div>

    <div className="space-y-6">

    {[...joinedHistory]
.filter(
(item) =>
item.userEmail ===
user.email
)
.reverse()
.map((item) => (

<div
  key={item.id}
  className="bg-black rounded-3xl p-6 border border-blue-500/10"
>

  <h3 className="text-2xl font-black text-orange-500">
    {item.tournamentTitle}
  </h3>

  <p className="text-gray-400 mt-3">
    UID:
    {item.gameUid}
  </p>

  <p className="text-gray-400">
    IGN:
    {item.ingameName}
  </p>

  <p className="text-gray-400">
    Level:
    {item.gameLevel}
  </p>

  <p className="text-orange-400">
  SLOT:
  {item.selectedSlot}
</p>

  <p className="text-blue-400 mt-4">
    {item.createdAt}
  </p>

</div>

))}

    </div>

  </div>

</div>

)}

{/* PROFILE POPUP */}

{
showProfile &&
user && (

<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4">

<div className="bg-[#111] w-full max-w-2xl rounded-[40px] p-5 md:p-8 border border-purple-500/20 max-h-[90vh] overflow-y-auto">

<div className="flex items-center justify-between mb-8">

<h2 className="text-4xl font-black text-purple-400">
PLAYER PROFILE
</h2>

<button
onClick={() =>
setShowProfile(false)
}
className="bg-red-500 px-5 py-2 rounded-2xl font-black"
>
CLOSE
</button>

</div>

<div className="space-y-6">

<div className="bg-black rounded-3xl p-6">

<p className="text-gray-400">
PLAYER NAME
</p>

<h3 className="text-2xl font-black text-orange-500 mt-2">
{playerData?.name}
</h3>

</div>

<div className="bg-black rounded-3xl p-6">

<p className="text-gray-400">
EMAIL
</p>

<h3 className="text-xl font-black text-green-400 mt-2 break-all">
{user.email}
</h3>

</div>

<div className="bg-black rounded-3xl p-6">

<p className="text-gray-400">
USER UID
</p>

<h3 className="text-sm font-black text-blue-400 mt-2 break-all">
{user.uid}
</h3>

</div>

<div className="bg-black rounded-3xl p-6">

<p className="text-gray-400">
AVAILABLE COINS
</p>

<h3 className="text-4xl font-black text-orange-500 mt-2">
🪙 {coins}
</h3>

</div>

<div className="bg-black rounded-3xl p-6">

<p className="text-gray-400">
TOTAL WINS
</p>

<h3 className="text-4xl font-black text-yellow-400 mt-2">
🏆 {playerData?.wins || 0}
</h3>

</div>

<div className="bg-black rounded-3xl p-6">

<p className="text-gray-400">
TOP 3 FINISHES
</p>

<h3 className="text-4xl font-black text-green-400 mt-2">
🔥 {playerData?.top3 || 0}
</h3>

</div>
{
!playerData?.nameChanged && (

<div className="bg-black rounded-3xl p-6">

<p className="text-gray-400 mb-4">
CHANGE PLAYER NAME
</p>

<input
type="text"
placeholder="New Player Name"

value={newPlayerName}

onChange={(e) =>
setNewPlayerName(
e.target.value
)
}

className="w-full bg-[#111] rounded-2xl px-5 py-4 outline-none"
/>

<button
onClick={async () => {

try {

if (!newPlayerName) {

alert(
"Enter New Name"
);

return;

}

await updateDoc(
doc(
db,
"users",
user.uid
),
{
name:
newPlayerName,

nameChanged:
true,
}
);

alert(
"Name Changed Successfully 🔥"
);

setNewPlayerName("");

} catch (error) {

alert(error.message);

}

}}
className="w-full mt-4 bg-purple-500 text-black py-4 rounded-2xl font-black"
>
CHANGE NAME
</button>

<p className="text-red-400 text-sm mt-4">
⚠️ You can change your name only one time.
</p>

</div>

)}
</div>

</div>

</div>

)}
{/* CONTACT POPUP */}

{
showContact && (

<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4">

  <div className="bg-[#111] w-full max-w-md rounded-[40px] p-5 md:p-8 border border-green-500/20 text-center">

    <h2 className="text-4xl font-black text-green-400 mb-8">
      CONTACT SUPPORT
    </h2>

    <p className="text-gray-400 text-lg mb-6">
      Any issue regarding tournaments,
      deposits or withdrawals?
    </p>

    <a
      href="https://wa.me/918085150673"
      target="_blank"
      rel="noreferrer"
      className="block bg-green-500 text-black py-4 rounded-2xl font-black text-xl"
    >
      WhatsApp: 8085150673
    </a>

    <button
      onClick={() =>
        setShowContact(false)
      }
      className="mt-6 bg-red-500 px-6 py-3 rounded-2xl font-black"
    >
      CLOSE
    </button>

  </div>

</div>

)}
{/* JOIN POPUP */}

{
showJoinPopup &&
selectedTournament && (

<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4">

<div className="bg-[#111] w-full max-w-3xl rounded-[40px] p-5 md:p-8 border border-orange-500/20 max-h-[90vh] overflow-y-auto">

<div className="flex items-center justify-between mb-8">

<h2 className="text-4xl font-black text-orange-500">
JOIN MATCH
</h2>

<button
onClick={() =>
setShowJoinPopup(false)
}
className="bg-red-500 px-5 py-2 rounded-2xl font-black"
>
CLOSE
</button>

</div>

<h3 className="text-3xl font-black mb-6">
{
selectedTournament.tournamentTitle
}
</h3>

<input
type="text"
placeholder="Free Fire UID"

value={
joinData[
selectedTournament.id
]?.gameUid || ""
}

onChange={(e) =>
setJoinData({
...joinData,

[selectedTournament.id]: {

...joinData[
selectedTournament.id
],

gameUid:
e.target.value,
},
})
}

className="w-full mt-4 bg-black rounded-2xl px-4 py-4 outline-none"
/>

<input
type="text"
placeholder="Ingame Name"

value={
joinData[
selectedTournament.id
]?.ingameName || ""
}

onChange={(e) =>
setJoinData({
...joinData,

[selectedTournament.id]: {

...joinData[
selectedTournament.id
],

ingameName:
e.target.value,
},
})
}

className="w-full mt-4 bg-black rounded-2xl px-4 py-4 outline-none"
/>

<input
type="number"
placeholder="Game Level"

value={
joinData[
selectedTournament.id
]?.gameLevel || ""
}

onChange={(e) =>
setJoinData({
...joinData,

[selectedTournament.id]: {

...joinData[
selectedTournament.id
],

gameLevel:
e.target.value,
},
})
}

className="w-full mt-4 bg-black rounded-2xl px-4 py-4 outline-none"
/>

<h4 className="text-2xl font-black mt-8 mb-5 text-orange-400">
SELECT SLOT
</h4>

<div className="grid grid-cols-4 gap-3">

{Array.from({
length: Number(
selectedTournament.totalTeams
),
}).map((_, index) => {

const slot =
index + 1;

const bookedPlayer =
joinedPlayers.find(
(player) =>
player.tournamentId ===
selectedTournament.id &&

Number(
player.selectedSlot
) === slot
);

return (

<button
key={slot}

disabled={bookedPlayer}

onClick={() =>
setJoinData({
...joinData,

[selectedTournament.id]: {

...joinData[
selectedTournament.id
],

selectedSlot:
slot,
},
})
}

className={`p-4 rounded-2xl font-black text-sm ${
bookedPlayer

? "bg-red-500/20 text-red-400"

: joinData[
selectedTournament.id
]?.selectedSlot === slot

? "bg-orange-500 text-black"

: "bg-black border border-orange-500/20"
}`}
>

{bookedPlayer

? bookedPlayer.ingameName

: `Slot ${slot}`}

</button>

);

})}

</div>

<button
onClick={() =>
joinTournament(
selectedTournament
)
}
className="w-full mt-8 bg-orange-500 text-black py-3 md:py-4 rounded-2xl font-black text-sm md:text-base"
>
CONFIRM JOIN
</button>

</div>

</div>

)}
{/* RESULT POPUP */}

{
selectedResultTournament && (

<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4">

<div className="bg-[#111] w-full max-w-3xl rounded-[40px] p-5 md:p-8 border border-purple-500/20 max-h-[90vh] overflow-y-auto">

<div className="flex items-center justify-between mb-8">

<div>

<h2 className="text-4xl font-black text-purple-400">
PUBLISH MATCH RESULT
</h2>

{
isAdmin && (

<div className="bg-black rounded-2xl p-5 mb-8 border border-green-500/10">

<h3 className="text-2xl font-black text-green-400 mb-6">
PLAYER RESULT SUBMISSIONS
</h3>

<div className="space-y-4">

{
playerResults
.filter(
(item) =>
item.tournamentId ===
selectedResultTournament.id
)
.map((item) => (

<div
key={item.id}
className="bg-[#111] rounded-2xl p-4 border border-purple-500/10"
>

<div className="flex items-center justify-between gap-4 flex-wrap">

<div>

<p className="text-orange-400 font-black">
{item.playerName}
</p>

<p className="text-gray-400 text-sm">
Position:
#{item.position}
</p>

</div>

<a
href={item.screenshot}
target="_blank"
rel="noreferrer"
className="text-blue-400"
>
VIEW SCREENSHOT
</a>

<div className="flex gap-3">

<button
onClick={() =>
setMatchRanks({
...matchRanks,

[item.userId]: {
position:
item.position,
},
})
}
className="bg-green-500 text-black px-4 py-2 rounded-xl font-black"
>
APPROVE
</button>

<button
onClick={async () => {

await remove(
ref(
database,
`playerResults/${item.id}`
)
);

}}
className="bg-red-500 text-white px-4 py-2 rounded-xl font-black"
>
REJECT
</button>

</div>

</div>

</div>

))
}

</div>

</div>

)
}

</div>

<button
onClick={() =>
setSelectedResultTournament(
null
)
}
className="bg-red-500 px-5 py-2 rounded-2xl font-black"
>
CLOSE
</button>

</div>

<h3 className="text-3xl font-black mb-8">
  
  
{
selectedResultTournament
.tournamentTitle
}
</h3>
<div className="bg-black rounded-2xl p-5 mb-5 border border-purple-500/10">

<p className="text-purple-400 font-black mb-3">
RESULT FORMAT
</p>

<pre className="text-gray-400 text-sm whitespace-pre-wrap leading-7">
🥇 #1 - SOHRAB - 500 Coins

🥈 #2 - KING - 300 Coins

🥉 #3 - DEVIL - 200 Coins

#4 - ALPHA - 100 Coins
</pre>
</div>

<div className="space-y-4">

  {
!isAdmin && (

<div className="bg-black rounded-2xl p-5 mb-6 border border-green-500/10">

<h3 className="text-2xl font-black text-green-400 mb-5">
UPLOAD YOUR RESULT
</h3>

<input
type="number"
placeholder="Your Position"

value={resultPosition}

onChange={(e) =>
setResultPosition(
e.target.value
)
}

className="w-full bg-[#111] rounded-2xl px-5 py-4 outline-none mb-4"
/>

<input
type="file"

onChange={(e) =>
setResultScreenshot(
e.target.files[0]
)
}

className="w-full bg-[#111] rounded-2xl px-5 py-4 outline-none"
/>

{
resultScreenshot && (

<img
src={URL.createObjectURL(
resultScreenshot
)}
alt="preview"
className="w-full h-64 object-cover rounded-2xl mt-5 border border-green-500/20"
/>

)
}

<button
onClick={() =>
submitPlayerResult(
selectedResultTournament
)
}
className="w-full mt-5 bg-green-500 text-black py-4 rounded-2xl font-black"
>
SUBMIT RESULT
</button>

</div>

)
}

{
joinedPlayers
.filter(
(player) =>
player.tournamentId ===
selectedResultTournament.id
)
.map((player) => (

<div
key={player.id}
className="bg-black rounded-2xl p-5 border border-purple-500/10"
>

<div className="flex items-center justify-between gap-4">

<div>

<h3 className="text-xl font-black text-orange-400">
{player.ingameName}
</h3>

<p className="text-gray-400 text-sm">
UID:
{player.gameUid}
</p>

<p className="text-blue-400 text-sm">
SLOT:
{player.selectedSlot}
</p>

</div>

<select

value={
matchRanks[
player.id
]?.position || ""
}

onChange={(e) =>
setMatchRanks({
...matchRanks,

[player.id]: {
...matchRanks[
player.id
],

position:
e.target.value,
},
})
}

className="bg-[#111] px-4 py-3 rounded-2xl outline-none"
>

<option value="">
Position
</option>

{
Array.from({
length: Number(
selectedResultTournament.totalTeams
),
}).map((_, i) => (

<option
key={i}
value={i + 1}
>
#{i + 1}
</option>

))
}

</select>

</div>

</div>

))
}

</div>

<input
type="file"

onChange={(e) =>
setWinnerScreenshot(
e.target.files[0]
)
}

className="w-full mt-4 bg-black rounded-2xl px-5 py-4 outline-none"
/>

<button
onClick={async () => {

try {


let winnerImageUrl = "";

if (winnerScreenshot) {

const imageRef =
storageRef(
storage,
`winnerResults/${Date.now()}`
);

await uploadBytes(
imageRef,
winnerScreenshot
);

winnerImageUrl =
await getDownloadURL(
imageRef
);

}
const finalResults = [];

for (const key of Object.keys(matchRanks)) {

const position =
matchRanks[key]?.position;

const player =
joinedPlayers.find(
(p) => p.id === key
);

if (
Number(position) === 1
) {

if (player?.userId) {

await updateDoc(
doc(
db,
"users",
player.userId
),
{
wins: increment(1),
top3: increment(1),
}
);

}

}

if (
Number(position) === 2 ||
Number(position) === 3
) {

if (player?.userId) {

await updateDoc(
doc(
db,
"users",
player.userId
),
{
top3: increment(1),
}
);

}

}

finalResults.push({

name:
player?.ingameName,

uid:
player?.gameUid,

position,

});

}

await push(
ref(
database,
"matchResults"
),

{
tournamentTitle:
selectedResultTournament
.tournamentTitle,

tournamentType:
selectedResultTournament
.tournamentType,

map:
selectedResultTournament
.selectedMap,



results:
finalResults,

screenshot:
winnerImageUrl ||
"No Screenshot",

createdAt:
new Date()
.toLocaleString(),
completed: "true",
}
);

await remove(
ref(
database,
"liveTournaments/" +
selectedResultTournament.id
)
);

alert(
"Result Published 🔥"
);

setMatchRanks({});

setWinnerScreenshot(null);

setSelectedResultTournament(
null
);

} catch (error) {

alert(error.message);

}

}}
className="w-full mt-8 bg-purple-500 text-black py-3 md:py-4 rounded-2xl font-black text-sm md:text-base"
>
PUBLISH RESULT
</button>

</div>

</div>

)}
{/* WALLET POPUP */}

{
showWallet && user && (

<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4">

  <div className="bg-[#111] w-full max-w-4xl rounded-[40px] p-5 md:p-8 border border-orange-500/20 max-h-[90vh] overflow-y-auto">

    <div className="flex items-center justify-between mb-8">

      <h2 className="text-4xl font-black text-orange-500">
        MY WALLET
      </h2>

      <button
        onClick={() =>
          setShowWallet(false)
        }
        className="bg-red-500 px-5 py-2 rounded-2xl font-black"
      >
        CLOSE
      </button>

    </div>

    <div className="bg-black rounded-3xl p-8 text-center border border-orange-500/10">

      <p className="text-gray-400 text-lg">
        AVAILABLE BALANCE
      </p>

      <h1 className="text-6xl font-black text-orange-500 mt-3">
        🪙 {coins}
      </h1>

    </div>

    <div className="grid md:grid-cols-2 gap-8 mt-10">

      <div className="bg-black rounded-3xl p-6 border border-orange-500/10">

        <h3 className="text-3xl font-black text-orange-500 mb-6">
          ADD COINS
        </h3>

        <img
          src={paymentQR}
          alt="QR"
          className="w-52 mx-auto rounded-3xl border border-orange-500/20"
        />

        <p className="text-center text-green-400 mt-5 font-bold">
          919131793234@waaxis
        </p>

        <input
          type="text"
          placeholder="Enter UTR Number"
          value={utrNumber}
          onChange={(e) =>
            setUtrNumber(
              e.target.value
            )
          }
          className="w-full mt-6 bg-[#111] rounded-2xl px-5 py-4 outline-none"
        />

        <input
          type="file"
          onChange={(e) =>
            setPaymentScreenshot(
              e.target.files[0]
            )
          }
          className="w-full mt-4 bg-[#111] rounded-2xl px-5 py-4 outline-none"
        />

        <input
          type="number"
          placeholder="Coins Amount"
          value={topupAmount}
          onChange={(e) =>
            setTopupAmount(
              e.target.value
            )
          }
          className="w-full mt-4 bg-[#111] rounded-2xl px-5 py-4 outline-none"
        />

        <button
          onClick={selfTopup}
          className="w-full mt-6 bg-orange-500 text-black py-4 rounded-2xl font-black"
        >
          ADD COINS
        </button>

      </div>

      <div className="bg-black rounded-3xl p-6 border border-green-500/10">

        <h3 className="text-3xl font-black text-green-400 mb-6">
          WITHDRAW
        </h3>

        <input
          type="number"
          placeholder="Withdraw Amount"
          value={withdrawAmount}
          onChange={(e) =>
            setWithdrawAmount(
              e.target.value
            )
          }
          className="w-full bg-[#111] rounded-2xl px-5 py-4 outline-none"
        />

        <input
          type="text"
          placeholder="Your UPI ID"
          value={withdrawUpi}
          onChange={(e) =>
            setWithdrawUpi(
              e.target.value
            )
          }
          className="w-full mt-4 bg-[#111] rounded-2xl px-5 py-4 outline-none"
        />

        <button
          onClick={withdrawRequest}
          className="w-full mt-6 bg-green-500 text-black py-3 md:py-4 rounded-2xl font-black text-sm md:text-base"
        >
          WITHDRAW NOW
        </button>

        <div className="mt-8">

          <h4 className="text-xl font-black mb-4">
            RECENT REQUESTS
          </h4>

          <div className="space-y-3">

            {withdrawRequests
              .filter(
                (item) =>
                  item.userId ===
                  user.uid
              )
              .map((item) => (

                <div
                  key={item.id}
                  className="bg-[#111] rounded-2xl p-4"
                >

                  <p>
                    💰 {item.amount} Coins
                  </p>

                  <p className="text-orange-400">
                    {item.status}
                  </p>

                </div>

              ))}

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

)}
{/* MANUAL COINS SYSTEM */}

{isAdmin && (

<section className="max-w-5xl mx-auto px-6 py-10">

<div className="bg-[#111] rounded-[40px] p-10 border border-green-500/10">

<h2 className="text-4xl font-black text-green-400 mb-8">
MANUAL COINS ADD
</h2>

<div className="grid md:grid-cols-2 gap-6">

<input
type="text"
placeholder="User UID"

value={manualUid}

onChange={(e) =>
setManualUid(
e.target.value
)
}

className="bg-black rounded-2xl px-5 py-4 outline-none"
/>

<input
type="number"
placeholder="Coins Amount"

value={manualCoins}

onChange={(e) =>
setManualCoins(
e.target.value
)
}

className="bg-black rounded-2xl px-5 py-4 outline-none"
/>

</div>

<button
onClick={async () => {

try {

const userDoc =
doc(
db,
"users",
manualUid
);

await updateDoc(
userDoc,
{
coins: increment(
Number(
manualCoins
)
),
}
);

alert(
"Coins Added Successfully 🔥"
);

setManualUid("");
setManualCoins("");

} catch (error) {

alert(error.message);

}
}}
className="w-full mt-8 bg-green-500 text-black py-4 rounded-2xl font-black"
>
ADD COINS
</button>

</div>

</section>

)}


{/* PAYMENT REQUESTS */}
<div className="flex gap-4 overflow-x-auto mb-8">

<button
onClick={() =>
setAdminPage("topup")
}
className={`px-6 py-3 rounded-2xl font-black whitespace-nowrap ${
adminPage === "topup"
? "bg-orange-500 text-black"
: "bg-black text-white border border-orange-500/20"
}`}
>
TOPUP REQUESTS
</button>

<button
onClick={() =>
setAdminPage("withdraw")
}
className={`px-6 py-3 rounded-2xl font-black whitespace-nowrap ${
adminPage === "withdraw"
? "bg-green-500 text-black"
: "bg-black text-white border border-green-500/20"
}`}
>
WITHDRAW REQUESTS
</button>

</div>

{isAdmin &&
adminPage === "topup" && (

  <section className="max-w-5xl mx-auto px-6 py-20">

    <div className="bg-[#111] rounded-[40px] p-10">

      <h2 className="text-4xl font-black text-orange-500 mb-10">
        PAYMENT REQUESTS
      </h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">

  <input
    type="text"
    placeholder="Search ID / Email"
    value={searchQuery}
    onChange={(e) =>
      setSearchQuery(
        e.target.value
      )
    }
    className="bg-black rounded-2xl px-5 py-4 outline-none"
  />

  <input
    type="date"
    value={fromDate}
    onChange={(e) =>
      setFromDate(
        e.target.value
      )
    }
    className="bg-black rounded-2xl px-5 py-4 outline-none"
  />

  <input
    type="date"
    value={toDate}
    onChange={(e) =>
      setToDate(
        e.target.value
      )
    }
    className="bg-black rounded-2xl px-5 py-4 outline-none"
  />

</div>

      <div className="space-y-6 max-h-[700px] overflow-y-auto pr-2">

        {paymentRequests
.filter((item) => {

  const matchSearch =
    item.email
      ?.toLowerCase()
      .includes(
        searchQuery.toLowerCase()
      ) ||
    item.requestId
      ?.toLowerCase()
      .includes(
        searchQuery.toLowerCase()
      );

  return matchSearch;

})
.map(
          (item) => (

            <div
              key={item.id}
              className="bg-black p-6 rounded-3xl"
            >
<p className="text-orange-400">
  ID:
  {item.requestId}
</p>
              <p>
                Email:
                {item.email}
              </p>

              <p>
                Amount:
                {item.amount}
              </p>

              <p>
                UTR:
                {item.utr}
              </p>
              <p className="text-blue-400 break-all">
  UID:
  {item.userUid}
</p>

<a
  href={item.screenshot}
  target="_blank"
  rel="noreferrer"
  className="text-orange-400 block break-all mt-4"
>
  📸 VIEW PAYMENT SCREENSHOT
</a>

<p className="text-blue-400">
  Date:
  {item.createdAt}
</p>
              <p>
                Status:
                {item.status}
              </p>
              <button
  onClick={async () => {

    try {

      await updateDoc(
        doc(
          db,
          "users",
          item.userId
        ),
        {
          coins: increment(
            Number(
              item.amount
            )
          ),
        }
      );

      await remove(
  ref(
    database,
    `paymentRequests/${item.id}`
  )
);

      alert(
        "Coins Added Successfully 🔥"
      );

    } catch (error) {

      alert(error.message);

    }

  }}
  className="mt-4 bg-green-500 text-black px-6 py-3 rounded-2xl font-black"
>
  APPROVE
</button>
<button
  onClick={async () => {

    try {

      await update(
        ref(
          database,
          `paymentRequests/${item.id}`
        ),
        {
          status:
            "REJECTED",
        }
      );

      alert(
        "Payment Rejected ❌"
      );

    } catch (error) {

      alert(error.message);

    }

  }}
  className="mt-4 ml-4 bg-red-500 text-white px-6 py-3 rounded-2xl font-black"
>
  REJECT
</button>

            </div>

          )
        )}

      </div>

    </div>

  </section>

)}
{/* WITHDRAW REQUESTS */}

{isAdmin &&
adminPage === "withdraw" && (

<section className="max-w-5xl mx-auto px-6 py-20">

  <div className="bg-[#111] rounded-[40px] p-10">

    <h2 className="text-4xl font-black text-green-400 mb-10">
      WITHDRAW REQUESTS
    </h2>

    <div className="grid md:grid-cols-3 gap-4 mb-8">

<input
type="text"
placeholder="Search ID / Email"
value={searchWithdraw}
onChange={(e) =>
setSearchWithdraw(
e.target.value
)
}
className="bg-black rounded-2xl px-5 py-4 outline-none"
/>

<input
type="date"
value={withdrawFromDate}
onChange={(e) =>
setWithdrawFromDate(
e.target.value
)
}
className="bg-black rounded-2xl px-5 py-4 outline-none"
/>

<input
type="date"
value={withdrawToDate}
onChange={(e) =>
setWithdrawToDate(
e.target.value
)
}
className="bg-black rounded-2xl px-5 py-4 outline-none"
/>

</div>

    <div className="space-y-6 max-h-[700px] overflow-y-auto pr-2">

      {withdrawRequests
.filter((item) => {

const matchSearch =
  item.email
    ?.toLowerCase()
    .includes(
      searchWithdraw.toLowerCase()
    ) ||

  item.requestId
    ?.toLowerCase()
    .includes(
      searchWithdraw.toLowerCase()
    );
const itemDate =
  new Date(
    item.createdAt
  );

const from =
  withdrawFromDate
    ? new Date(
        withdrawFromDate
      )
    : null;

const to =
  withdrawToDate
    ? new Date(
        withdrawToDate
      )
    : null;

const matchDate =
  (!from || itemDate >= from) &&
  (!to || itemDate <= to);

return (
  matchSearch &&
  matchDate
);

})
.map(
        (item) => (

          <div
            key={item.id}
            className="bg-black p-6 rounded-3xl"
          >

            <p>
              Email:
              {item.email}
            </p>

            <p>
              Amount:
              {item.amount}
            </p>

            <p>
              UPI:
              {item.upi}
            </p>

            <p className="text-blue-400 break-all">
  UID:
  {item.userUid}
</p>

<p className="text-blue-400">
  Date:
  {item.createdAt}
</p>

            <p>
              Status:
              {item.status}
            </p>

            <button
              onClick={async () => {

                try {

                  await update(
                    ref(
                      database,
                      `withdrawRequests/${item.id}`
                    ),
                    {
                      status:
                        "COMPLETED",
                    }
                  );

                  alert(
                    "Withdraw Completed ✅"
                  );

                } catch (error) {

                  alert(error.message);

                }

              }}
              className="mt-4 bg-green-500 text-black px-6 py-3 rounded-2xl font-black"
            >
              COMPLETE
            </button>

          </div>

        )
      )}

    </div>

  </div>

</section>

)}
{/* MATCH RESULTS */}

<section className="max-w-7xl mx-auto px-6 py-20">

<h2 className="text-5xl font-black text-purple-400 mb-12">
MATCH RESULTS
</h2>

<div className="grid md:grid-cols-3 gap-8">

{[...matchResults]
.reverse()
.map((item) => (

<div
key={item.id}
className="bg-[#111] rounded-[35px] p-8 border border-purple-500/10"
>

<div className="flex justify-between mb-6">

<span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-black">
COMPLETED
</span>

<span>
{item.tournamentType}
</span>

</div>

<h3 className="text-3xl font-black mb-4">
{item.tournamentTitle}
</h3>

<p className="text-blue-400 font-bold mb-4">
🗺️ {item.map}
</p>

<div className="space-y-3 mt-5">

{
item.results
?.sort(
(a, b) =>
Number(a.position) -
Number(b.position)
)
.map((player, index) => (

<div
key={index}
className={`rounded-2xl px-4 py-4 flex justify-between items-center border

${Number(player.position) === 1

? "bg-yellow-500/20 border-yellow-400"

: Number(player.position) === 2

? "bg-gray-400/20 border-gray-300"

: Number(player.position) === 3

? "bg-orange-700/20 border-orange-500"

: "bg-black border-purple-500/10"

}
`}
>

<div>

<p className="text-orange-400 font-black text-lg">

{
Number(player.position) === 1

? "🥇"

: Number(player.position) === 2

? "🥈"

: Number(player.position) === 3

? "🥉"

: "🎮"

}

{" "}
#{player.position}

{" "}

{player.name}

</p>
<p className="text-gray-400 text-sm">
UID:
{player.uid}
</p>

</div>

</div>

))
}

</div>

<a
href={item.screenshot}
target="_blank"
rel="noreferrer"
className="text-purple-400 mt-4 block break-all"
>
📸 VIEW SCREENSHOT
</a>

<p className="text-gray-500 mt-4 text-sm">
{item.createdAt}
</p>

</div>

))}

</div>

</section>
      {/* CREATE TOURNAMENT */}

      {isAdmin && (

        <section className="max-w-5xl mx-auto px-6 py-20">

          <div className="bg-[#111] rounded-[40px] p-10">

            <h2 className="text-5xl font-black text-orange-500 text-center mb-10">
              CREATE TOURNAMENT
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                placeholder="Tournament Title"
                value={
                  tournamentTitle
                }
                onChange={(e) =>
                  setTournamentTitle(
                    e.target.value
                  )
                }
                className="bg-black rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="number"
                placeholder="Entry Fee (Coins)"
                value={entryFee}
                onChange={(e) =>
                  setEntryFee(
                    e.target.value
                  )
                }
                className="bg-black rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="number"
                placeholder="Joined Players"
                value={totalTeams}
                onChange={(e) =>
                  setTotalTeams(
                    e.target.value
                  )
                }
                className="bg-black rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="time"
                placeholder="Match Time"
                value={matchTime}
                onChange={(e) =>
                  setMatchTime(
                    e.target.value
                  )
                }
                className="bg-black rounded-2xl px-5 py-4 outline-none"
              />
              <input
                type="date"
                placeholder="Match Date"
                value={matchDate}
                onChange={(e) =>
                  setMatchDate(
                    e.target.value
                  )
                }
                className="bg-black rounded-2xl px-5 py-4 outline-none"
              />
             <select

  value={tournamentType}

  onChange={(e) =>
    setTournamentType(
      e.target.value
    )
  }

  className="bg-black rounded-2xl px-5 py-4 outline-none"
>

  <option value="SOLO">
    SOLO
  </option>

  <option value="DUO">
    DUO
  </option>

  <option value="SQUAD">
    SQUAD
  </option>

  <option value="1V1">
    1V1
  </option>

  <option value="1V2">
    1V2
  </option>

  <option value="3V3">
    3V3
  </option>

  <option value="4V4">
    4V4
  </option>

</select>
<select

  value={selectedMap}

  onChange={(e) =>
    setSelectedMap(
      e.target.value
    )
  }

  className="bg-black rounded-2xl px-5 py-4 outline-none"
>

  <option>
    Bermuda
  </option>

  <option>
    Bermuda 2.0
  </option>

  <option>
    Kalahari
  </option>

  <option>
    Purgatory
  </option>

  <option>
    Alpine
  </option>

  <option>
    Nexterra
  </option>

</select>
{(
  tournamentType ===
    "1V1" ||

  tournamentType ===
    "1V2" ||

  tournamentType ===
    "3V3" ||

  tournamentType ===
    "4V4"
) && (

<>

  <input
    type="number"
    placeholder="Number Of Winners"
    value={customWinners}
    onChange={(e) =>
      setCustomWinners(
        e.target.value
      )
    }
    className="bg-black rounded-2xl px-5 py-4 outline-none"
  />

  <input
    type="number"
    placeholder="Prize Per Winner"
    value={customPrize}
    onChange={(e) =>
      setCustomPrize(
        e.target.value
      )
    }
    className="bg-black rounded-2xl px-5 py-4 outline-none"
  />

</>

)}

            </div>

            {/* AUTO DISTRIBUTION */}

            <div className="mt-10 bg-black rounded-3xl p-8 border border-orange-500/10">

              <h3 className="text-3xl font-black text-orange-500 mb-6">
                AUTO PRIZE DISTRIBUTION
              </h3>

              <div className="space-y-4 text-xl">

                <div className="flex justify-between">
                  <span>
                    Admin Profit
                  </span>

                  <span className="text-yellow-400">
                    {adminProfit} Coins
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    Prize Pool
                  </span>

                  <span className="text-orange-500">
                    {totalPrizePool} Coins
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    Top 1
                  </span>

                  <span>
                    {top1} Coins
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    Top 2
                  </span>

                  <span>
                    {top2} Coins
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    Top 3
                  </span>

                  <span>
                    {top3} Coins
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    Top 4-
{
  Number(totalTeams)> 0
    ? Math.floor(
        Number(totalTeams) *
        0.42
      )
    : 0
}
                  </span>

                  <span className="text-green-400">
                    {perPlayerPrize} Coins each
                  </span>
                </div>

              </div>

            </div>

            <button
              onClick={
                createTournament
              }
              className="w-full mt-10 bg-orange-500 text-black py-5 rounded-2xl text-xl font-black"
            >
              CREATE TOURNAMENT
            </button>

          </div>

        </section>

            )}

      {/* LOGIN POPUP */}

      {showLogin && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-[#111] p-8 rounded-3xl w-[400px] border border-orange-500/20">

            <h2 className="text-3xl font-black text-orange-500 mb-6 text-center">
              LOGIN
            </h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-black p-4 rounded-2xl mb-4 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-black p-4 rounded-2xl mb-6 outline-none"
            />

            <button
              onClick={loginUser}
              className="w-full bg-orange-500 text-black py-4 rounded-2xl font-black"
            >
              LOGIN
            </button>

          </div>

        </div>

      )}

      {/* REGISTER POPUP */}

      {showRegister && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-[#111] p-8 rounded-3xl w-[400px] border border-orange-500/20">

            <h2 className="text-3xl font-black text-orange-500 mb-6 text-center">
              REGISTER
            </h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-black p-4 rounded-2xl mb-4 outline-none"
            />
<input
  type="text"
  placeholder="Player Name"
  value={playerName}
  onChange={(e) =>
    setPlayerName(
      e.target.value
    )
  }
  className="w-full bg-black p-4 rounded-2xl mb-4 outline-none"
/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-black p-4 rounded-2xl mb-6 outline-none"
            />

            <button
              onClick={registerUser}
              className="w-full bg-orange-500 text-black py-4 rounded-2xl font-black"
            >
              CREATE ACCOUNT
            </button>

          </div>

        </div>

      )}

    </div>
  );
}