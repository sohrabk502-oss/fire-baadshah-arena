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
  get
} from "firebase/database";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import {
getToken
} from "firebase/messaging";

import {
  doc,
  onSnapshot,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";

import {
  db,
  storage,
  messaging
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
import notificationSound from "./assets/notification.mp3";

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

const [searchUid,
setSearchUid] =
useState("");

const [searchedUser,
setSearchedUser] =
useState(null);

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

  const [showNotifications,
setShowNotifications] =
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

const [leaderboard,
setLeaderboard] =
useState([]);

const [analytics,
setAnalytics] =
useState({

  

totalUsers: 0,

totalTournaments: 0,

totalDeposits: 0,

totalWithdrawals: 0,

liveMatches: 0,

pendingTopups: 0,

pendingWithdraws: 0,

adminRevenue: 0,

});

const [resultAnalytics,
setResultAnalytics] =
useState({

totalSubmitted: 0,

totalApproved: 0,

totalRejected: 0,

pendingResults: 0,

totalPrizeDistributed: 0,

top1Player: "",

top2Player: "",

top3Player: "",

});

const [maintenanceMode,
setMaintenanceMode] =
useState(false);

const userMatchesPlayed =
joinedHistory.filter(
(item) =>
item.userEmail ===
user?.email
).length;

const userWins =
playerData?.wins || 0;

const userTop3 =
playerData?.top3 || 0;

const userWinRate =
userMatchesPlayed > 0

? (
(userWins /
userMatchesPlayed) *
100
).toFixed(1)

: 0;

const userTotalEarnings =
(userWins * 500) +
(userTop3 * 100);

const userTotalCoinsWon =
userTotalEarnings;

const userAvgPlacement =

userMatchesPlayed > 0

? (
(
(userWins * 1) +
(userTop3 * 3)
) /
userMatchesPlayed
).toFixed(1)

: 0;

const userKD =
(
(
userWins * 3 +
userTop3
) /

(userMatchesPlayed || 1)
).toFixed(2);

const userMVP =
Math.floor(
userWins / 2
);

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

const [notifications,
setNotifications] =
useState([]);

const playNotificationSound = () => {

const audio =
new Audio(
notificationSound
);

audio.volume = 1.0;

audio.play();

};

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

    // ADMIN PROFIT 18%
    const profit =
      totalCollection * 0.18;

    // FINAL PRIZE POOL
    const prizePool =
      totalCollection - profit;

    

    // SAVE STATES

    setAdminProfit(
      profit.toFixed(2)
    );

    setTotalPrizePool(
      prizePool.toFixed(2)
    );
        const mode =
tournamentType;

if (
mode === "SOLO"
) {

setTop1(
Math.floor(
prizePool * 0.18
)
);

}

else if (
mode === "DUO"
) {

setTop1(
Math.floor(
prizePool / 2
)
);

}

else if (
mode === "3V3"
) {

setTop1(
Math.floor(
prizePool / 3
)
);

}

else if (
mode === "SQUAD" ||
mode === "4V4"
) {

setTop1(
Math.floor(
prizePool / 4
)
);

}

else if (
mode === "1V1"
) {

setTop1(
Math.floor(
prizePool
)
);

}

else if (
mode === "1V2"
) {

setTop1(
Math.floor(
prizePool / 2
)
);

}
    

  }, [
entryFee,
totalTeams,
tournamentType
]);

  // ================= PUSH NOTIFICATIONS =================

