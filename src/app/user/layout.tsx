import NewHeader from "@/components/new/NewHeader";
import Footer from "@/components/Footer";
import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <NewHeader />
      <div className="pt-16" />
      {children}
      <Footer />
    </Providers>
  );
}
