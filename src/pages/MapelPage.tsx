import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Mapel {
  id: number;
  kode: string;
  nama: string;
  kelompok: string;
  kkm: number;
  guru: string;
}

const initialData: Mapel[] = [
  { id: 1, kode: "MTK", nama: "Matematika", kelompok: "Umum", kkm: 70, guru: "Ustadz Ahmad Ridwan, S.Pd" },
  { id: 2, kode: "FIS", nama: "Fisika", kelompok: "Umum", kkm: 70, guru: "Ustadz Budi Santoso, M.Pd" },
  { id: 3, kode: "BIO", nama: "Biologi", kelompok: "Umum", kkm: 70, guru: "Ustadzah Nur Halimah, S.Si" },
  { id: 4, kode: "ARB", nama: "Bahasa Arab", kelompok: "Agama", kkm: 65, guru: "Ustadzah Fatimah, S.Ag" },
  { id: 5, kode: "QHD", nama: "Al-Quran Hadits", kelompok: "Agama", kkm: 65, guru: "Ustadz Hasan Abdullah, S.Pd.I" },
  { id: 6, kode: "FQH", nama: "Fiqih", kelompok: "Agama", kkm: 65, guru: "Ustadz Ali Imron, Lc" },
  { id: 7, kode: "BIN", nama: "Bahasa Indonesia", kelompok: "Umum", kkm: 70, guru: "Ustadzah Dewi, S.Pd" },
  { id: 8, kode: "BIG", nama: "Bahasa Inggris", kelompok: "Umum", kkm: 70, guru: "Ustadz Rizky, S.Pd" },
];

export default function MapelPage() {
  const [data, setData] = useState<Mapel[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Mapel | null>(null);
  const [form, setForm] = useState({ kode: "", nama: "", kelompok: "Umum", kkm: 70, guru: "" });

  const handleSave = () => {
    if (editing) {
      setData(data.map(d => d.id === editing.id ? { ...d, ...form } : d));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setDialogOpen(false);
    setEditing(null);
    setForm({ kode: "", nama: "", kelompok: "Umum", kkm: 70, guru: "" });
  };

  const handleEdit = (m: Mapel) => {
    setEditing(m);
    setForm({ kode: m.kode, nama: m.nama, kelompok: m.kelompok, kkm: m.kkm, guru: m.guru });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mata Pelajaran</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola data mata pelajaran</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditing(null); }}>
          <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 mr-1" /> Tambah Mapel</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>{editing ? "Edit Mapel" : "Tambah Mata Pelajaran"}</DialogTitle></DialogHeader>
            <div className="grid gap-3 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs">Kode</Label><Input value={form.kode} onChange={e => setForm({...form, kode: e.target.value})} /></div>
                <div><Label className="text-xs">KKM</Label><Input type="number" value={form.kkm} onChange={e => setForm({...form, kkm: Number(e.target.value)})} /></div>
              </div>
              <div><Label className="text-xs">Nama Mata Pelajaran</Label><Input value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} /></div>
              <div><Label className="text-xs">Kelompok</Label><Input value={form.kelompok} onChange={e => setForm({...form, kelompok: e.target.value})} placeholder="Umum / Agama" /></div>
              <div><Label className="text-xs">Guru Pengampu</Label><Input value={form.guru} onChange={e => setForm({...form, guru: e.target.value})} /></div>
              <Button onClick={handleSave} className="mt-2">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">No</TableHead>
                  <TableHead className="text-xs">Kode</TableHead>
                  <TableHead className="text-xs">Nama</TableHead>
                  <TableHead className="text-xs">Kelompok</TableHead>
                  <TableHead className="text-xs">KKM</TableHead>
                  <TableHead className="text-xs">Guru Pengampu</TableHead>
                  <TableHead className="text-xs">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((m, i) => (
                  <TableRow key={m.id}>
                    <TableCell className="text-sm">{i + 1}</TableCell>
                    <TableCell className="text-sm font-mono font-medium">{m.kode}</TableCell>
                    <TableCell className="text-sm font-medium">{m.nama}</TableCell>
                    <TableCell><span className={`text-xs px-2 py-1 rounded-md font-medium ${m.kelompok === "Agama" ? "bg-success/10 text-success" : "bg-info/10 text-info"}`}>{m.kelompok}</span></TableCell>
                    <TableCell className="text-sm">{m.kkm}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{m.guru}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(m)}><Edit className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setData(data.filter(x => x.id !== m.id))}><Trash2 className="w-3.5 h-3.5" /></Button>
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