useEffect(() => {

const requestPermission =
async () => {

try {

const permission =
await Notification.requestPermission();

if (
!("serviceWorker" in navigator)
) {
return;
}

if (
permission ===
"granted"
) {

await navigator.serviceWorker.register(
"/firebase-messaging-sw.js"
);

const registration =
await navigator.serviceWorker.ready;

console.log(
"SERVICE WORKER READY"
);

const token =
await getToken(
messaging,
{
vapidKey:
"BCAjW1ZCBKvhXkLPxe5imNSAptbkHEnrGHHISW2RUDj33RJj9JnLVgF7SjEHbKUgCObuZ6OicaSE9JMPyIJz944",

serviceWorkerRegistration:
registration,
}
);

console.log(
"PUSH TOKEN:",
token
);

if (
token &&
user
) {

await update(
ref(
database,
`users/${user.uid}`
),
{
pushToken:
token,
}
);

}

}

} catch (err) {

console.log(err);

}

};

setTimeout(() => {

// requestPermission();

}, 3000);

}, [user]);

  // ================= AUTH STATE =================

 useEffect(() => {

const unsubscribe =
onAuthStateChanged(

auth,

async (currentUser) => {

if (currentUser) {

const userDoc =
await getDoc(
doc(
db,
"users",
currentUser.uid
)
);

if (
userDoc.exists() &&
userDoc.data().blocked
) {

alert(
"Your Account Has Been Blocked 🚫"
);

await signOut(auth);

setUser(null);

setIsAdmin(false);

return;

}

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

// ================= MAINTENANCE MODE =================

useEffect(() => {

const maintenanceRef =
ref(
database,
"settings/maintenance"
);

onValue(
maintenanceRef,
(snapshot) => {

setMaintenanceMode(
snapshot.val() || false
);

}
);

}, []);

// ================= ADMIN ANALYTICS =================

useEffect(() => {

const usersRef =
ref(
database,
"users"
);

const tournamentsRef =
ref(
database,
"liveTournaments"
);

onValue(
usersRef,
(usersSnap) => {

const usersData =
usersSnap.val();

const totalUsers =
usersData

? Object.keys(
usersData
).length

: 0;

onValue(
tournamentsRef,
(tournamentSnap) => {

const tournamentData =
tournamentSnap.val();

const tournaments =
tournamentData

? Object.values(
tournamentData
)

: [];

const totalTournaments =
tournaments.length;

const liveMatches =
tournaments.filter(
(item) => {

  if (
!item.matchDate ||
!item.matchTime
) {
return false;
}

const now =
new Date();

if (
!item.matchDate ||
!item.matchTime
) {
return false;
}

const tournamentTime =
new Date(
`${item.matchDate}T${item.matchTime}`
);

const diff =
(
tournamentTime -
now
) /
1000 /
60;

return (
diff <= 10 &&
diff > -7200
);

}
).length;

const adminRevenue =
tournaments.reduce(
(total, item) =>

total +
Number(
item.adminProfit || 0
),

0
);

const totalDeposits =
paymentRequests

.filter(
(item) =>
item.status ===
"APPROVED"
)

.reduce(
(total, item) =>

total +
Number(
item.amount || 0
),

0
);

const totalWithdrawals =
withdrawRequests

.filter(
(item) =>
item.status ===
"APPROVED"
)

.reduce(
(total, item) =>

total +
Number(
item.amount || 0
),

0
);

const pendingTopups =
paymentRequests.filter(
(item) =>
item.status ===
"PENDING"
).length;

const pendingWithdraws =
withdrawRequests.filter(
(item) =>
item.status ===
"PENDING"
).length;

setAnalytics({

totalUsers,

totalTournaments,

totalDeposits,

totalWithdrawals,

liveMatches,

pendingTopups,

pendingWithdraws,

adminRevenue:
adminRevenue.toFixed(0),

});

}
);

}
);

}, [
paymentRequests,
withdrawRequests
]);

// ================= LEADERBOARD =================

useEffect(() => {

const usersRef =
ref(
database,
"users"
);

onValue(
usersRef,
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

const sorted =
loadedData.sort(
(a, b) => {

if (
(b.wins || 0) !==
(a.wins || 0)
) {

return (
(b.wins || 0) -
(a.wins || 0)
);

}

return (
(b.top3 || 0) -
(a.top3 || 0)
);

}
);

setLeaderboard(
sorted
);

}

}
);

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

// ================= FETCH NOTIFICATIONS =================

useEffect(() => {

if (!user) return;

const notifRef =
ref(
database,
`notifications/${user.uid}`
);

onValue(
notifRef,
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

setNotifications(
loadedData.reverse()
);
const unseenNotifications =
loadedData.filter(
(item) => !item.seen
);

if (
unseenNotifications.length === 0
) {
return;
}

playNotificationSound();

const latest =
loadedData[0];

if (
Notification.permission ===
"granted"
) {

new Notification(
latest.title,
{
body:
latest.message,
}
);

}

} else {

setNotifications([]);

}

}
);

}, [user]);

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

  if (
Notification.permission !==
"granted"
) {

Notification.requestPermission();

}

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
const approved =
loadedData.filter(
(item) =>
item.approved === true
);

const pending =
loadedData.filter(
(item) =>
!item.approved
);

const top1 =
approved.find(
(item) =>
Number(
item.approvedPosition
) === 1
);

const top2 =
approved.find(
(item) =>
Number(
item.approvedPosition
) === 2
);

const top3 =
approved.find(
(item) =>
Number(
item.approvedPosition
) === 3
);

const totalPrize =
approved.reduce(
(total, item) =>

total +
Number(
item.winCoins || 0
),

0
);

setResultAnalytics({

totalSubmitted:
loadedData.length,

totalApproved:
approved.length,

totalRejected:
0,

pendingResults:
pending.length,

totalPrizeDistributed:
totalPrize,

top1Player:
top1?.playerName || "",

top2Player:
top2?.playerName || "",

top3Player:
top3?.playerName || "",

});

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
       const userDoc =
await getDoc(
doc(
db,
"users",
userCredential.user.uid
)
);

if (
userDoc.exists() &&
userDoc.data().blocked
) {

alert(
"Your Account Is Blocked 🚫"
);

await signOut(auth);

return;

}

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
console.log("TOPUP STARTED");
      if (!user) {

        alert("Login Required");

        return;

      }
if (
  !topupAmount ||
  !utrNumber
) {

  alert(
    "Fill All Payment Details"
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
console.log(paymentScreenshot);


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
"No Screenshot",

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

try {

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

} catch (err) {

console.log(
"Telegram Error",
err
);

}
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

            requestTime:
new Date().toLocaleString(),

completedTime:
"",

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

try {

const response =
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

const data =
await response.json();

console.log(
"WITHDRAW TELEGRAM:",
data
);

} catch (err) {

console.log(
"Telegram Error",
err
);

}

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

const formData =
new FormData();

formData.append(
"chat_id",
"5948674075"
);

formData.append(
"photo",
resultScreenshot
);

formData.append(
"caption",

`🏆 RESULT SUBMISSION

👤 Player:
${playerData?.name}

🎮 Tournament:
${tournament.tournamentTitle}

📍 Position:
#${resultPosition}`

);

await fetch(

`https://api.telegram.org/bot8623121660:AAHxymJn6WWf5wGtASxT0o3xOJE7Lw188OI/sendPhoto`,

{
method: "POST",
body: formData,
}

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
"TELEGRAM",

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
const searchUserProfile =
async () => {

try {

const userDoc =
await getDoc(
doc(
db,
"users",
searchUid
)
);

if (
userDoc.exists()
) {

setSearchedUser(
userDoc.data()
);

} else {

alert(
"User Not Found ❌"
);

}

} catch (err) {

console.log(err);

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

     // ================= LIVE PRIZE POOL UPDATE =================

const joinedCount =

joinedPlayers.filter(
(player) =>

player.tournamentId ===
tournament.id

).length + 1;

// TEAM MULTIPLIER

let multiplier = 1;

if (
tournament.tournamentType ===
"DUO"
) {

multiplier = 2;

}

else if (

tournament.tournamentType ===
"SQUAD" ||

tournament.tournamentType ===
"4V4"

) {

multiplier = 4;

}

else if (
tournament.tournamentType ===
"3V3"
) {

multiplier = 3;

}

else if (
tournament.tournamentType ===
"1V2"
) {

multiplier = 2;

}

// REAL PLAYER COUNT

const realPlayerCount =
joinedCount * multiplier;

// TOTAL COLLECTION

const totalCollection =

Number(
tournament.entryFee
) * realPlayerCount;

// ADMIN PROFIT

const adminProfit =

Math.floor(
totalCollection * 0.18
);

// FINAL PRIZE POOL

const currentPrizePool =

Math.floor(
totalCollection -
adminProfit
);

// UPDATE LIVE TOURNAMENT

await update(

ref(
database,
`liveTournaments/${tournament.id}`
),

{

joinedCount,

realPlayerCount,

currentPrizePool,

currentAdminProfit:
adminProfit,

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
            joinedCount: 0,
currentPrizePool: 0,
currentAdminProfit: 0,
            

            roomId: "",
            roomPassword: "",

resultPublished: false,

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
if (
maintenanceMode &&
!isAdmin
) {

return (

<div className="bg-black min-h-screen flex items-center justify-center px-6">

<div className="text-center">

<h1 className="text-6xl font-black text-orange-500">
🚧
</h1>

<h2 className="text-5xl font-black text-white mt-6">
SERVER UNDER
MAINTENANCE
</h2>

<p className="text-gray-400 mt-6 text-xl">
Please come back later.
</p>

</div>

</div>

);

}
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

<div className="relative">

<button

onClick={() =>
setShowNotifications(
true
)
}

className="bg-yellow-500/20 text-yellow-400 px-5 py-2 rounded-2xl font-black"
>

🔔

{
notifications.filter(
(item) =>
!item.seen
).length
}

</button>

</div>

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

{/* NOTIFICATIONS */}

{
notifications.filter(
(item) => !item.seen
).length > 0 && (

<div className="fixed top-24 right-4 z-50 space-y-3">

{notifications
.slice(0, 3)
.map((item) => (

<div
key={item.id}
onClick={async () => {

await update(
ref(
database,
`notifications/${user.uid}/${item.id}`
),
{
seen: true,
}
);

}}


className="bg-[#111] border border-yellow-500/20 rounded-2xl p-4 w-80 shadow-xl"
>

<h3 className="text-yellow-400 font-black">
{item.title}
</h3>

<p className="text-gray-300 text-sm mt-2">
{item.message}
</p>

<p className="text-gray-500 text-xs mt-2">
{item.time}
</p>

</div>

))}

</div>

)
}

{/* NOTIFICATION HISTORY */}

{
showNotifications && (

<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4">

<div className="bg-[#111] w-full max-w-3xl rounded-[40px] p-5 md:p-8 border border-yellow-500/20 max-h-[90vh] overflow-y-auto">

<div className="flex items-center justify-between mb-8">

<h2 className="text-4xl font-black text-yellow-400">
NOTIFICATIONS
</h2>

<button
onClick={() =>
setShowNotifications(
false
)
}
className="bg-red-500 px-5 py-2 rounded-2xl font-black"
>
CLOSE
</button>

</div>

<div className="space-y-4">

{
notifications.length > 0 ? (

notifications.map((item) => (

<div

key={item.id}

onClick={async () => {

await update(
ref(
database,
`notifications/${user.uid}/${item.id}`
),
{
seen: true,
}
);

}}

className={`rounded-3xl p-5 border cursor-pointer duration-300 ${
item.seen

? "bg-black border-gray-700"

: "bg-yellow-500/10 border-yellow-500/20"
}`}

>

<div className="flex items-center justify-between">

<h3 className="text-xl font-black text-yellow-400">
{item.title}
</h3>

{
!item.seen && (

<span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
NEW
</span>

)
}

</div>

<p className="text-gray-300 mt-3">
{item.message}
</p>

<p className="text-gray-500 text-sm mt-4">
{item.time}
</p>

</div>

))

) : (

<div className="text-center py-20">

<h3 className="text-3xl font-black text-gray-500">
NO NOTIFICATIONS
</h3>

</div>

)
}

</div>

</div>

</div>

)
}

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

      {
isAdmin && (

<section className="max-w-7xl mx-auto px-6 py-10">

<h2 className="text-5xl font-black text-red-400 mb-10">
📊 RESULT ANALYTICS
</h2>

<div className="grid md:grid-cols-4 gap-6">

<div className="bg-[#111] rounded-3xl p-6 border border-orange-500/10">

<p className="text-gray-400">
Total Submitted
</p>

<h3 className="text-4xl font-black text-orange-500 mt-4">
{resultAnalytics.totalSubmitted}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-green-500/10">

<p className="text-gray-400">
Approved Results
</p>

<h3 className="text-4xl font-black text-green-400 mt-4">
{resultAnalytics.totalApproved}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-yellow-500/10">

<p className="text-gray-400">
Pending Results
</p>

<h3 className="text-4xl font-black text-yellow-400 mt-4">
{resultAnalytics.pendingResults}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-purple-500/10">

<p className="text-gray-400">
Prize Distributed
</p>

<h3 className="text-4xl font-black text-purple-400 mt-4">
🪙 {resultAnalytics.totalPrizeDistributed}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-yellow-500/20">

<p className="text-gray-400">
🥇 TOP 1
</p>

<h3 className="text-2xl font-black text-yellow-400 mt-4">
{resultAnalytics.top1Player}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-gray-500/20">

<p className="text-gray-400">
🥈 TOP 2
</p>

<h3 className="text-2xl font-black text-gray-300 mt-4">
{resultAnalytics.top2Player}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-orange-500/20">

<p className="text-gray-400">
🥉 TOP 3
</p>

<h3 className="text-2xl font-black text-orange-400 mt-4">
{resultAnalytics.top3Player}
</h3>

</div>

</div>

</section>

)
}

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
        key={mode.name}
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
🔥 {selectedMode} UPCOMING MATCHES
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
className="bg-[#111] rounded-[35px] p-6 border border-green-500/10 hover:border-green-500/30 duration-300"
>

{/* TOP */}

<div className="flex items-center justify-between mb-5">

<span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-black">
UPCOMING
</span>

<span className="text-gray-400 font-bold">
🕒 {item.matchTime}
</span>

</div>

{/* TITLE */}

<h3 className="text-3xl font-black mb-3">
{item.tournamentTitle}
</h3>

<p className="text-orange-400 font-bold mb-2">
🎮 {item.tournamentType}
</p>

<p className="text-blue-400 font-bold mb-6">
🗺️ {item.selectedMap}
</p>

{/* INFO */}

<div className="space-y-4 text-lg">

<div className="flex justify-between">

<span>
💰 Entry Fee
</span>

<span className="text-orange-400 font-black">
🪙 {item.entryFee}
</span>

</div>

<div className="flex justify-between">

<span>
👥 Players
</span>

<span className="font-black">
{item.joinedCount || 0}/{item.totalTeams}
</span>

</div>

<div className="flex justify-between">

<span>
🏆 Prize Pool
</span>

<span className="text-yellow-400 font-black">
🪙 {item.currentPrizePool || 0}
</span>

</div>

</div>

{
item.tournamentType ===
"SOLO" && (

<div className="space-y-2">

<div className="flex justify-between">

<span>
🥇 Top 1
</span>

<span className="text-yellow-400 font-black">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.18
)
}

</span>

</div>

<div className="flex justify-between">

<span>
🥈 Top 2
</span>

<span className="text-gray-300 font-black">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.16
)
}

</span>

</div>

<div className="flex justify-between">

<span>
🥉 Top 3
</span>

<span className="text-orange-400 font-black">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.14
)
}

</span>

</div>

<div className="flex justify-between">

<span>
🏅 Top 4-5
</span>

<span className="text-green-400 font-black">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.13
)
}

</span>

</div>

<div className="flex justify-between">

<span>
🔥 Top 6-10
</span>

<span className="text-blue-400 font-black">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.10
)
}

</span>

</div>

<div className="flex justify-between">

<span>
⚡ Top 11-20
</span>

<span className="text-pink-400 font-black">

🪙 {Math.floor(Number(item.totalPrizePool || 0) / 10)} 

</span>

</div>

</div>

)
}

