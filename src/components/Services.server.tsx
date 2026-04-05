import { Instagram, HeadphonesIcon, FolderKanban, TrendingUp } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { fetchServicesData } from "@/lib/data-fetching";
import { SPACING } from "@/lib/constants";
import { Service } from "@/lib/api";

const iconMap: Record<string, any> = {
  Instagram,
  HeadphonesIcon,
  FolderKanban,
  TrendingUp,
};

const sectionCopy = {
  en: {
    badge: "Services",
    heading: "Our Services",
    description: "Comprehensive virtual assistant solutions tailored to your business needs. From administrative tasks to specialized support, we've got you covered.",
  },
  ge: {
    badge: "Dienstleistungen",
    heading: "Unsere Dienstleistungen",
    description: "Umfassende virtuelle Assistenzlösungen, die auf Ihre Geschäftsbedürfnisse zugeschnitten sind. Von administrativen Aufgaben bis hin zu spezialisierten Dienstleistungen.",
  },
};

// Server Component - fetches data on server
export async function Services({ lang }: { lang: string }) {
  // Fetch data on server-side
  const services = await fetchServicesData(lang);
  const copy = sectionCopy[lang as keyof typeof sectionCopy] || sectionCopy.en;

  if (!services || services.length === 0) {
    return (
      <section id="services" className="relative py-8 sm:py-10 md:py-14 lg:py-16 bg-background text-foreground z-30 overflow-hidden min-h-[500px]">
        <div className={`container mx-auto ${SPACING.container}`}>
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              {lang === "ge" ? "Keine Dienstleistungen verfügbar." : "No services available."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="services"
      className="relative py-8 sm:py-10 md:py-14 lg:py-16 bg-background text-foreground z-30 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/5 rounded-full blur-[100px] md:blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gold/10 rounded-full blur-[100px] md:blur-[150px]" />

      <div className={`container mx-auto ${SPACING.container} relative z-10`}>
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gold text-foreground text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4 shadow-md">
            {copy.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">
            {copy.heading}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {copy.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || LucideIcons.HelpCircle;
            
            return (
              <div
                key={service._id || index}
                className="group relative bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:bg-gradient-to-br hover:from-card hover:to-primary/5"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                    {service.benefit}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gold" />
                      </div>
                      <span className="text-xs sm:text-sm text-foreground leading-relaxed">{service.benefit}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
