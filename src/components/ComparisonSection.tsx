import React, { useRef, useEffect } from "react";
import { formatCurrency } from "@/lib/calculateLoan";
import RegisterDialog from "./RegisterDialog";
interface ComparisonSectionProps {
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    // onApply: (bank: BankOffer) => void;
}

const ComparisonSection = ({ loanAmount, loanTerm, interestRate }: ComparisonSectionProps) => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // Create feature badge labels with enhanced variety
    // const bankFeatures = {
    //     "bank1": [
    //         { icon: <Clock className="h-4 w-4" />, label: "24h approval" },
    //         { icon: <ThumbsUp className="h-4 w-4" />, label: "Flexible terms" },
    //         { icon: <Shield className="h-4 w-4" />, label: "Secure" }
    //     ],
    //     "bank2": [
    //         { icon: <Star className="h-4 w-4" />, label: "Premium service" },
    //         { icon: <Award className="h-4 w-4" />, label: "No early fees" },
    //         { icon: <Zap className="h-4 w-4" />, label: "Instant decision" }
    //     ],
    //     "bank3": [
    //         { icon: <Clock className="h-4 w-4" />, label: "Fast approval" },
    //         { icon: <Sparkles className="h-4 w-4" />, label: "Lowest rates" },
    //         { icon: <Shield className="h-4 w-4" />, label: "Protected" }
    //     ],
    // };

    // Get the best rate bank
    // const bestRateBank = mockBanks.reduce((prev, current) =>
    //     (prev.interestRate < current.interestRate) ? prev : current
    // );

    return (
        <div id="compare" ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-primary/5 p-3 lg:p-16 rounded-xl shadow-md border border-slate-100 mt-10">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute -left-20 top-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-primary/15 blur-3xl"></div>
                <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-teal-200/10 blur-xl"></div>
            </div>
            <div className="text-center mb-12">
                <div className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 mb-4">
                    <span className="bg-orange-500 w-2 h-2 rounded-full mr-2"></span>
                    <span className="text-orange-800 text-sm font-medium">ສົມທຽບຂໍ້ສະເໜີເງິນກູ້</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    ທາງເລືອກທີ່ດີທີ່ສຸດສຳລັບທ່ານ
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    ພວກເຮົາໄດ້ຮ່ວມມືກັບສະຖາບັນການເງິນຊັ້ນນຳໃນລາວ ເພື່ອສະເໜີອັດຕາ ແລະ ເງື່ອນໄຂທີ່ດີທີ່ສຸດໃຫ້ແກ່ທ່ານ
                </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Summary data bar */}
                <div className="mb-10 bg-white rounded-xl shadow-md p-4 md:p-6 flex flex-wrap gap-4 justify-between items-center border border-slate-100">
                    <div>
                        <p className="text-sm text-slate-500">ຈຳນວນເງິນກູ້</p>
                        <p className="text-xl font-bold">{formatCurrency(loanAmount)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">ໄລຍະເວລາກູ້ຢືມ</p>
                        <p className="text-xl font-bold">{loanTerm} ເດືອນ</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">ອັດຕາດອກເບ້ຍທີ່ຕ້ອງການ</p>
                        <p className="text-xl font-bold">{interestRate}%</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">ອັດຕາທີ່ດີທີ່ສຸດທີ່ມີ</p>
                        {/* <p className="text-xl font-bold text-green-600">{bestRateBank.interestRate}%</p> */}
                        <p className="text-xl font-bold text-green-600">N/A%</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <RegisterDialog />
                </div>
                <div className="text-center text-sm text-slate-500 mt-6">
                    <p>ໝາຍເຫດ: ອັດຕາດອກເບ້ຍແມ່ນຂຶ້ນກັບການປະເມີນສິນເຊື່ອ ແລະ ອາດມີການປ່ຽນແປງ. ການອະນຸມັດຂັ້ນສຸດທ້າຍຈະຂຶ້ນກັບການກວດສອບເອກະສານ.</p>
                </div>
            </div>
        </div>
    );
};

export default ComparisonSection;