{/* BUTTON */}

<button

onClick={() => {

setSelectedTournament(
item
);

setShowJoinPopup(
true
);

}}

className="w-full mt-6 bg-orange-500 hover:bg-orange-400 duration-300 text-black py-4 rounded-2xl font-black text-lg"
>

🚀 JOIN TOURNAMENT

</button>

{
isAdmin && (

<button

onClick={async () => {

try {

const tournamentPlayers =

joinedPlayers.filter(
(player) =>

player.tournamentId ===
item.id
);

// REFUND ALL PLAYERS

for (const player of tournamentPlayers) {

const userRef =
ref(
database,
`users/${player.userId}`
);

const userSnap =
await get(userRef);

const userData =
userSnap.val();

await update(
userRef,
{
coins:
Number(
userData?.coins || 0
) +
Number(item.entryFee || 0),
}
);

// SEND NOTIFICATION

await push(
ref(
database,
`notifications/${player.userId}`
),
{
title:
"❌ MATCH CANCELLED",

message:
`${item.tournamentTitle} was cancelled. Your ${item.entryFee} coins refunded successfully.`,

time:
new Date().toLocaleString(),

seen: false,
}
);

}

// DELETE TOURNAMENT

await remove(
ref(
database,
`liveTournaments/${item.id}`
)
);

alert(
"Upcoming Match Cancelled 🔥"
);

} catch (error) {

alert(error.message);

}

}}

className="w-full mt-4 bg-red-500 hover:bg-red-400 duration-300 text-white py-4 rounded-2xl font-black text-lg"
>

❌ CANCEL MATCH

</button>

)
}

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
                      {item.currentPrizePool || 0} Coins
                    </span>
                  </div>

                  <div className="bg-black rounded-2xl p-4 border border-orange-500/10">

<h3 className="text-orange-400 font-black mb-4">
🏆 REWARD SYSTEM
</h3>

{
item.tournamentType ===
"SOLO" && (

<div className="space-y-2">

{/* TOP 1 */}

<div className="flex justify-between">

<span>
🥇 Top 1
</span>

<span className="text-yellow-400 font-black">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.18
)
}

</span>

</div>

{/* TOP 2 */}

<div className="flex justify-between">

<span>
🥈 Top 2
</span>

<span className="text-gray-300 font-black">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.16
)
}

</span>

</div>

{/* TOP 3 */}

<div className="flex justify-between">

<span>
🥉 Top 3
</span>

<span className="text-orange-400 font-black">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.14
)
}

</span>

</div>

{/* TOP 4-5 */}

