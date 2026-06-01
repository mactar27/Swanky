import { Settings, Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" /> Platform Settings
        </h2>
      </div>

      <div className="grid gap-8 max-w-2xl">
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="font-bold text-lg mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">WhatsApp Number</label>
              <input
                type="text"
                defaultValue="+20 12 28811446"
                className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-xs text-neutral-500 mt-1">Used for quote redirects and order confirmations.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Support Email</label>
              <input
                type="email"
                defaultValue="contact@swankyfactory.com"
                className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="font-bold text-lg mb-4">Security</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">New Admin Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md text-sm font-bold hover:bg-neutral-800 transition-colors">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
