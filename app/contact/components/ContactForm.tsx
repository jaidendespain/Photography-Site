"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { submitContactForm } from "../actions";

interface FormState {
  message?: string;
  error?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, {});
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-1">
          Captcha: What is 2 + 3?
        </label>
        <input
          type="text"
          id="captcha"
          name="captcha"
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      {state.error && (
        <div className="text-red-600 text-sm">{state.error}</div>
      )}

      {state.message && (
        <div className="text-green-600 text-sm">{state.message}</div>
      )}

      <SubmitButton />
    </form>
  );
} 