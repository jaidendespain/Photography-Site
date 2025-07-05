"use server";

interface FormState {
  message?: string;
  error?: string;
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || "Failed to send message" };
    }

    return { message: "Message sent successfully!" };
  } catch {
    return { error: "Failed to send message" };
  }
} 