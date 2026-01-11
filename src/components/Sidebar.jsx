export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white p-6 hidden md:block">
      <h1 className="text-xl font-bold mb-8">Desa Digital</h1>
      <nav className="space-y-4">
        <div className="bg-blue-800 p-2 rounded cursor-pointer font-medium">Dashboard</div>
        <div className="p-2 hover:bg-blue-800 rounded cursor-pointer transition-colors">Data Penduduk</div>
        <div className="p-2 hover:bg-blue-800 rounded cursor-pointer transition-colors">Buat Surat</div>
      </nav>
    </div>
  )
}