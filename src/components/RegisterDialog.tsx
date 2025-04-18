import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Loader2, CheckCircle, ArrowRight, User, Phone, Target } from "lucide-react";
import { useApplyUser } from "@/hooks/useApply";
import { UserApplyType } from "@/core/types/loan.type";
import { useSelector } from "react-redux";
import { mainSelector } from "@/data/redux/slices/mainSlice";
import * as gtag from '../lib/gtag'

interface UserFormData {
    name: string;
    phone: string;
    purpose: string;
}

export const RegisterDialog = () => {
    const [open, setOpen] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState<"idle" | "success" | "error">("idle");
    const { mutate: apply, isPending } = useApplyUser()
    const form = useForm<UserFormData>({
        defaultValues: {
            name: "",
            phone: "",
            purpose: ""
        }
    });
    const mainReducer = useSelector(mainSelector);
    const loanTypes = [
        { value: "personal", label: "ກູ້ຢືມສ່ວນຕົວ (Personal Loan)" },
        { value: "business", label: "ກູ້ຢືມທຸລະກິດ (Business Loan)" },
        { value: "home", label: "ກູ້ຢືມເຮືອນ (Home Loan)" },
        { value: "car", label: "ກູ້ຢືມລົດ (Car Loan)" },
        { value: "education", label: "ກູ້ຢືມການສຶກສາ (Education Loan)" },
        { value: "other", label: "ອື່ນໆ (Other)" },
    ];

    const onSubmit = async (data: UserFormData) => {
        gtag.event({
            action: "[Submit] - User Register",
            category: "click",
            label: "open"
        })
        try {
            const payload: UserApplyType = {
                name: data.name,
                phone: data.phone,
                purpose: loanTypes.find((type) => type.value === data.purpose)?.label ?? "",
                action: "USERS",
                amount: mainReducer.Loan?.loanAmount?.toString() ?? "",
                term: mainReducer.Loan?.loanTerm?.toString() ?? "",
                status: "Pending"
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
            console.log("error", error);
            setRegistrationStatus("error");
        }
    };


    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val)
            if (val) {
                form.reset();
                // idle
                setRegistrationStatus("idle")
                gtag.event({
                    action: "[Click] - User Register",
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
                    <span className="mr-2 text-lg">ສະໝັກດຽວນີ້</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                {registrationStatus === "idle" && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center">
                                <div className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center mr-2 md:flex hidden">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                ລົງທະບຽນຂໍ້ມູນ
                            </DialogTitle>
                            <DialogDescription className="text-slate-500">
                                ກະລຸນາປ້ອນຂໍ້ມູນຂອງທ່ານເພື່ອດຳເນີນການຕໍ່
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    rules={{ required: "ກະລຸນາປ້ອນຊື່ຂອງທ່ານ" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center">
                                                <User className="h-4 w-4 mr-2 text-primary" />
                                                ຊື່ ແລະ ນາມສະກຸນ
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="ປ້ອນຊື່ຂອງທ່ານ" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    rules={{
                                        required: "ກະລຸນາປ້ອນເບີໂທລະສັບ",
                                        pattern: {
                                            value: /^[0-9]{8,12}$/,
                                            message: "ເບີໂທລະສັບບໍ່ຖືກຕ້ອງ"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center">
                                                <Phone className="h-4 w-4 mr-2 text-primary" />
                                                ເບີໂທລະສັບ
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="020 XXXXXXXX"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="purpose"
                                    rules={{ required: "ກະລຸນາເລືອກຈຸດປະສົງ" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center">
                                                <Target className="h-4 w-4 mr-2 text-primary" />
                                                ຈຸດປະສົງ
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl className="w-full">
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="ເລືອກຈຸດປະສົງ" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <div className="w-full">
                                                    <SelectContent className="w-full">
                                                        {
                                                            loanTypes.map((type) => (
                                                                <SelectItem key={type.value} value={type.value}>
                                                                    {type.label}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </div>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter className="flex flex-row space-x-2 items-center justify-center">
                                    <div className="flex flex-1">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setOpen(false)}
                                            className="w-full"
                                        >
                                            ຍົກເລີກ
                                        </Button>
                                    </div>
                                    <div className="flex flex-1">
                                        <Button
                                            type="submit"
                                            className="bg-primary hover:bg-primary/90 w-full"
                                            disabled={isPending}
                                        >
                                            {isPending ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    ກຳລັງດຳເນີນການ...
                                                </>
                                            ) : (
                                                "ສົ່ງຂໍ້ມູນ"
                                            )}
                                        </Button>
                                    </div>
                                </DialogFooter>
                            </form>
                        </Form>
                    </>
                )}

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
                        <h3 className="text-xl font-semibold text-center text-green-600">ສົ່ງຂໍ້ມູນສຳເລັດແລ້ວ!</h3>
                        <p className="text-slate-500 text-center mt-2">
                            ຂອບໃຈສຳລັບການລົງທະບຽນ. ພວກເຮົາຈະຕິດຕໍ່ຫາທ່ານໃນໄວໆນີ້.
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

export default RegisterDialog;