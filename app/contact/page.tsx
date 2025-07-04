import { ContactForm } from "./components/ContactForm";

export default function ContactPage() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md p-8 rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Contact</h1>
          <ContactForm />
        </div>
      </div>
    </section>
  );
} 