<div className="flex justify-between">

<span>
🏅 Top 4-5
</span>

<span className="text-green-400 font-black">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.13
)
}

</span>

</div>

{/* TOP 6-10 */}

<div className="flex justify-between">

<span>
🔥 Top 6-10
</span>

<span className="text-blue-400 font-black">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.10
)
}

</span>

</div>

{/* TOP 11-20 */}

<div className="flex justify-between">

<span>
⚡ Top 11-20
</span>

<span className="text-pink-400 font-black">

🪙 {Math.floor(Number(item.totalPrizePool || 0) / 10)} 

</span>

</div>

</div>

)
}

{
item.tournamentType ===
"DUO" && (

<div className="space-y-2">

<div className="flex justify-between">

<span>🥇 Team #1</span>

<span className="text-yellow-400">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.40
)
}

</span>

</div>

<div className="flex justify-between">

<span>🥈 Team #2</span>

<span className="text-gray-300">

🪙 {
Math.floor(
(
Number(item.totalPrizePool || 0) -
(
Number(item.totalPrizePool || 0) * 0.40
)
) * 0.30
)
}

</span>

</div>

<div className="flex justify-between">

<span>🥉 Team #3</span>

<span className="text-orange-400">

🪙 {
Math.floor(
(
Number(item.totalPrizePool || 0) -
(
Number(item.totalPrizePool || 0) * 0.40
) -
(
(
Number(item.totalPrizePool || 0) -
(
Number(item.totalPrizePool || 0) * 0.40
)
) * 0.30
)
) * 0.20
)
}

</span>

</div>

<div className="flex justify-between">

<span>🏅 Team #4</span>

<span className="text-green-400">

🪙 {
Math.floor(
(
Number(item.totalPrizePool || 0) -
(
Number(item.totalPrizePool || 0) * 0.40
) -
(
(
Number(item.totalPrizePool || 0) -
(
Number(item.totalPrizePool || 0) * 0.40
)
) * 0.30
) -
(
(
Number(item.totalPrizePool || 0) -
(
Number(item.totalPrizePool || 0) * 0.40
) -
(
(
Number(item.totalPrizePool || 0) -
(
Number(item.totalPrizePool || 0) * 0.40
)
) * 0.30
)
) * 0.20
)
) * 0.10
)
}

</span>

</div>

<div className="flex justify-between">

<span>💸 Losers</span>

<span className="text-pink-400">
🪙 {Math.floor(Number(item.totalPrizePool || 0) / 10)} 
</span>

</div>

</div>

)
}

{
item.tournamentType ===
"SQUAD" && (

<div className="space-y-2">

<div className="flex justify-between">

<span>🥇 Squad #1</span>

<span className="text-yellow-400">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.50
)
}

</span>

</div>

<div className="flex justify-between">

<span>🥈 Squad #2</span>

<span className="text-gray-300">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.30
)
}

</span>

</div>

<div className="flex justify-between">

<span>🥉 Squad #3</span>

<span className="text-orange-400">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) * 0.20
)
}

</span>

</div>

</div>

)
}

{
item.tournamentType ===
"4V4" && (

<div className="space-y-2">

<div className="flex justify-between">

<span>
🏆 Winning Team
</span>

<span className="text-yellow-400">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0)
)
}

</span>

</div>

<div className="flex justify-between">

<span>
👤 Per Player
</span>

<span className="text-green-400">

🪙 {
Math.floor(
Number(item.totalPrizePool || 0) / 4
)
} Each

</span>

</div>

</div>

)
}

{
item.tournamentType ===
"3V3" && (

<div className="space-y-2">

<div className="flex justify-between">

<span>
👑 Winning Team
</span>

<span className="text-yellow-400">

🪙 {
Math.floor(
item.totalPrizePool
)
}

</span>

</div>

<div className="flex justify-between">

<span>
⚔️ Per Player
</span>

<span className="text-green-400">

🪙 {
Math.floor(
item.totalPrizePool / 3
)
}

</span>

</div>

</div>

)
}

{
(
item.tournamentType ===
"1V1" ||

item.tournamentType ===
"1V2"
) && (

<div className="space-y-2">

<div className="flex justify-between">
<span>👑 Winner</span>

<span className="text-yellow-400">
🪙 {item.currentPrizePool || 0}
</span>
</div>

<div className="flex justify-between">
<span>🏆 Prize</span>

<span className="text-green-400">
🪙 {item.currentPrizePool || 0}
</span>
</div>

</div>

)
}

</div>
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

// JOINED USERS FETCH
const joinedUsers =
joinedPlayers.filter(
(player) =>
player.tournamentId ===
item.id
);

// WEBSITE NOTIFICATION
for (const player of joinedUsers) {

await push(
ref(
database,
`notifications/${player.userId}`
),
{
title:
"ROOM DETAILS AVAILABLE 🔥",

message:
`Room ID: ${roomId} | Password: ${roomPassword}`,

time:
new Date().toLocaleString(),

seen: false,
}
);

}

