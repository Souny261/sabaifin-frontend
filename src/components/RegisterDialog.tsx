import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Loader2, CheckCircle, AlertCircle, ArrowRight, User, Phone, Target } from "lucide-react";

interface UserFormData {
    name: string;
    phone: string;
    purpose: string;
}

export const RegisterDialog = () => {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState<"idle" | "success" | "error">("idle");

    const form = useForm<UserFormData>({
        defaultValues: {
            name: "",
            phone: "",
            purpose: ""
        }
    });

    const onSubmit = async (data: UserFormData) => {
        try {
            setIsSubmitting(true);

            // Here you would typically send the data to your API
            console.log("Form data submitted:", data);

            // Simulate API request
            await new Promise(resolve => setTimeout(resolve, 1500));

            setRegistrationStatus("success");
            // Reset form after successful submission
            form.reset();

            // Close dialog after showing success message
            // setTimeout(() => {
            //     setOpen(false);
            //     setRegistrationStatus("idle");
            // }, 5000);

        } catch (error) {
            console.error("Registration error:", error);
            setRegistrationStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val)
            if (val) {
                form.reset();
                // idle
                setRegistrationStatus("idle")
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
                                                        <SelectItem value="personal" className="w-full">ກູ້ຢືມສ່ວນຕົວ (Personal Loan)</SelectItem>
                                                        <SelectItem value="business" className="w-full">ກູ້ຢືມທຸລະກິດ (Business Loan)</SelectItem>
                                                        <SelectItem value="home" className="w-full">ກູ້ຢືມເຮືອນ (Home Loan)</SelectItem>
                                                        <SelectItem value="car" className="w-full">ກູ້ຢືມລົດ (Car Loan)</SelectItem>
                                                        <SelectItem value="education" className="w-full">ກູ້ຢືມການສຶກສາ (Education Loan)</SelectItem>
                                                        <SelectItem value="other" className="w-full">ອື່ນໆ (Other)</SelectItem>
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
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
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
                        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 animate-bounce">
                            <CheckCircle className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-semibold text-center">ສົ່ງຂໍ້ມູນສຳເລັດແລ້ວ!</h3>
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
                        <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4 animate-bounce">

                            <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
                        </div>

                        <h3 className="text-xl font-semibold text-center">ເກີດຂໍ້ຜິດພາດ!</h3>
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