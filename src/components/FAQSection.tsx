import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "ເຄື່ອງຄິດໄລ່ເງິນກູ້ເຮັດວຽກແນວໃດ?",
    answer: "ເຄື່ອງຄິດໄລ່ເງິນກູ້ຂອງພວກເຮົາໃຊ້ສູດການເງິນມາດຕະຖານເພື່ອຄຳນວນການຈ່າຍລາຍເດືອນ, ຄ່າດອກເບ້ຍທັງຫມົດ, ແລະ ຕາຕະລາງການຈ່າຍຄືນ ອີງຕາມຈຳນວນເງິນກູ້, ອັດຕາດອກເບ້ຍ, ແລະ ໄລຍະເວລາທີ່ທ່ານໃຫ້. ມັນຈະໃຫ້ທ່ານເຫັນພາບທີ່ຊັດເຈນກ່ຽວກັບແຜນການຈ່າຍຄືນຂອງທ່ານ."
  },
  {
    question: "ຂໍ້ສະເຫນີເງິນກູ້ແມ່ນມາຈາກທະນາຄານຈິງຫຼືບໍ່?",
    answer: "ໃນປະຈຸບັນ, ຂໍ້ສະເຫນີເງິນກູ້ທີ່ສະແດງແມ່ນຕົວຢ່າງສຳລັບການສາທິດເທົ່ານັ້ນ. ພວກເຮົາກຳລັງເຮັດວຽກເພື່ອຮ່ວມມືກັບສະຖາບັນການເງິນໃນລາວ ເພື່ອໃຫ້ທາງເລືອກເງິນກູ້ທີ່ແທ້ຈິງໃນອະນາຄົດ."
  },
  {
    question: "ຂ້ອຍສາມາດສະຫມັກຂໍເງິນກູ້ໂດຍກົງຜ່ານເວັບໄຊນີ້ໄດ້ບໍ່?",
    answer: "ທ່ານສາມາດຕື່ມແບບຟອມສະຫມັກໄດ້, ປະຈຸບັນພວກເຮົາເຮັດວຽກເປັນການບໍລິການປຽບທຽບ. ພວກເຮົາຈະເກັບກຳຂໍ້ມູນຂອງທ່ານ ແລະ ເຊື່ອມຕໍ່ທ່ານກັບຜູ້ໃຫ້ກູ້ຢືມທີ່ຈະຊ່ວຍທ່ານສາມາດກູ້ໄດ້."
  },
  {
    question: "ການຄຳນວນມີຄວາມຖືກຕ້ອງແນວໃດ?",
    answer: "ເຄື່ອງຄິດໄລ່ຂອງພວກເຮົາໃຊ້ສູດການເງິນມາດຕະຖານ ແລະ ໃຫ້ການປະເມີນທີ່ຖືກຕ້ອງຕາມຂໍ້ມູນທີ່ທ່ານປ້ອນ. ເຖິງຢ່າງໃດກໍຕາມ, ເງື່ອນໄຂເງິນກູ້ຕົວຈິງອາດຈະແຕກຕ່າງກັນຂຶ້ນກັບນະໂຍບາຍສະເພາະຂອງຜູ້ໃຫ້ກູ້, ຄ່າທຳນຽມ, ແລະ ປະຫວັດສິນເຊື່ອຂອງທ່ານ."
  },
  {
    question: "ຂ້ອຍສາມາດຄຳນວນເງິນກູ້ປະເພດໃດໄດ້ແດ່?",
    answer: "ເຄື່ອງຄິດໄລ່ຂອງພວກເຮົາໃຊ້ໄດ້ກັບເງິນກູ້ຜ່ອນຈ່າຍມາດຕະຖານສ່ວນໃຫຍ່ ລວມທັງເງິນກູ້ສ່ວນບຸກຄົນ, ເງິນກູ້ເຮືອນ, ເງິນກູ້ລົດ, ແລະ ເງິນກູ້ທຸລະກິດ ທີ່ມີອັດຕາດອກເບ້ຍ ແລະ ເງື່ອນໄຂຄົງທີ່."
  }
];

const FAQSection = () => {
  return (
    <div id="faq" className="container mx-auto px-4 py-20 md:py-28">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">ຄຳຖາມທີ່ຖາມເລື້ອຍໆ</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          ຊອກຫາຄຳຕອບສຳລັບຄຳຖາມທົ່ວໄປກ່ຽວກັບເຄື່ອງຄິດໄລ່ເງິນກູ້ ແລະ ການບໍລິການຂອງພວກເຮົາ
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="overflow-hidden">
            <Collapsible className="w-full">
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none">
                <span>{faq.question}</span>
                <ChevronDown className="h-5 w-5 transition-transform duration-200 ease-in-out transform ui-open:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 pt-0">
                <p className="text-muted-foreground">{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;