// OPTIONAL POPUP
alert(
"Room Details Published & Notifications Sent 🔥"
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
{isAdmin && (

<>
<button

onClick={async () => {

try {

const winners =
playerResults.filter(
(player) =>

player.tournamentId ===
item.id
);

const uniqueWinners =
[
...new Map(

winners.map(
(player) => [
player.userId,
player
]
)

).values()
];

for (const player of uniqueWinners) {

const playerRef =
ref(
database,
`users/${player.userId}`
);

const playerSnap =
await get(playerRef);

const playerData =
playerSnap.val();

let winCoins = 0;

const mode =
item.tournamentType;

const totalPool =
Number(
item.currentPrizePool || 0
);

// ================= SOLO =================

if (
mode === "SOLO"
) {

if (
Number(player.position) === 1
) {

winCoins =
Math.floor(
totalPool * 0.18
);

}

else if (
Number(player.position) === 2
) {

winCoins =
Math.floor(
totalPool * 0.16
);

}

else if (
Number(player.position) === 3
) {

winCoins =
Math.floor(
totalPool * 0.14
);

}

else if (

Number(player.position) === 4 ||

Number(player.position) === 5

) {

winCoins =
Math.floor(
totalPool * 0.13
);

}

else if (

Number(player.position) >= 6 &&

Number(player.position) <= 10

) {

winCoins =
Math.floor(
totalPool * 0.10
);

}

else if (

Number(player.position) >= 11 &&

Number(player.position) <= 20

) {

winCoins =
Math.floor(
totalPool / 10
);

}

}

// ================= DUO =================

else if (
mode === "DUO"
) {

let reward = 0;

if (
Number(player.position) === 1
) {

reward =
totalPool * 0.40;

}

else if (
Number(player.position) === 2
) {

reward =
totalPool * 0.30;

}

else if (
Number(player.position) === 3
) {

reward =
totalPool * 0.20;

}

else if (
Number(player.position) === 4
) {

reward =
totalPool * 0.10;

}

winCoins =
Math.floor(
reward / 2
);

}

// ================= SQUAD =================

else if (
mode === "SQUAD"
) {

let reward = 0;

if (
Number(player.position) === 1
) {

reward =
totalPool * 0.50;

}

else if (
Number(player.position) === 2
) {

reward =
totalPool * 0.30;

}

else if (
Number(player.position) === 3
) {

reward =
totalPool * 0.20;

}

winCoins =
Math.floor(
reward / 4
);

}

// ================= 4V4 =================

else if (
mode === "4V4"
) {

if (
Number(player.position) === 1
) {

winCoins =
Math.floor(
totalPool / 4
);

}

}

// ================= 3V3 =================

else if (
mode === "3V3"
) {

if (
Number(player.position) === 1
) {

winCoins =
Math.floor(
totalPool / 3
);

}

}

// ================= 1V1 =================

else if (
mode === "1V1"
) {

if (
Number(player.position) === 1
) {

winCoins =
Math.floor(
totalPool
);

}

}

// ================= 1V2 =================

else if (
mode === "1V2"
) {

// SOLO SIDE WIN

if (
player.selectedSlot ===
"SOLO" &&

Number(player.position) === 1
) {

winCoins =
Math.floor(
totalPool
);

}

// DUO SIDE WIN

else if (
player.selectedSlot ===
"DUO" &&

Number(player.position) === 1
) {

winCoins =
Math.floor(
totalPool / 2
);

}

}

// UPDATE USER COINS

await update(
playerRef,
{
coins:
Number(
playerData?.coins || 0
) + winCoins,

winCoins,

wins:
Number(
playerData?.wins || 0
) +
(
Number(player.position) === 1
? 1
: 0
),

top3:
Number(
playerData?.top3 || 0
) +
(
Number(player.position) <= 3
? 1
: 0
),

}
);

await push(
ref(
database,
`notifications/${player.userId}`
),
{
title:
"🏆 MATCH RESULT PUBLISHED",

message:
`You achieved #${player.position} in ${item.tournamentTitle}`,

time:
new Date().toLocaleString(),

seen: false,
}
);

}

await update(
ref(
database,
`liveTournaments/${item.id}`
),
{
resultPublished: true,
completed: true,
}
);

alert(
"Result Published Successfully 🔥"
);

} catch (error) {

alert(error.message);

}

}}

className="w-full mt-6 bg-purple-500 text-black py-4 rounded-2xl font-black"
>

PUBLISH RESULT

</button>

<button

onClick={async () => {

try {

// FETCH JOINED PLAYERS

const tournamentPlayers =

joinedPlayers.filter(
(player) =>

player.tournamentId ===
item.id
);

// REFUND ALL PLAYERS

for (const player of tournamentPlayers) {

const userRef =
ref(
database,
`users/${player.userId}`
);

const userSnap =
await get(userRef);

const userData =
userSnap.val();

await update(
userRef,
{
coins:
Number(
userData?.coins || 0
) +
Number(item.entryFee || 0),
}
);

// SEND NOTIFICATION

await push(
ref(
database,
`notifications/${player.userId}`
),
{
title:
"❌ MATCH CANCELLED",

message:
`${item.tournamentTitle} was cancelled. Your ${item.entryFee} coins refunded successfully.`,

time:
new Date().toLocaleString(),

seen: false,
}
);

}

// DELETE TOURNAMENT

await remove(
ref(
database,
`liveTournaments/${item.id}`
)
);

alert(
"Match Cancelled & Coins Refunded 🔥"
);

} catch (error) {

alert(error.message);

}

}}

className="w-full mt-4 bg-red-500 text-white py-4 rounded-2xl font-black"
>

❌ CANCEL MATCH

</button>
</>

)}


                </div>

              </div>

            )
          )}

        </div>

      </section>

      {/* WINNER LEADERBOARD */}

<section className="max-w-7xl mx-auto px-6 py-20">

<h2 className="text-5xl font-black text-yellow-400 mb-12">
🏆 WINNER LEADERBOARD
</h2>

<div className="grid md:grid-cols-3 gap-8">

{
leaderboard
.slice(0, 15)
.map((player, index) => (

<div
key={player.id}
className={`rounded-[35px] p-8 border ${
index === 0

? "bg-yellow-500/10 border-yellow-500/20"

: index === 1

? "bg-gray-500/10 border-gray-500/20"

: index === 2

? "bg-orange-500/10 border-orange-500/20"

: "bg-[#111] border-purple-500/10"
}`}
>

<div className="flex items-center justify-between mb-6">

<h3 className="text-3xl font-black text-white">
#{index + 1}
</h3>

<span className="text-4xl">

{
index === 0
? "🥇"

: index === 1
? "🥈"

: index === 2
? "🥉"

: "🔥"
}

</span>

</div>

<h2 className="text-2xl font-black text-orange-400">

{player.name || "Unknown"}

</h2>

<div className="space-y-4 mt-8">

<div className="flex justify-between">

<span className="text-gray-400">
Wins
</span>

<span className="text-yellow-400 font-black">
🏆 {player.wins || 0}
</span>

</div>

<div className="flex justify-between">

<span className="text-gray-400">
Top 3
</span>

<span className="text-green-400 font-black">
🔥 {player.top3 || 0}
</span>

</div>

<div className="flex justify-between">

<span className="text-gray-400">
Coins
</span>

<span className="text-orange-400 font-black">
🪙 {player.coins || 0}
</span>

</div>

</div>

</div>

))
}

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

<div className="grid md:grid-cols-4 gap-4 mb-8">

<div className="bg-black rounded-3xl p-5 border border-orange-500/10">

<p className="text-gray-400">
Matches Played
</p>

<h3 className="text-4xl font-black text-orange-500 mt-3">
🎮 {userMatchesPlayed}
</h3>

</div>

<div className="bg-black rounded-3xl p-5 border border-yellow-500/10">

<p className="text-gray-400">
Wins
</p>

<h3 className="text-4xl font-black text-yellow-400 mt-3">
🏆 {userWins}
</h3>

</div>

<div className="bg-black rounded-3xl p-5 border border-green-500/10">

<p className="text-gray-400">
Win Rate
</p>

<h3 className="text-4xl font-black text-green-400 mt-3">
🔥 {userWinRate}%
</h3>

</div>

<div className="bg-black rounded-3xl p-5 border border-blue-500/10">

<p className="text-gray-400">
Total Earnings
</p>

<h3 className="text-4xl font-black text-blue-400 mt-3">
🪙 {userTotalEarnings}
</h3>

</div>

<div className="bg-black rounded-3xl p-5 border border-purple-500/10">

<p className="text-gray-400">
Total Coins Won
</p>

<h3 className="text-4xl font-black text-purple-400 mt-3">
💰 {userTotalCoinsWon}
</h3>

</div>

<div className="bg-black rounded-3xl p-5 border border-pink-500/10">

<p className="text-gray-400">
Avg Placement
</p>

<h3 className="text-4xl font-black text-pink-400 mt-3">
📍 #{userAvgPlacement}
</h3>

</div>

<div className="bg-black rounded-3xl p-5 border border-red-500/10">

<p className="text-gray-400">
K/D Stats
</p>

<h3 className="text-4xl font-black text-red-400 mt-3">
⚔️ {userKD}
</h3>

</div>

<div className="bg-black rounded-3xl p-5 border border-cyan-500/10">

<p className="text-gray-400">
MVP Count
</p>

<h3 className="text-4xl font-black text-cyan-400 mt-3">
👑 {userMVP}
</h3>

</div>

</div>

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

<p className="text-white mb-4">
Total Slots:
{selectedTournament?.totalTeams || 4}
</p>

<h4 className="text-2xl font-black mt-8 mb-5 text-orange-400">
SELECT SLOT
</h4>



<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">

{Array.from({
length: Number(
selectedTournament?.totalTeams || 4
),
}).map((_, index) => {

const slot = index + 1;

const bookedPlayer =
joinedPlayers.find(
(player) =>

player.tournamentId ===
selectedTournament?.id &&

Number(
player.selectedSlot
) === Number(slot)
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

selectedSlot: slot,
},
})
}

