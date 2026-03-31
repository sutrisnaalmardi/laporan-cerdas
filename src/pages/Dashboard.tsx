import { Users, UserCheck, School, BookOpen, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const stats = [
  { label: "Total Siswa", value: "324", icon: Users, change: "+12", trend: "up" as const },
  { label: "Total Guru", value: "28", icon: UserCheck, change: "0", trend: "neutral" as const },
  { label: "Jumlah Kelas", value: "12", icon: School, change: "+1", trend: "up" as const },
  { label: "Mata Pelajaran", value: "15", icon: BookOpen, change: "0", trend: "neutral" as const },
];

const nilaiPerKelas = [
  { kelas: "X-A", rataRata: 78 },
  { kelas: "X-B", rataRata: 82 },
  { kelas: "X-C", rataRata: 75 },
  { kelas: "XI-A", rataRata: 80 },
  { kelas: "XI-B", rataRata: 85 },
  { kelas: "XI-C", rataRata: 77 },
  { kelas: "XII-A", rataRata: 88 },
  { kelas: "XII-B", rataRata: 83 },
  { kelas: "XII-C", rataRata: 79 },
];

const kehadiran = [
  { name: "Hadir", value: 85, color: "hsl(152, 60%, 42%)" },
  { name: "Izin", value: 8, color: "hsl(210, 80%, 55%)" },
  { name: "Sakit", value: 5, color: "hsl(38, 92%, 50%)" },
  { name: "Alpha", value: 2, color: "hsl(0, 72%, 51%)" },
];

const recentActivity = [
  { action: "Nilai X-A Matematika diinput", user: "Ustadz Ahmad", time: "2 jam lalu" },
  { action: "Data siswa baru ditambahkan", user: "Admin", time: "3 jam lalu" },
  { action: "Raport XII-A disetujui", user: "Kepala Sekolah", time: "5 jam lalu" },
  { action: "Nilai XI-B B. Arab diupdate", user: "Ustadzah Fatimah", time: "1 hari lalu" },
];

const TrendIcon = ({ trend }: { trend: "up" | "down" | "neutral" }) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-success" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-destructive" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Ringkasan data raport tengah semester</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="glass-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{s.value}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <TrendIcon trend={s.trend} />
                <span className="text-xs text-muted-foreground">{s.change} dari semester lalu</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Rata-rata Nilai Per Kelas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nilaiPerKelas}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="kelas" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip 
                    contentStyle={{ 
                      background: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "13px"
                    }} 
                  />
                  <Bar dataKey="rataRata" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Rata-rata" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Kehadiran Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={kehadiran}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {kehadiran.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {kehadiran.map((k) => (
                <div key={k.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: k.color }} />
                  <span className="text-xs text-muted-foreground">{k.name} ({k.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.user}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{a.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
