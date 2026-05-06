"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";
import {
  Mail,
  Send,
  CheckCircle2,
  Briefcase,
  MessageSquare,
  Loader2,
  Star,
  Clock,
  Shield,
  Globe,
  TrendingUp,
  Users,
} from "lucide-react";

type FormValues = {
  email: string;
  phone: string;
  websiteUrl: string;
  industry: string;
  budget: string;
  mainService: string;
  mainServiceOther?: string;
  challenges: string;
  goals: string;
  competitors?: string;
  otherTasks: string;
};

const translations: Record<string, Record<string, string>> = {
  en: {
    badge: "Get In Touch",
    title: "Let's Improve Your SEO",
    subtitle: "Tell us about your website and goals, and we'll create a custom SEO strategy within 48 hours.",
    email: "Email Address",
    phone: "Phone Number",
    websiteUrlLabel: "Website URL",
    websiteUrlPlaceholder: "https://yourwebsite.com",
    industryLabel: "Industry",
    industryPlaceholder: "Select your industry",
    budgetLabel: "Monthly Budget (EUR)",
    budgetPlaceholder: "e.g. 2000",
    mainServiceLabel: "Main Service Needed",
    mainServicePlaceholder: "Select a service",
    mainServiceOtherLabel: "Describe the service",
    mainServiceOtherPlaceholder: "Describe what you need...",
    challengesLabel: "Current SEO Challenges",
    challengesPlaceholder: "e.g. Low organic traffic, poor rankings, thin content...",
    goalsLabel: "Goals & Objectives",
    goalsPlaceholder: "e.g. Rank #1 for target keywords, increase organic leads by 50%...",
    competitorsLabel: "Main Competitors (optional)",
    competitorsPlaceholder: "e.g. competitor1.com, competitor2.com",
    otherTasksLabel: "Additional Notes",
    otherTasksPlaceholder: "Anything else you'd like us to know...",
    submit: "Send Message",
    submitSending: "Sending...",
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email",
    phoneRequired: "Phone is required",
    phoneInvalid: "Enter a valid phone number",
    websiteUrlRequired: "Website URL is required",
    industryRequired: "Please select your industry",
    budgetRequired: "Please enter your monthly budget",
    mainServiceRequired: "Please select a service",
    challengesRequired: "Please describe your SEO challenges",
    goalsRequired: "Please describe your goals",
    sideTitle: "Why Work With Us?",
    stat1Value: "200+",
    stat1Label: "Happy Clients",
    stat2Value: "340%",
    stat2Label: "Avg. Traffic Growth",
    stat3Value: "4.9/5",
    stat3Label: "Average Rating",
    feature1: "Data-driven SEO strategies",
    feature2: "Technical SEO excellence",
    feature3: "Transparent monthly reporting",
    feature4: "Dedicated SEO account manager",
    responseTime: "We typically respond within 2 hours",
  },
  ge: {
    badge: "Kontakt aufnehmen",
    title: "Lassen Sie Ihre SEO verbessern",
    subtitle: "Erzählen Sie uns von Ihrer Website und Ihren Zielen, und wir erstellen eine maßgeschneiderte SEO-Strategie innerhalb von 48 Stunden.",
    email: "E-Mail-Adresse",
    phone: "Telefonnummer",
    websiteUrlLabel: "Website-URL",
    websiteUrlPlaceholder: "https://ihrewebsite.de",
    industryLabel: "Branche",
    industryPlaceholder: "Branche auswählen",
    budgetLabel: "Monatliches Budget (EUR)",
    budgetPlaceholder: "z.B. 2000",
    mainServiceLabel: "Hauptdienstleistung",
    mainServicePlaceholder: "Dienst auswählen",
    mainServiceOtherLabel: "Dienst beschreiben",
    mainServiceOtherPlaceholder: "Beschreiben Sie Ihre Anforderungen...",
    challengesLabel: "Aktuelle SEO-Herausforderungen",
    challengesPlaceholder: "z.B. Wenig organischer Traffic, schlechte Rankings...",
    goalsLabel: "Ziele & Objectives",
    goalsPlaceholder: "z.B. Platz 1 für Ziel-Keywords, organische Leads um 50% steigern...",
    competitorsLabel: "Hauptwettbewerber (optional)",
    competitorsPlaceholder: "z.B. wettbewerber1.de, wettbewerber2.de",
    otherTasksLabel: "Weitere Anmerkungen",
    otherTasksPlaceholder: "Was sollen wir noch wissen...",
    submit: "Nachricht senden",
    submitSending: "Wird gesendet...",
    emailRequired: "E-Mail ist erforderlich",
    emailInvalid: "Gültige E-Mail eingeben",
    phoneRequired: "Telefon ist erforderlich",
    phoneInvalid: "Gültige Telefonnummer eingeben",
    websiteUrlRequired: "Website-URL ist erforderlich",
    industryRequired: "Bitte wählen Sie Ihre Branche",
    budgetRequired: "Bitte geben Sie Ihr monatliches Budget ein",
    mainServiceRequired: "Bitte wählen Sie einen Dienst",
    challengesRequired: "Bitte beschreiben Sie Ihre SEO-Herausforderungen",
    goalsRequired: "Bitte beschreiben Sie Ihre Ziele",
    sideTitle: "Warum mit uns arbeiten?",
    stat1Value: "200+",
    stat1Label: "Zufriedene Kunden",
    stat2Value: "340%",
    stat2Label: "Traffic-Wachstum",
    stat3Value: "4.9/5",
    stat3Label: "Durchschnittsbewertung",
    feature1: "Datengesteuerte SEO-Strategien",
    feature2: "Technische SEO-Exzellenz",
    feature3: "Transparentes monatliches Reporting",
    feature4: "Persönlicher Account Manager",
    responseTime: "Wir antworten in der Regel innerhalb von 2 Stunden",
  },
};

