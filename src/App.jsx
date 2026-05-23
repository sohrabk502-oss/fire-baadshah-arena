import { useState } from "react";

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "./firebase";

export default function FireBaadshahArena() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const registerUser = async () => {
    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      setUser(userCredential.user);

      alert("Account Created Successfully 🔥");

      setShowRegister(false);

    } catch (error) {
      alert(error.message);
    }
  };

  const loginUser = async () => {
    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      setUser(userCredential.user);

      alert("Login Successful 🔥");

      setShowLogin(false);

    } catch (error) {
      alert(error.message);
    }
  };

  const logoutUser = async () => {
    await signOut(auth);

    setUser(null);

    alert("Logged Out");
  };

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

      {/* BACKGROUND EFFECT */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,80,0,0.15),transparent_40%)] pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-orange-500/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-3xl md:text-4xl font-black tracking-widest text-orange-500 drop-shadow-[0_0_15px_rgba(255,80,0,0.8)]">
            FIRE BAADSHAH ARENA
          </h1>

          <div className="hidden md:flex items-center gap-8 text-gray-300 font-semibold">
            <a href="#" className="hover:text-orange-500 transition">
              Home
            </a>

            <a href="#" className="hover:text-orange-500 transition">
              Tournaments
            </a>

            <a href="#" className="hover:text-orange-500 transition">
              Register
            </a>

            <a href="#" className="hover:text-orange-500 transition">
              Contact
            </a>
          </div>

          {/* AUTH BUTTONS */}
          {user ? (
            <button
              onClick={logoutUser}
              className="bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-2xl font-black transition"
            >
              LOGOUT
            </button>
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
                className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-3 rounded-2xl font-black shadow-[0_0_20px_rgba(255,100,0,0.6)] transition hover:scale-105"
              >
                REGISTER
              </button>

            </div>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        <div>

          <div className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 px-5 py-2 rounded-full mb-8">
            🔥 India's Ultimate Free Fire Tournament Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            DOMINATE THE <br />

            <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(255,80,0,0.8)]">
              BATTLEFIELD
            </span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg leading-8 max-w-xl">
            Join elite Free Fire tournaments, fight pro squads, win massive cash
            prizes, and become the next legend in FIRE BAADSHAH ARENA.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <button className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-4 rounded-2xl text-lg font-black transition hover:scale-105 shadow-[0_0_25px_rgba(255,80,0,0.7)]">
              PLAY NOW
            </button>

            <button className="border border-orange-500 text-orange-400 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-orange-500 hover:text-black transition">
              VIEW MATCHES
            </button>

          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative flex justify-center">

          <div className="absolute w-[400px] h-[400px] bg-orange-500/20 blur-3xl rounded-full"></div>

          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
            alt="gaming"
            className="relative rounded-[40px] border border-orange-500/20 shadow-[0_0_40px_rgba(255,80,0,0.3)] w-full max-w-lg h-[600px] object-cover"
          />
        </div>
      </section>

      {/* LIVE TOURNAMENTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="flex items-center justify-between flex-wrap gap-4 mb-14">

          <div>
            <h2 className="text-5xl font-black text-orange-500">
              LIVE TOURNAMENTS
            </h2>

            <p className="text-gray-400 mt-4">
              Register now and secure your squad slot before it fills up.
            </p>
          </div>

          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-orange-500 hover:text-black transition">
            EXPLORE ALL
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {tournaments.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#111] to-[#050505] border border-orange-500/10 rounded-[35px] overflow-hidden hover:-translate-y-3 transition duration-300 shadow-[0_0_25px_rgba(255,80,0,0.15)]"
            >

              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1971&auto=format&fit=crop"
                alt="tournament"
                className="w-full h-60 object-cover"
              />

              <div className="p-7">

                <div className="flex items-center justify-between mb-6">

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

                  <div className="flex justify-between">
                    <span>Entry Fee</span>
                    <span>₹49</span>
                  </div>

                </div>

                <button className="w-full mt-8 bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-2xl text-lg font-black transition hover:scale-105">
                  REGISTER NOW
                </button>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTER FORM */}
      <section className="max-w-4xl mx-auto px-6 py-24">

        <div className="bg-gradient-to-b from-[#111] to-[#050505] border border-orange-500/10 rounded-[40px] p-10 shadow-[0_0_40px_rgba(255,80,0,0.15)]">

          <h2 className="text-5xl font-black text-center text-orange-500 mb-12">
            REGISTER YOUR SQUAD
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Team Name"
              className="bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              placeholder="Leader Name"
              className="bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              placeholder="Free Fire UID"
              className="bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              placeholder="WhatsApp Number"
              className="bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              placeholder="Team Members"
              className="bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 md:col-span-2"
            />

            <input
              type="file"
              className="bg-black border border-orange-500/20 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 md:col-span-2"
            />

          </div>

          <button className="w-full mt-10 bg-orange-500 hover:bg-orange-400 text-black py-5 rounded-2xl text-xl font-black transition hover:scale-105 shadow-[0_0_30px_rgba(255,80,0,0.6)]">
            SUBMIT REGISTRATION
          </button>

        </div>
      </section>

      {/* LOGIN POPUP */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#111] p-8 rounded-[30px] w-[90%] max-w-md border border-orange-500/20">

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

              <button
                onClick={() => setShowLogin(false)}
                className="w-full border border-white/10 py-4 rounded-2xl"
              >
                CLOSE
              </button>

            </div>
          </div>
        </div>
      )}

      {/* REGISTER POPUP */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#111] p-8 rounded-[30px] w-[90%] max-w-md border border-orange-500/20">

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

              <button
                onClick={() => setShowRegister(false)}
                className="w-full border border-white/10 py-4 rounded-2xl"
              >
                CLOSE
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