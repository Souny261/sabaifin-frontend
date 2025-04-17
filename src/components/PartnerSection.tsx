import React, { useRef, useEffect, useState } from "react";
import { Building2, Handshake, Users, BarChart, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PartnerRegistrationDialog from "./PartnerRegistrationDialog";

const PartnerSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const partnerBenefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "ເຂົ້າເຖິງລູກຄ້າໃໝ່",
      description: "ເຊື່ອມຕໍ່ກັບຜູ້ຊອກຫາເງິນກູ້ທີ່ມີຄຸນສົມບັດ ແລະ ກຳລັງຊອກຫາທາງເລືອກໃນການຈັດຫາເງິນທຶນ."
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "ເພີ່ມອັດຕາການປ່ຽນ",
      description: "ລູກຄ້າທີ່ພວກເຮົາຄັດເລືອກແລ້ວມີອັດຕາການປ່ຽນສູງກວ່າຊ່ອງທາງການຕະຫຼາດແບບດັ້ງເດີມ."
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "ຕົວຕົນດິຈິຕອລ",
      description: "ສ້າງຕົວຕົນດິຈິຕອລຂອງທ່ານໃນຕະຫຼາດການເງິນອອນລາຍທີ່ກຳລັງເຕີບໂຕຂອງລາວ."
    }
  ];

  return (
    <div
      id="partners"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-primary/5 p-8 lg:p-16 rounded-xl shadow-lg border border-slate-100"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -left-20 top-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-primary/15 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-teal-200/10 blur-xl"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-6 right-12 w-24 h-24 opacity-10">
        <div className="w-full h-full border-4 border-dashed rounded-full border-orange-500 animate-spin-slow"></div>
      </div>
      <div className="absolute bottom-12 left-8 w-16 h-16 opacity-10">
        <div className="w-full h-full border-4 border-dashed rounded-full border-primary animate-spin-slow"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
        <div className="w-full lg:w-5/12 space-y-8">
          <div className={`space-y-6 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="inline-block bg-gradient-to-r from-orange-500/20 to-orange-400/10 py-2 px-4 rounded-full shadow-sm">
              <span className="text-orange-600 font-semibold flex items-center">
                <Handshake className="mr-2 h-5 w-5" />
                ໂອກາດການເປັນຄູ່ຮ່ວມທຸລະກິດ
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-slate-800">
              ເປັນຄູ່ຮ່ວມທຸລະກິດດ້ານການເງິນຂອງພວກເຮົາ <span className="text-primary">ແລະ ຂະຫຍາຍທຸລະກິດຂອງທ່ານ</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed">
              ເຂົ້າຮ່ວມເຄືອຂ່າຍຄູ່ຮ່ວມທຸລະກິດດ້ານການເງິນທີ່ໜ້າເຊື່ອຖືຂອງພວກເຮົາ ແລະ ເຊື່ອມຕໍ່ກັບຜູ້ຊອກຫາເງິນກູ້ທີ່ມີຄຸນສົມບັດທົ່ວປະເທດລາວ.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "ເພີ່ມຍອດຂາຍໂດຍຜ່ານແພລດຟອມຂອງພວກເຮົາ",
                "ການເຂົ້າເຖິງລາຍງານແລະການວິເຄາະລະອຽດ",
                "ໂຄງສ້າງຄ່າທຳນຽມແບບໂປ່ງໃສ",
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <PartnerRegistrationDialog />
              <p className="text-slate-500 mt-3 text-sm">ບໍ່ມີຂໍ້ຜູກມັດ · ຕິດຕໍ່ພວກເຮົາໄດ້ງ່າຍ</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {partnerBenefits.map((benefit, index) => (
              <Card
                key={index}
                className={`overflow-hidden border-none shadow-lg group hover:shadow-xl transition-all duration-300 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(249,250,251,0.95))"
                }}
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-lg text-slate-800">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Proof */}
          <div className={`mt-8 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-slate-100 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
            <p className="text-center text-slate-500 mb-4">ຄູ່ຮ່ວມທຸລະກິດທີ່ເຊື່ອໃຈພວກເຮົາ</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-24 bg-slate-200/60 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;