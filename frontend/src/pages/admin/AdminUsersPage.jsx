import React, { useEffect, useState, useMemo } from "react";
import api from "../../services/apiClient";

const Avatar = ({ name }) => {
  const initials = (name || "?").split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold">
      {initials}
    </div>
  );
};

const RoleBadge = ({ role }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}>
    {role}
  </span>
);

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/users');
        if (!mounted) return;
        setUsers(res.data.users || []);
      } catch (err) {
        console.error('Failed to fetch users', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u => (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q));
  }, [users, query]);

  const selected = users.find(u => u.id === selectedId) || null;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Users</h1>
            <p className="text-sm text-slate-500 mt-1">Registered users — view details and roles</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Total</div>
            <div className="bg-white px-4 py-2 rounded-lg shadow font-semibold">{users.length}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded-xl shadow mb-4 flex items-center gap-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <div className="text-sm text-gray-500">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</div>
            </div>

            <div className="space-y-3">
              {loading ? (
                <div className="p-6 bg-white rounded-lg shadow text-center">Loading users...</div>
              ) : filtered.length === 0 ? (
                <div className="p-6 bg-white rounded-lg shadow text-center text-gray-600">No users found</div>
              ) : (
                filtered.map(user => (
                  <div key={user.id} className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar name={user.name} />
                      <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <RoleBadge role={user.role} />
                      <button
                        onClick={() => setSelectedId(selectedId === user.id ? null : user.id)}
                        className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      >
                        {selectedId === user.id ? 'Close' : 'Details'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <aside className="hidden md:block">
            <div className="sticky top-24 bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold text-lg">User Details</h3>
              {!selected ? (
                <p className="text-sm text-gray-500 mt-3">Select a user to view details and actions.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-4">
                    <Avatar name={selected.name} />
                    <div>
                      <div className="font-semibold">{selected.name}</div>
                      <div className="text-sm text-gray-500">{selected.email}</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700">
                    <p><strong>ID:</strong> <span className="text-gray-600">{selected.id}</span></p>
                    <p><strong>Role:</strong> <span className="text-gray-600">{selected.role}</span></p>
                  </div>

                  <div className="pt-2 border-t"></div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-red-50 text-red-700 rounded-lg">Revoke</button>
                    <button className="flex-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg">Promote</button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
