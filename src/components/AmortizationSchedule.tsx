
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/calculateLoan";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calculator, FileDown } from "lucide-react";

interface AmortizationScheduleProps {
  schedule: Array<{
    month: number;
    payment: number;
    principalPayment: number;
    interestPayment: number;
    remainingBalance: number;
  }>;
  exportCSV: () => void
}

const AmortizationSchedule = ({ schedule, exportCSV }: AmortizationScheduleProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMonth, setSearchMonth] = useState("");
  const itemsPerPage = 10
  const filteredSchedule = searchMonth
    ? schedule.filter(item => item.month.toString().includes(searchMonth))
    : schedule;

  const pageCount = Math.ceil(filteredSchedule.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSchedule.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <Card className="w-full shadow-md">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-2xl flex md:flex-row items-center justify-start md:space-x-2 md:justify-between flex-col space-y-2 w-full" >
          <div className="flex flex-row items-center space-x-2 justify-start w-full">
            <Calculator size={20} />
            <div>
              ຕາຕະລາງການຊຳລະ
            </div>
          </div>
          <div className="flex flex-row space-x-2 items-center justify-start md:justify-end w-full">
            <Input
              type="number"
              placeholder="ຄົ້ນຫາດ້ວຍເດືອນ"
              className="w-40"
              value={searchMonth}
              onChange={(e) => {
                setSearchMonth(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5"
              onClick={exportCSV}
            >
              <FileDown className="h-4 w-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
          </div>

        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableCaption>
                <div className="flex items-center justify-between p-4">
                  <div className="text-sm text-muted-foreground">
                    ສະແດງ {indexOfFirstItem + 1} ຫາ {Math.min(indexOfLastItem, filteredSchedule.length)} ຈາກທັງໝົດ {filteredSchedule.length} ງວດຈ່າຍ
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      ກ່ອນໜ້າ
                    </Button>
                    <span className="text-sm">
                      ໜ້າ {currentPage} ຈາກ {pageCount}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === pageCount}
                    >
                      ຖັດໄປ
                    </Button>
                  </div>
                </div>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ເດືອນ</TableHead>
                  <TableHead>ຈຳນວນທີ່ຈ່າຍ</TableHead>
                  <TableHead>ຕົ້ນທຶນ</TableHead>
                  <TableHead>ດອກເບ້ຍ</TableHead>
                  <TableHead>ຍອດຄົງເຫຼືອ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.month}>
                    <TableCell>{item.month}</TableCell>
                    <TableCell>{formatCurrency(item.payment)}</TableCell>
                    <TableCell>{formatCurrency(item.principalPayment)}</TableCell>
                    <TableCell>{formatCurrency(item.interestPayment)}</TableCell>
                    <TableCell>{formatCurrency(item.remainingBalance)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>

  );
};

export default AmortizationSchedule;
