import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import DismissIntro from "@/components/DismissIntro";
import type { ReactNode } from "react";

const PRIVACY_POLICY_URL = "https://ninusoft.com/apps/hindam-manager/privacy-policy";

interface LegalLayoutProps {
  title: string;
  updatedAt: string;
  children: ReactNode;
}

export default function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
  return (
    <div dir="rtl" className="min-h-[100dvh] bg-background text-foreground">
      <DismissIntro />
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <img src="/logo_light.webp" alt="هندام" className="h-8 w-auto block dark:hidden" />
            <img src="/logo_dark.webp" alt="هندام" className="h-8 w-auto hidden dark:block" />
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            العودة للرئيسية
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground mb-8">آخر تحديث: {updatedAt}</p>
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary">
          {children}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span>روابط ذات صلة:</span>
          <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            سياسة الخصوصية
          </a>
          <Link href="/refund-policy" className="hover:text-foreground transition-colors">
            سياسة الاسترجاع
          </Link>
          <Link href="/terms-conditions" className="hover:text-foreground transition-colors">
            الشروط والأحكام
          </Link>
        </div>
      </main>
    </div>
  );
}
