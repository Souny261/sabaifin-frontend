"use client";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/HeroSection";
import LoanCalculator from "@/components/LoanCalculator";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import PartnerSection from "@/components/PartnerSection";
import ComparisonSection from "@/components/ComparisonSection";
import { useSelector } from "react-redux";
import { mainSelector } from "@/data/redux/slices/mainSlice";

export default function Index() {
  const mainReducer = useSelector(mainSelector);
  return (
    <>
      <BackgroundAnimation />
      <div className="md:pt-16">
        <HeroSection />
      </div>
      <MaxWidthWrapper>
        <LoanCalculator />
        {
          mainReducer.Loan && (
            <ComparisonSection
              loanAmount={mainReducer.Loan?.loanAmount ?? 0}
              loanTerm={mainReducer.Loan?.loanTerm ?? 0}
              interestRate={mainReducer.Loan?.interestRate ?? 0}
            // onApply={() => alert("Apply button clicked")}
            />
          )
        }
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <PartnerSection />
      </MaxWidthWrapper>

      <Footer />
    </>
  );
}
