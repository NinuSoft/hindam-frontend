import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DismissIntro from "@/components/DismissIntro";
import { CheckCircle2, ExternalLink } from "lucide-react";

const MANAGER_APP_URL = "https://play.google.com/store/apps/details?id=com.ninusoft.hindam.manager";
const INTENT_URL = "intent://hindam.ninusoft.com/payment-complete#Intent;scheme=https;package=com.ninusoft.hindam.manager;end";

export default function PaymentComplete() {
  const [countdown, setCountdown] = useState(5);

  const redirectToApp = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (isAndroid) {
      window.location.href = INTENT_URL;
    } else {
      window.location.href = MANAGER_APP_URL;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          redirectToApp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div dir="rtl" className="min-h-[100dvh] w-full flex items-center justify-center bg-background text-foreground px-4">
      <DismissIntro />
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardContent className="pt-8 pb-8 flex flex-col items-center text-center gap-5">
          <div className="rounded-full bg-emerald-500/10 p-3 text-emerald-500">
            <CheckCircle2 className="h-16 w-16" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">تمت عملية الدفع بنجاح</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              تم تأكيد عملية الدفع. يمكنك الآن العودة إلى تطبيق مدير هِندام لمتابعة تفعيل اشتراكك.
            </p>
          </div>

          <div className="w-full bg-muted/50 rounded-xl p-4 flex flex-col items-center gap-2 border border-border/50">
            <span className="text-xs text-muted-foreground font-medium">
              سيتم التحويل التلقائي خلال
            </span>
            <div className="text-3xl font-extrabold text-primary font-mono">
              {countdown}
            </div>
            <span className="text-xs text-muted-foreground">ثوانٍ</span>
          </div>

          <Button
            onClick={redirectToApp}
            className="w-full gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 shadow-md"
          >
            <span>الفتح في تطبيق مدير هندام</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