className={`h-16 rounded-2xl font-black text-sm border ${
bookedPlayer

? "bg-red-500 text-white border-red-500"

: joinData[
selectedTournament.id
]?.selectedSlot === slot

? "bg-orange-500 text-black"

: "bg-[#111] text-white border-orange-500/20"
}`}
>

{
bookedPlayer
? `BOOKED ${slot}`
: `SLOT ${slot}`
}

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

{
isAdmin
? "PUBLISH MATCH RESULT"
: "UPLOAD MATCH RESULT"
}

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

<p className="text-green-400 mt-2">
APPROVED POSITION:
#{item.approvedPosition || "Pending"}
</p>

<p className="text-yellow-400 mt-2">
WIN COINS:
🪙 {item.winCoins || 0}
</p>

{
item.approved && (

<span className="bg-green-500 text-black px-3 py-1 rounded-full text-xs font-black">
APPROVED
</span>

)
}

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
href="https://t.me/fire_baadshah_result_bot"
target="_blank"
rel="noreferrer"
className="text-blue-400"
>
VIEW RESULT BOT
</a>

<div className="flex gap-3">

<button
onClick={async () => {

try {

const playerRef =
ref(
database,
`users/${item.userId}`
);

const playerSnap =
await get(playerRef);

const playerData =
playerSnap.val();

const currentWins =
playerData?.wins || 0;

const currentTop3 =
playerData?.top3 || 0;

const duplicatePosition =
playerResults.find(
(player) =>

player.tournamentId ===
selectedResultTournament.id &&

player.approved === true &&

Number(
player.approvedPosition
) ===
Number(item.position)
);

if (duplicatePosition) {

alert(
"This Position Already Approved ❌"
);

return;

}

let winCoins = 0;

if (
Number(item.position) === 1
) {

winCoins =
Number(
selectedResultTournament.top1
);

}

else if (
Number(item.position) === 2
) {

winCoins =
Number(
selectedResultTournament.top2
);

}

else if (
Number(item.position) === 3
) {

winCoins =
Number(
selectedResultTournament.top3
);

}

else if (

Number(item.position) <=
Math.floor(
Number(
selectedResultTournament.totalTeams
) * 0.42
)

) {

winCoins =
Number(
selectedResultTournament.perPlayerPrize
);

}

await update(
playerRef,
{

pendingCoins:
winCoins,

lastPosition:
Number(item.position),

lastTournament:
selectedResultTournament.tournamentTitle,

lastTournamentId:
selectedResultTournament.id,

wins:

Number(item.position) === 1

? currentWins + 1

: currentWins,

top3:

Number(item.position) <= 3

? currentTop3 + 1

: currentTop3,

approved: true,

}

);

await update(
ref(
database,
`playerResults/${item.id}`
),
{
approved: true,
approvedPosition:
Number(item.position),
winCoins:
winCoins,
}
);

alert(
"Result Approved 🔥"
);

} catch (error) {

alert(error.message);

}

}}
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
href="https://t.me/fire_baadshah_result_bot"
target="_blank"
rel="noreferrer"
className="text-blue-400"
>
VIEW RESULT BOT
</a>

<div className="flex gap-3">

<button
onClick={async () => {

try {

await update(
ref(
database,
`playerResults/${item.id}`
),
{
approved: true,
approvedPosition:
Number(item.position),
}
);

alert(
"Result Approved 🔥"
);

} catch (error) {

alert(error.message);

}

}}
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
{
isAdmin && (
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

tournamentId:
selectedResultTournament.id,

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

)
}
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

<p className="text-center text-orange-400 font-bold mb-4">
QR DOWNLOAD KAR KE PAYMENT KARE
</p>

       <a
href={paymentQR}
download="FIRE-BAADSHAH-QR"
>

<img
src={paymentQR}
alt="QR"
className="w-52 mx-auto rounded-3xl border border-orange-500/20 cursor-pointer"
/>

</a>

        <p className="text-center text-green-400 mt-5 font-bold">
          8085150673@fam
          
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

     <p className="text-gray-400 mt-4 mb-2">
PAYMENT SCREENSHOT
</p>

<input
type="file"
accept="image/*"

onChange={(e) => {

const file =
e.target.files[0];

setPaymentScreenshot(file);

console.log(file);

}}

className="w-full bg-[#111] rounded-2xl px-5 py-4 outline-none"
/>

{
paymentScreenshot && (

<p className="text-green-400 mt-2 text-sm">

{paymentScreenshot.name}

</p>

)
}

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

                  <p className="text-gray-500 text-sm mt-2">
🕒 Request:
{item.requestTime}
</p>
{
item.status === "PENDING" && (

<p className="text-yellow-400 text-sm mt-1">
⏳ WITHDRAW PENDING:
{item.createdAt}
</p>

)
}
{
item.completedTime && (

<p className="text-green-400 text-sm mt-1">
✅ WITHDRAW COMPLETED:
{item.completedTime}
</p>

)
}

                </div>

              ))}
{paymentRequests
  .filter(
    (item) =>
      item.userId ===
      user.uid
  )
  .map((item) => (

    <div
      key={item.id}
      className="bg-[#111] rounded-2xl p-4 mb-3"
    >

      <p>
        🪙 {item.amount} Coins
      </p>

      <p className="text-orange-400">
        {item.status}
      </p>
      <p className="text-gray-500 text-sm mt-2">
🕒 Request:
{item.requestTime}
</p>

{
item.completedTime && (

<p className="text-green-400 text-sm mt-1">
✅ COMPLETED:
{item.completedTime}
</p>

)
}

    </div>

))}
          </div>

        </div>

      </div>

    </div>

  </div>

