
"use client";
import React from "react";
import { Facebook, Twitter, Linkedin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/core/config/constants";

import { SocialIcon } from 'react-social-icons'
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-muted py-12 px-4 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href={ROUTES.PUBLIC.HOME} className="flex items-center font-bold text-2xl">
              <span className="text-primary">Sabai</span>
              <span>Fin</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              ການ​ຄິດ​ໄລ່​ເງິນ​ກູ້​ທີ່​ງ່າຍ​ດາຍ ​ແລະ ​ໂປ່ງ​ໃສ​ເພື່ອ​ຊ່ວຍ​ໃຫ້​ທ່ານ​ຕັດ​ສິນ​ໃຈ​ທາງ​ດ້ານ​ການ​ເງິນ​ທີ່​ມີ​ຂໍ້​ມູນ​. ປຽບທຽບອັດຕາ ແລະ ນຳໃຊ້ດ້ວຍຄວາມໝັ້ນໃຈ.
            </p>
            <div className="flex space-x-4">
              <Button onClick={() => {
                window.open(`https://m.me/624741684056209`, "_blank");

              }} variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button onClick={() => {
                window.open(`https://wa.me/8562077707792?text=${encodeURIComponent("ສະບາຍດີ, ຂ້ອຍມີຄຳຖາມກ່ຽວກັບSabaiFin.")}`, "_blank");
              }} variant="ghost" size="icon" className="rounded-full">
                <SocialIcon network={"whatsapp"}
                  fgColor="black"
                  bgColor="transparent" className="h-5 w-5 m-0" style={{ height: 29, width: 29 }} />
                <span className="sr-only">Whatsapp</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>

          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-0 flex flex-col items-start">
              <Button
                onClick={() => scrollToSection("hero")}
                variant={"ghost"}
                className="p-0 py-0 text-sm text-muted-foreground hover:text-primary transition-colors hover:bg-transparent cursor-pointer"
              >
                ໜ້າຫຼັກ
              </Button>
              <Button
                onClick={() => scrollToSection("calculator")}
                variant={"ghost"}
                className="p-0 m-0 text-sm text-muted-foreground hover:text-primary transition-colors hover:bg-transparent cursor-pointer"
              >
                ຄຳນວນເງິນກູ້
              </Button>
              <Button
                onClick={() => scrollToSection("compare")}
                variant={"ghost"}
                className="p-0 m-0 text-sm text-muted-foreground hover:text-primary transition-colors hover:bg-transparent cursor-pointer"
              >
                ສະໝັກ
              </Button>
              <Button
                onClick={() => scrollToSection("partners")}
                variant={"ghost"}
                className="p-0 m-0 text-sm text-muted-foreground hover:text-primary transition-colors hover:bg-transparent cursor-pointer"
              >
                ຄູ່ຮ່ວມທຸລະກິດ
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <div className="space-y-0 flex flex-col items-start">
              <Button
                onClick={() => scrollToSection("features")}
                variant={"ghost"}
                className="p-0 py-0 text-sm text-muted-foreground hover:text-primary transition-colors hover:bg-transparent cursor-pointer"
              >
                ບໍລິກການ
              </Button>
              <Button
                onClick={() => scrollToSection("testimonials")}
                variant={"ghost"}
                className="p-0 m-0 text-sm text-muted-foreground hover:text-primary transition-colors hover:bg-transparent cursor-pointer"
              >
                ຄຳຄິດເຫັນ
              </Button>
              <Button
                onClick={() => scrollToSection("faq")}
                variant={"ghost"}
                className="p-0 m-0 text-sm text-muted-foreground hover:text-primary transition-colors hover:bg-transparent cursor-pointer"
              >
                ຄຳຖາມທີ່ພົບບ່ອຍ
              </Button>
              <Button
                onClick={() => {
                  router.push(ROUTES.PUBLIC.TERMS);
                }}
                variant={"ghost"}
                className="p-0 m-0 text-sm text-muted-foreground hover:text-primary transition-colors hover:bg-transparent cursor-pointer"
              >
                ຂໍ້ກໍານົດ ແລະ ເງື່ອນໄຂ
              </Button>
              <Button
                onClick={() => {
                  router.push(ROUTES.PUBLIC.PRIVACY);
                }}
                variant={"ghost"}
                className="p-0 m-0 text-sm text-muted-foreground hover:text-primary transition-colors hover:bg-transparent cursor-pointer"
              >
                ນະໂຍບາຍ
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            © 2025 SabaiFin. All rights reserved.
          </p>

          <div className="flex items-center space-x-2">
            {/* <button className="flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background text-sm font-medium">
              EN
            </button> */}
            <button className="flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background text-sm font-medium">
              LA
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p className="flex items-center justify-center">
            Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> in Laos
          </p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
