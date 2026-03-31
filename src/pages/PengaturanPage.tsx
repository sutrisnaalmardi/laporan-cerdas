import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, School } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const defaultSettings = {
  namaSekolah: "MA Nurul Ilmi",
  alamatSekolah: "Jl. Pendidikan No. 1, Kota Ilmu, Jawa Barat 40123",
  namaKepalaMadrasah: "Drs. H. Mahmud, M.Pd",
  nipKepala: "196505101990031002",
  tahunPelajaran: "2024/2025",
  semester: "Ganjil",
};

export default function PengaturanPage() {
  const [form, setForm] = useState(defaultSettings);
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Berhasil", description: "Pengaturan sekolah berhasil disimpan." });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pengaturan</h1>
        <p className="text-sm text-muted-foreground mt-1">Kelola informasi sekolah/madrasah</p>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <School className="w-5 h-5 text-primary" />
            Identitas Sekolah / Madrasah
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs">Nama Sekolah / Madrasah</Label>
            <Input value={form.namaSekolah} onChange={e => setForm({ ...form, namaSekolah: e.target.value })} placeholder="Contoh: MA Nurul Ilmi" />
          </div>
          <div>
            <Label className="text-xs">Alamat Sekolah / Madrasah</Label>
            <Input value={form.alamatSekolah} onChange={e => setForm({ ...form, alamatSekolah: e.target.value })} placeholder="Jl. ..." />
          </div>
          <div>
            <Label className="text-xs">Nama Kepala Madrasah</Label>
            <Input value={form.namaKepalaMadrasah} onChange={e => setForm({ ...form, namaKepalaMadrasah: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs">NIP Kepala Madrasah</Label>
            <Input value={form.nipKepala} onChange={e => setForm({ ...form, nipKepala: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Tahun Pelajaran</Label>
              <Select value={form.tahunPelajaran} onValueChange={v => setForm({ ...form, tahunPelajaran: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["2023/2024", "2024/2025", "2025/2026", "2026/2027"].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Semester</Label>
              <Select value={form.semester} onValueChange={v => setForm({ ...form, semester: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ganjil">Ganjil</SelectItem>
                  <SelectItem value="Genap">Genap</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSave} className="mt-2">
            <Save className="w-4 h-4 mr-2" /> Simpan Pengaturan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
