import { Services } from "@/components/Services.server";
import { Testimonials } from "@/components/Testimonials.server";
import { HowItWorks } from "@/components/HowItWorks.server";
import { Pricing } from "@/components/Pricing";
import { ToolsIntegration } from "@/components/ToolsIntegration";
import { CaseStudies } from "@/components/CaseStudies";
import { Blog } from "@/components/Blog";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { SPACING } from "@/lib/constants";

export function HomeBelowFold({ lang }: { lang: string }) {
  return (
    <>
      <div className={SPACING.container}>
        <HowItWorks lang={lang} />
        <Services lang={lang} />
        <Pricing />
        <ToolsIntegration />
        <Testimonials lang={lang} />
        <Blog />
        <CaseStudies />
        <FAQ />
      </div>
      <FinalCTA />
    </>
  );
}
