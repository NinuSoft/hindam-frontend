import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, QrCode, Clock, FileText, MapPin, Smartphone, WifiOff, Printer, Package, Users, Settings, Receipt, CheckCircle, Shield, Lock, Download, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"customer" | "manager">("customer");

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

  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* 1. Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className="text-2xl font-bold bg-gradient-to-l from-primary to-primary/60 bg-clip-text text-transparent">NinuSoft</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollTo("hero")} className="text-sm font-medium hover:text-primary transition-colors">الرئيسية</button>
              <button onClick={() => scrollTo("features")} className="text-sm font-medium hover:text-primary transition-colors">ميزات الزبائن</button>
              <button onClick={() => scrollTo("features")} className="text-sm font-medium hover:text-primary transition-colors">مدير هندام</button>
              <button onClick={() => scrollTo("how-it-works")} className="text-sm font-medium hover:text-primary transition-colors">كيف يعمل؟</button>
            </div>

            {/* CTA */}
            <div className="hidden md:flex">
              <Button onClick={() => scrollTo("hero")} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
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
            <Button onClick={() => scrollTo("hero")} className="mt-2 w-full bg-primary text-primary-foreground rounded-xl">
              حمّل الآن
            </Button>
          </motion.div>
        )}
      </nav>
      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
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
              
              <motion.h1 variants={fadeInUp} className="md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-foreground text-[50px]">
                تطبيق هندام: دليلك الذكي لتتبع طلبات الخياطة والغسيل <span className="text-primary relative whitespace-nowrap">
                  <span className="relative z-10">بدون تسجيل دخول!</span>
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                وداعاً لضياع الفواتير أو الاتصال المتكرر لمعرفة حالة ملابسك! نظام بيئي متكامل يربط المشغل بالزبون بلمسة واحدة.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* Card A */}
                <div className="flex-1 bg-white/50 backdrop-blur-sm border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      <Smartphone size={20} />
                    </div>
                    <h3 className="font-bold">هندام للزبائن</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 h-10">للزبون الذي يريد متابعة ملابسه بسهولة.</p>
                  <GooglePlayBadge />
                </div>

                {/* Card B */}
                <div className="flex-1 bg-white/50 backdrop-blur-sm border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      <Settings size={20} />
                    </div>
                    <h3 className="font-bold">مدير هندام للمشاغل</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 h-10">لصاحب المشغل أو المغسلة لإدارة الطلبات.</p>
                  <GooglePlayBadge />
                </div>
              </motion.div>
            </motion.div>

            {/* Left Column: Mockups */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 relative h-[580px] flex items-center justify-center"
            >
              {/* Glow blobs behind phones */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 bg-[#1C61CA]/10 rounded-full blur-3xl"></div>
              </div>

              {/* Manager Phone — tilted left, slightly behind */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={{ rotate: -2, scale: 1.03, zIndex: 20 }}
                className="relative z-10 w-[210px] h-[440px] rounded-[2.5rem] shadow-2xl border-[6px] border-[#dde5f0] overflow-hidden -mr-10 mt-12 cursor-pointer"
                style={{ boxShadow: "0 30px 60px -12px rgba(28,97,202,0.2), 0 18px 36px -18px rgba(0,0,0,0.15)" }}
              >
                <img
                  src="/manager-app.png"
                  alt="مدير هندام"
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
                {/* Label badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-[#1C61CA] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap border border-[#1C61CA]/10">
                  مدير هندام
                </div>
              </motion.div>

              {/* Customer Phone — straight/slightly right, in front */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 4 }}
                animate={{ opacity: 1, y: 0, rotate: 4 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                whileHover={{ rotate: 0, scale: 1.04, zIndex: 30 }}
                className="relative z-20 w-[230px] h-[480px] rounded-[2.8rem] shadow-2xl border-[6px] border-[#bdd0ef] overflow-hidden -ml-10 -mt-6 cursor-pointer"
                style={{ boxShadow: "0 40px 80px -16px rgba(28,97,202,0.25), 0 20px 40px -20px rgba(0,0,0,0.18)" }}
              >
                <img
                  src="/customer-app.png"
                  alt="هندام للزبائن"
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
                {/* Blue glow ring */}
                <div className="absolute inset-0 rounded-[2.2rem] ring-2 ring-[#1C61CA]/25 pointer-events-none"></div>
                {/* Label badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1C61CA] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                  هندام للزبائن
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* 3. Ecosystem Overview Section */}
      <section id="ecosystem" className="py-24 bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6">نظام بيئي متكامل يربط المشغل بالزبون بلمسة واحدة</h2>
            <p className="text-lg text-muted-foreground mb-16 max-w-3xl mx-auto">
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
              <div className="w-20 h-20 bg-white border-2 border-border rounded-2xl flex items-center justify-center text-foreground shadow-lg mb-4">
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
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tab Switcher */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-muted rounded-full p-1 border border-border">
              <button 
                onClick={() => setActiveTab("customer")}
                className={`relative px-8 py-3 rounded-full text-sm font-bold transition-colors ${activeTab === "customer" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {activeTab === "customer" && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm" />
                )}
                <span className="relative z-10">هندام للزبائن</span>
              </button>
              <button 
                onClick={() => setActiveTab("manager")}
                className={`relative px-8 py-3 rounded-full text-sm font-bold transition-colors ${activeTab === "manager" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {activeTab === "manager" && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm" />
                )}
                <span className="relative z-10">مدير هندام</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="relative min-h-[500px]">
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
                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <QrCode size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">مسح ذكي وسريع</h3>
                  <p className="text-muted-foreground leading-relaxed">وجه كاميرا هاتفك نحو رمز الاستجابة السريعة على فاتورتك للوصول الفوري إلى طلبك، أو أدخل رقم الطلب يدوياً.</p>
                </div>

                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <Clock size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">تتبع لحظي للحالة</h3>
                  <p className="text-muted-foreground leading-relaxed">تعرف على حالة ملابسك فوراً: قيد التنفيذ، جاهز للاستلام، أو مُسلّم — لتوفر على نفسك عناء الانتظار.</p>
                </div>

                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <FileText size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">تفاصيل الفاتورة الشاملة</h3>
                  <p className="text-muted-foreground leading-relaxed">راجع كل تفاصيل طلبك بشفافية تامة: نوع الخدمات، الكمية، الأسعار، المبالغ المدفوعة، والمبلغ المتبقي.</p>
                </div>

                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <MapPin size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">معلومات المشغل</h3>
                  <p className="text-muted-foreground leading-relaxed">وصول سريع لاسم المشغل، رقم التواصل، وموقعه الجغرافي لتسهيل عملية استلام طلبك عندما يكون جاهزاً.</p>
                </div>

                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <Smartphone size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">واجهة ذكية وأنيقة</h3>
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
                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <WifiOff size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">يعمل بدون إنترنت (Offline-First)</h3>
                  <p className="text-muted-foreground leading-relaxed">انقطع الإنترنت؟ لا مشكلة! استمر في إضافة الزبائن وإنشاء الطلبات. التطبيق يزامن البيانات فور عودة الاتصال.</p>
                </div>

                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <Printer size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">طباعة الفواتير الحرارية</h3>
                  <p className="text-muted-foreground leading-relaxed">يدعم الاقتران السريع بطابعات البلوتوث لطباعة فواتير أنيقة تحتوي على تفاصيل الطلب ورمز QR فريد.</p>
                </div>

                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <Package size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">إدارة مرنة للطلبات</h3>
                  <p className="text-muted-foreground leading-relaxed">غيّر حالة الطلب بلمسة واحدة: قيد التنفيذ — جاهز — مُسلّم. إدارة سلسة وبصرية.</p>
                </div>

                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <Users size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">قاعدة بيانات زبائنك</h3>
                  <p className="text-muted-foreground leading-relaxed">احتفظ بسجل منظم لعملائك يشمل أرقام هواتفهم، قياساتهم المفصلة، وتاريخ طلباتهم السابقة.</p>
                </div>

                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <Settings size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">تخصيص كامل لمشغلك</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">من خلال معالج الإعداد الذكي، خصّص التطبيق ليعرض أدوات الخياطة فقط، المغسلة، أو كليهما معاً.</p>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </section>
      {/* 5. How It Works */}
      <section id="how-it-works" className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">كيف يعمل هندام؟</h2>
            <p className="text-lg text-muted-foreground">ثلاث خطوات بسيطة فقط لتتبع أناقتك</p>
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
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-primary/10 mb-6 relative group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">1</div>
                <Receipt size={36} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">استلم فاتورتك</h3>
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
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-primary/10 mb-6 relative group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">2</div>
                <QrCode size={36} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">امسح رمز الـ QR</h3>
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
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-primary/10 mb-6 relative group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">3</div>
                <CheckCircle size={36} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">تابع وانتظر الجاهزية</h3>
              <p className="text-muted-foreground">تابع حالة ملابسك، وتوجه لاستلامها فور ظهور حالة جاهز للاستلام.</p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* 6. Security & Trust */}
      <section id="trust" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="bg-card border border-border p-10 rounded-3xl shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/70 to-primary/40"></div>
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">خصوصيتك هي أولويتنا المطلقة</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                تطبيق الزبون لا يتطلب أي إنشاء حساب، ولا يطلب كلمات مرور، ولا يجمع أي بيانات شخصية من هاتفك. التطبيق هو مجرد نافذة آمنة للقراءة فقط.
              </p>
            </div>

            <div className="bg-card border border-border p-10 rounded-3xl shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Lock size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">الأمان والخصوصية أولاً</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                بيانات مشغلك وزبائنك هي ملكك وحدك. نحن نستخدم أحدث تقنيات التشفير السحابية لضمان أمان فواتيرك ومعلومات زبائنك.
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* 7. Footer CTA */}
      <section className="bg-foreground text-background py-20 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            ابدأ التحول الرقمي لمشغلك اليوم!<br/>أو تتبع أناقتك الآن.
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-12">
            حمّل تطبيق هندام الآن، وابقَ دائماً على استعداد بأناقتك!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            {/* Card A */}
            <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors text-right">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 text-primary rounded-lg">
                  <Smartphone size={20} />
                </div>
                <h3 className="font-bold text-white">هندام للزبائن</h3>
              </div>
              <div className="flex justify-center mt-6">
                <GooglePlayBadge />
              </div>
            </div>

            {/* Card B */}
            <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors text-right">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 text-primary-foreground rounded-lg">
                  <Settings size={20} />
                </div>
                <h3 className="font-bold text-white">مدير هندام</h3>
              </div>
              <div className="flex justify-center mt-6">
                <GooglePlayBadge />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 text-center relative z-10">
          <p className="text-sm text-white/50">
            جميع الحقوق محفوظة &copy; 2024 — تطبيق مقدم من شركة <span className="font-bold text-white/80">NinuSoft</span> للحلول البرمجية
          </p>
        </div>
      </section>
    </div>
  );
}