</div>

)}
{isAdmin && (

<section className="max-w-5xl mx-auto px-6 py-10">

<div className="bg-[#111] rounded-[40px] p-10 border border-purple-500/10">

<h2 className="text-4xl font-black text-purple-400 mb-8">
USER PROFILE CHECK
</h2>

<input
type="text"
placeholder="Enter User UID"

value={searchUid}

onChange={(e) =>
setSearchUid(
e.target.value
)
}

className="w-full bg-black rounded-2xl px-5 py-4 outline-none"
/>

<button

onClick={
searchUserProfile
}

className="w-full mt-5 bg-purple-500 text-black py-4 rounded-2xl font-black"
>

SEARCH USER

</button>

{
searchedUser && (

<div className="bg-black rounded-3xl p-6 mt-8">

<p className="text-orange-400">
👤 Email:
{searchedUser.email}
</p>

<p className="text-blue-400 mt-3 break-all">
🆔 UID:
{searchUid}
</p>

<p className="text-green-400 mt-3">
🪙 Coins:
{searchedUser.coins}
</p>

<p className="text-red-400 mt-3">
🚫 Status:
{
searchedUser.blocked
? "BLOCKED"
: "ACTIVE"
}
</p>

<button

onClick={async () => {

try {

await updateDoc(
doc(
db,
"users",
searchUid
),
{
blocked:
!searchedUser.blocked,
}
);

searchUserProfile();

<div className="bg-[#111] rounded-2xl p-4 mt-4">

<h3 className="text-xl font-black text-orange-400 mb-4">
💰 WALLET CONTROL
</h3>

<input
type="number"
placeholder="Coins Amount"

value={manualCoins}

onChange={(e) =>
setManualCoins(
e.target.value
)
}

className="w-full bg-black rounded-2xl px-4 py-3 outline-none mb-4"
/>

<div className="grid grid-cols-2 gap-3">

<button

onClick={async () => {

try {

const userDoc =
doc(
db,
"users",
searchUid
);

const userSnap =
await getDoc(userDoc);

const userData =
userSnap.data();

await updateDoc(
userDoc,
{
coins:
Math.max(
0,
Number(
userData?.coins || 0
) -
Number(manualCoins || 0)
),
}
);

alert(
"Coins Added 🔥"
);

setManualCoins("");

searchUserProfile();

} catch (error) {

alert(error.message);

}

}}

className="bg-green-500 text-black py-3 rounded-2xl font-black"
>

➕ ADD

</button>

<button

onClick={async () => {

try {

const userRef =
ref(
database,
`users/${searchUid}`
);

const userSnap =
await get(userRef);

const userData =
userSnap.val();

await update(
userRef,
{
coins:
Math.max(
0,
Number(
userData?.coins || 0
) -
Number(manualCoins || 0)
),
}
);

alert(
"Coins Deducted 🔥"
);

setManualCoins("");

searchUserProfile();

} catch (error) {

alert(error.message);

}

}}

className="bg-red-500 text-white py-3 rounded-2xl font-black"
>

➖ DEDUCT

</button>

</div>

</div>

alert(
searchedUser.blocked
? "User Unblocked 🔥"
: "User Blocked 🚫"
);

} catch (error) {

alert(error.message);

}

}}

className="w-full mt-6 bg-red-500 text-white py-4 rounded-2xl font-black"
>

{
searchedUser.blocked
? "UNBLOCK USER"
: "BLOCK USER"
}

</button>

<div className="bg-black rounded-2xl p-5 border border-orange-500/10 mt-5">

<h3 className="text-2xl font-black text-orange-400 mb-5">
💰 WALLET CONTROL
</h3>

<input
type="number"
placeholder="Coins Amount"

value={manualCoins}

onChange={(e) =>
setManualCoins(
e.target.value
)
}

className="w-full bg-[#111] rounded-2xl px-4 py-3 outline-none mb-4"
/>

<div className="grid grid-cols-2 gap-4">

<button

onClick={async () => {

try {

const userDoc =
doc(
db,
"users",
searchUid
);

const userSnap =
await getDoc(userDoc);

const userData =
userSnap.data();

await updateDoc(
userDoc,
{
coins:
Math.max(
0,
Number(
userData?.coins || 0
) -
Number(manualCoins || 0)
),
}
);

alert(
"Coins Added Successfully 🔥"
);

setManualCoins("");

searchUserProfile();

} catch (error) {

alert(error.message);

}

}}

className="bg-red-500 text-black py-4 rounded-2xl font-black"
>

➖ DEDUCT COINS

</button>

<button

onClick={async () => {

try {

const userRef =
ref(
database,
`users/${searchUid}`
);

const userSnap =
await get(userRef);

const userData =
userSnap.val();

await update(
userRef,
{
coins:
Math.max(
0,
Number(
userData?.coins || 0
) -
Number(manualCoins || 0)
),
}
);

alert(
"Coins Deducted Successfully 🔥"
);

setManualCoins("");

searchUserProfile();

} catch (error) {

alert(error.message);

}

}}

className="bg-green-500 text-white py-4 rounded-2xl font-black"
>

➕ ADD COINS

</button>

</div>

</div>

</div>

)
}

</div>

</section>

)}
{/* MAINTENANCE MODE */}

{
isAdmin && (

<section className="max-w-5xl mx-auto px-6 py-10">

<div className="bg-[#111] rounded-[40px] p-8 border border-red-500/10">

<div className="flex items-center justify-between flex-wrap gap-5">

<div>

<h2 className="text-4xl font-black text-red-400">
🚧 MAINTENANCE MODE
</h2>

<p className="text-gray-400 mt-3">
Enable or disable server maintenance mode
</p>

</div>

<button

onClick={async () => {

await update(
ref(
database,
"settings"
),
{
maintenance:
!maintenanceMode
}
);

}}

className={`px-8 py-4 rounded-2xl font-black text-lg ${
maintenanceMode

? "bg-red-500 text-white"

: "bg-green-500 text-black"
}`}

>

{
maintenanceMode

? "DISABLE"

: "ENABLE"
}

MAINTENANCE

</button>

</div>

</div>

</section>

)
}

{/* ADMIN ANALYTICS */}

{
isAdmin && (

<section className="max-w-7xl mx-auto px-6 py-10">

<h2 className="text-5xl font-black text-orange-500 mb-10">
📊 ADMIN ANALYTICS
</h2>

<div className="grid md:grid-cols-4 gap-6">

<div className="bg-[#111] rounded-3xl p-6 border border-orange-500/10">

<p className="text-gray-400">
Total Users
</p>

<h3 className="text-5xl font-black text-orange-500 mt-4">
👥 {analytics.totalUsers}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-green-500/10">

<p className="text-gray-400">
Total Tournaments
</p>

<h3 className="text-5xl font-black text-green-400 mt-4">
🎮 {analytics.totalTournaments}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-blue-500/10">

<p className="text-gray-400">
Total Deposits
</p>

<h3 className="text-5xl font-black text-blue-400 mt-4">
🪙 {analytics.totalDeposits}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-red-500/10">

<p className="text-gray-400">
Total Withdrawals
</p>

<h3 className="text-5xl font-black text-red-400 mt-4">
💸 {analytics.totalWithdrawals}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-yellow-500/10">

<p className="text-gray-400">
Live Matches
</p>

<h3 className="text-5xl font-black text-yellow-400 mt-4">
🔥 {analytics.liveMatches}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-cyan-500/10">

<p className="text-gray-400">
Pending Topups
</p>

<h3 className="text-5xl font-black text-cyan-400 mt-4">
⏳ {analytics.pendingTopups}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-pink-500/10">

<p className="text-gray-400">
Pending Withdraws
</p>

<h3 className="text-5xl font-black text-pink-400 mt-4">
🏦 {analytics.pendingWithdraws}
</h3>

</div>

<div className="bg-[#111] rounded-3xl p-6 border border-purple-500/10">

<p className="text-gray-400">
Admin Revenue
</p>

<h3 className="text-5xl font-black text-purple-400 mt-4">
💰 {analytics.adminRevenue}
</h3>

</div>

</div>

</section>

)
}


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
        .slice()
