import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileText, Printer, Download } from "lucide-react";
import { useState } from "react";

const siswaList = [
  { nis: "2401001", nama: "Ahmad Fauzi", kelas: "X-A" },
  { nis: "2401002", nama: "Siti Aisyah", kelas: "X-A" },
  { nis: "2401003", nama: "Muhammad Rizki", kelas: "X-B" },
  { nis: "2401004", nama: "Fatimah Zahra", kelas: "XI-A" },
  { nis: "2401005", nama: "Umar Hasan", kelas: "XII-A" },
];

export default function CetakPage() {
  const [kelas, setKelas] = useState("X-A");
  const [selectedSiswa, setSelectedSiswa] = useState("");

  const filteredSiswa = siswaList.filter(s => s.kelas === kelas);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Cetak Raport</h1>
        <p className="text-sm text-muted-foreground mt-1">Generate dan cetak raport tengah semester dalam format PDF</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings panel */}
        <Card className="glass-card">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-foreground text-sm">Pengaturan Cetak</h3>
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
              <Label className="text-xs">Siswa</Label>
              <Select value={selectedSiswa} onValueChange={setSelectedSiswa}>
                <SelectTrigger><SelectValue placeholder="Pilih siswa..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Siswa</SelectItem>
                  {filteredSiswa.map(s => <SelectItem key={s.nis} value={s.nis}>{s.nama}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 pt-2">
              <Button className="w-full" size="sm"><FileText className="w-4 h-4 mr-2" /> Generate PDF</Button>
              <Button variant="outline" className="w-full" size="sm"><Printer className="w-4 h-4 mr-2" /> Print</Button>
              <Button variant="outline" className="w-full" size="sm"><Download className="w-4 h-4 mr-2" /> Download</Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="lg:col-span-2 glass-card">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground text-sm mb-4">Preview Raport</h3>
            <div className="bg-background border border-border rounded-lg p-6 min-h-[600px]">
              {/* Simulated A4 raport preview */}
              <div className="max-w-[600px] mx-auto space-y-4">
                {/* Header */}
                <div className="text-center border-b-2 border-foreground pb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Kementerian Agama Republik Indonesia</p>
                  <h2 className="text-lg font-bold text-foreground mt-1">MADRASAH ALIYAH NURUL ILMI</h2>
                  <p className="text-xs text-muted-foreground">Jl. Pendidikan No. 1, Kota Ilmu | Telp. (021) 1234567</p>
                  <div className="mt-2 pt-2 border-t border-border">
                    <p className="text-sm font-semibold text-foreground">LAPORAN PENILAIAN TENGAH SEMESTER</p>
                    <p className="text-xs text-muted-foreground">Tahun Ajaran 2024/2025 — Semester Ganjil</p>
                  </div>
                </div>

                {/* Identity */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  <div className="flex"><span className="text-muted-foreground w-24">Nama</span><span className="font-medium text-foreground">: Ahmad Fauzi</span></div>
                  <div className="flex"><span className="text-muted-foreground w-24">Kelas</span><span className="font-medium text-foreground">: X-A</span></div>
                  <div className="flex"><span className="text-muted-foreground w-24">NIS</span><span className="font-medium text-foreground">: 2401001</span></div>
                  <div className="flex"><span className="text-muted-foreground w-24">NISN</span><span className="font-medium text-foreground">: 0012345601</span></div>
                </div>

                {/* Grade table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-primary/5">
                        <th className="border border-border p-2 text-left text-foreground">No</th>
                        <th className="border border-border p-2 text-left text-foreground">Mata Pelajaran</th>
                        <th className="border border-border p-2 text-center text-foreground">KKM</th>
                        <th className="border border-border p-2 text-center text-foreground">Nilai</th>
                        <th className="border border-border p-2 text-center text-foreground">Predikat</th>
                        <th className="border border-border p-2 text-foreground">Deskripsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { no: 1, mapel: "Al-Quran Hadits", kkm: 65, nilai: 88, predikat: "A" },
                        { no: 2, mapel: "Fiqih", kkm: 65, nilai: 82, predikat: "B" },
                        { no: 3, mapel: "Bahasa Arab", kkm: 65, nilai: 85, predikat: "B" },
                        { no: 4, mapel: "Matematika", kkm: 70, nilai: 81, predikat: "B" },
                        { no: 5, mapel: "Fisika", kkm: 70, nilai: 78, predikat: "B" },
                        { no: 6, mapel: "Biologi", kkm: 70, nilai: 82, predikat: "B" },
                        { no: 7, mapel: "Bahasa Indonesia", kkm: 70, nilai: 84, predikat: "B" },
                        { no: 8, mapel: "Bahasa Inggris", kkm: 70, nilai: 79, predikat: "B" },
                      ].map(row => (
                        <tr key={row.no}>
                          <td className="border border-border p-2 text-center text-foreground">{row.no}</td>
                          <td className="border border-border p-2 text-foreground">{row.mapel}</td>
                          <td className="border border-border p-2 text-center text-foreground">{row.kkm}</td>
                          <td className="border border-border p-2 text-center font-semibold text-foreground">{row.nilai}</td>
                          <td className="border border-border p-2 text-center font-semibold text-foreground">{row.predikat}</td>
                          <td className="border border-border p-2 text-muted-foreground">Menunjukkan penguasaan yang baik</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Kehadiran */}
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">Kehadiran:</p>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <span className="text-muted-foreground">Sakit: 2 hari</span>
                    <span className="text-muted-foreground">Izin: 1 hari</span>
                    <span className="text-muted-foreground">Alpha: 0 hari</span>
                    <span className="text-muted-foreground">Hadir: 95%</span>
                  </div>
                </div>

                {/* Catatan */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs font-semibold text-foreground">Catatan Wali Kelas:</p>
                  <p className="text-xs text-muted-foreground mt-1">Ahmad Fauzi menunjukkan perkembangan yang baik di semester ini. Perlu meningkatkan keaktifan di kelas.</p>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-3 gap-4 text-center text-xs pt-6">
                  <div>
                    <p className="text-muted-foreground">Wali Kelas</p>
                    <div className="h-16" />
                    <p className="font-medium text-foreground border-t border-border pt-1">Ustadzah Fatimah, S.Ag</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Orang Tua/Wali</p>
                    <div className="h-16" />
                    <p className="font-medium text-foreground border-t border-border pt-1">________________</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Kepala Madrasah</p>
                    <div className="h-16" />
                    <p className="font-medium text-foreground border-t border-border pt-1">Drs. H. Mahmud, M.Pd</p>
                  </div>
                </div>

                <p className="text-center text-xs text-muted-foreground pt-2">Kota Ilmu, 15 Oktober 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
