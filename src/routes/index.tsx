import { createFileRoute } from "@tanstack/react-router";
import { Desktop } from "@/components/Desktop";

export const Route = createFileRoute("/")({
  component: Desktop,
  head: () => ({
    meta: [
      { title: "Windows 10 — Escritorio" },
      { name: "description", content: "Simulador de escritorio Windows 10" },
    ],
  }),
});
