import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full bg-gray-800 p-4 flex justify-between items-center shadow">
          <h2 className="text-lg font-semibold">Тесты</h2>
          <FaUserCircle className="text-3xl cursor-pointer text-gray-400 hover:text-white" />
        </header>

        {/* Content */}
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

export default DashboardPage;
