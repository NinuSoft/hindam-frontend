import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, QrCode, Clock, FileText, MapPin, Smartphone, WifiOff, Printer, Package, Users, Settings, Receipt, CheckCircle, Shield, Lock, Download, ChevronLeft, Sun, Moon, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import howItWorksData from "@/data/howItWorks.json";
import featuresData from "@/data/features.json";
import faqsData from "@/data/faqs.json";
import IntroScreen from "@/components/IntroScreen";

const IconMap: Record<string, React.ComponentType<any>> = {
  QrCode,
  Clock,
  FileText,
  MapPin,
  Smartphone,
  WifiOff,
  Printer,
  Package,
  Users,
  Settings,
  Receipt,
  CheckCircle
};

const getIcon = (name: string, size = 28, className = "") => {
  const IconComponent = IconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} />;
};

const CUSTOMER_APP_URL = "https://play.google.com/store/apps/details?id=com.ninusoft.hindam.customer";
const MANAGER_APP_URL = "https://play.google.com/store/apps/details?id=com.ninusoft.hindam.manager";
const MANAGER_PRIVACY_POLICY_URL = "https://ninusoft.com/apps/hindam-manager/privacy-policy";
const CUSTOMER_PRIVACY_POLICY_URL = "https://ninusoft.com/apps/hindam-customer/privacy-policy";
const FAVICON_VERSION = "1";

