"use client";

import { use } from "react";
import HotelDetail from "@/Component/Hotels/HotelDetail";

export default function HotelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <HotelDetail hotelId={id} />;
}
