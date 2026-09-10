"use client";

export function PrintDocumentButton() {
  return <button onClick={() => window.print()} className="print:hidden rounded-xl bg-teal-deep px-4 py-3 text-sm font-bold text-white" type="button">Print / Save PDF</button>;
}
