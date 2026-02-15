"use client";

import React from "react"

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${STRAPI_URL}/api/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data: { email } }),
      });

      // Try to parse JSON, but handle non-JSON responses
      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || `Server error: ${res.status} ${res.statusText}`);
      }

      if (!res.ok) {
        throw new Error(
          data.error?.message || data.message || `Failed to subscribe: ${res.statusText}`
        );
      }

      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl bg-primary p-10 md:p-16 lg:p-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary-foreground/60">
              Stay Connected
            </p>
            <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl text-balance">
              Get the Latest from Our Community
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
              Weekly insights, event announcements, job opportunities, and
              member stories delivered straight to your inbox.
            </p>

            {submitted ? (
              <div className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-primary-foreground/10 p-6">
                <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                <p className="text-base font-medium text-primary-foreground">
                  Welcome aboard! Check your inbox to confirm.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center w-full sm:w-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    required
                    disabled={loading}
                    className="h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30 sm:max-w-sm"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50"
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                    {!loading && <Send className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
                {error && (
                  <div className="mt-2 flex items-center justify-center gap-2 text-sm text-primary-foreground/80">
                    <AlertCircle className="h-4 w-4" />
                    <p>{error}</p>
                  </div>
                )}
              </form>
            )}

            <p className="mt-4 text-xs text-primary-foreground/50">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