.reverse()
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

      await update(
  ref(
    database,
    `paymentRequests/${item.id}`
  ),
  {
    status:
      "COMPLETED",

      completedTime:
new Date().toLocaleString(),
  }
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
      .slice()
.reverse()
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

                        completedTime:new Date().toLocaleString(),
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

.filter((item) =>

isAdmin ||

joinedPlayers.some(
(player) =>

player.tournamentId ===
item.tournamentId &&

player.userEmail ===
user?.email
)

)

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

<div className="bg-[#111] rounded-[40px] p-10 border border-orange-500/10">

<h2 className="text-5xl font-black text-orange-500 text-center mb-10">
🔥 CREATE TOURNAMENT 🔥
</h2>

<div className="grid md:grid-cols-2 gap-6">

<input
type="text"
placeholder="Tournament Title"
value={tournamentTitle}
onChange={(e) =>
setTournamentTitle(
e.target.value
)
}
className="bg-black rounded-2xl px-5 py-4 outline-none border border-orange-500/10"
/>

<input
type="number"
placeholder="Entry Fee"
value={entryFee}
onChange={(e) =>
setEntryFee(
e.target.value
)
}
className="bg-black rounded-2xl px-5 py-4 outline-none border border-orange-500/10"
/>

<input
type="number"
placeholder="Total Players"
value={totalTeams}
onChange={(e) =>
setTotalTeams(
e.target.value
)
}
className="bg-black rounded-2xl px-5 py-4 outline-none border border-orange-500/10"
/>

<input
type="date"
value={matchDate}
onChange={(e) =>
setMatchDate(
e.target.value
)
}
className="bg-black rounded-2xl px-5 py-4 outline-none border border-orange-500/10"
/>

<input
type="time"
value={matchTime}
onChange={(e) =>
setMatchTime(
e.target.value
)
}
className="bg-black rounded-2xl px-5 py-4 outline-none border border-orange-500/10"
/>

<select
value={tournamentType}
onChange={(e) =>
setTournamentType(
e.target.value
)
}
className="bg-black rounded-2xl px-5 py-4 outline-none border border-orange-500/10"
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
className="bg-black rounded-2xl px-5 py-4 outline-none border border-orange-500/10"
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

</div>

{/* AUTO PRIZE DISTRIBUTION */}

<div className="bg-black rounded-2xl p-5 border border-orange-500/10 mb-6">

<h3 className="text-2xl font-black text-orange-400 mb-6">
🏆 AUTO PRIZE DISTRIBUTION
</h3>

<div className="space-y-3 text-sm">

{/* ADMIN PROFIT */}

<div className="flex items-center justify-between">
<p className="text-gray-300">
💰 Admin Profit
</p>

<p className="text-yellow-400 font-black">
🪙 {adminProfit}
</p>
</div>

{/* PRIZE POOL */}

<div className="flex items-center justify-between">
<p className="text-gray-300">
🏆 Prize Pool
</p>

<p className="text-orange-400 font-black">
🪙 {totalPrizePool}
</p>
</div>

{/* SOLO */}

{tournamentType === "SOLO" && (
<>

<div className="border-t border-orange-500/10 pt-4 mt-4 space-y-2">

<div className="flex justify-between">
<span className="text-yellow-400">
🥇 Top 1
</span>

<span className="text-yellow-400 font-black">
🪙 {Math.floor(totalPrizePool * 0.18)}
</span>
</div>

<div className="flex justify-between">
<span className="text-gray-300">
🥈 Top 2
</span>

<span className="text-gray-300 font-black">
🪙 {Math.floor(totalPrizePool * 0.16)}
</span>
</div>

<div className="flex justify-between">
<span className="text-orange-400">
🥉 Top 3
</span>

<span className="text-orange-400 font-black">
🪙 {Math.floor(totalPrizePool * 0.14)}
</span>
</div>

<div className="flex justify-between">
<span className="text-cyan-400">
⚡ Top 4-5
</span>

<span className="text-cyan-400 font-black">
🪙 {Math.floor(totalPrizePool * 0.13)}
</span>
</div>

<div className="flex justify-between">
<span className="text-pink-400">
🔥 Top 6-10
</span>

<span className="text-pink-400 font-black">
🪙 {Math.floor(totalPrizePool * 0.10)}
</span>
</div>

<div className="flex justify-between">
<span className="text-green-400">
🎯 Top 11-20
</span>

<span className="text-green-400 font-black">
🪙 {Math.floor(totalPrizePool / 10)} Each
</span>
</div>

</div>

</>
)}

{/* DUO */}

{tournamentType === "DUO" && (
<>

<div className="border-t border-orange-500/10 pt-4 mt-4 space-y-2">

<div className="flex justify-between">
<span className="text-yellow-400">
🥇 Team #1
</span>

<span className="text-yellow-400 font-black">
🪙 {Math.floor((totalPrizePool * 0.40) / 2)} Each
</span>
</div>

<div className="flex justify-between">
<span className="text-gray-300">
🥈 Team #2
</span>

<span className="text-gray-300 font-black">
🪙 {Math.floor((totalPrizePool * 0.30) / 2)} Each
</span>
</div>

<div className="flex justify-between">
<span className="text-orange-400">
🥉 Team #3
</span>

<span className="text-orange-400 font-black">
🪙 {Math.floor((totalPrizePool * 0.20) / 2)} Each
</span>
</div>

<div className="flex justify-between">
<span className="text-cyan-400">
⚡ Team #4
</span>

<span className="text-cyan-400 font-black">
🪙 {Math.floor((totalPrizePool * 0.10) / 2)} Each
</span>
</div>

</div>

</>
)}

{/* SQUAD */}

{tournamentType === "SQUAD" && (
<>

<div className="border-t border-orange-500/10 pt-4 mt-4 space-y-2">

<div className="flex justify-between">
<span className="text-yellow-400">
🥇 Squad #1
</span>

<span className="text-yellow-400 font-black">
🪙 {Math.floor((totalPrizePool * 0.50) / 4)} Each
</span>
</div>

<div className="flex justify-between">
<span className="text-gray-300">
🥈 Squad #2
</span>

<span className="text-gray-300 font-black">
🪙 {Math.floor((totalPrizePool * 0.30) / 4)} Each
</span>
</div>

<div className="flex justify-between">
<span className="text-orange-400">
🥉 Squad #3
</span>

<span className="text-orange-400 font-black">
🪙 {Math.floor((totalPrizePool * 0.20) / 4)} Each
</span>
</div>

</div>

</>
)}

{/* 4V4 */}

{tournamentType === "4V4" && (
<>

<div className="border-t border-orange-500/10 pt-4 mt-4 space-y-2">

<div className="flex justify-between">

<span className="text-yellow-400">
🏆 Winning Team
</span>

<span className="text-yellow-400 font-black">
🪙 {Math.floor(totalPrizePool)} Team Reward
</span>

</div>

<div className="flex justify-between">

<span className="text-green-400">
👤 Per Player
</span>

<span className="text-green-400 font-black">
🪙 {Math.floor(totalPrizePool / 4)} Each
</span>

</div>

</div>

</>
)}

{/* 3V3 */}

{tournamentType === "3V3" && (
<>

<div className="border-t border-orange-500/10 pt-4 mt-4 space-y-2">

<div className="flex justify-between">
<span className="text-yellow-400">
🥇 Winner Team
</span>

<span className="text-yellow-400 font-black">
🪙 {Math.floor(totalPrizePool / 3)} Each
</span>
</div>

</div>

</>
)}

{/* 1V1 */}

{tournamentType === "1V1" && (
<>

<div className="border-t border-orange-500/10 pt-4 mt-4 space-y-2">

<div className="flex justify-between">
<span className="text-yellow-400">
🥇 Winner
</span>

<span className="text-yellow-400 font-black">
🪙 {Math.floor(totalPrizePool)}
</span>
</div>

</div>

</>
)}

{/* 1V2 */}

{tournamentType === "1V2" && (
<>

<div className="border-t border-orange-500/10 pt-4 mt-4 space-y-2">

<div className="flex justify-between">
<span className="text-yellow-400">
🥇 Winners
</span>

<span className="text-yellow-400 font-black">
🪙 {Math.floor(totalPrizePool / 2)} Each
</span>
</div>

</div>

</>
)}

</div>

</div>

<button
onClick={createTournament}
className="w-full mt-10 bg-orange-500 text-black py-5 rounded-2xl text-xl font-black hover:scale-105 duration-300"
>

🚀 CREATE TOURNAMENT

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