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
                        <CardTitle className="text-2xl font-bold">ຂໍ້ກໍານົດ ແລະ ເງື່ອນໄຂການນໍາໃຊ້</CardTitle>
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
                        ກະລຸນາອ່ານ <span className='text-primary font-bold'> ຂໍ້ກໍານົດ ແລະ ເງື່ອນໄຂການນໍາໃຊ້ </span>ເຫຼົ່ານີ້ຢ່າງລະອຽດກ່ອນທີ່ຈະນໍາໃຊ້ເວັບໄຊທ໌ຂອງພວກເຮົາ. ຖ້າທ່ານບໍ່ເຫັນດີກັບຂໍ້ກໍານົດເຫຼົ່ານີ້, ກະລຸນາຢຸດການນໍາໃຊ້ເວັບໄຊທ໌ນີ້ທັນທີ.
                    </div>
                    <ScrollArea className="rounded-md border p-4">
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="font-semibold">
                                    1. ການຍອມຮັບຂໍ້ຕົກລົງ
                                </AccordionTrigger>
                                <AccordionContent>
                                    ໃນເວລາທີ່ທ່ານເຂົ້າເຖິງ ແລະ ນໍາໃຊ້ເວັບໄຊທ໌ນີ້, ຖືວ່າທ່ານຕົກລົງເຫັນດີກັບເງື່ອນໄຂການນໍາໃຊ້ເຫຼົ່ານີ້ໃນທຸກປະການ.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="font-semibold">
                                    2. ບໍລິການຂອງພວກເຮົາ
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p>ເວັບ​ໄຊ​ນີ້​ສະ​ຫນອງ​ເຄື່ອງ​ມື​ສໍາ​ລັບ​ການ​:</p>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>ເຄື່ອງຄຳນວນສີນເຊື່ອ</li>
                                        <li>ປຽບທຽບອັດຕາດອກເບ້ຍຈາກຜູ້ໃຫ້ບໍລິການຕ່າງໆ</li>
                                        <li>ລົງທະບຽນເພື່ອຮັບຂ່າວສານ ແລະ ການບໍລິການເພີ່ມເຕີມ.</li>
                                    </ul>
                                    <p className="mt-2"><span className="font-semibold">ພວກເຮົາບໍ່ແມ່ນສະຖາບັນການເງິນ</span> ແລະ ບໍ່ມີການສະເຫນີເງິນກູ້ໂດຍກົງ.</p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className="font-semibold">
                                    3. ການນຳໃຊ້ຂໍ້ມູນ
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>ທ່ານຕ້ອງໃຫ້ຂໍ້ມູນທີ່ຖືກຕ້ອງ ແລະ ຂໍ້ມູນປະຈຸບັນໃນເວລາລົງທະບຽນ.</li>
                                        <li>ຫ້າມໃຊ້ຂໍ້ມູນຂອງທ່ານເພື່ອຈຸດປະສົງທີ່ຜິດກົດໝາຍ ຫຼື ການສໍ້ໂກງ.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger className="font-semibold">
                                    4. ຄວາມຖືກຕ້ອງຂອງຂໍ້ມູນ
                                </AccordionTrigger>
                                <AccordionContent>
                                    ເຖິງແມ່ນວ່າພວກເຮົາຈະອັບເດດຂໍ້ມູນລ້າສຸດ, ຢ່າງໃດກໍຕາມ, ພວກເຮົາບໍ່ຮັບປະກັນວ່າຂໍ້ມູນທັງຫມົດແມ່ນຖືກຕ້ອງ 100%. ຜູ້ໃຊ້ຄວນກວດສອບຂໍ້ມູນໂດຍກົງກັບຜູ້ໃຫ້ບໍລິການກ່ອນທີ່ຈະຕັດສິນໃຈ.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5">
                                <AccordionTrigger className="font-semibold">
                                    5. ການຈຳກັດຄວາມຮັບຜິດຊອບ
                                </AccordionTrigger>
                                <AccordionContent>
                                    ທາງເຮົາຈະບໍ່ຮັບຜິດຊອບຕໍ່ຄວາມເສຍຫາຍທີ່ອາດຈະເກີດຂື້ນຈາກການນໍາໃຊ້ຂໍ້ມູນຫຼືການບໍລິການຢູ່ໃນເວັບໄຊທ໌ນີ້. ຜູ້ໃຊ້ຄວນໃຊ້ການຕັດສິນໃຈແລະກວດສອບຂໍ້ມູນໂດຍກົງກັບຜູ້ໃຫ້ບໍລິການກ່ອນທີ່ຈະຕັດສິນໃຈໃດໆ.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-6">
                                <AccordionTrigger className="font-semibold">
                                    6. ການປ່ຽນແປງຂໍ້ກໍານົດ ແລະ ເງື່ອນໄຂ
                                </AccordionTrigger>
                                <AccordionContent>
                                    ພວກເຮົາສະຫງວນສິດທີ່ຈະແກ້ໄຂ ຫຼືປ່ຽນແປງເງື່ອນໄຂເຫຼົ່ານີ້ໄດ້ທຸກເວລາ. ໂດຍບໍ່ມີການແຈ້ງລ່ວງໜ້າ
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}