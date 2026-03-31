import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Guru {
  id: number;
  nip: string;
  nama: string;
  mapel: string;
  jabatan: string;
  noHp: string;
}

const initialGuru: Guru[] = [
  { id: 1, nip: "198501012010011001", nama: "Ustadz Ahmad Ridwan, S.Pd", mapel: "Matematika", jabatan: "Guru", noHp: "081234567890" },
  { id: 2, nip: "198703152012012002", nama: "Ustadzah Fatimah, S.Ag", mapel: "Bahasa Arab", jabatan: "Wali Kelas X-A", noHp: "081234567891" },
  { id: 3, nip: "199001202015011003", nama: "Ustadz Budi Santoso, M.Pd", mapel: "Fisika", jabatan: "Wakil Kepala Sekolah", noHp: "081234567892" },
  { id: 4, nip: "198812082013012004", nama: "Ustadzah Nur Halimah, S.Si", mapel: "Biologi", jabatan: "Wali Kelas XI-A", noHp: "081234567893" },
  { id: 5, nip: "199205152018011005", nama: "Ustadz Hasan Abdullah, S.Pd.I", mapel: "Al-Quran Hadits", jabatan: "Guru", noHp: "081234567894" },
];

export default function GuruPage() {
  const [guru, setGuru] = useState<Guru[]>(initialGuru);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Guru | null>(null);
  const [form, setForm] = useState({ nip: "", nama: "", mapel: "", jabatan: "", noHp: "" });

  const filtered = guru.filter(g => g.nama.toLowerCase().includes(search.toLowerCase()) || g.nip.includes(search));

  const handleSave = () => {
    if (editing) {
      setGuru(guru.map(g => g.id === editing.id ? { ...g, ...form } : g));
    } else {
      setGuru([...guru, { id: Date.now(), ...form }]);
    }
    setDialogOpen(false);
    setEditing(null);
    setForm({ nip: "", nama: "", mapel: "", jabatan: "", noHp: "" });
  };

  const handleEdit = (g: Guru) => {
    setEditing(g);
    setForm({ nip: g.nip, nama: g.nama, mapel: g.mapel, jabatan: g.jabatan, noHp: g.noHp });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Data Guru</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola data guru dan tenaga pengajar</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditing(null); setForm({ nip: "", nama: "", mapel: "", jabatan: "", noHp: "" }); } }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Tambah Guru</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>{editing ? "Edit Guru" : "Tambah Guru Baru"}</DialogTitle></DialogHeader>
            <div className="grid gap-3 py-2">
              <div><Label className="text-xs">NIP</Label><Input value={form.nip} onChange={e => setForm({...form, nip: e.target.value})} /></div>
              <div><Label className="text-xs">Nama Lengkap</Label><Input value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} /></div>
              <div><Label className="text-xs">Mata Pelajaran</Label><Input value={form.mapel} onChange={e => setForm({...form, mapel: e.target.value})} /></div>
              <div><Label className="text-xs">Jabatan</Label><Input value={form.jabatan} onChange={e => setForm({...form, jabatan: e.target.value})} /></div>
              <div><Label className="text-xs">No. HP</Label><Input value={form.noHp} onChange={e => setForm({...form, noHp: e.target.value})} /></div>
              <Button onClick={handleSave} className="mt-2">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari nama atau NIP..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">No</TableHead>
                  <TableHead className="text-xs">NIP</TableHead>
                  <TableHead className="text-xs">Nama</TableHead>
                  <TableHead className="text-xs">Mata Pelajaran</TableHead>
                  <TableHead className="text-xs">Jabatan</TableHead>
                  <TableHead className="text-xs">No. HP</TableHead>
                  <TableHead className="text-xs">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((g, i) => (
                  <TableRow key={g.id}>
                    <TableCell className="text-sm">{i + 1}</TableCell>
                    <TableCell className="text-sm font-mono">{g.nip}</TableCell>
                    <TableCell className="text-sm font-medium">{g.nama}</TableCell>
                    <TableCell className="text-sm">{g.mapel}</TableCell>
                    <TableCell><span className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent font-medium">{g.jabatan}</span></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{g.noHp}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(g)}><Edit className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setGuru(guru.filter(x => x.id !== g.id))}><Trash2 className="w-3.5 h-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
