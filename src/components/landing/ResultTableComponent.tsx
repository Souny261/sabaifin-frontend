import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { calculateSelector } from "@/redux/features/calculate/calculateSlice";
import { useSelector } from "react-redux";

export default function ResultTableComponent({ type }: { type: string }) {
    const calculateSlice = useSelector(calculateSelector);
    const numberFormatter = new Intl.NumberFormat('la', { style: 'currency', currency: 'LAK' });
    return (
        <div className="w-full flex flex-col bg-white shadow-sm rounded-lg">
            <Table className="bg-white rounded-lg">
                <TableHeader className="bg-slate-50">
                    <TableRow className="font-bold text-black">
                        <TableHead className="w-[100px] text-black font-bold">ງວດຊຳລະ</TableHead>
                        {
                            type != "normal" && <TableHead className="text-black font-bold">ຕົ້ນທືນທີ່ຍັງເຫຼືອ</TableHead>
                        }

                        <TableHead className="text-black font-bold">ຊຳລະຕໍ່ງວດ</TableHead>
                        <TableHead className="text-right text-black font-bold">ຕົ້ນທືນທີ່ຕ້ອງຊຳລະຕໍ່ງວດ</TableHead>
                        <TableHead className="text-right text-black font-bold">ດອກເບ້ຍທີ່ຕ້ອງຊຳລະຕໍ່ງວດ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        calculateSlice.SchedulePayment.length > 0 &&
                        calculateSlice.SchedulePayment.map((item, index) => (
                            <TableRow key={item.period}>
                                <TableCell className="font-medium">{item.period}</TableCell>
                                {type != "normal" && <TableCell>{numberFormatter.format(item.beginningBalance)}</TableCell>}
                                <TableCell>{numberFormatter.format(item.monthlyPayment)}</TableCell>
                                <TableCell className="text-right">{numberFormatter.format(item.principalPayment)}</TableCell>
                                <TableCell className="text-right">{numberFormatter.format(item.interestPayment)}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
