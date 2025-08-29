"use client";
import { useMemo, useState } from "react";
import { SignIn, useUser, UserButton } from "@stackframe/stack";

export default function AdminPage() {
  const user = useUser();
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  type Form = {
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    department: string;
    phone: string;
    location: string;
    imageUrl: string;
  };
  const [form, setForm] = useState<Form>({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    department: "",
    phone: "",
    location: "",
    imageUrl: "",
  });


  const canSubmit = useMemo(() => {
    return (
      !!form.firstName &&
      !!form.lastName &&
      !!form.email &&
      !!form.title &&
      !!form.department
    );
  }, [form]);

  const submit = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data: unknown = await res.json();
      if (!res.ok) {
        const msg = (data as { error?: string } | null)?.error ?? "Failed";
        throw new Error(msg);
      }
      setMsg("Employee created");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        department: "",
        phone: "",
        location: "",
        imageUrl: "",
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error";
      setMsg(message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <SignIn />;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
  <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add employee</h1>
        <UserButton />
      </div>
  <div className="text-sm text-gray-600">Signed in as {user.displayName || user.primaryEmail || "User"}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(
          [
            ["firstName", "First name"],
            ["lastName", "Last name"],
            ["email", "Email"],
            ["title", "Job title"],
            ["department", "Department"],
            ["phone", "Phone (optional)"],
            ["location", "Location (optional)"],
            ["imageUrl", "Image URL (optional)"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="space-y-1">
            <div className="text-sm text-gray-700">{label}</div>
            <input
              className="w-full border rounded px-3 py-2"
              value={form[key as keyof Form]}
              onChange={(e) =>
                setForm((f) => ({ ...f, [key]: e.target.value } as Form))
              }
            />
          </label>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
          disabled={!canSubmit || saving}
          onClick={submit}
        >
          {saving ? "Saving..." : "Create"}
        </button>
        {msg && <span className="text-sm">{msg}</span>}
      </div>
    </div>
  );
}
