import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { nextAuthOptions } from "@/lib/nextauth";
import { db } from "@/lib/prisma";

import { Header } from "@/components/header";
import { BookingItem } from "@/components/booking-item";

export default async function BookingsPage() {
  const session = await getServerSession(nextAuthOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const [
    confirmedBookingsData,
    finishedBookingsData
  ] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  const confirmedBookings = JSON.parse(JSON.stringify(confirmedBookingsData));
  const finishedBookings = JSON.parse(JSON.stringify(finishedBookingsData));

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mb-3">Confirmados</h2>

            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking: any) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Finalizados</h2>

            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking: any) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}