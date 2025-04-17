
import React from "react";
import { ArrowDown, Calculator, ChartPieIcon, Coins, CreditCard, FileText, Settings } from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    icon: <Calculator className="h-10 w-10 text-brand-orange" />,
    title: "ຄຳນວນງ່າຍໆ",
    description: "ຄຳນວນການຊຳລະເງີນຂອງທ່ານດ້ວຍເຄື່ອງມືທີ່ໃຊ້ງ່າຍຂອງເຮົາທີ່ເຮັດການເງີນທີ່ຊັບຊ້ອນກາຍເງີນເລື່ອງງ່າຍ"
  },
  {
    icon: <ChartPieIcon className="h-10 w-10 text-brand-orange" />,
    title: "ການວິເຄາະ",
    description: "ເຂົ້າໃຈເງິນກູ້ຂອງທ່ານ ດ້ວຍການວິເຄາະຜ່ານ Chart ແລະ ກາຟທີ່ສະແດງລາຍລະອຽດຂອງງວດ ແລະ ດອກເບ້ຍ"
  },
  {
    icon: <Coins className="h-10 w-10 text-brand-orange" />,
    title: "ປຽບທຽບອັດຕາດອກເບ້ຍ",
    description: "ປຽບທຽບອັດຕາດອກເບ້ຍ ເພື່ອຊ່ວຍໃຫ້ທ່ານຄົ້ນຫາຂໍ້ສະເໜີທີ່ດີທີ່ສຸດສຳລັບຄວາມຕ້ອງການທາງການເງີນຂອງທ່ານ"
  },
  {
    icon: <Settings className="h-10 w-10 text-brand-orange" />,
    title: "ການຈັດການງ່າຍດາຍ",
    description: "ໃຊ້ງານງ່າຍ ບໍ່ຈຳເປັນຕ້ອງເປັນຜູ້ຊຽ່ວຊານການເງິນ ກໍ່ຄຳນວນກູ້ໄດ້ທັນທີ"
  },
  {
    icon: <CreditCard className="h-10 w-10 text-brand-orange" />,
    title: "ເງື່ອນໄຂທີ່ຍືດຫຍຸ່ນ",
    description: "ສຳຫຼວດເງື່ອນໄຂກູ້ຢືມທີ່ແຕກຕ່າງກັນ ແລະ ເບີ່ງວ່າເງືອນໄຂເຫຼົ່ານີ້ສົ່ງຜົນຕໍ່ການຊຳລະເງີນລາຍເດືອນຂອງທ່ານຫຼືບໍ່"
  },
  {
    icon: <FileText className="h-10 w-10 text-brand-orange" />,
    title: "ລາຍລະອຽດຄົບຖ້ວນ",
    description: "ເຫັນທຸກງວດຈ່າຍ ແຍກດອກເບ້ຍ ແລະ ຕົ້ນທຶນຢ່າງຊັດເຈນ ກ່ອນຕັດສິນໃຈ"
  }
];


const FeaturesSection = () => {

    const scrollToPartners = () => {
        const calculatorSection = document.getElementById("partners");
        if (calculatorSection) {
            const offsetTop = calculatorSection.getBoundingClientRect().top + window.scrollY - 100; // adjust this value to your needs
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    };

  return (
    <div id="features" className="container mx-auto px-4 py-20 md:py-28">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">ເປັນຫຍັງຕ້ອງເລືອກໃຊ້ເຄື່ອງຄຳນວນຂອງພວກເຮົາ?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          ເຄື່ອງມືຂອງພວກເຮົາຊ່ວຍໃຫ້ທ່ານຕັດສີນໃຈທາງດ້ານການເງີນໄດ້ດີຂື້ນດ້ວຍຄຸນສົມບັດເຫຼົ່ານີ້.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50 relative overflow-hidden group bg-white"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>

            <div className="relative z-10">
              <div className="mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-8 flex items-center justify-center">
        <Button
          size="lg"
          className="bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 btn-shine"
          onClick={scrollToPartners}
        >
          <span className="mr-2 text-lg">ສຳລັບຄູ່ຮ່ວມທຸລະກິດ</span>
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FeaturesSection;
