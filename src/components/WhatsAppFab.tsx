import { COMPANY } from "@/lib/site";
import Icon from "./Icon";

export default function WhatsAppFab({ label }: { label: string }) {
  return (
    <a
      href={COMPANY.whatsappHref}
      target="_blank"
      rel="noopener"
      aria-label={label}
      title={label}
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink-900/20 transition-transform hover:scale-105 md:bottom-8 md:right-8"
    >
      <Icon name="whatsapp" className="h-7 w-7" />
    </a>
  );
}
