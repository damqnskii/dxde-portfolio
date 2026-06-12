import type { Metadata } from "next";
import { Gem, MapPin, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { MotionSection } from "@/components/MotionSection";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact | Stoyan Stoyanov",
  description:
    "Send a level design or commission inquiry to Stoyan Stoyanov.",
};

export default function ContactPage() {
  return (
    <main className="px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <MotionSection className="mx-auto grid max-w-[1500px] gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
        <div className="grid content-start gap-5">
          <section className="border border-violet-400/20 bg-[#0a0816]/94 p-7 sm:p-9">
            <p className="flex items-center gap-3 font-mono text-xs uppercase text-[#bd68ff]">
              <Gem className="size-4" aria-hidden="true" />
              Contact
            </p>
            <h1 className="mt-6 font-mono text-4xl font-bold leading-tight text-white sm:text-5xl">
              Let&apos;s build a{" "}
              <span className="text-[#b45cff]">memorable world.</span>
            </h1>
            <p className="mt-6 leading-8 text-[#aaa3b8]">
              Send the project scope, timeline and visual references. I will
              review the details and get back to you by email.
            </p>
          </section>

          <section className="border border-violet-400/20 bg-[#0b0917]/92 p-7">
            <div className="flex items-start gap-4">
              <Sparkles
                className="mt-1 size-5 text-[#bd68ff]"
                aria-hidden="true"
              />
              <div>
                <p className="font-mono text-sm uppercase text-white">
                  Availability
                </p>
                <p className="mt-2 text-[#aaa3b8]">{profile.availability}</p>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-4 border-t border-violet-400/10 pt-6">
              <MapPin
                className="mt-1 size-5 text-[#bd68ff]"
                aria-hidden="true"
              />
              <div>
                <p className="font-mono text-sm uppercase text-white">
                  Location
                </p>
                <p className="mt-2 text-[#aaa3b8]">{profile.location}</p>
              </div>
            </div>
          </section>
        </div>

        <section className="border border-violet-400/20 bg-[#0b0917]/94 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.25)] sm:p-9">
          <h2 className="mb-8 font-mono text-lg font-semibold uppercase text-white">
            Project inquiry
          </h2>
          <ContactForm />
        </section>
      </MotionSection>
    </main>
  );
}
