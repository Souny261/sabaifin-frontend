import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center md:pt-0 pt-16">
            <Card className="w-full max-w-3xl shadow-lg pt-0">
                <CardHeader className="border-b bg-primary text-white rounded-t-lg flex items-center justify-center p-4">
                    <div className="flex flex-col items-start justify-start w-full">
                        <CardTitle className="text-2xl font-bold">ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ</CardTitle>
                        <p className="text-md text-white mt-1">
                            ອັບເດດຫຼ້າສຸດ: 1 ມັງກອນ 2025
                        </p>
                    </div>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        className="w-20 h-20"
                        width={1000}
                        height={1000}
                    />
                </CardHeader>

                <CardContent className="">
                    <div className="text-md text-gray-700 mb-6">
                        ພວກເຮົາມຸ່ງຫມັ້ນທີ່ຈະປົກປ້ອງ <span className='font-bold text-primary'>ຂໍ້ມູນສ່ວນຕົວ</span> ຂອງທ່ານ.
                    </div>
                    <ScrollArea className="rounded-md border p-4">
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="font-semibold">
                                    1. ຂໍ້ມູນທີ່ພວກເຮົາເກັບກໍາ
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>ຊື່, ເບີໂທລະສັບ, ຈຸດປະສົງການກູ້ຢືມເງີນ (ເມື່ອທ່ານລົງທະບຽນຂໍສີນເຊື່ອ)</li>
                                        <li>ຂໍ້​ມູນ​ການ​ນໍາ​ໃຊ້​ໂດຍ​ຜ່ານ cookies (ເຊັ່ນ​: ຫນ້າ​ເວັບ​ມີຄົນເຂົ້າເທົ່າໃດ)</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="font-semibold">
                                    2. ຈຸດປະສົງຂອງການນໍາໃຊ້ຂໍ້ມູນ
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>ເພື່ອສະຫນອງການບໍລິການການຄິດໄລ່ເງິນກູ້ແລະການປຽບທຽບ</li>
                                        <li>ສົ່ງຂ່າວຫຼືຂໍ້ມູນສົ່ງເສີມການຂາຍ (ຖ້າທ່ານຍິນຍອມ)</li>
                                        <li>ການວິເຄາະເພື່ອປັບປຸງປະສົບການຂອງຜູ້ໃຊ້</li>
                                    </ul>

                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className="font-semibold">
                                    3. ການເປີດເຜີຍຂໍ້ມູນ
                                </AccordionTrigger>
                                <AccordionContent>
                                    ພວກເຮົາຈະບໍ່ຂາຍ ຫຼື ແບ່ງປັນຂໍ້ມູນຂອງທ່ານກັບບຸກຄົນພາຍນອກ, ຍົກເວັ້ນ:
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>ກໍລະນີຈຳເປັນຕາມກົດໝາຍ</li>
                                        <li>ຫ້າມໃຊ້ຂໍ້ມູນຂອງທ່ານເພື່ອຈຸດປະສົງທີ່ຜິດກົດໝາຍ ຫຼື ການສໍ້ໂກງ.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger className="font-semibold">
                                    4. ຄວາມປອດໄພຂອງຂໍ້ມູນ
                                </AccordionTrigger>
                                <AccordionContent>
                                    ພວກເຮົາໃຊ້ມາດຕະການທາງດ້ານວິຊາການ ແລະ ການຈັດຕັ້ງເພື່ອປົກປ້ອງຂໍ້ມູນຂອງທ່ານຈາກການເຂົ້າເຖິງທີ່ບໍ່ໄດ້ຮັບອະນຸຍາດ.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5">
                                <AccordionTrigger className="font-semibold">
                                    5. ສິດທິຂອງຜູ້ໃຊ້
                                </AccordionTrigger>
                                <AccordionContent>
                                    ທ່ານມີສິດ:
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>ຮ້ອງຂໍການເຂົ້າເຖິງຂໍ້ມູນຂອງທ່ານ</li>
                                        <li>ໃຫ້ພວກເຮົາແກ້ໄຂ ຫຼື ລຶບຂໍ້ມູນຂອງທ່ານ</li>
                                        <li>ຖອນການຍິນຍອມທີ່ຈະໃຊ້ຂໍ້ມູນຂອງທ່ານໄດ້ທຸກເວລາ.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                        </Accordion>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}