const industryOptions = [
  { value: "ecommerce", label: "E-Commerce" },
  { value: "saas", label: "SaaS / Tech" },
  { value: "local-business", label: "Local Business" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "real-estate", label: "Real Estate" },
  { value: "education", label: "Education" },
  { value: "marketing", label: "Marketing / Agency" },
  { value: "other", label: "Other" },
];

function FormSection({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border/50">
        <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-gold" />
        </div>
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-xs font-medium text-destructive mt-1">{message}</p> : null;
}

export default function ContactClient({ lang }: { lang: string }) {
  const c = translations[lang] ?? translations.en;
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "", phone: "", websiteUrl: "", industry: "",
      budget: "", mainService: "", mainServiceOther: "",
      challenges: "", goals: "", competitors: "", otherTasks: "",
    },
    mode: "onBlur",
  });

  const mainServiceValue = useWatch({ control, name: "mainService" });

  const emailPattern = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/, []);
  const phonePattern = useMemo(() => /^[0-9+\-()\s]{7,20}$/i, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const serviceLabel = {
      "local-seo": "Local SEO", "technical-seo": "Technical SEO", "on-page-seo": "On-Page SEO",
      "link-building": "Link Building", "content-marketing": "Content Marketing",
      "ecommerce-seo": "E-Commerce SEO", "international-seo": "International SEO",
      "seo-audit": "SEO Audit", "other": "Other",
    }[data.mainService] ?? data.mainService;

    const industryLabel = industryOptions.find((o) => o.value === data.industry)?.label ?? data.industry;

    const row = (label: string, value?: string) =>
      value?.trim()
        ? `<tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap;border-bottom:1px solid #eee">${label}</td><td style="padding:8px 12px;color:#222;border-bottom:1px solid #eee">${value.trim()}</td></tr>`
        : "";

    const message = `
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
        ${row("Email", data.email)}
        ${row("Phone", data.phone)}
        ${row("Website URL", data.websiteUrl)}
        ${row("Industry", industryLabel)}
        ${row("Monthly Budget (EUR)", data.budget)}
        ${row("Main Service", serviceLabel)}
        ${data.mainService === "other" ? row("Service Description", data.mainServiceOther) : ""}
        ${row("SEO Challenges", data.challenges)}
        ${row("Goals & Objectives", data.goals)}
        ${row("Competitors", data.competitors)}
        ${row("Additional Notes", data.otherTasks)}
      </table>
    `;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "8aff1902-6795-4608-ad79-be6702aa7f3a",
          to: "patryk@dononlineagency.com",
          subject: `New SEO Enquiry from ${data.email}`,
          from_name: data.email,
          email: data.email,
          message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast({ title: "Success!", description: "Your message has been sent." });
        reset();
      } else {
        toast({ title: "Error", description: json.message || "Please try again." });
      }
    } catch {
      toast({ title: "Network error", description: "Please try again later." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/4 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-28 pb-20">
        <motion.div
          className="text-left mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            {c.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {c.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {c.subtitle}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left — Info Panel */}
          <motion.div
            className="lg:col-span-2 lg:sticky lg:top-28 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: c.stat1Value, label: c.stat1Label, icon: Users },
                { value: c.stat2Value, label: c.stat2Label, icon: TrendingUp },
                { value: c.stat3Value, label: c.stat3Label, icon: Star },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center p-4 bg-card border border-border/50 rounded-xl hover:border-gold/40 transition-colors">
                  <Icon className="w-4 h-4 text-gold mx-auto mb-1.5" />
                  <div className="text-xl font-bold text-gold">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-card border border-border/50 rounded-xl space-y-4">
              <h3 className="font-bold text-foreground text-base">{c.sideTitle}</h3>
              <ul className="space-y-3">
                {[c.feature1, c.feature2, c.feature3, c.feature4].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gold/5 border border-gold/20 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{c.responseTime}</p>
            </div>

            <div className="p-5 bg-card border border-border/50 rounded-xl space-y-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />)}
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;DON SEO transformed our rankings. We saw 340% traffic growth in the first year alone.&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <span className="text-gold font-bold text-xs">SJ</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Sarah Johnson</div>
                  <div className="text-xs text-muted-foreground">CEO, TechStart Inc</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>Your information is 100% secure and never shared.</span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border/50 rounded-2xl shadow-xl shadow-black/10 overflow-hidden">
              <div className="px-6 sm:px-8 py-5 border-b border-border/50 bg-gradient-to-r from-gold/5 to-transparent">
                <h2 className="font-bold text-foreground text-lg">Fill in your details</h2>
                <p className="text-sm text-muted-foreground mt-0.5">All fields marked with * are required</p>
              </div>

              <form className="px-6 sm:px-8 py-7 space-y-8" onSubmit={handleSubmit(onSubmit)}>

                {/* Contact Info */}
                <FormSection icon={Mail} title="Contact Information">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">{c.email} <span className="text-gold">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="border-border/60 focus:border-gold/60 transition-colors"
                        {...register("email", {
                          required: c.emailRequired,
                          pattern: { value: emailPattern, message: c.emailInvalid },
                        })}
                      />
                      <FieldError message={errors.email?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm">{c.phone} <span className="text-gold">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 555 123 4567"
                        className="border-border/60 focus:border-gold/60 transition-colors"
                        {...register("phone", {
                          required: c.phoneRequired,
                          pattern: { value: phonePattern, message: c.phoneInvalid },
                        })}
                      />
                      <FieldError message={errors.phone?.message} />
                    </div>
                  </div>
                </FormSection>

                {/* Website Info */}
                <FormSection icon={Globe} title="Website Information">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="websiteUrl" className="text-sm">{c.websiteUrlLabel} <span className="text-gold">*</span></Label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        placeholder={c.websiteUrlPlaceholder}
                        className="border-border/60 focus:border-gold/60 transition-colors"
                        {...register("websiteUrl", { required: c.websiteUrlRequired })}
                      />
                      <FieldError message={errors.websiteUrl?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm">{c.industryLabel} <span className="text-gold">*</span></Label>
                      <Select onValueChange={(v) => setValue("industry", v, { shouldValidate: true })}>
                        <SelectTrigger className="border-border/60 focus:border-gold/60">
                          <SelectValue placeholder={c.industryPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map((o) => (
                            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("industry", { required: c.industryRequired })} />
                      <FieldError message={errors.industry?.message} />
                    </div>
                  </div>
                </FormSection>

                {/* Service & Budget */}
                <FormSection icon={Briefcase} title="Service & Budget">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">{c.mainServiceLabel} <span className="text-gold">*</span></Label>
                      <Select onValueChange={(v) => setValue("mainService", v, { shouldValidate: true })}>
                        <SelectTrigger className="border-border/60 focus:border-gold/60">
                          <SelectValue placeholder={c.mainServicePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local-seo">Local SEO</SelectItem>
                          <SelectItem value="technical-seo">Technical SEO</SelectItem>
                          <SelectItem value="on-page-seo">On-Page SEO</SelectItem>
                          <SelectItem value="link-building">Link Building</SelectItem>
                          <SelectItem value="content-marketing">Content Marketing</SelectItem>
                          <SelectItem value="ecommerce-seo">E-Commerce SEO</SelectItem>
                          <SelectItem value="international-seo">International SEO</SelectItem>
                          <SelectItem value="seo-audit">SEO Audit</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("mainService", { required: c.mainServiceRequired })} />
                      <FieldError message={errors.mainService?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="budget" className="text-sm">{c.budgetLabel} <span className="text-gold">*</span></Label>
                      <Input
                        id="budget"
                        type="number"
                        min={0}
                        placeholder={c.budgetPlaceholder}
                        className="border-border/60 focus:border-gold/60 transition-colors"
                        {...register("budget", { required: c.budgetRequired })}
                      />
                      <FieldError message={errors.budget?.message} />
                    </div>
                  </div>
                  <AnimatePresence>
                    {mainServiceValue === "other" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1.5"
                      >
                        <Label htmlFor="mainServiceOther" className="text-sm">{c.mainServiceOtherLabel}</Label>
                        <Textarea
                          id="mainServiceOther"
                          rows={3}
                          placeholder={c.mainServiceOtherPlaceholder}
                          className="border-border/60 focus:border-gold/60 resize-none"
                          {...register("mainServiceOther")}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FormSection>

                {/* SEO Details */}
                <FormSection icon={TrendingUp} title="SEO Details">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="challenges" className="text-sm">{c.challengesLabel} <span className="text-gold">*</span></Label>
                      <Textarea
                        id="challenges"
                        rows={3}
                        placeholder={c.challengesPlaceholder}
                        className="border-border/60 focus:border-gold/60 resize-none"
                        {...register("challenges", { required: c.challengesRequired })}
                      />
                      <FieldError message={errors.challenges?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="goals" className="text-sm">{c.goalsLabel} <span className="text-gold">*</span></Label>
                      <Textarea
                        id="goals"
                        rows={3}
                        placeholder={c.goalsPlaceholder}
                        className="border-border/60 focus:border-gold/60 resize-none"
                        {...register("goals", { required: c.goalsRequired })}
                      />
                      <FieldError message={errors.goals?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="competitors" className="text-sm">{c.competitorsLabel}</Label>
                      <Input
                        id="competitors"
                        type="text"
                        placeholder={c.competitorsPlaceholder}
                        className="border-border/60 focus:border-gold/60 transition-colors"
                        {...register("competitors")}
                      />
                    </div>
                  </div>
                </FormSection>

                {/* Additional Notes */}
                <FormSection icon={MessageSquare} title="Additional Notes">
                  <div className="space-y-1.5">
                    <Label htmlFor="otherTasks" className="text-sm">{c.otherTasksLabel}</Label>
                    <Textarea
                      id="otherTasks"
                      rows={4}
                      placeholder={c.otherTasksPlaceholder}
                      className="border-border/60 focus:border-gold/60 resize-none"
                      {...register("otherTasks")}
                    />
                  </div>
                </FormSection>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-3 bg-gold hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {c.submitSending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {c.submit}
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
