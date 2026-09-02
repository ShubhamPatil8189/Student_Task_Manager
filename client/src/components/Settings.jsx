import { useState } from "react";
import { User, Bell, Palette, BookOpen, Plus, X, Check, Settings2 } from "lucide-react";

const PALETTE = ["#E8A33D", "#5E9080", "#82598E", "#3E8E9A", "#445A9E", "#C6577A"];

export default function StudentSettings() {
  const [profile, setProfile] = useState({ name: "Alex Rivera", grade: "10th Grade", email: "alex@school.edu" });
  const [theme, setTheme] = useState("paper");
  const [sortOrder, setSortOrder] = useState("due-asc");
  const [notifications, setNotifications] = useState({
    emailReminders: true,
    dueTodayAlerts: true,
    weeklyDigest: false,
  });
  const [subjects, setSubjects] = useState([
    { id: "s1", name: "Math", color: PALETTE[0] },
    { id: "s2", name: "History", color: PALETTE[1] },
    { id: "s3", name: "Chemistry", color: PALETTE[2] },
  ]);
  const [newSubject, setNewSubject] = useState("");
  const [saved, setSaved] = useState(false);

  function toggleNotification(key) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function addSubject() {
    const name = newSubject.trim();
    if (!name) return;
    const color = PALETTE[subjects.length % PALETTE.length];
    setSubjects((prev) => [...prev, { id: `s${Date.now()}`, name, color }]);
    setNewSubject("");
  }

  function removeSubject(id) {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto bg-slate-50 rounded-lg border border-slate-200 shadow-sm p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-300 pb-4">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-slate-700" />
          <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 bg-slate-900 hover:bg-rose-500 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
        >
          {saved ? <Check className="w-4 h-4" /> : null}
          {saved ? "Saved" : "Save changes"}
        </button>
      </div>

      {/* Profile */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm uppercase tracking-wide">
          <User className="w-4 h-4" /> Profile
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500 block mb-1">Name</label>
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">Grade / Year</label>
            <input
              value={profile.grade}
              onChange={(e) => setProfile({ ...profile, grade: e.target.value })}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-slate-500 block mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm uppercase tracking-wide">
          <Palette className="w-4 h-4" /> Preferences
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500 block mb-1">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="paper">Paper (light)</option>
              <option value="sepia">Sepia</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">Default task sort</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="due-asc">Due date (soonest first)</option>
              <option value="due-desc">Due date (latest first)</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm uppercase tracking-wide">
          <Bell className="w-4 h-4" /> Notifications
        </div>
        <div className="space-y-2">
          {[
            { key: "emailReminders", label: "Email reminders for upcoming tasks" },
            { key: "dueTodayAlerts", label: "Alert me when a task is due today" },
            { key: "weeklyDigest", label: "Weekly summary digest" },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between bg-white border border-slate-200 rounded-md px-3 py-2.5 cursor-pointer"
            >
              <span className="text-sm text-slate-700">{item.label}</span>
              <button
                type="button"
                onClick={() => toggleNotification(item.key)}
                className={`w-10 h-6 rounded-full relative transition-colors ${
                  notifications[item.key] ? "bg-emerald-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications[item.key] ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm uppercase tracking-wide">
          <BookOpen className="w-4 h-4" /> Subjects
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => (
            <span
              key={s.id}
              className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full pl-2 pr-1 py-1 text-sm text-slate-700"
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              {s.name}
              <button
                onClick={() => removeSubject(s.id)}
                className="text-slate-400 hover:text-rose-500 rounded-full p-0.5"
                aria-label={`Remove ${s.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSubject()}
            placeholder="New subject name"
            className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <button
            onClick={addSubject}
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium px-3 py-2 rounded-md"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </section>
    </div>
  );
}