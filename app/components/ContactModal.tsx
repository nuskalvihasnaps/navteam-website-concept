"use client";

import {
  createContext,
  type FormEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { serviceCapabilities } from "../lib/site";

type ContactOptions = {
  source: string;
  defaultInquiry?: string;
  defaultPort?: string;
};

type ContactModalContextValue = {
  openContact: (options: ContactOptions) => void;
  closeContact: () => void;
};

type ContactTriggerProps = ContactOptions & {
  label: string;
  className?: string;
};

type ContactErrors = Partial<
  Record<"name" | "company" | "email" | "enquiry" | "message", string>
>;

const ContactModalContext = createContext<ContactModalContextValue | null>(
  null,
);

const enquiryOptions = [
  ...serviceCapabilities.map((service) => service.title),
  "Other",
];

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(0);
  const [options, setOptions] = useState<ContactOptions>({
    source: "NAVTEAM website",
  });
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const closeContact = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => previousFocusRef.current?.focus());
  }, []);

  const openContact = useCallback((nextOptions: ContactOptions) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setOptions(nextOptions);
    setSession((current) => current + 1);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeContact();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>("input")?.focus();
    });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeContact, isOpen]);

  return (
    <ContactModalContext.Provider value={{ openContact, closeContact }}>
      {children}
      {isOpen ? (
        <div
          className="contact-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeContact();
          }}
        >
          <div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            ref={dialogRef}
          >
            <ContactForm
              key={session}
              options={options}
              closeContact={closeContact}
            />
          </div>
        </div>
      ) : null}
    </ContactModalContext.Provider>
  );
}

export function ContactTrigger({
  label,
  className,
  source,
  defaultInquiry,
  defaultPort,
}: ContactTriggerProps) {
  const context = useContactModal();

  return (
    <button
      className={className}
      type="button"
      onClick={() =>
        context.openContact({ source, defaultInquiry, defaultPort })
      }
    >
      {label}
    </button>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);

  if (!context) {
    throw new Error(
      "useContactModal must be used inside ContactModalProvider.",
    );
  }

  return context;
}

function ContactForm({
  options,
  closeContact,
}: {
  options: ContactOptions;
  closeContact: () => void;
}) {
  const [errors, setErrors] = useState<ContactErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const imo = String(formData.get("imo") ?? "").trim();
    const port = String(formData.get("port") ?? "").trim();
    const enquiry = String(formData.get("enquiry") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const nextErrors: ContactErrors = {};

    if (!name) nextErrors.name = "Please enter your name.";
    if (!company) nextErrors.company = "Please enter your company.";
    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!enquiry) nextErrors.enquiry = "Please select an enquiry type.";
    if (!message) nextErrors.message = "Please enter a message.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => {
        form
          .querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      });
      return;
    }

    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      imo ? `IMO number: ${imo}` : null,
      port ? `Port of call: ${port}` : null,
      `Enquiry type: ${enquiry}`,
      `Source: ${options.source}`,
      "",
      "Message:",
      message,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    const mailto = `mailto:navteam@navteam.com?subject=${encodeURIComponent(
      `Website enquiry – ${enquiry}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <>
      <div className="contact-modal-header">
        <div>
          <h2 id="contact-modal-title">How can we help?</h2>
          <p>
            Share the essential details and we will connect you with the right
            team.
          </p>
        </div>
        <button
          className="contact-modal-close"
          type="button"
          aria-label="Close contact form"
          onClick={closeContact}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <form className="contact-modal-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-field-grid">
          <ContactField
            id="contact-name"
            label="Name"
            name="name"
            required
            error={errors.name}
          />
          <ContactField
            id="contact-company"
            label="Company"
            name="company"
            required
            error={errors.company}
          />
          <ContactField
            id="contact-email"
            label="Email"
            name="email"
            type="email"
            required
            error={errors.email}
          />
          <ContactField
            id="contact-phone"
            label="Phone"
            name="phone"
            type="tel"
          />
          <ContactField
            id="contact-imo"
            label="IMO number"
            name="imo"
            inputMode="numeric"
          />
          <ContactField
            id="contact-port"
            label="Port of call"
            name="port"
            defaultValue={options.defaultPort}
          />
        </div>

        <label className="contact-field" htmlFor="contact-enquiry">
          <span>
            Enquiry type <b aria-hidden="true">*</b>
          </span>
          <select
            id="contact-enquiry"
            name="enquiry"
            defaultValue={options.defaultInquiry ?? ""}
            required
            aria-invalid={Boolean(errors.enquiry)}
            aria-describedby={
              errors.enquiry ? "contact-enquiry-error" : undefined
            }
          >
            <option value="" disabled>
              Select enquiry type
            </option>
            {enquiryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.enquiry ? (
            <small className="contact-field-error" id="contact-enquiry-error">
              {errors.enquiry}
            </small>
          ) : null}
        </label>

        <label className="contact-field" htmlFor="contact-message">
          <span>
            Message <b aria-hidden="true">*</b>
          </span>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
          />
          {errors.message ? (
            <small className="contact-field-error" id="contact-message-error">
              {errors.message}
            </small>
          ) : null}
        </label>

        <div className="contact-modal-footer">
          <p>
            Preparing this enquiry will open your email application. You can
            review everything before sending.
          </p>
          <button className="contact-modal-submit" type="submit">
            Prepare email <span aria-hidden="true">↗</span>
          </button>
        </div>
      </form>
    </>
  );
}

function ContactField({
  id,
  label,
  name,
  type = "text",
  inputMode,
  required = false,
  defaultValue,
  error,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  inputMode?: "numeric";
  required?: boolean;
  defaultValue?: string;
  error?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <label className="contact-field" htmlFor={id}>
      <span>
        {label} {required ? <b aria-hidden="true">*</b> : null}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <small className="contact-field-error" id={errorId}>
          {error}
        </small>
      ) : null}
    </label>
  );
}
