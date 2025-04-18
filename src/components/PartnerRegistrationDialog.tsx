"use client";
import React, { useState } from "react";
import {
    CheckCircle,
    Building,
    Phone,
    User,
    Briefcase,
    ArrowRight,
    Loader2
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useApplyPartner } from "@/hooks/useApply";
import { PartnerApplyType } from "@/core/types/loan.type";
import * as gtag from '../lib/gtag'

// Define the form schema with Zod
const formSchemaStep1 = z.object({
    companyName: z.string().min(2, { message: "ຊື່ບໍລິສັດຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ" }),
    contactName: z.string().min(2, { message: "ຊື່ຜູ້ຕິດຕໍ່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ" }),
    position: z.string().min(2, { message: "ກະລຸນາລະບຸຕຳແໜ່ງຂອງທ່ານ" }),
    phone: z.string().min(8, { message: "ເບີໂທລະສັບຕ້ອງມີຢ່າງໜ້ອຍ 8 ຕົວເລກ" })
});



// Combine schemas for the complete form
const formSchema = formSchemaStep1;

// Define the form data type from the schema
type FormData = z.infer<typeof formSchema>;

const PartnerRegistrationDialog = () => {
    // Initialize React Hook Form
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            contactName: "",
            position: "",
            phone: ""
        },
        mode: "onChange"
    });

    const [registrationStatus, setRegistrationStatus] = useState<"idle" | "success" | "error">("idle");
    const { mutate: apply, isPending } = useApplyPartner()

    const onSubmit = (data: FormData) => {
        gtag.event({
            action: "[Submit] - Partner Register",
            category: "click",
            label: "open"
        })
        try {
            const payload: PartnerApplyType = {
                contactName: data.contactName,
                position: data.position,
                phone: data.phone,
                status: "Pending",
                action: "PARTNERS",
                companyName: data.companyName
            }
            apply(payload, {
                onSuccess: (data) => {
                    if (data.status) {
                        setRegistrationStatus("success");
                        form.reset();
                    } else {
                        setRegistrationStatus("error");
                    }
                },
                onError: () => {
                    setRegistrationStatus("error");
                }
            })
        } catch (error) {
            console.log(error);
            setRegistrationStatus("error");
        }
    };
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val)
            if (val) {
                form.reset();

                setRegistrationStatus("idle");
                gtag.event({
                    action: "[Click] - Partner Register",
                    category: "click",
                    label: "open"
                })
            }
        }}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 btn-shine"
                >
                    <span className="mr-2 text-lg">ຮ່ວມມືກັບພວກເຮົາ</span>
                    <ArrowRight className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md md:max-w-lg bg-white rounded-xl">
                {registrationStatus === "idle" && (<>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center">
                            <div className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center mr-2 md:flex hidden">
                                <CheckCircle className="h-5 w-5 text-primary" />
                            </div>
                            ລົງທະບຽນເປັນຄູ່ຮ່ວມທຸລະກິດ
                        </DialogTitle>
                        <DialogDescription className="text-slate-500">
                            ກະລຸນາປ້ອນຂໍ້ມູນພື້ນຖານຂອງທ່ານເພື່ອເລີ່ມຕົ້ນການເປັນຄູ່ຮ່ວມທຸລະກິດ.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="relative">


                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
                                <>
                                    <FormField
                                        control={form.control}
                                        name="companyName"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="flex items-center">
                                                    <Building className="h-4 w-4 mr-2 text-primary" />
                                                    ຊື່ບໍລິສັດ
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="ປ້ອນຊື່ບໍລິສັດຂອງທ່ານ"
                                                        className="border-slate-200 focus-visible:ring-primary"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="contactName"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="flex items-center">
                                                    <User className="h-4 w-4 mr-2 text-primary" />
                                                    ຊື່ຜູ້ຕິດຕໍ່
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="ຊື່ແລະນາມສະກຸນ"
                                                        className="border-slate-200 focus-visible:ring-primary"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="position"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="flex items-center">
                                                    <Briefcase className="h-4 w-4 mr-2 text-primary" />
                                                    ຕຳແໜ່ງ
                                                </FormLabel>

                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="ຕຳແໜ່ງຂອງທ່ານ"
                                                        className="border-slate-200 focus-visible:ring-primary"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="flex items-center">
                                                    <Phone className="h-4 w-4 mr-2 text-primary" />
                                                    ເບີໂທລະສັບ
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="020 XXXX XXXX"
                                                        className="border-slate-200 focus-visible:ring-primary"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>

                                <DialogFooter className="flex justify-between mt-6 pt-4 border-t border-slate-100">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full sm:w-auto"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        ຍົກເລີກ
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="bg-primary hover:bg-primary/90"
                                    >
                                        {isPending ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ກຳລັງດຳເນີນການ...
                                            </>
                                        ) : (
                                            "ສົ່ງການລົງທະບຽນ"
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </>)}
                {registrationStatus === "success" && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="relative w-full h-40">
                            <Image
                                src="confirm.svg"
                                alt="confirm"
                                layout="fill"
                                objectFit="contain"
                                className="animate-bounce"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-center text-green-600">ຂໍຂອບໃຈ!</h3>
                        <p className="text-slate-500 text-center mt-2">
                            ການລົງທະບຽນຂອງທ່ານໄດ້ຖືກສົ່ງສຳເລັດແລ້ວ. ທີມງານຂອງພວກເຮົາຈະຕິດຕໍ່ຫາທ່ານພາຍໃນ 24 ຊົ່ວໂມງ.
                        </p>
                        <Button
                            variant="outline"
                            className="mt-6 border-slate-200"
                            onClick={() => {
                                setOpen(false);
                                form.reset();
                            }}
                        >
                            ປິດ
                        </Button>
                    </div>
                )}

                {registrationStatus === "error" && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="relative w-full h-40">
                            <Image
                                src="error.svg"
                                alt="error"
                                layout="fill"
                                objectFit="contain"
                                className="animate-bounce"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-center text-red-500">ເກີດຂໍ້ຜິດພາດ!</h3>
                        <p className="text-slate-500 text-center mt-2">
                            ບໍ່ສາມາດສົ່ງຂໍ້ມູນໄດ້ໃນຂະນະນີ້. ກະລຸນາລອງໃໝ່ພາຍຫຼັງ.
                        </p>
                        <Button
                            className="mt-4"
                            onClick={() => setRegistrationStatus("idle")}
                        >
                            ລອງໃໝ່ອີກຄັ້ງ
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default PartnerRegistrationDialog;