import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Download, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

const rekapData = [
  { no: 1, nama: "Ahmad Fauzi", nis: "2401001", mtk: 81, arb: 85, fis: 78, bio: 82, qhd: 88, rata: 82.8, predikat: "B", status: "approved" },
  { no: 2, nama: "Siti Aisyah", nis: "2401002", mtk: 90, arb: 92, fis: 88, bio: 91, qhd: 95, rata: 91.2, predikat: "A", status: "approved" },
  { no: 3, nama: "Muhammad Rizki", nis: "2401003", mtk: 72, arb: 68, fis: 70, bio: 74, qhd: 75, rata: 71.8, predikat: "C", status: "draft" },
  { no: 4, nama: "Fatimah Zahra", nis: "2401004", mtk: 88, arb: 85, fis: 82, bio: 86, qhd: 90, rata: 86.2, predikat: "B", status: "draft" },
  { no: 5, nama: "Umar Hasan", nis: "2401005", mtk: 75, arb: 78, fis: 72, bio: 76, qhd: 80, rata: 76.2, predikat: "B", status: "approved" },
];

export default function RekapPage() {
  const [kelas, setKelas] = useState("X-A");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rekap Nilai</h1>
          <p className="text-sm text-muted-foreground mt-1">Rekap dan validasi nilai tengah semester</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Export Excel</Button>
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex gap-3 mb-4">
            <div>
              <Label className="text-xs">Kelas</Label>
              <Select value={kelas} onValueChange={setKelas}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["X-A","X-B","X-C","XI-A","XI-B","XI-C","XII-A","XII-B","XII-C"].map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">No</TableHead>
                  <TableHead className="text-xs">Nama</TableHead>
                  <TableHead className="text-xs">NIS</TableHead>
                  <TableHead className="text-xs text-center">MTK</TableHead>
                  <TableHead className="text-xs text-center">ARB</TableHead>
                  <TableHead className="text-xs text-center">FIS</TableHead>
                  <TableHead className="text-xs text-center">BIO</TableHead>
                  <TableHead className="text-xs text-center">QHD</TableHead>
                  <TableHead className="text-xs text-center">Rata²</TableHead>
                  <TableHead className="text-xs text-center">Predikat</TableHead>
                  <TableHead className="text-xs text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rekapData.map(r => (
                  <TableRow key={r.no}>
                    <TableCell className="text-sm">{r.no}</TableCell>
                    <TableCell className="text-sm font-medium">{r.nama}</TableCell>
                    <TableCell className="text-sm font-mono">{r.nis}</TableCell>
                    <TableCell className="text-sm text-center">{r.mtk}</TableCell>
                    <TableCell className="text-sm text-center">{r.arb}</TableCell>
                    <TableCell className="text-sm text-center">{r.fis}</TableCell>
                    <TableCell className="text-sm text-center">{r.bio}</TableCell>
                    <TableCell className="text-sm text-center">{r.qhd}</TableCell>
                    <TableCell className="text-sm text-center font-semibold">{r.rata}</TableCell>
                    <TableCell className="text-center">
                      <span className={`text-xs px-2 py-1 rounded-md font-semibold ${
                        r.predikat === "A" ? "bg-success/10 text-success" :
                        r.predikat === "B" ? "bg-info/10 text-info" :
                        "bg-warning/10 text-warning"
                      }`}>{r.predikat}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      {r.status === "approved" ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" /> Disetujui
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30 text-xs">
                          <Clock className="w-3 h-3 mr-1" /> Draft
                        </Badge>
                      )}
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
