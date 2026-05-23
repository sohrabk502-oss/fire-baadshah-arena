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

export default function FireBaadshahArena() {

  // ================= ADMIN EMAIL =================

  const ADMIN_EMAIL = "sohrabk502@gmail.com";

  // ================= AUTH =================

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // ================= POPUPS =================

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // ================= LOGIN STATES =================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ================= FORM STATES =================

  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [uid, setUid] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [members, setMembers] = useState("");

  // ================= ADMIN DATA =================

  const [registrations, setRegistrations] = useState([]);

  // ================= AUTH STATE =================

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      if (currentUser) {

        setUser(currentUser);

        if (currentUser.email === ADMIN_EMAIL) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

      } else {

        setUser(null);
        setIsAdmin(false);

      }
    });

    return () => unsubscribe();

  }, []);

  // ================= FETCH REALTIME DATA =================

  useEffect(() => {

    const tournamentRef = ref(database, "tournaments");

    onValue(tournamentRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        const loadedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setRegistrations(loadedData);

      } else {

        setRegistrations([]);

      }
    });

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

      setUser(userCredential.user);

      if (email === ADMIN_EMAIL) {
        setIsAdmin(true);
      }

      alert("Account Created Successfully 🔥");

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

      setUser(userCredential.user);

      if (email === ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      alert("Login Successful 🔥");

      setShowLogin(false);

    } catch (error) {

      alert(error.message);

    }
  };

  // ================= LOGOUT =================

  const logoutUser = async () => {

    await signOut(auth);

    setUser(null);
    setIsAdmin(false);

    alert("Logged Out");
  };

  // ================= SAVE TOURNAMENT =================

  const submitTournament = async () => {

    try {

      const tournamentRef = ref(database, "tournaments");

      await push(tournamentRef, {
        teamName,
        leaderName,
        uid,
        whatsapp,
        members,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      });

      alert("Tournament Registered Successfully 🔥");

      setTeamName("");
      setLeaderName("");
      setUid("");
      setWhatsapp("");
      setMembers("");

    } catch (error) {

      alert(error.message);

    }
  };

  // ================= DELETE TEAM =================

  const deleteTeam = async (id) => {

    try {

      await remove(ref(database, `tournaments/${id}`));

      alert("Team Deleted ❌");

    } catch (error) {

      alert(error.message);

    }
  };

  // ================= APPROVE TEAM =================

  const approveTeam = async (id) => {

    try {

      await update(
        ref(database, `tournaments/${id}`),
        {
          status: "APPROVED",
        }
      );

      alert("Team Approved ✅");

    } catch (error) {

      alert(error.message);

    }
  };

  // ================= TOURNAMENTS =================

  const tournaments = [
    {
      title: "Battle Royale Clash",
      prize: "₹50,000",
      teams: "48 Teams",
      time: "8:00 PM",
      status: "LIVE",
    },
    {
      title: "Elite Squad War",
      prize: "₹20,000",
      teams: "24 Teams",
      time: "9:30 PM",
      status: "HOT",
    },
    {
      title: "Booyah King Cup",
      prize: "₹1,00,000",
      teams: "72 Teams",
      time: "7:00 PM",
      status: "NEW",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,80,0,0.15),transparent_40%)] pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-orange-500/10">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-3xl md:text-4xl font-black tracking-widest text-orange-500">
            FIRE BAADSHAH ARENA
          </h1>

          <div className="hidden md:flex items-center gap-8 text-gray-300 font-semibold">

            <a href="#">Home</a>
            <a href="#">Tournaments</a>
            <a href="#">Register</a>
            <a href="#">Contact</a>

          </div>

          {user ? (

            <div className="flex items-center gap-4">

              {isAdmin && (
                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold">
                  ADMIN
                </span>
              )}

              <button
                onClick={logoutUser}
                className="bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-2xl font-black"
              >
                LOGOUT
              </button>

            </div>

          ) : (

            <div className="flex gap-4">

              <button
                onClick={() => setShowLogin(true)}
                className="border border-orange-500 text-orange-400 px-5 py-3 rounded-2xl font-bold hover:bg-orange-500 hover:text-black transition"
              >
                LOGIN
              </button>

              <button
                onClick={() => setShowRegister(true)}
                className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-3 rounded-2xl font-black"
              >
                REGISTER
              </button>

            </div>

          )}

        </div>

      </nav>

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        <div>

          <div className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 px-5 py-2 rounded-full mb-8">
            🔥 India's Ultimate Free Fire Tournament Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">

            DOMINATE THE <br />

            <span className="text-orange-500">
              BATTLEFIELD
            </span>

          </h1>

          <p className="mt-8 text-gray-400 text-lg leading-8 max-w-xl">
            Join elite Free Fire tournaments and dominate the battlefield.
          </p>

        </div>

        <div className="relative flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
            alt="gaming"
            className="rounded-[40px] border border-orange-500/20 shadow-[0_0_40px_rgba(255,80,0,0.3)] w-full max-w-lg h-[600px] object-cover"
          />

        </div>

      </section>

      {/* TOURNAMENTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-5xl font-black text-orange-500 mb-12">
          LIVE TOURNAMENTS
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {tournaments.map((item, index) => (

            <div
              key={index}
              className="bg-[#111] border border-orange-500/10 rounded-[35px] overflow-hidden"
            >

              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1971&auto=format&fit=crop"
                alt="tournament"
                className="w-full h-60 object-cover"
              />

              <div className="p-7">

                <div className="flex justify-between mb-6">

                  <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-black">
                    {item.status}
                  </span>

                  <span className="text-gray-400">
                    {item.time}
                  </span>

                </div>

                <h3 className="text-3xl font-black mb-8">
                  {item.title}
                </h3>

                <div className="space-y-4 text-lg text-gray-300">

                  <div className="flex justify-between">
                    <span>Teams</span>
                    <span>{item.teams}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Prize Pool</span>
                    <span className="text-orange-500 font-black">
                      {item.prize}
                    </span>
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* REGISTER FORM */}
      <section className="max-w-4xl mx-auto px-6 py-24">

        <div className="bg-[#111] border border-orange-500/10 rounded-[40px] p-10">

          <h2 className="text-5xl font-black text-center text-orange-500 mb-12">
            REGISTER YOUR SQUAD
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Leader Name"
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
              className="bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Free Fire UID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              className="bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="WhatsApp Number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Team Members"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              className="bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none md:col-span-2"
            />

          </div>

          <button
            onClick={submitTournament}
            className="w-full mt-10 bg-orange-500 hover:bg-orange-400 text-black py-5 rounded-2xl text-xl font-black"
          >
            SUBMIT REGISTRATION
          </button>

        </div>

      </section>

      {/* ADMIN PANEL */}
      {isAdmin && (

        <section className="max-w-7xl mx-auto px-6 py-24">

          <h2 className="text-5xl font-black text-orange-500 mb-12">
            ADMIN PANEL
          </h2>

          <div className="bg-[#111] border border-orange-500/10 rounded-[40px] overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-orange-500 text-black">

                  <tr>
                    <th className="p-5">Team</th>
                    <th className="p-5">Leader</th>
                    <th className="p-5">UID</th>
                    <th className="p-5">Status</th>
                    <th className="p-5">Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {registrations.map((team) => (

                    <tr
                      key={team.id}
                      className="border-b border-white/10"
                    >

                      <td className="p-5">
                        {team.teamName}
                      </td>

                      <td className="p-5">
                        {team.leaderName}
                      </td>

                      <td className="p-5">
                        {team.uid}
                      </td>

                      <td className="p-5">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold ${
                            team.status === "APPROVED"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {team.status}
                        </span>

                      </td>

                      <td className="p-5 flex gap-3">

                        <button
                          onClick={() => approveTeam(team.id)}
                          className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-xl font-bold"
                        >
                          APPROVE
                        </button>

                        <button
                          onClick={() => deleteTeam(team.id)}
                          className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-xl font-bold"
                        >
                          DELETE
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      )}

      {/* LOGIN POPUP */}
      {showLogin && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#111] p-8 rounded-[30px] w-[90%] max-w-md">

            <h2 className="text-3xl font-black text-orange-500 mb-6 text-center">
              LOGIN
            </h2>

            <div className="space-y-5">

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none"
              />

              <button
                onClick={loginUser}
                className="w-full bg-orange-500 text-black py-4 rounded-2xl font-black"
              >
                LOGIN
              </button>

            </div>

          </div>

        </div>

      )}

      {/* REGISTER POPUP */}
      {showRegister && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#111] p-8 rounded-[30px] w-[90%] max-w-md">

            <h2 className="text-3xl font-black text-orange-500 mb-6 text-center">
              REGISTER
            </h2>

            <div className="space-y-5">

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none"
              />

              <button
                onClick={registerUser}
                className="w-full bg-orange-500 text-black py-4 rounded-2xl font-black"
              >
                CREATE ACCOUNT
              </button>

            </div>

          </div>

        </div>

      )}

      {/* FOOTER */}
      <footer className="border-t border-orange-500/10 text-center py-10 text-gray-500">
        © 2026 FIRE BAADSHAH ARENA — Built For Hardcore Gamers 🔥
      </footer>

    </div>
  );
}