import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function PaymentComplete() {
  return (
    <div dir="rtl" className="min-h-[100dvh] w-full flex items-center justify-center bg-background text-foreground px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 flex flex-col items-center text-center gap-4">
          <CheckCircle2 className="h-12 w-12 text-primary" />
          <h1 className="text-xl font-bold">تمت عملية الدفع</h1>
          <p className="text-sm text-muted-foreground">
            يمكنك الآن العودة إلى تطبيق هِندام لمتابعة تفعيل اشتراكك.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
