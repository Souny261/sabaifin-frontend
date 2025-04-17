"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { BarChart4, Calculator, Calendar, Percent, Table, Wallet } from "lucide-react";
import {
  calculateLoan,
  formatCurrency,
  LoanResult
} from "@/lib/calculateLoan";
import { formSchema, LoanFormValues } from "@/core/schema/LoanForm";
import LoanChart from "./LoanChart";
import AmortizationSchedule from "./AmortizationSchedule";
import { useAppDispatch } from "@/data/redux/store";
import { setLoan } from "@/data/redux/slices/mainSlice";

const LoanCalculator = () => {
  const dispatch = useAppDispatch();
  const [calculationResult, setCalculationResult] = useState<{
    result: LoanResult;
    formValues: {
      loanAmount: number;
      interestRate: number;
      loanTerm: number;
      loanType: string;
      amortizedSubType: string;
    };
  } | null>(null);

  const [result, setResult] = useState<LoanResult | null>(null);
  const [isFirstCalculation, setIsFirstCalculation] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<LoanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 50000000,
      interestRate: 8.5,
      loanTerm: 60,
      loanType: "amortized",
      amortizedSubType: "equal-installment",
    },
  });

  const selectedLoanType = form.watch("loanType");

  const handleSliderChange = (name: keyof LoanFormValues, value: number[]) => {
    form.setValue(name, value[0], { shouldValidate: true });
  };

  const handleCalculate = (data: LoanResult & {
    formValues: {
      loanAmount?: number;
      interestRate?: number;
      loanTerm?: number;
      loanType?: "flat" | "amortized";
      amortizedSubType?: "equal-installment" | "equal-principal";
    }
  }) => {
    setCalculationResult({
      result: data,
      formValues: {
        loanAmount: data.formValues.loanAmount || 0,
        interestRate: data.formValues.interestRate || 0,
        loanTerm: data.formValues.loanTerm || 0,
        loanType: data.formValues.loanType || "flat",
        amortizedSubType: data.formValues.amortizedSubType || "equal-installment",
      },
    });
  };

  const onSubmit = (data: LoanFormValues) => {
    const calculationResult = calculateLoan(
      data.loanAmount,
      data.interestRate,
      data.loanTerm,
      data.loanType,
      data.amortizedSubType
    );

    setResult(calculationResult);

    handleCalculate({
      ...calculationResult,
      formValues: data,
    });
    dispatch(setLoan({ loanAmount: data.loanAmount, interestRate: data.interestRate, loanTerm: data.loanTerm }))
    if (isFirstCalculation) {
      setIsFirstCalculation(false);
    }

    if (resultRef.current && !isElementInViewport(resultRef.current)) {
      setTimeout(() => {
        const offset = 80; // Adjust this value for desired padding
        const top = resultRef.current
          ? resultRef.current.getBoundingClientRect().top + window.pageYOffset - offset
          : 0;

        window.scrollTo({
          top,
          behavior: "smooth"
        });
      }, 100);
    }
  };

  const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const handleExportCSV = () => {
    if (!calculationResult) return;

    // Create CSV content
    const headers = "Month,Payment,Principal,Interest,Remaining Balance\n";
    const csvContent = calculationResult.result.amortizationSchedule.reduce((acc, row) => {
      return acc + `${row.month},${row.payment.toFixed(2)},${row.principalPayment.toFixed(2)},${row.interestPayment.toFixed(2)},${row.remainingBalance.toFixed(2)}\n`;
    }, headers);

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'loan_amortization.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Prevent initial calculations from running during SSR
    if (typeof window !== 'undefined' && !hasInitialized) {
      // Mark as initialized to prevent re-running
      setHasInitialized(true);

      // Auto-calculate on first client-side render
      const defaultValues = form.getValues();
      const initialResult = calculateLoan(
        defaultValues.loanAmount,
        defaultValues.interestRate,
        defaultValues.loanTerm,
        defaultValues.loanType,
        defaultValues.amortizedSubType
      );
      setResult(initialResult);

      handleCalculate({
        ...initialResult,
        formValues: defaultValues,
      });

      dispatch(setLoan({
        loanAmount: defaultValues.loanAmount,
        interestRate: defaultValues.interestRate,
        loanTerm: defaultValues.loanTerm
      }));
    }
  }, [dispatch, form, hasInitialized]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="calculator" className="flex flex-col space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">ເຄື່ອງຄິດໄລ່ສີນເຊື່ອສໍາລັບຄົນລາວ</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          ວາງແຜນອະນາຄົດທາງການເງິນຂອງທ່ານດ້ວຍເຄື່ອງຄິດໄລ່ສີນເຊື່ອທີ່ໃຊ້ງ່າຍຂອງພວກເຮົາ.
        </p>
      </div>
      <div className="flex md:flex-row md:space-x-8 space-x-0 flex-col space-y-4 md:space-y-0">
        <div className="flex-1 flex">
          <div className="w-full">
            <Card className="w-full shadow-md">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-2xl">ເຄື່ອງຄິດໄລ່ສີນເຊື່ອ</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14 flex flex-col">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="loanType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>ປະເພດເງິນກູ້</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="amortized" id="amortized" />
                                  <Label htmlFor="amortized" className="font-normal">ສິນເຊື່ອແບບລົດຕົ້ນລົດດອກ</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="flat" id="flat" />
                                  <Label htmlFor="flat" className="font-normal">ສິນເຊື່ອດອກເບ້ຍຄົງທີ່</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {selectedLoanType === "amortized" && (
                        <FormField
                          control={form.control}
                          name="amortizedSubType"
                          render={({ field }) => (
                            <FormItem className="space-y-3 ">
                              <FormLabel>ວິທີການຊໍາລະ</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex md:flex-row  items-start md:space-x-2 space-x-0 flex-col space-y-2 md:space-y-0"
                                >
                                  <div className="flex flex-row items-center space-x-2">
                                    <RadioGroupItem value="equal-installment" id="equal-installment" />
                                    <div className="flex flex-col items-start space-y-1">
                                      <Label htmlFor="equal-installment" className="font-normal">
                                        ການຊຳລະລາຍເດືອນເທົ່າກັນ (EMI)
                                      </Label>
                                      <FormDescription className=" text-xs">
                                        ຈຳນວນເງີນຊຳລະຄົງທີ່ທຸກເດືອນດອກເບ້ຍສ່ວນຕົ້ນຈະສູງຂື້ນ.
                                      </FormDescription>
                                    </div>
                                  </div>

                                  <div className="flex flex-row items-center space-x-2">
                                    <RadioGroupItem value="equal-principal" id="equal-principal" />
                                    <div className="flex flex-col items-start space-y-1">
                                      <Label htmlFor="equal-principal" className="font-normal">
                                        ດອກເບ້ຍຫຼຸດຕາມຍອດຕົ້ນທຶນຄົງເຫຼືອ
                                      </Label>
                                      <FormDescription className="text-xs">
                                        ຈຳນວນເງິນທີ່ຕ້ອງຈ່າຍທັງໝົດຈະຫຼຸດລົງຕາມເວລາ.
                                      </FormDescription>
                                    </div>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="loanAmount"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between">
                              <FormLabel className="flex items-center gap-1.5">
                                <Wallet className="h-4 w-4 text-brand-orange" />
                                ຈຳນວນເງິນກູ້ (LAK)
                              </FormLabel>
                              <span className="text-sm font-medium text-brand-blue">
                                {field.value.toLocaleString()}
                              </span>
                            </div>
                            <FormControl>
                              <div className="space-y-4">
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                                <Slider
                                  value={[field.value]}
                                  min={1000000}
                                  max={1000000000}
                                  step={1000000}
                                  onValueChange={(value) => handleSliderChange("loanAmount", value)}
                                  className="cursor-pointer"
                                />
                              </div>
                            </FormControl>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1M</span>
                              <span>1B</span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="interestRate"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between">
                              <FormLabel className="flex items-center gap-1.5">
                                <Percent className="h-4 w-4 text-brand-orange" />
                                ອັດຕາດອກເບ້ຍ (%)
                              </FormLabel>
                              <span className="text-sm font-medium text-brand-blue">
                                {field.value}%
                              </span>
                            </div>
                            <FormControl>
                              <div className="space-y-4">
                                <Input
                                  type="number"
                                  step="0.1"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                                <Slider
                                  value={[field.value]}
                                  min={1}
                                  max={30}
                                  step={0.1}
                                  onValueChange={(value) => handleSliderChange("interestRate", value)}
                                  className="cursor-pointer"
                                />
                              </div>
                            </FormControl>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1%</span>
                              <span>30%</span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="loanTerm"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between">
                              <FormLabel className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-brand-orange" />
                                ໄລຍະເວລາກູ້ຢືມ (ເດືອນ)
                              </FormLabel>
                              <span className="text-sm font-medium text-brand-blue">
                                {field.value} ເດືອນ ({Math.floor(field.value / 12)} ປີ {field.value % 12} ເດືອນ)
                              </span>
                            </div>
                            <FormControl>
                              <div className="space-y-4">
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                                <Slider
                                  value={[field.value]}
                                  min={3}
                                  max={360}
                                  step={1}
                                  onValueChange={(value) => handleSliderChange("loanTerm", value)}
                                  className="cursor-pointer"
                                />
                              </div>
                            </FormControl>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>3 ເດືອນ</span>
                              <span>30 ປີ</span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-row space-x-4">
                      <Button
                        onClick={() => {
                          scrollToSection("compare")
                        }}
                        variant={"outline"}
                        className="flex flex-1"
                      >
                        ສົນໃຈສະໝັກສິນເຊື່ອ
                      </Button>
                      <Button
                        type="submit"
                        className="flex flex-1 bg-primary w-full text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 btn-shine"
                      >
                        <BarChart4 className="mr-2 h-4 w-4" />
                        ຄຳນວນ
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Result */}
        <div ref={resultRef} className="flex-1 flex flex-col space-y-4">
          <Card className="w-full shadow-md">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle className="text-2xl flex flex-row items-center justify-between" >
                <div className="flex flex-row space-x-2 items-center">
                  <Calculator size={20} />
                  <div>
                    ສະຫຼຸບການຄຳນວນ
                  </div>
                </div>
                <Button onClick={() => {
                  scrollToSection("table")
                }} variant={"outline"} className="flex items-center">
                  <Table className="h-4 w-4 md:h-5 md:w-5" />
                  <div className="md:block hidden">
                    ຕາຕະລາງການຊຳລະ
                  </div>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Only render results on client side after initialization */}
              {hasInitialized && result && (
                <div
                  className={`${!isFirstCalculation ? 'animate-fade-in' : ''}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary/5 p-6 rounded-lg  text-center">
                      <Label className="text-sm text-primary mb-1 block">ຊຳລະຕໍ່ເດືອນ</Label>
                      {selectedLoanType === "amortized" && form.getValues().amortizedSubType === "equal-principal" ? (
                        <div>
                          <p className="text-2xl font-bold text-primary">
                            {hasInitialized ? formatCurrency(Math.round(result.monthlyPayment)) : ""}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            (ຫຼຸດລົງຕາມເວລາ)
                          </p>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold text-primary">
                          {hasInitialized ? formatCurrency(Math.round(result.monthlyPayment)) : ""}
                        </p>
                      )}
                    </div>

                    <div className="bg-primary/5 p-6 rounded-lg text-center">
                      <Label className="text-sm text-primary mb-1 block">ຊຳລະທັງໝົດ</Label>
                      <p className="text-2xl font-bold text-primary">
                        {hasInitialized ? formatCurrency(Math.round(result.totalPayment)) : ""}
                      </p>
                    </div>

                    <div className="bg-primary/5 p-6 rounded-lg text-center">
                      <Label className="text-sm text-primary mb-1 block">ດອກເບ້ຍທັງໝົດ</Label>
                      <p className="text-2xl font-bold text-primary">
                        {hasInitialized ? formatCurrency(Math.round(result.totalInterest)) : ""}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          {/* Only render chart on client side */}
          {hasInitialized && calculationResult && (
            <LoanChart
              amortizationSchedule={calculationResult.result.amortizationSchedule}
              loanAmount={calculationResult.formValues.loanAmount}
              totalInterest={calculationResult.result.totalInterest}
              loanType={calculationResult.formValues.loanType}
              amortizedSubType={calculationResult.formValues.amortizedSubType}
            />
          )}
        </div>
      </div>
      <div id="table">
        {/* Only render table on client side */}
        {hasInitialized && calculationResult && (
          <AmortizationSchedule
            schedule={calculationResult.result.amortizationSchedule}
            exportCSV={handleExportCSV}
          />
        )}
      </div>
    </section>
  );
};

export default LoanCalculator;