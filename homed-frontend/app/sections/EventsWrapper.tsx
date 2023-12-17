"use client";
import { useEvents } from "../hooks/useEvents";
import { useGetDevices } from "../hooks/useGetDevices";

export function EventsWrapper() {
  console.log("Event Wrapper");
  useEvents();
  useGetDevices();

  return null;
}
