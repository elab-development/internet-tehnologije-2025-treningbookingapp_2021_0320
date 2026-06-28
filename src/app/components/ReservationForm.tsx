"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Modal from "./Modal";

const ALL_SLOTS = [
  "08:00-09:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
  "18:00-19:00",
  "19:00-20:00",
  "20:00-21:00",
  "21:00-22:00",
];

export default function ReservationForm({ courtId }: { courtId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [date, setDate] = useState("");
  const [reservedSlots, setReservedSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!date) return;

    async function fetchReservedSlots() {
      const res = await fetch(
        `/api/reservations?courtId=${courtId}&date=${date}`
      );
      const data = await res.json();
      setReservedSlots(data.reservedSlots ?? []);
    }

    fetchReservedSlots();
  }, [date, courtId]);

  const handleSlotClick = (slot: string) => {
    if (!session) {
      setError("Morate biti ulogovani da rezervišete termin.");
      return;
    }
    setError("");
    setSelectedSlot(slot);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    const [startTime, endTime] = selectedSlot.split("-");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courtId, date, startTime, endTime }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Greška prilikom rezervacije.");
        setLoading(false);
        return;
      }

      setShowModal(false);
      router.push("/reservations");
    } catch {
      setError("Greška prilikom rezervacije.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-zinc-800/60 pt-8 mt-8">
      <h2 className="text-xl font-bold text-zinc-100 mb-4">Rezerviši termin</h2>

      <div className="mb-4">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
          Izaberi datum
        </label>
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 mb-4">
          {error}
        </div>
      )}

      {date && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ALL_SLOTS.map((slot) => {
            const isReserved = reservedSlots.includes(slot);
            return (
              <button
                key={slot}
                disabled={isReserved}
                onClick={() => handleSlotClick(slot)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  isReserved
                    ? "bg-zinc-800/50 border-zinc-800 text-zinc-600 cursor-not-allowed"
                    : "bg-zinc-900/40 border-zinc-700 text-zinc-200 hover:border-emerald-500 hover:text-emerald-400"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Potvrda rezervacije"
      >
        <p className="text-zinc-300 mb-4">
          Da li želiš da rezervišeš termin <strong>{selectedSlot}</strong> za datum{" "}
          <strong>{date}</strong>?
        </p>
        <div className="flex gap-3">
          <Button
            text={loading ? "Rezervisanje..." : "Potvrdi"}
            variant="primary"
            onClick={handleConfirm}
            disabled={loading}
          />
          <Button
            text="Otkaži"
            variant="secondary"
            onClick={() => setShowModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
}