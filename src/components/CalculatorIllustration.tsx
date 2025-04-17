import { Calculator, Coins, TrendingUp } from 'lucide-react';
export default function CalculatorIllustration() {

    const CalculatorHeader = () => (
        <div className="flex items-center justify-between mb-6 ">
            <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm font-medium text-gray-500">ຄຳນວນເງິນກູ້</div>
        </div>
    );

    const CalculatorContent = () => (
        <div className="space-y-4">
            <InputField label="ວົງເງີນ (₭)" value="25,000,000" />
            <InputField label="ອັດຕາດອກເບ້ຍ (%)" value="7.5" />
            <InputField label="ໄລຍະເວລາ (ປີ)" value="5" />

            <div className="rounded-md bg-primary/5 p-4 mt-6">
                <div className="text-sm text-primary mb-1">ຍອດຊຳລະຕໍ່ເດືອນ</div>
                <div className="text-2xl font-bold text-primary">₭498,760</div>
            </div>
        </div>
    );

    const InputField = ({ label, value }: { label: string; value: string }) => (
        <div className="space-y-2">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="bg-slate-100 p-3 rounded-md">{value}</div>
        </div>
    );

    const DecorativeElements = () => (
        <>
            <div className="absolute -bottom-4 -right-4 highlight-box p-4 animate-float w-24 h-24 flex items-center justify-center bg-primary/20 backdrop-blur-sm">
                <Calculator className="h-10 w-10 text-primary" />
            </div>

            <div className="absolute -top-6 -left-6 highlight-box p-4 animate-float w-20 h-20 flex items-center justify-center  bg-primary/20 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 text-primary" />
            </div>

            <div className="absolute top-1/2 -right-10 highlight-box p-4 animate-float w-16 h-16 flex items-center justify-center bg-primary/10 backdrop-blur-sm">
                <Coins className="h-6 w-6 text-primary" />
            </div>
        </>
    );
    return (
        <div className="relative animate-fade-in order-first md:order-last w-[500px]">
            <div className="relative">
                {/* Main calculator illustration */}
                <div className="highlight-box bg-white/80 backdrop-blur-sm rounded-2xl p-8 relative z-10 animate-float shadow-xl border border-blue-50">
                    <CalculatorHeader />
                    <CalculatorContent />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <Calculator className="h-5 w-5 text-primary" />
                            </div>
                            <span className="text-gray-700">ຄຳນວນໄດ້ງ່າຍ</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <TrendingUp className="h-5 w-5 text-primary" />
                            </div>
                            <span className="text-gray-700">ປຽບທຽບສີນເຊື່ອ</span>
                        </div>
                    </div>
                </div>
                {/* Decorative elements */}
                <DecorativeElements />


            </div>
        </div>
    )
}
