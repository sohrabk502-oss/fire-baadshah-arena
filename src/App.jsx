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
  remove,
  update,
} from "firebase/database";
import { createWallet } from "./services/walletService";

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

  // ================= TEAM REGISTER =================

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
    const remainingPlayers = 17;

    // TOP 4-20 EACH PLAYER
    const eachPlayerPrize =
      remainPrize / remainingPlayers;

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
            loadedData
          );

        } else {

          setLiveTournaments([]);

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
  "Player",
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

  // ================= TEAM REGISTER =================

  const submitTournament =
    async () => {

      try {

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

  // ================= CREATE TOURNAMENT =================

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

            adminProfit,
            totalPrizePool,

            top1,
            top2,
            top3,

            remainingPrize,
            perPlayerPrize,
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

  return (
    <div className="bg-black min-h-screen text-white">

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-orange-500/10">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-4xl font-black text-orange-500">
            FIRE BAADSHAH ARENA
          </h1>

          {user ? (

            <div className="flex items-center gap-4">

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

        <h1 className="text-7xl font-black">

          FIRE BAADSHAH <br />

          <span className="text-orange-500">
            ARENA
          </span>

        </h1>

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

      {/* LIVE TOURNAMENTS */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-5xl font-black text-orange-500 mb-12">
          LIVE TOURNAMENTS
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {liveTournaments.map(
            (item) => (

              <div
                key={item.id}
                className="bg-[#111] rounded-[35px] p-8 border border-orange-500/10"
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
                      Admin Profit
                    </span>

                    <span className="text-yellow-400">
                      {item.adminProfit} Coins
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

                  <div className="flex justify-between">
                    <span>
                      Top 4-20
                    </span>

                    <span className="text-green-400">
                      {item.perPlayerPrize} Coins each
                    </span>
                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </section>

      {/* TEAM REGISTER */}

      <section className="max-w-4xl mx-auto px-6 py-20">

        <div className="bg-[#111] rounded-[40px] p-10">

          <h2 className="text-5xl font-black text-orange-500 text-center mb-10">
            REGISTER YOUR SQUAD
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) =>
                setTeamName(
                  e.target.value
                )
              }
              className="bg-black rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Leader Name"
              value={leaderName}
              onChange={(e) =>
                setLeaderName(
                  e.target.value
                )
              }
              className="bg-black rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Free Fire UID"
              value={uid}
              onChange={(e) =>
                setUid(
                  e.target.value
                )
              }
              className="bg-black rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={(e) =>
                setWhatsapp(
                  e.target.value
                )
              }
              className="bg-black rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <button
            onClick={
              submitTournament
            }
            className="w-full mt-10 bg-orange-500 text-black py-5 rounded-2xl text-xl font-black"
          >
            SUBMIT REGISTRATION
          </button>

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
                type="text"
                placeholder="Match Time"
                value={matchTime}
                onChange={(e) =>
                  setMatchTime(
                    e.target.value
                  )
                }
                className="bg-black rounded-2xl px-5 py-4 outline-none"
              />

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
                    Top 4-20
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