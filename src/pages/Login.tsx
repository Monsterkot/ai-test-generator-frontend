import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    server?: string;
  }>({});
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "email" | "password",
  ) => {
    const value = e.target.value;
    setErrors((prev) => ({ ...prev, [field]: "", server: "" })); // Сброс ошибки сервера при изменении полей

    if (field === "email" && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Введите корректный email" }));
    }
    if (field === "password" && value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Пароль должен содержать минимум 8 символов",
      }));
    }

    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/home");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;

      if (errorMessage === "User not found") {
        setErrors({ email: "Пользователь не найден" });
      } else if (errorMessage === "Invalid password") {
        setErrors({ password: "Неверный пароль" });
      } else {
        setErrors({ server: "Ошибка авторизации. Попробуйте снова." });
      }
    }
  };

  const isFormValid =
    email && password.length >= 8 && !errors.email && !errors.password;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 border border-transparent rounded-full text-gray-300 hover:bg-gray-700 transition cursor-pointer"
      >
        <ArrowLeft size={20} />
        <span>Назад</span>
      </button>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Вход</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
            className="w-full p-2 border rounded bg-gray-700 border-gray-600 focus:border-green-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
            className="w-full p-2 border rounded bg-gray-700 border-gray-600 focus:border-green-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        {errors.server && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {errors.server}
          </p>
        )}
        <motion.button
          whileHover={{ scale: isFormValid ? 1.05 : 1 }}
          whileTap={{ scale: isFormValid ? 0.95 : 1 }}
          transition={{ duration: 0.2 }}
          disabled={!isFormValid}
          className={`w-full p-3 font-bold rounded ${
            isFormValid
              ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          onClick={handleLogin}
        >
          Войти
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LoginPage;
