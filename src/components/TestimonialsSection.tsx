
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";


const testimonials = [
  {
    quote: "ເຄື່ອງຄິດໄລ່ນີ້ເຮັດໃຫ້ຂ້ອຍເຂົ້າໃຈກ່ຽວກັບທາງເລືອກສິນເຊື່ອຂອງຂ້ອຍງ່າຍຂຶ້ນ. ຂ້ອຍສາມາດຊອກຫາດອກເບ້ຍທີ່ດີ ແລະ ປະຢັດເງິນໃນການກູ້.",
    author: "ບໍ່ລະບຸຕົວຕົນ",
    role: "ຜູ້ທົດລອງ",
    stars: 5
  },
  {
    quote: "ຂ້ອຍຫາວິທີງ່າຍໆໃນການປຽບທຽບສິນເຊື່ອໃນລາວມາດົນແລ້ວ. ເຄື່ອງມືນີ້ຊ່ວຍໃຫ້ຂ້ອຍຕັດສິນໃຈໄດ້ງ່າຍຂື້ນ ໂດຍບໍ່ຈຳເປັນຕ້ອງເຂົ້າໃຈພາສາການເງິນທີ່ຊັບຊ້ອນ.",
    author: "ບໍ່ລະບຸຕົວຕົນ",
    role: "ຜູ້ທົດລອງ",
    stars: 5
  },
  {
    quote: "ເປັນຄັ້ງທຳອິດທີ່ຂ້ອຍກຳລັງຈະກູ້ເງິນ, ຂ້ອຍຮູ້ສຶກກັງວົນ. ຕາຕະລາງການຈ່າຍ ແລະ ລາຍລະອຽດການຈ່າຍແຕ່ລະເດືອນຊ່ວຍໃຫ້ຂ້ອຍເຂົ້າໃຈສິ່ງທີ່ຈະເກີດຂື້ນໄດ້ຢ່າງແທ້ຈີງ.",
    author: "ບໍ່ລະບຸຕົວຕົນ",
    role: "ຜູ້ທົດລອງ",
    stars: 5
  },
  {
    quote: "ການເບິ່ງຕາຕະລາງ ແລະ Chart ເຮັດໃຫ້ຂ້ອຍເຫັນໄດ້ວ່າຂ້ອຍຈະຈ່າຍດອກເບ້ຍທັງໝົດເທົ່າໃດ. ສຸດທ້າຍຂ້ອຍຕັດສິນໃຈເລືອກໄລຍະເວລາສັ້ນລົງຕາມສິ່ງທີ່ຮຽນຮູ້.",
    author: "ບໍ່ລະບຸຕົວຕົນ",
    role: "ຜູ້ທົດລອງ",
    stars: 5
  }
];


const TestimonialsSection = () => {
  return (
    <div id="testimonials" className="container mx-auto px-4 py-20 md:py-28">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">ຄວາມຄິດເຫັນຈາກຜູ້ໃຊ້</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          ນີ້ແມ່ນຄວາມຄິດເຫັນຈາກຄົນທີ່ໄດ້ໃຊ້ເຄື່ອງຄຳນວນສິນເຊື່ອຂອງພວກເຮົາ ເພື່ອຊ່ວຍໃນການຕັດສິນໃຈທາງການເງິນ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6 relative">
              <QuoteIcon className="h-10 w-10 text-brand-orange/20 absolute top-6 right-6" />

              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.stars ? "text-yellow-400" : "text-gray-300"
                      }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-7.07 3.709 1.352-7.876L.18 7.74l7.902-1.148L10 0l2.918 6.592 7.902 1.148-4.102 3.677 1.352 7.876z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>

              <p className="text-lg font-semibold mb-4 italic">{`"${testimonial.quote}"`}</p>

              <div className="mt-6">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