const GooglePlayBadge = ({ href = "#" }: { href?: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white px-5 py-2.5 rounded-xl hover:bg-[#017050] transition-colors shadow-md w-full sm:w-auto bg-[#000000]">
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.46 2L15.35 14L18.42 10.9L3.46 2ZM3.46 22L15.35 10L18.42 13.1L3.46 22ZM16.32 15L20.24 12.63C21.25 12.02 21.25 11.98 20.24 11.37L16.32 9L15.5 12L16.32 15ZM3.46 2V22L14.7 12L3.46 2Z" />
    </svg>
    <div className="flex flex-col items-start leading-tight">
      <span className="text-[10px] opacity-90">تحميل من</span>
      <span className="font-bold text-sm">Google Play</span>
    </div>
  </a>
);

interface DownloadCardProps {
  title: string;
  description?: string;
  href: string;
  icon: React.ReactNode;
  variant: "hero" | "footer";
}

const DownloadCard = ({ title, description, href, icon, variant }: DownloadCardProps) => {
  if (variant === "hero") {
    return (
      <div className="flex-1 bg-white/50 dark:bg-card/50 backdrop-blur-sm border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            {icon}
          </div>
          <h3 className="font-bold">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4 h-10">{description}</p>
        <GooglePlayBadge href={href} />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors text-right">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/20 text-primary rounded-lg">
          {icon}
        </div>
        <h3 className="font-bold text-white">{title}</h3>
      </div>
      <div className="flex justify-center mt-6">
        <GooglePlayBadge href={href} />
      </div>
    </div>
  );
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(() => {
    return !!document.getElementById("hd-intro");
  });

  const handleIntroDone = () => {
    sessionStorage.setItem("hd_intro_seen", "1");
    setShowIntro(false);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"customer" | "manager">("customer");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("hero");

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return "light"; // Default to light theme
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    const appleIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement | null;

    if (theme === "dark") {
      root.classList.add("dark");
      if (favicon) favicon.href = `/favicon-dark.png?v=${FAVICON_VERSION}`;
      if (appleIcon) appleIcon.href = `/favicon-dark.png?v=${FAVICON_VERSION}`;
    } else {
      root.classList.remove("dark");
      if (favicon) favicon.href = `/favicon-light.png?v=${FAVICON_VERSION}`;
      if (appleIcon) appleIcon.href = `/favicon-light.png?v=${FAVICON_VERSION}`;
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync the URL hash to whichever section is in view (scroll-spy), and drive
  // active nav-item highlighting. Delayed briefly so it doesn't fight an
  // incoming #anchor deep link's initial native scroll.
  useEffect(() => {
    const ids = ["hero", "ecosystem", "features", "how-it-works", "trust", "faq", "download"];
    const observers: IntersectionObserver[] = [];
    let hashSyncEnabled = false;
    const enableTimer = window.setTimeout(() => { hashSyncEnabled = true; }, 1200);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
            if (!hashSyncEnabled) return;
            const newHash = id === "hero" ? "" : `#${id}`;
            const newUrl = `${window.location.pathname}${window.location.search}${newHash}`;
            if (window.location.hash !== newHash) {
              window.history.replaceState(null, "", newUrl);
            }
          }
        },
        { threshold: 0.3, rootMargin: "-60px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.clearTimeout(enableTimer);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div dir="rtl" className="min-h-[100dvh] bg-background text-foreground overflow-x-clip selection:bg-primary/20 selection:text-primary">
      {/* Animated Intro Screen */}
      <IntroScreen onComplete={handleIntroDone} />

      {/* 1. Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-lg border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="https://ninusoft.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-l from-primary to-primary/60 bg-clip-text text-transparent">NinuSoft</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#hero" className={`text-sm font-medium transition-colors ${activeSection === "hero" ? "text-primary" : "hover:text-primary"}`}>الرئيسية</a>
              <a href="#features" className={`text-sm font-medium transition-colors ${activeSection === "features" ? "text-primary" : "hover:text-primary"}`}>ميزات الزبائن</a>
              <a href="#features" className={`text-sm font-medium transition-colors ${activeSection === "features" ? "text-primary" : "hover:text-primary"}`}>مدير هندام</a>
              <a href="#how-it-works" className={`text-sm font-medium transition-colors ${activeSection === "how-it-works" ? "text-primary" : "hover:text-primary"}`}>كيف يعمل؟</a>
            </div>

            {/* CTA & Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full w-10 h-10 border border-border hover:bg-muted"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-foreground" />}
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                <a href="#download">حمّل الآن</a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-foreground p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4"
          >
            <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className={`text-right text-base font-medium py-2 px-4 rounded-lg ${activeSection === "hero" ? "text-primary bg-muted" : "hover:bg-muted"}`}>الرئيسية</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className={`text-right text-base font-medium py-2 px-4 rounded-lg ${activeSection === "features" ? "text-primary bg-muted" : "hover:bg-muted"}`}>ميزات الزبائن</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className={`text-right text-base font-medium py-2 px-4 rounded-lg ${activeSection === "features" ? "text-primary bg-muted" : "hover:bg-muted"}`}>مدير هندام</a>
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className={`text-right text-base font-medium py-2 px-4 rounded-lg ${activeSection === "how-it-works" ? "text-primary bg-muted" : "hover:bg-muted"}`}>كيف يعمل؟</a>
            <div className="flex items-center justify-between border-t border-border pt-4 mt-2 px-4">
              <span className="text-sm font-medium">المظهر الداكن</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full w-10 h-10 border border-border"
              >
                {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-foreground" />}
              </Button>
            </div>
            <Button asChild className="mt-2 w-full bg-primary text-primary-foreground rounded-xl">
              <a href="#download" onClick={() => setIsMobileMenuOpen(false)}>حمّل الآن</a>
            </Button>
          </motion.div>
        )}
      </nav>
      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-10 pb-16 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Right Column: Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="order-2 lg:order-1 text-center lg:text-right"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                النظام الأذكى في العراق
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-[1.6rem] leading-snug sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-foreground">
                تطبيق هندام: دليلك الذكي لتتبع طلبات الخياطة والغسيل <span className="text-primary relative whitespace-nowrap">
                  <span className="relative z-10">بدون تسجيل دخول!</span>
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                وداعاً لضياع الفواتير أو الاتصال المتكرر لمعرفة حالة ملابسك! نظام بيئي متكامل يربط المشغل بالزبون بلمسة واحدة.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <DownloadCard
                  title="هندام للزبائن"
                  description="للزبون الذي يريد متابعة ملابسه بسهولة."
                  href={CUSTOMER_APP_URL}
                  icon={<Smartphone size={20} />}
                  variant="hero"
                />
                <DownloadCard
                  title="مدير هندام للمشاغل"
                  description="لصاحب المشغل أو المغسلة لإدارة الطلبات."
                  href={MANAGER_APP_URL}
                  icon={<Settings size={20} />}
                  variant="hero"
                />
              </motion.div>
            </motion.div>

            {/* Left Column: Mockups */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] lg:h-[580px] flex items-center justify-center w-full"
            >
              {/* Manager Phone — tilted left, slightly behind */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={{ rotate: -2, scale: 1.03, zIndex: 20 }}
                className="relative z-10 w-[120px] h-[250px] sm:w-[165px] sm:h-[345px] lg:w-[210px] lg:h-[440px] rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl border-[3px] lg:border-[4px] border-slate-900 dark:border-slate-800 overflow-hidden -mr-6 sm:-mr-8 lg:-mr-10 mt-6 sm:mt-9 lg:mt-12 cursor-pointer"
                style={{ boxShadow: "0 30px 60px -12px rgba(0,0,0,0.25), 0 18px 36px -18px rgba(0,0,0,0.3)" }}
              >
                <img
                  src={theme === "dark" ? "/manager-app-dark.png" : "/manager-app-light.png"}
                  alt="مدير هندام"
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </motion.div>

              {/* Customer Phone — straight/slightly right, in front */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 4 }}
                animate={{ opacity: 1, y: 0, rotate: 4 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                whileHover={{ rotate: 0, scale: 1.04, zIndex: 30 }}
                className="relative z-20 w-[130px] h-[270px] sm:w-[180px] sm:h-[378px] lg:w-[230px] lg:h-[480px] rounded-[2rem] lg:rounded-[2.8rem] shadow-2xl border-[3px] lg:border-[4px] border-slate-900 dark:border-slate-800 overflow-hidden -ml-6 sm:-ml-8 lg:-ml-10 -mt-4 sm:-mt-5 lg:-mt-6 cursor-pointer"
                style={{ boxShadow: "0 40px 80px -16px rgba(0,0,0,0.3), 0 20px 40px -20px rgba(0,0,0,0.3)" }}
              >
                <img
                  src={theme === "dark" ? "/customer-app-dark.png" : "/customer-app-light.png"}
                  alt="هندام للزبائن"
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* 3. Ecosystem Overview Section */}
      <section id="ecosystem" className="py-14 md:py-24 bg-muted/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6">نظام بيئي متكامل يربط المشغل بالزبون بلمسة واحدة</h2>
            <p className="text-sm md:text-lg text-muted-foreground mb-10 md:mb-16 max-w-3xl mx-auto">
              نظام هندام يحول طريقة إدارة المشاغل والمغاسل في العراق. المشغل يُنشئ الطلبات ويطبع فواتير احترافية، والزبون يتابع ملابسه باستقلالية تامة.
            </p>
          </motion.div>

          {/* Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative">

            {/* Node 1: Manager */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center z-10"
            >
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                <Settings size={32} />
              </div>
              <h4 className="font-bold">مدير هندام</h4>
              <p className="text-xs text-muted-foreground mt-1">يُنشئ الطلب</p>
            </motion.div>

            {/* Arrow 1 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden md:block w-24 h-0.5 bg-border relative"
            >
              <div className="absolute left-0 -top-1.5 w-3 h-3 border-l-2 border-b-2 border-border transform rotate-45"></div>
            </motion.div>
            <div className="md:hidden h-8 w-0.5 bg-border my-2"></div>

            {/* Node 2: QR */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center z-10"
            >
              <div className="w-20 h-20 bg-white dark:bg-card border-2 border-border rounded-2xl flex items-center justify-center text-foreground dark:text-card-foreground shadow-lg mb-4">
                <QrCode size={32} />
              </div>
              <h4 className="font-bold">فاتورة QR</h4>
              <p className="text-xs text-muted-foreground mt-1">طباعة فورية</p>
            </motion.div>

            {/* Arrow 2 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="hidden md:block w-24 h-0.5 bg-border relative"
            >
              <div className="absolute left-0 -top-1.5 w-3 h-3 border-l-2 border-b-2 border-border transform rotate-45"></div>
            </motion.div>
            <div className="md:hidden h-8 w-0.5 bg-border my-2"></div>

            {/* Node 3: Customer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center z-10"
            >
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                <Smartphone size={32} />
              </div>
              <h4 className="font-bold">هندام للزبائن</h4>
              <p className="text-xs text-muted-foreground mt-1">تتبع الحالة</p>
            </motion.div>

          </div>
        </div>
      </section>
      {/* 4. Feature Showcase */}
      <section id="features" className="py-14 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8 md:mb-16">
            <div className="inline-flex bg-muted rounded-full p-1 border border-border">
              <button
                onClick={() => setActiveTab("customer")}
                className={`relative px-8 py-3 rounded-full text-sm font-bold transition-colors ${activeTab === "customer" ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                {activeTab === "customer" && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary rounded-full shadow-sm" />
                )}
                <span className="relative z-10">هندام للزبائن</span>
              </button>
              <button
                onClick={() => setActiveTab("manager")}
                className={`relative px-8 py-3 rounded-full text-sm font-bold transition-colors ${activeTab === "manager" ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                {activeTab === "manager" && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary rounded-full shadow-sm" />
                )}
                <span className="relative z-10">مدير هندام</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="relative">
            {/* Customer Features */}
            {activeTab === "customer" && (
              <motion.div
                key="customer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {featuresData.customer.map((feat, index) => {
                  const isWide = index === featuresData.customer.length - 1;
                  return (
                    <div
                      key={feat.id}
                      className={`bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow ${isWide ? 'lg:col-span-2' : ''}`}
                    >
                      <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                        {getIcon(feat.iconName, 28)}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{feat.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{feat.description}</p>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Manager Features */}
            {activeTab === "manager" && (
              <motion.div
                key="manager"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {featuresData.manager.map((feat, index) => {
                  const isWide = index === featuresData.manager.length - 1;
                  return (
                    <div
                      key={feat.id}
                      className={`bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow ${isWide ? 'lg:col-span-2' : ''}`}
                    >
                      <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                        {getIcon(feat.iconName, 28)}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{feat.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{feat.description}</p>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>

        </div>
      </section>
      {/* 5. How It Works - Clean Static Steps Layout */}
      <section id="how-it-works" className="py-16 md:py-24 bg-muted/40 dark:bg-[#070c18]/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4">كيف يعمل هندام؟</h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">ثلاث خطوات بسيطة لتتبع أناقتك بسهولة</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8 md:gap-12 mt-12">
            {/* Connecting dashed line for desktop */}
            <div className="hidden md:block absolute top-[44%] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-primary/20 -z-10" />

            {howItWorksData.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="bg-card/60 backdrop-blur-md border border-border p-8 rounded-3xl relative overflow-hidden shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Large Background Step Number */}
                <div className="absolute top-2 left-4 text-6xl font-black text-primary/5 select-none font-mono group-hover:text-primary/10 transition-colors duration-300">
                  0{idx + 1}
                </div>

                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {getIcon(step.iconName, 32)}
                </div>

                <h3 className="font-bold text-xl mb-3 relative z-10">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm relative z-10 max-w-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. Security & Trust */}
      <section id="trust" className="py-14 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-card border border-border p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/70 to-primary/40"></div>
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">خصوصيتك هي أولويتنا المطلقة</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                تطبيق الزبون لا يتطلب أي إنشاء حساب، ولا يطلب كلمات مرور، ولا يجمع أي بيانات شخصية من هاتفك. التطبيق هو مجرد نافذة آمنة للقراءة فقط.
              </p>
            </div>

            <div className="bg-card border border-border p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Lock size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">الأمان والخصوصية أولاً</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                بيانات مشغلك وزبائنك هي ملكك وحدك. نحن نستخدم أحدث تقنيات التشفير السحابية لضمان أمان فواتيرك ومعلومات زبائنك.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6.5. FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4">الأسئلة الشائعة</h2>
            <p className="text-sm md:text-lg text-muted-foreground">كل ما تريد معرفته عن تطبيق ونظام هندام</p>
          </div>

          <div className="space-y-4">
            {faqsData.map((faq, index) => (
              <div key={index} className="border border-border rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-right font-bold text-base md:text-lg hover:text-primary transition-colors focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openFaqIndex === index ? -90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-muted-foreground shrink-0 mr-4"
                  >
                    <ChevronLeft size={20} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaqIndex === index ? "auto" : 0, opacity: openFaqIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/50">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer CTA */}
      <section id="download" className="bg-[#050a15] dark:bg-[#030712] text-white py-20 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight">
            ابدأ التحول الرقمي لمشغلك اليوم!<br />أو تتبع أناقتك الآن.
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-white/70 mb-8 md:mb-12">
            حمّل تطبيق هندام الآن، وابقَ دائماً على استعداد بأناقتك!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <DownloadCard
              title="هندام للزبائن"
              href={CUSTOMER_APP_URL}
              icon={<Smartphone size={20} />}
              variant="footer"
            />
            <DownloadCard
              title="مدير هندام"
              href={MANAGER_APP_URL}
              icon={<Settings size={20} />}
              variant="footer"
            />
          </div>
        </div>

        {/* Legal links */}
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 text-center relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4 text-sm text-white/60">
            <a href={MANAGER_PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              سياسة الخصوصية (مدير هندام)
            </a>
            <a href={CUSTOMER_PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              سياسة الخصوصية (هندام للزبائن)
            </a>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              سياسة الاسترجاع
            </Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">
              الشروط والأحكام
            </Link>
          </div>
          <p className="text-sm text-white/50">
            جميع الحقوق محفوظة &copy; 2026 — تطبيق مقدم من شركة <span className="font-bold text-white/80">NinuSoft</span> للحلول البرمجية
          </p>
        </div>
      </section>
    </div>
  );
}