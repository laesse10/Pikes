import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Public pages are prerendered: their content is static, and the only runtime
// data (game scores) is read through a tagged cache. saveResults() calls
// revalidatePath/revalidateTag, so a new result goes live right after saving
// without rendering every page on every request.

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
