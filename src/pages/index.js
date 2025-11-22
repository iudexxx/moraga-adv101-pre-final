import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  useEffect(() => {
    const sampleTodos = [
      {
        id: 1700445601,
        title: "Grocery Shopping",
        description: "Pick up milk, eggs, cheese, and fresh produce from the market.",
        date: "November 20, 2025 09:23 PM",
        completed: false
      },
      {
        id: 1700445602,
        title: "Pay Utility Bills",
        description: "Ensure electricity and internet bills are paid before the due date (Friday).",
        date: "November 20, 2025 09:23 PM",
        completed: false
      },
      {
        id: 1700445603,
        title: "Call Mom",
        description: "Check in and finalize plans for the upcoming holiday weekend.",
        date: "November 20, 2025 09:23 PM",
        completed: false
      },
      {
        id: 1700445604,
        title: "Car Wash",
        description: "Take the car to the wash and check the tire pressure.",
        date: "November 20, 2025 09:23 PM",
        completed: false
      },
      {
        id: 1700445605,
        title: "Book Appointment",
        description: "Schedule the annual physical check-up with Dr. Peterson.",
        date: "November 20, 2025 09:23 PM",
        completed: false
      }
    ];
    setTodos(sampleTodos);
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "todos" ? !todo.completed : todo.completed;
    return matchesSearch && matchesTab;
  });

  const addTodo = () => {
    if (newTodo.title.trim() && newTodo.description.trim()) {
      const newTodoItem = {
        id: Date.now(),
        title: newTodo.title,
        description: newTodo.description,
        date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        completed: false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo({ title: "", description: "" });
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-50 dark:bg-black font-sans`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Todo App</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Manage your tasks efficiently</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Add Todo
          </button>
        </div>

        <div className="mb-6 p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">Add New Todo</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Title"
              className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-700 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newTodo.title}
              onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
            />
            <input
              type="text"
              placeholder="Description"
              className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-700 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newTodo.description}
              onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
            />
          </div>
        </div>

        <div className="mb-6 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex space-x-8">
            <button
              className={`pb-4 px-1 font-medium border-b-2 transition-colors ${
                activeTab === "todos"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
              onClick={() => setActiveTab("todos")}
            >
              Todos
            </button>
            <button
              className={`pb-4 px-1 font-medium border-b-2 transition-colors ${
                activeTab === "completed"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </div>
        </div>


        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Date Created/Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-600">
                {filteredTodos.map((todo) => (
                  <tr key={todo.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                      {todo.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-white">
                      {todo.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400 max-w-xs">
                      {todo.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                      {todo.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={`px-3 py-1 rounded text-xs font-medium ${
                            todo.completed
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                          } transition-colors`}
                        >
                          {todo.completed ? "Undo" : "Complete"}
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 rounded text-xs font-medium transition-colors dark:bg-red-900 dark:text-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTodos.length === 0 && (
            <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
              No {activeTab} found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}