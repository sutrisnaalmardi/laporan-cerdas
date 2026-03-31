import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, ChevronLeft, ChevronRight } from "lucide-react";

interface NilaiSiswa {
  id: number;
  nama: string;
  nis: string;
  nilaiHarian: number;
  nilaiTugas: number;
  nilaiUTS: number;
  nilaiKeaktifan: number;
  absensi: number;
  sikap: string;
  catatan: string;
}

const dummySiswa: NilaiSiswa[] = [
  { id: 1, nama: "Ahmad Fauzi", nis: "2401001", nilaiHarian: 85, nilaiTugas: 80, nilaiUTS: 78, nilaiKeaktifan: 82, absensi: 95, sikap: "A", catatan: "Siswa aktif dan rajin" },
  { id: 2, nama: "Siti Aisyah", nis: "2401002", nilaiHarian: 90, nilaiTugas: 88, nilaiUTS: 92, nilaiKeaktifan: 85, absensi: 98, sikap: "A", catatan: "Prestasi sangat baik" },
  { id: 3, nama: "Muhammad Rizki", nis: "2401003", nilaiHarian: 72, nilaiTugas: 70, nilaiUTS: 68, nilaiKeaktifan: 75, absensi: 88, sikap: "B", catatan: "Perlu meningkatkan tugas" },
  { id: 4, nama: "Fatimah Zahra", nis: "2401004", nilaiHarian: 88, nilaiTugas: 85, nilaiUTS: 80, nilaiKeaktifan: 90, absensi: 100, sikap: "A", catatan: "Siswa teladan" },
  { id: 5, nama: "Umar Hasan", nis: "2401005", nilaiHarian: 75, nilaiTugas: 78, nilaiUTS: 72, nilaiKeaktifan: 70, absensi: 90, sikap: "B", catatan: "Cukup baik, perlu lebih aktif" },
];

function hitungRataRata(s: NilaiSiswa) {
  return Math.round((s.nilaiHarian * 0.25 + s.nilaiTugas * 0.2 + s.nilaiUTS * 0.3 + s.nilaiKeaktifan * 0.15 + s.absensi * 0.1) * 100) / 100;
}

function getPredikat(rata: number) {
  if (rata >= 88) return "A";
  if (rata >= 75) return "B";
  if (rata >= 62) return "C";
  return "D";
}

function getDeskripsi(nama: string, rata: number, mapel: string) {
  const predikat = getPredikat(rata);
  if (predikat === "A") return `${nama} menunjukkan penguasaan yang sangat baik pada mata pelajaran ${mapel}.`;
  if (predikat === "B") return `${nama} menunjukkan penguasaan yang baik pada mata pelajaran ${mapel}.`;
  if (predikat === "C") return `${nama} menunjukkan penguasaan yang cukup pada mata pelajaran ${mapel} dan perlu meningkatkan pemahaman.`;
  return `${nama} perlu bimbingan lebih lanjut pada mata pelajaran ${mapel}.`;
}

