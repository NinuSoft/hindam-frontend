import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, QrCode, Clock, FileText, MapPin, Smartphone, WifiOff, Printer, Package, Users, Settings, Receipt, CheckCircle, Shield, Lock, Download, ChevronLeft, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const CUSTOMER_APP_URL = "https://play.google.com/store/apps/details?id=com.ninusoft.hindam.customer";
const MANAGER_APP_URL = "https://play.google.com/store/apps/details?id=com.ninusoft.hindam.manager";

const GooglePlayBadge = ({ href = "#" }: { href?: string }) => (
  <a href={href} className="inline-flex items-center gap-3 text-white px-5 py-2.5 rounded-xl hover:bg-[#017050] transition-colors shadow-md w-full sm:w-auto bg-[#000000]">
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

const faqs = [
  {
    question: "هل يتطلب تطبيق الزبون تسجيل دخول أو إنشاء حساب؟",
    answer: "لا، تطبيق هندام للزبائن مصمم ليوفر أقصى درجات الخصوصية والسهولة. يمكنك تتبع طلباتك مباشرة عن طريق مسح رمز QR الموجود على الفاتورة دون الحاجة لإدخال أي معلومات شخصية، رقم هاتف، أو كلمة مرور."
  },
  {
    question: "كيف يمكنني كمشغل أو مغسلة استخدام نظام هندام؟",
    answer: "يمكنك تحميل تطبيق \"مدير هندام للمشاغل\" من متجر Google Play، وإكمال إعداد حساب مشغلك خلال دقيقة واحدة لتتمكن بعدها من إضافة الطلبات، طباعة فواتير الـ QR، وإدارة عملائك بكل سلاسة."
  },
  {
    question: "هل يعمل تطبيق مدير هندام بدون توفر اتصال بالإنترنت؟",
    answer: "نعم! يدعم تطبيق المدير العمل بنظام Offline-First بالكامل. يمكنك تسجيل الزبائن، إضافة القياسات، وإنشاء الطلبات دون إنترنت، وسيقوم التطبيق بمزامنة كافة البيانات تلقائياً بمجرد عودة الاتصال."
  },
  {
    question: "كيف يمكنني ربط طابعة الفواتير الحرارية بالتطبيق؟",
    answer: "يدعم تطبيق مدير هندام الاقتران المباشر عبر البلوتوث (Bluetooth) مع مختلف الطابعات الحرارية المحمولة والمكتبية (مقاس 58 ملم و 80 ملم) لطباعة إيصالات احترافية تحتوي على رمز QR الخاص بالطلب."
  },
  {
    question: "ما هي التكلفة المترتبة على استخدام نظام هندام؟",
    answer: "تطبيق هندام للزبائن مجاني تماماً بنسبة 100%. أما بالنسبة لأصحاب المشاغل والمغاسل، فإن تطبيق \"مدير هندام\" يوفر باقات اشتراك مرنة واقتصادية تناسب جميع أحجام الأعمال مع فترة تجريبية مجانية بالكامل للبدء."
  }
];
export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"customer" | "manager">("customer");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-clip selection:bg-primary/20 selection:text-primary">

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
              <button onClick={() => scrollTo("hero")} className="text-sm font-medium hover:text-primary transition-colors">الرئيسية</button>
              <button onClick={() => scrollTo("features")} className="text-sm font-medium hover:text-primary transition-colors">ميزات الزبائن</button>
              <button onClick={() => scrollTo("features")} className="text-sm font-medium hover:text-primary transition-colors">مدير هندام</button>
              <button onClick={() => scrollTo("how-it-works")} className="text-sm font-medium hover:text-primary transition-colors">كيف يعمل؟</button>
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
              <Button onClick={() => scrollTo("download")} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                حمّل الآن
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
            <button onClick={() => scrollTo("hero")} className="text-right text-base font-medium py-2 px-4 hover:bg-muted rounded-lg">الرئيسية</button>
            <button onClick={() => scrollTo("features")} className="text-right text-base font-medium py-2 px-4 hover:bg-muted rounded-lg">ميزات الزبائن</button>
            <button onClick={() => scrollTo("features")} className="text-right text-base font-medium py-2 px-4 hover:bg-muted rounded-lg">مدير هندام</button>
            <button onClick={() => scrollTo("how-it-works")} className="text-right text-base font-medium py-2 px-4 hover:bg-muted rounded-lg">كيف يعمل؟</button>
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
            <Button onClick={() => scrollTo("download")} className="mt-2 w-full bg-primary text-primary-foreground rounded-xl">
              حمّل الآن
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
              {/* Glow blobs behind phones */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-primary/10 rounded-full blur-3xl"></div>
              </div>

              {/* Manager Phone — tilted left, slightly behind */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={{ rotate: -2, scale: 1.03, zIndex: 20 }}
                className="relative z-10 w-[120px] h-[250px] sm:w-[165px] sm:h-[345px] lg:w-[210px] lg:h-[440px] rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl border-[3px] lg:border-[4px] border-slate-900 dark:border-slate-800 overflow-hidden -mr-6 sm:-mr-8 lg:-mr-10 mt-6 sm:mt-9 lg:mt-12 cursor-pointer"
                style={{ boxShadow: "0 30px 60px -12px rgba(28,97,202,0.15), 0 18px 36px -18px rgba(0,0,0,0.2)" }}
              >
                <img
                  src="/manager-app.png"
                  alt="مدير هندام"
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
                {/* Glass shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none z-30"></div>
              </motion.div>

              {/* Customer Phone — straight/slightly right, in front */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 4 }}
                animate={{ opacity: 1, y: 0, rotate: 4 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                whileHover={{ rotate: 0, scale: 1.04, zIndex: 30 }}
                className="relative z-20 w-[130px] h-[270px] sm:w-[180px] sm:h-[378px] lg:w-[230px] lg:h-[480px] rounded-[2rem] lg:rounded-[2.8rem] shadow-2xl border-[3px] lg:border-[4px] border-slate-900 dark:border-slate-800 overflow-hidden -ml-6 sm:-ml-8 lg:-ml-10 -mt-4 sm:-mt-5 lg:-mt-6 cursor-pointer"
                style={{ boxShadow: "0 40px 80px -16px rgba(28,97,202,0.2), 0 20px 40px -20px rgba(0,0,0,0.22)" }}
              >
                <img
                  src="/customer-app.png"
                  alt="هندام للزبائن"
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
                {/* Glass shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none z-30"></div>
                {/* Blue glow ring */}
                <div className="absolute inset-0 rounded-[1.8rem] ring-2 ring-[#1C61CA]/10 pointer-events-none"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* 3. Ecosystem Overview Section */}
      <section id="ecosystem" className="py-14 md:py-24 bg-muted/30 border-y border-border">
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
                <div className="bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <QrCode size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">مسح ذكي وسريع</h3>
                  <p className="text-muted-foreground leading-relaxed">وجه كاميرا هاتفك نحو رمز الاستجابة السريعة على فاتورتك للوصول الفوري إلى طلبك، أو أدخل رقم الطلب يدوياً.</p>
                </div>

                <div className="bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <Clock size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">تتبع لحظي للحالة</h3>
                  <p className="text-muted-foreground leading-relaxed">تعرف على حالة ملابسك فوراً: قيد التنفيذ، جاهز للاستلام، أو مُسلّم — لتوفر على نفسك عناء الانتظار.</p>
                </div>

                <div className="bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <FileText size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">تفاصيل الفاتورة الشاملة</h3>
                  <p className="text-muted-foreground leading-relaxed">راجع كل تفاصيل طلبك بشفافية تامة: نوع الخدمات، الكمية، الأسعار، المبالغ المدفوعة، والمبلغ المتبقي.</p>
                </div>

                <div className="bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <MapPin size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">معلومات المشغل</h3>
                  <p className="text-muted-foreground leading-relaxed">وصول سريع لاسم المشغل، رقم التواصل، وموقعه الجغرافي لتسهيل عملية استلام طلبك عندما يكون جاهزاً.</p>
                </div>

                <div className="bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <Smartphone size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">واجهة ذكية وأنيقة</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">تصميم مريح للعين يتفاعل مع حالة طلبك، ويعرض لك الإشعارات المهمة عندما تكون ملابسك جاهزة.</p>
                </div>
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
                <div className="bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <WifiOff size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">يعمل بدون إنترنت (Offline-First)</h3>
                  <p className="text-muted-foreground leading-relaxed">انقطع الإنترنت؟ لا مشكلة! استمر في إضافة الزبائن وإنشاء الطلبات. التطبيق يزامن البيانات فور عودة الاتصال.</p>
                </div>

                <div className="bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <Printer size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">طباعة الفواتير الحرارية</h3>
                  <p className="text-muted-foreground leading-relaxed">يدعم الاقتران السريع بطابعات البلوتوث لطباعة فواتير أنيقة تحتوي على تفاصيل الطلب ورمز QR فريد.</p>
                </div>

                <div className="bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <Package size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">إدارة مرنة للطلبات</h3>
                  <p className="text-muted-foreground leading-relaxed">غيّر حالة الطلب بلمسة واحدة: قيد التنفيذ — جاهز — مُسلّم. إدارة سلسة وبصرية.</p>
                </div>

                <div className="bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <Users size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">قاعدة بيانات زبائنك</h3>
                  <p className="text-muted-foreground leading-relaxed">احتفظ بسجل منظم لعملائك يشمل أرقام هواتفهم، قياساتهم المفصلة، وتاريخ طلباتهم السابقة.</p>
                </div>

                <div className="bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <Settings size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">تخصيص كامل لمشغلك</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">من خلال معالج الإعداد الذكي، خصّص التطبيق ليعرض أدوات الخياطة فقط، المغسلة، أو كليهما معاً.</p>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </section>
      {/* 5. How It Works */}
      <section id="how-it-works" className="py-14 md:py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4">كيف يعمل هندام؟</h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">ثلاث خطوات بسيطة فقط لتتبع أناقتك</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-primary/30 z-0"></div>

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center flex-1 relative z-10 mb-12 md:mb-0 px-4"
            >
              <div className="w-24 h-24 bg-white dark:bg-card rounded-full flex items-center justify-center shadow-lg border-4 border-primary/10 dark:border-primary/20 mb-6 relative group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">1</div>
                <Receipt size={36} className="text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">استلم فاتورتك</h3>
              <p className="text-muted-foreground">استلم فاتورتك من المشغل أو المغسلة التي تستخدم نظام هندام للإدارة.</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center flex-1 relative z-10 mb-12 md:mb-0 px-4"
            >
              <div className="w-24 h-24 bg-white dark:bg-card rounded-full flex items-center justify-center shadow-lg border-4 border-primary/10 dark:border-primary/20 mb-6 relative group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">2</div>
                <QrCode size={36} className="text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">امسح رمز الـ QR</h3>
              <p className="text-muted-foreground">افتح التطبيق وقم بمسح رمز الـ QR الموجود على الفاتورة.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center text-center flex-1 relative z-10 px-4"
            >
              <div className="w-24 h-24 bg-white dark:bg-card rounded-full flex items-center justify-center shadow-lg border-4 border-primary/10 dark:border-primary/20 mb-6 relative group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">3</div>
                <CheckCircle size={36} className="text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">تابع وانتظر الجاهزية</h3>
              <p className="text-muted-foreground">تابع حالة ملابسك، وتوجه لاستلامها فور ظهور حالة جاهز للاستلام.</p>
            </motion.div>
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
            {faqs.map((faq, index) => (
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

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 text-center relative z-10">
          <p className="text-sm text-white/50">
            جميع الحقوق محفوظة &copy; 2026 — تطبيق مقدم من شركة <span className="font-bold text-white/80">NinuSoft</span> للحلول البرمجية
          </p>
        </div>
      </section>
    </div>
  );
}