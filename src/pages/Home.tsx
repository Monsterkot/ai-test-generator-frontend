import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <h1 className="text-xl font-bold text-white mb-6">Test Generator</h1>
        <nav className="flex flex-col gap-4">
          <Link to={"/create-test"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-blue-600 rounded-lg text-white text-center font-semibold cursor-pointer transition duration-200"
            >
              + Новый тест
            </motion.button>
          </Link>
          <div className="mt-4 text-gray-400 text-sm">Menu</div>
          <Link
            to="/library"
            className="text-blue-400 hover:underline flex items-center gap-2"
          >
            📂 Моя библиотека
          </Link>
          <Link
            to="/settings"
            className="text-gray-400 hover:underline flex items-center gap-2 mt-auto"
          >
            ⚙️ Настройки
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="w-full bg-gray-800 p-4 flex justify-between items-center shadow relative">
          <h2 className="text-lg font-semibold">Тесты</h2>

          {/* Если user загружается, показываем "Загрузка..." */}
          {user ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FaUserCircle className="text-3xl text-gray-400 hover:text-white" />
                <span className="text-white">{user.name}</span>
              </div>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-700 shadow-lg rounded-lg overflow-hidden">
                  {user.role === "ADMIN" && (
                    <button
                      className="w-full text-left px-4 py-2 text-white hover:bg-gray-600"
                      onClick={handleAdmin}
                    >
                      🛠️ Админ-панель
                    </button>
                  )}
                  <button
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-600"
                    onClick={handleLogout}
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-400">Загрузка...</span>
          )}
        </header>

        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <img
            src="src/images/empty-folder.png"
            alt="Пустая папка"
            className="mb-4"
          />
          <h3 className="text-xl font-semibold">Эта папка пуста</h3>
          <p className="text-gray-400">
            В этой папке еще нет тестов. Нажмите ниже, чтобы создать новый.
          </p>
          <Link to={"/create-test"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold text-lg cursor-pointer transition duration-200"
            >
              Новый тест
            </motion.button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