export default function NilaiPage() {
  const [kelas, setKelas] = useState("X-A");
  const [mapel, setMapel] = useState("Matematika");
  const [siswaList, setSiswaList] = useState<NilaiSiswa[]>(dummySiswa);

  const updateNilai = (id: number, field: keyof NilaiSiswa, value: string | number) => {
    setSiswaList(siswaList.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Input Nilai</h1>
          <p className="text-sm text-muted-foreground mt-1">Input nilai tengah semester siswa</p>
        </div>
        <Button size="sm"><Save className="w-4 h-4 mr-1" /> Simpan Nilai</Button>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Kelas</Label>
              <Select value={kelas} onValueChange={setKelas}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["X-A","X-B","X-C","XI-A","XI-B","XI-C","XII-A","XII-B","XII-C"].map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Mata Pelajaran</Label>
              <Select value={mapel} onValueChange={setMapel}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Matematika","Bahasa Arab","Fisika","Biologi","Kimia","Al-Quran Hadits","Fiqih","Akidah Akhlak","SKI","Bahasa Indonesia","Bahasa Inggris"].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Bobot Penilaian</Label>
              <p className="text-xs text-muted-foreground mt-2">Harian 25% | Tugas 20% | UTS 30% | Aktif 15% | Absen 10%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Table */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs min-w-[40px]">No</TableHead>
                  <TableHead className="text-xs min-w-[150px]">Nama Siswa</TableHead>
                  <TableHead className="text-xs text-center min-w-[80px]">Harian</TableHead>
                  <TableHead className="text-xs text-center min-w-[80px]">Tugas</TableHead>
                  <TableHead className="text-xs text-center min-w-[80px]">UTS</TableHead>
                  <TableHead className="text-xs text-center min-w-[80px]">Aktif</TableHead>
                  <TableHead className="text-xs text-center min-w-[80px]">Absensi%</TableHead>
                  <TableHead className="text-xs text-center min-w-[70px]">Sikap</TableHead>
                  <TableHead className="text-xs text-center min-w-[70px]">Rata²</TableHead>
                  <TableHead className="text-xs text-center min-w-[70px]">Predikat</TableHead>
                  <TableHead className="text-xs min-w-[200px]">Catatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {siswaList.map((s, i) => {
                  const rata = hitungRataRata(s);
                  const predikat = getPredikat(rata);
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="text-sm">{i + 1}</TableCell>
                      <TableCell className="text-sm font-medium">{s.nama}</TableCell>
                      <TableCell><Input type="number" min={0} max={100} className="h-8 text-center text-sm w-16" value={s.nilaiHarian} onChange={e => updateNilai(s.id, "nilaiHarian", Number(e.target.value))} /></TableCell>
                      <TableCell><Input type="number" min={0} max={100} className="h-8 text-center text-sm w-16" value={s.nilaiTugas} onChange={e => updateNilai(s.id, "nilaiTugas", Number(e.target.value))} /></TableCell>
                      <TableCell><Input type="number" min={0} max={100} className="h-8 text-center text-sm w-16" value={s.nilaiUTS} onChange={e => updateNilai(s.id, "nilaiUTS", Number(e.target.value))} /></TableCell>
                      <TableCell><Input type="number" min={0} max={100} className="h-8 text-center text-sm w-16" value={s.nilaiKeaktifan} onChange={e => updateNilai(s.id, "nilaiKeaktifan", Number(e.target.value))} /></TableCell>
                      <TableCell><Input type="number" min={0} max={100} className="h-8 text-center text-sm w-16" value={s.absensi} onChange={e => updateNilai(s.id, "absensi", Number(e.target.value))} /></TableCell>
                      <TableCell>
                        <Select value={s.sikap} onValueChange={v => updateNilai(s.id, "sikap", v)}>
                          <SelectTrigger className="h-8 w-16 text-sm"><SelectValue /></SelectTrigger>
                          <SelectContent>{["A","B","C","D"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-center font-semibold text-sm">{rata}</TableCell>
                      <TableCell className="text-center">
                        <span className={`text-xs px-2 py-1 rounded-md font-semibold ${
                          predikat === "A" ? "bg-success/10 text-success" :
                          predikat === "B" ? "bg-info/10 text-info" :
                          predikat === "C" ? "bg-warning/10 text-warning" :
                          "bg-destructive/10 text-destructive"
                        }`}>{predikat}</span>
                      </TableCell>
                      <TableCell>
                        <Input className="h-8 text-xs min-w-[180px]" value={s.catatan} onChange={e => updateNilai(s.id, "catatan", e.target.value)} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Auto description preview */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-2">Preview Deskripsi Otomatis</h3>
            <div className="space-y-2">
              {siswaList.slice(0, 3).map(s => {
                const rata = hitungRataRata(s);
                return (
                  <p key={s.id} className="text-xs text-muted-foreground">
                    <strong>{s.nama}:</strong> {getDeskripsi(s.nama, rata, mapel)}
                  </p>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
