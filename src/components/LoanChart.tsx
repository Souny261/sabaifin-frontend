
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, PieChart, TrendingDown } from "lucide-react";

import {
  Area,
  CartesianGrid,
  Legend,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart as RechartsPieChart,
  AreaChart as RechartsAreaChart,
  Line
} from "recharts";
import { formatCurrency } from "@/lib/calculateLoan";

interface LoanChartProps {
  amortizationSchedule: Array<{
    month: number;
    payment: number;
    principalPayment: number;
    interestPayment: number;
    remainingBalance: number;
  }>;
  loanAmount: number;
  totalInterest: number;
  loanType?: string;
  amortizedSubType?: string;
}

const LoanChart = ({
  amortizationSchedule,
  loanAmount,
  totalInterest,
  loanType = "amortized",
  amortizedSubType = "equal-installment"
}: LoanChartProps) => {
  // Prepare data for charts
  const balanceData = amortizationSchedule.filter((_, index) => index % 3 === 0).map(item => ({
    month: item.month,
    balance: item.remainingBalance
  }));

  const paymentDistribution = [
    { name: "ຕົ້ນທຶນ", value: loanAmount, fill: "#4ade80" },
    { name: "ດອກເບ້ຍ", value: totalInterest, fill: "#f97316" }
  ];

  // Get payment trends - use more data points for varying payment amounts (equal principal)
  const paymentTrendInterval = loanType === "amortized" && amortizedSubType === "equal-principal" ? 1 : 3;
  const paymentTrendData = amortizationSchedule
    .filter((_, index) => index % paymentTrendInterval === 0)
    .map(item => ({
      month: item.month,
      payment: item.payment,
      principal: item.principalPayment,
      interest: item.interestPayment
    }));

  // Determine if payments vary over time (for equal principal)
  const paymentsVary = loanType === "amortized" && amortizedSubType === "equal-principal";

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="flex items-center gap-2 text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-brand-orange"
          >
            <path d="M10 22v-8h4v8M2 22V9l10-7 10 7v13" />
            <path d="M14 22v-3a4 3 0 0 0-8 0v3" />
          </svg>
          ການວິເຄາະສີນເຊື່ອ
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <Tabs defaultValue="distribution" className="w-full">
          <TabsList className="mb-6 grid grid-cols-3">
            <TabsTrigger value="distribution" className="flex items-center gap-1.5">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">ຕົ້ນທຶນ vs ດອກເບ້ຍ</span>
              <span className="sm:hidden">ການກະຈາຍ</span>
            </TabsTrigger>
            <TabsTrigger value="balance" className="flex items-center gap-1.5">
              <AreaChart className="h-4 w-4" />
              <span className="hidden sm:inline">ຍອດເງິນຄົງເຫຼືອຕາມເວລາ</span>
              <span className="sm:hidden">ຍອດເງິນ</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-1.5">
              <TrendingDown className="h-4 w-4" />
              <span className="hidden sm:inline">ແນວໂນ້ມການຈ່າຍເງິນ</span>
              <span className="sm:hidden">ແນວໂນ້ມ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="balance" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart data={balanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                    label={{ value: 'Balance (LAK)', angle: -90, position: 'insideLeft' }}
                    tick={{ fontSize: 12 }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#f97316"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#balanceGradient)"
                    name="Remaining Balance"
                    activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                  />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="mt-0">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart
                  data={paymentTrendData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="paymentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="interestGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    label={{ value: 'Amount (LAK)', angle: -90, position: 'insideLeft' }}
                    tick={{ fontSize: 12 }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '10px',
                      fontSize: '12px'
                    }}
                  />
                  {paymentsVary && (
                    <Line
                      type="monotone"
                      dataKey="payment"
                      name="Total Payment"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={false}
                    />
                  )}
                  <Area
                    type="monotone"
                    dataKey="principal"
                    stackId="1"
                    stroke="#4ade80"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#paymentGradient)"
                    name="Principal"
                  />
                  <Area
                    type="monotone"
                    dataKey="interest"
                    stackId="1"
                    stroke="#f97316"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#interestGradient)"
                    name="Interest"
                  />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>



          <TabsContent value="distribution" className="mt-0">
            <div className="h-[300px] mt-4 flex items-center justify-center">
              <ResponsiveContainer width="80%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={paymentDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    strokeWidth={2}
                    stroke="#fff"
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoanChart;
