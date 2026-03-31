import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Kelas {
  id: number;
  nama: string;
  tingkat: string;
  waliKelas: string;
  jumlahSiswa: number;
}

const initialData: Kelas[] = [
  { id: 1, nama: "X-A", tingkat: "X", waliKelas: "Ustadzah Fatimah, S.Ag", jumlahSiswa: 30 },
  { id: 2, nama: "X-B", tingkat: "X", waliKelas: "Ustadz Ahmad Ridwan, S.Pd", jumlahSiswa: 28 },
  { id: 3, nama: "X-C", tingkat: "X", waliKelas: "Ustadzah Nur Halimah, S.Si", jumlahSiswa: 32 },
  { id: 4, nama: "XI-A", tingkat: "XI", waliKelas: "Ustadz Budi Santoso, M.Pd", jumlahSiswa: 27 },
  { id: 5, nama: "XI-B", tingkat: "XI", waliKelas: "Ustadz Hasan Abdullah, S.Pd.I", jumlahSiswa: 29 },
  { id: 6, nama: "XII-A", tingkat: "XII", waliKelas: "Ustadzah Siti Mariam, S.Pd", jumlahSiswa: 26 },
];

export default function KelasPage() {
  const [data, setData] = useState<Kelas[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Kelas | null>(null);
  const [form, setForm] = useState({ nama: "", tingkat: "X", waliKelas: "", jumlahSiswa: 0 });

  const handleSave = () => {
    if (editing) {
      setData(data.map(d => d.id === editing.id ? { ...d, ...form } : d));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setDialogOpen(false);
    setEditing(null);
    setForm({ nama: "", tingkat: "X", waliKelas: "", jumlahSiswa: 0 });
  };

  const handleEdit = (k: Kelas) => {
    setEditing(k);
    setForm({ nama: k.nama, tingkat: k.tingkat, waliKelas: k.waliKelas, jumlahSiswa: k.jumlahSiswa });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Data Kelas</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola data kelas dan wali kelas</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditing(null); } }}>
          <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 mr-1" /> Tambah Kelas</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>{editing ? "Edit Kelas" : "Tambah Kelas Baru"}</DialogTitle></DialogHeader>
            <div className="grid gap-3 py-2">
              <div><Label className="text-xs">Nama Kelas</Label><Input value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} /></div>
              <div>
                <Label className="text-xs">Tingkat</Label>
                <Select value={form.tingkat} onValueChange={v => setForm({...form, tingkat: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="X">X</SelectItem>
                    <SelectItem value="XI">XI</SelectItem>
                    <SelectItem value="XII">XII</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label className="text-xs">Wali Kelas</Label><Input value={form.waliKelas} onChange={e => setForm({...form, waliKelas: e.target.value})} /></div>
              <div><Label className="text-xs">Jumlah Siswa</Label><Input type="number" value={form.jumlahSiswa} onChange={e => setForm({...form, jumlahSiswa: Number(e.target.value)})} /></div>
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
                  <TableHead className="text-xs">Nama Kelas</TableHead>
                  <TableHead className="text-xs">Tingkat</TableHead>
                  <TableHead className="text-xs">Wali Kelas</TableHead>
                  <TableHead className="text-xs">Jumlah Siswa</TableHead>
                  <TableHead className="text-xs">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((k, i) => (
                  <TableRow key={k.id}>
                    <TableCell className="text-sm">{i + 1}</TableCell>
                    <TableCell className="text-sm font-medium">{k.nama}</TableCell>
                    <TableCell><span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">{k.tingkat}</span></TableCell>
                    <TableCell className="text-sm">{k.waliKelas}</TableCell>
                    <TableCell className="text-sm">{k.jumlahSiswa} siswa</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(k)}><Edit className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setData(data.filter(x => x.id !== k.id))}><Trash2 className="w-3.5 h-3.5" /></Button>
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
