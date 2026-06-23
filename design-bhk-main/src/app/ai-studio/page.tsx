import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "AI Studio | Coming Soon",
    description: "Our AI Studio is currently under development. Stay tuned for exciting new features.",
};

export default function AIStudioPage() {
    return (
        <div className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-background px-4 py-20">
            {/* Background gradients */}
            <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
            <div className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[100px] rounded-full opacity-50" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
                <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 p-4 ring-1 ring-primary/20 mb-4">
                    <Sparkles className="h-8 w-8 text-primary pt-2" />
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                    AI Studio
                </h1>

                <div className="space-y-4">
                    <p className="text-xl md:text-2xl font-medium text-foreground/80">
                        Coming soon
                    </p>
                    <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                        Sorry for the inconvenience. We are currently building something amazing. Stay tuned for our new AI-powered design tools.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-medium transition-transform hover:scale-105"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
