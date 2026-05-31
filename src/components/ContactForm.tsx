"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

type ContactResponse = {
  success: boolean;
  message?: string;
};

const inputClassName =
  "w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-4 focus:ring-neutral-950/5";

function getTextValue(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

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
            className="text-sm font-medium text-neutral-700"
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
            className="text-sm font-medium text-neutral-700"
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
            className="text-sm font-medium text-neutral-700"
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
            className="text-sm font-medium text-neutral-700"
          >
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            className={`${inputClassName} mt-2`}
            defaultValue=""
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="Level design">Level design</option>
            <option value="Commission">Commission</option>
            <option value="Marketplace project">Marketplace project</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-sm font-medium text-neutral-700"
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
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
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
