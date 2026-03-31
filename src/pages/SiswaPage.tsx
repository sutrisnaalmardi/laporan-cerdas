import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Download, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Siswa {
  id: number;
  nis: string;
  nisn: string;
  nama: string;
  kelas: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
}

const initialSiswa: Siswa[] = [
  { id: 1, nis: "2401001", nisn: "0012345601", nama: "Ahmad Fauzi", kelas: "X-A", jenisKelamin: "L", tempatLahir: "Jakarta", tanggalLahir: "2008-05-12", alamat: "Jl. Mawar No. 5" },
  { id: 2, nis: "2401002", nisn: "0012345602", nama: "Siti Aisyah", kelas: "X-A", jenisKelamin: "P", tempatLahir: "Bandung", tanggalLahir: "2008-08-23", alamat: "Jl. Melati No. 10" },
  { id: 3, nis: "2401003", nisn: "0012345603", nama: "Muhammad Rizki", kelas: "X-B", jenisKelamin: "L", tempatLahir: "Surabaya", tanggalLahir: "2008-02-14", alamat: "Jl. Kenanga No. 3" },
  { id: 4, nis: "2401004", nisn: "0012345604", nama: "Fatimah Zahra", kelas: "XI-A", jenisKelamin: "P", tempatLahir: "Yogyakarta", tanggalLahir: "2007-11-30", alamat: "Jl. Dahlia No. 8" },
  { id: 5, nis: "2401005", nisn: "0012345605", nama: "Umar Hasan", kelas: "XII-A", jenisKelamin: "L", tempatLahir: "Semarang", tanggalLahir: "2006-07-19", alamat: "Jl. Anggrek No. 15" },
];

export default function SiswaPage() {
  const [siswa, setSiswa] = useState<Siswa[]>(initialSiswa);
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState<Siswa | null>(null);
  const [form, setForm] = useState({ nis: "", nisn: "", nama: "", kelas: "X-A", jenisKelamin: "L", tempatLahir: "", tanggalLahir: "", alamat: "" });

  const kelasList = ["X-A", "X-B", "X-C", "XI-A", "XI-B", "XI-C", "XII-A", "XII-B", "XII-C"];

  const filtered = siswa.filter((s) => {
    const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search);
    const matchKelas = filterKelas === "all" || s.kelas === filterKelas;
    return matchSearch && matchKelas;
  });

  const handleSave = () => {
    if (editingSiswa) {
      setSiswa(siswa.map(s => s.id === editingSiswa.id ? { ...editingSiswa, ...form } : s));
    } else {
      setSiswa([...siswa, { id: Date.now(), ...form }]);
    }
    setDialogOpen(false);
    setEditingSiswa(null);
    setForm({ nis: "", nisn: "", nama: "", kelas: "X-A", jenisKelamin: "L", tempatLahir: "", tanggalLahir: "", alamat: "" });
  };

  const handleEdit = (s: Siswa) => {
    setEditingSiswa(s);
    setForm({ nis: s.nis, nisn: s.nisn, nama: s.nama, kelas: s.kelas, jenisKelamin: s.jenisKelamin, tempatLahir: s.tempatLahir, tanggalLahir: s.tanggalLahir, alamat: s.alamat });
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSiswa(siswa.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Data Siswa</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola data siswa madrasah</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Upload className="w-4 h-4 mr-1" /> Import</Button>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Export</Button>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditingSiswa(null); setForm({ nis: "", nisn: "", nama: "", kelas: "X-A", jenisKelamin: "L", tempatLahir: "", tanggalLahir: "", alamat: "" }); } }}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Tambah Siswa</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingSiswa ? "Edit Siswa" : "Tambah Siswa Baru"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 py-2">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">NIS</Label><Input value={form.nis} onChange={e => setForm({...form, nis: e.target.value})} /></div>
                  <div><Label className="text-xs">NISN</Label><Input value={form.nisn} onChange={e => setForm({...form, nisn: e.target.value})} /></div>
                </div>
                <div><Label className="text-xs">Nama Lengkap</Label><Input value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Kelas</Label>
                    <Select value={form.kelas} onValueChange={v => setForm({...form, kelas: v})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{kelasList.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Jenis Kelamin</Label>
                    <Select value={form.jenisKelamin} onValueChange={v => setForm({...form, jenisKelamin: v})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L">Laki-laki</SelectItem>
                        <SelectItem value="P">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">Tempat Lahir</Label><Input value={form.tempatLahir} onChange={e => setForm({...form, tempatLahir: e.target.value})} /></div>
                  <div><Label className="text-xs">Tanggal Lahir</Label><Input type="date" value={form.tanggalLahir} onChange={e => setForm({...form, tanggalLahir: e.target.value})} /></div>
                </div>
                <div><Label className="text-xs">Alamat</Label><Input value={form.alamat} onChange={e => setForm({...form, alamat: e.target.value})} /></div>
                <Button onClick={handleSave} className="mt-2">Simpan</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Cari nama atau NIS..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={filterKelas} onValueChange={setFilterKelas}>
              <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Semua Kelas" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                {kelasList.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">No</TableHead>
                  <TableHead className="text-xs">NIS</TableHead>
                  <TableHead className="text-xs">NISN</TableHead>
                  <TableHead className="text-xs">Nama</TableHead>
                  <TableHead className="text-xs">Kelas</TableHead>
                  <TableHead className="text-xs">JK</TableHead>
                  <TableHead className="text-xs">TTL</TableHead>
                  <TableHead className="text-xs">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s, i) => (
                  <TableRow key={s.id}>
                    <TableCell className="text-sm">{i + 1}</TableCell>
                    <TableCell className="text-sm font-mono">{s.nis}</TableCell>
                    <TableCell className="text-sm font-mono">{s.nisn}</TableCell>
                    <TableCell className="text-sm font-medium">{s.nama}</TableCell>
                    <TableCell><span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">{s.kelas}</span></TableCell>
                    <TableCell className="text-sm">{s.jenisKelamin}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{s.tempatLahir}, {s.tanggalLahir}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(s)}><Edit className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(s.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Menampilkan {filtered.length} dari {siswa.length} siswa</p>
        </CardContent>
      </Card>
    </div>
  );
}
