"use client";

import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Services } from "@/components/Services";
import { SPACING } from "@/lib/constants";
import { ToolsIntegration } from "@/components/ToolsIntegration";
import { Testimonials } from "@/components/Testimonials";
import { CaseStudies } from "@/components/CaseStudies";
import { Blog } from "@/components/Blog";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";

export function HomeBelowFold() {
  return (
    <>
      <div className={SPACING.container}>
        <HowItWorks />
        <Services />
        <Pricing />
        <ToolsIntegration />
        <Testimonials />
        <Blog />
        <CaseStudies />
        <FAQ />
      </div>
      <FinalCTA />
    </>
  );
}
