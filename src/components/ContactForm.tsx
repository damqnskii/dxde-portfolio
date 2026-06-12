"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Send } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

type ContactResponse = {
  success: boolean;
  message?: string;
};

const projectTypes = [
  "Level design",
  "Commission",
  "Marketplace project",
  "Other",
];

const inputClassName =
  "w-full border border-violet-400/20 bg-[#080713] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#615a6d] focus:border-violet-400/70 focus:bg-violet-500/[0.04] focus:ring-2 focus:ring-violet-500/10";

function getTextValue(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectTypeOpen, setProjectTypeOpen] = useState(false);
  const projectTypeRef = useRef<HTMLDivElement>(null);
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        projectTypeRef.current &&
        !projectTypeRef.current.contains(event.target as Node)
      ) {
        setProjectTypeOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProjectTypeOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const website = getTextValue(formData, "website");

    if (website) {
      setStatus("success");
      form.reset();
      setProjectType("");
      return;
    }

    if (!accessKey) {
      setStatus("error");
      setFeedback("Contact form is not configured. Add the Web3Forms access key.");
      return;
    }

    const name = getTextValue(formData, "name");
    const email = getTextValue(formData, "email");
    const subject = getTextValue(formData, "subject");
    const projectType = getTextValue(formData, "projectType");
    const message = getTextValue(formData, "message");

    if (name.length < 2 || name.length > 80) {
      setStatus("error");
      setFeedback("Name must be between 2 and 80 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    if (subject.length > 120) {
      setStatus("error");
      setFeedback("Subject must be 120 characters or less.");
      return;
    }

    if (projectType.length > 80) {
      setStatus("error");
      setFeedback("Project type must be 80 characters or less.");
      return;
    }

    if (message.length < 10 || message.length > 2000) {
      setStatus("error");
      setFeedback("Message must be between 10 and 2000 characters.");
      return;
    }

    const payload = {
      access_key: accessKey,
      name,
      email,
      subject: subject || `New portfolio inquiry from ${name}`,
      project_type: projectType || "Not specified",
      message,
      from_name: name,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactResponse;

      if (!response.ok || !result.success) {
        setStatus("error");
        setFeedback(result.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setFeedback("Your message was sent successfully.");
      form.reset();
      setProjectType("");
    } catch {
      setStatus("error");
      setFeedback("The message could not be sent. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="font-mono text-xs font-medium uppercase text-[#aaa3b8]"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            className={`${inputClassName} mt-2`}
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="font-mono text-xs font-medium uppercase text-[#aaa3b8]"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            className={`${inputClassName} mt-2`}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="subject"
            className="font-mono text-xs font-medium uppercase text-[#aaa3b8]"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            maxLength={120}
            className={`${inputClassName} mt-2`}
            placeholder="Commission inquiry"
          />
        </div>

        <div>
          <label
            htmlFor="projectType"
            className="font-mono text-xs font-medium uppercase text-[#aaa3b8]"
          >
            Project type
          </label>
          <div ref={projectTypeRef} className="relative mt-2">
            <input type="hidden" name="projectType" value={projectType} />
            <button
              id="projectType"
              type="button"
              className={`${inputClassName} flex items-center justify-between gap-4 text-left ${
                projectType ? "text-white" : "text-[#615a6d]"
              }`}
              aria-haspopup="listbox"
              aria-expanded={projectTypeOpen}
              onClick={() => setProjectTypeOpen((isOpen) => !isOpen)}
            >
              <span>{projectType || "Select one"}</span>
              <ChevronDown
                className={`size-4 shrink-0 text-[#bd68ff] transition ${
                  projectTypeOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {projectTypeOpen && (
              <div
                className="absolute inset-x-0 top-full z-30 mt-1 border border-violet-400/35 bg-[#0d0a1b] p-1 shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
                role="listbox"
                aria-label="Project type"
              >
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    role="option"
                    aria-selected={projectType === type}
                    className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm text-[#b7afc3] transition hover:bg-violet-500/15 hover:text-white"
                    onClick={() => {
                      setProjectType(type);
                      setProjectTypeOpen(false);
                    }}
                  >
                    {type}
                    {projectType === type && (
                      <Check
                        className="size-4 text-[#bd68ff]"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="font-mono text-xs font-medium uppercase text-[#aaa3b8]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={7}
          className={`${inputClassName} mt-2 resize-y`}
          placeholder="Tell me about the project, style, deadline, and anything important."
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 items-center justify-center gap-2 border border-violet-400/70 bg-[linear-gradient(135deg,#7c24d8,#a83df0)] px-6 font-mono text-xs font-semibold uppercase text-white shadow-[0_0_24px_rgba(168,61,240,0.2)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Send inquiry"}
          <Send className="size-4" aria-hidden="true" />
        </button>

        {feedback && (
          <p
            className={`text-sm ${
              status === "success" ? "text-emerald-700" : "text-red-600"
            }`}
            role="status"
          >
            {feedback}
          </p>
        )}
      </div>
    </form>
  );
}
