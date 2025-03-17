import { useState, useEffect } from "react";
import { AdminService } from "../services/AdminService";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "tests">("users");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loadUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
    if (activeTab === "users") {
      fetchUsers();
    } else {
      // В будущем здесь будет загрузка тестов
      setUsers([]); 
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getUsers();
      if (user) {
        setUsers(response.filter((u: User) => u.id !== user.id) || []);
      } else {
        setUsers(response || []);
      }
    } catch (err) {
      setError("Ошибка загрузки пользователей");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (userId: number) => {
    if (!window.confirm("Вы уверены, что хотите удалить пользователя?")) return;
    try {
      await AdminService.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("Пользователь успешно удален!");
    } catch (err) {
      toast.error("Ошибка удаления пользователя");
    }
  };

  const toggleAdmin = async (userId: number, role: "USER" | "ADMIN") => {
    try {
      const newRole = role === "ADMIN" ? "USER" : "ADMIN";
      const user = await AdminService.toggleAdmin(userId, newRole);
      setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
      toast.success(`Права пользователя ${user.name} успешно изменены!`);
    } catch (err) {
      toast.error("Ошибка изменения прав пользователя");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Боковая панель */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <h1 className="text-xl font-bold text-white mb-6">Test Generator</h1>
        <nav className="flex flex-col gap-4">
          <div className="mt-4 text-gray-400 text-sm">Меню</div>
          <button
            onClick={() => setActiveTab("users")}
            className={`text-left p-2 rounded ${
              activeTab === "users" ? "bg-gray-700 text-blue-400" : "text-gray-400 hover:bg-gray-700"
            }`}
          >
            👥 Пользователи
          </button>
          <button
            onClick={() => setActiveTab("tests")}
            className={`text-left p-2 rounded ${
              activeTab === "tests" ? "bg-gray-700 text-blue-400" : "text-gray-400 hover:bg-gray-700"
            }`}
          >
            📚 Тесты
          </button>
        </nav>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 p-6">
        {/* Шапка с кнопкой пользователя */}
        <header className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md mb-4">
          <h2 className="text-2xl font-bold">
            Админ-панель: {activeTab === "users" ? "Пользователи" : "Тесты"}
          </h2>

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
        

        {activeTab === "users" && (
          <>
            <input
              type="text"
              placeholder="Поиск по имени или email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
            />
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
              <p>Загрузка...</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">Имя</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2">Роль</th>
                    <th className="p-2">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-700">
                      <td className="p-2">{user.id}</td>
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2 text-center">
                        {user.role === "ADMIN" ? "Админ" : "Пользователь"}
                      </td>
                      <td className="p-2 flex gap-2 justify-center">
                        <button
                          onClick={() => toggleAdmin(user.id, user.role)}
                          className="bg-green-500 px-3 py-1 rounded text-white"
                        >
                          {user.role === "ADMIN" ? "Снять админку" : "Выдать админку"}
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 px-3 py-1 rounded text-white"
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {activeTab === "tests" && (
          <div>
            <p>Здесь будет список тестов и управление ими.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
