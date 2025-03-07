import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header
        className="fixed top-0 w-full bg-gray-800 bg-opacity-80 backdrop-blur-md p-4 flex justify-between items-center shadow-md z-50 transition-all duration-300"
        style={{ height: scrollY > 10 ? "60px" : "80px" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white"
        >
          Test Generator
        </motion.h1>
        <nav className="flex space-x-6">
          <Link to="/register">
            <motion.button
              whileHover={{
                backgroundColor: "#1DB954",
                color: "#ffffff",
                borderColor: "#1DB954",
              }}
              transition={{ duration: 0.2 }}
              className="px-6 py-2 border-2 border-white rounded-full text-white font-medium cursor-pointer"
            >
              Регистрация
            </motion.button>
          </Link>
          <Link
            to="/login"
            className="px-2 py-2  text-white font-medium hover:text-[#1DB954]"
          >
            Вход
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center pt-32 pb-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold"
        >
          Генератор тестов с ИИ
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-gray-300 mt-4 max-w-2xl"
        >
          Создавайте тесты быстро и легко с помощью передовых технологий
          искусственного интеллекта.
        </motion.p>
        <Link to="/register">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-6 px-6 py-3 bg-[#1DB954] rounded-lg text-lg font-semibold text-white hover:bg-[#1DB954] transition cursor-pointer"
          >
            Создать тест
          </motion.button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-16 px-4 text-center">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-6"
        >
          Возможности нашего генератора
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            title="Автоматическое создание тестов"
            description="Наш ИИ поможет вам быстро создать тесты любой сложности."
          />
          <FeatureCard
            title="Гибкие настройки"
            description="Вы можете настраивать вопросы, темы и уровень сложности."
          />
          <FeatureCard
            title="Простота использования"
            description="Интуитивный интерфейс делает создание тестов доступным каждому."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-700 p-6 rounded-lg shadow-lg"
    >
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
