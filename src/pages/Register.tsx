import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const validatePassword = (password: string) => password.length >= 8;

  const validateUsername = (username: string) => username.trim() !== "";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const value = e.target.value;
    let error = "";

    if (field === "username" && !validateUsername(value)) {
      error = "Имя пользователя обязательно";
    } else if (field === "email" && !validateEmail(value)) {
      error = "Введите корректный email";
    } else if (field === "password" && !validatePassword(value)) {
      error = "Пароль должен содержать минимум 8 символов";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  const isFormValid =
    username &&
    email &&
    password &&
    !errors.username &&
    !errors.email &&
    !errors.password;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 border border-transparent rounded-full text-gray-300 hover:bg-gray-700 transition cursor-pointer"
      >
        <ArrowLeft size={20} />
        <span>Назад</span>
      </button>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Регистрация</h2>

        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => handleInputChange(e, "username")}
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none mb-1"
        />
        {errors.username && (
          <p className="text-red-500 text-sm -mt-1 mb-2">{errors.username}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleInputChange(e, "email")}
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none mb-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm -mt-1 mb-2">{errors.email}</p>
        )}

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => handleInputChange(e, "password")}
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none mb-1"
        />
        {errors.password && (
          <p className="text-red-500 text-sm -mt-1 mb-2">{errors.password}</p>
        )}

        <motion.button
          whileHover={isFormValid ? { scale: 1.05 } : {}}
          whileTap={isFormValid ? { scale: 0.95 } : {}}
          disabled={!isFormValid}
          className={`w-full mt-4 py-3 rounded-lg text-lg font-semibold transition ${isFormValid ? "bg-[#1DB954] text-white cursor-pointer" : "bg-gray-600 cursor-not-allowed"}`}
        >
          Зарегистрироваться
        </motion.button>

        <p className="text-sm text-gray-400 text-center mt-4">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Войти
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
