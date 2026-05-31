import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact | Stoyan Stoyanov",
  description:
    "Send a level design or commission inquiry to Stoyan Stoyanov.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
            Contact
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
            Start a project inquiry.
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Send details about the level design work, commission scope,
            timeline, and any visual references. The form validates your message
            before sending it directly by email.
          </p>

          <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
              Availability
            </p>
            <p className="mt-3 text-lg font-medium text-neutral-950">
              {profile.availability}
            </p>
            <p className="mt-3 leading-7 text-neutral-600">
              Based in {profile.location}. Public work is available on Behance.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
