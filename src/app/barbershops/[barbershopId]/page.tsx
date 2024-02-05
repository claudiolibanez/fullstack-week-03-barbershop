import { getServerSession } from "next-auth";
import { Service } from "@prisma/client";

import { nextAuthOptions } from "@/lib/nextauth";
import { db } from "@/lib/prisma";

import { BarbershopInfo } from "@/app/barbershops/[barbershopId]/_components/barbershop-info";
import { ServiceItem } from "@/app/barbershops/[barbershopId]/_components/service-item";

interface BarbershopDetailsPageProps {
  params: {
    barbershopId?: string
  }
}

export default async function BarbershopDetailsPage({ params }: BarbershopDetailsPageProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!params.barbershopId) {
    // TODO: redirecionar para home page

    return null;
  }

  const data = await db.barbershop.findUnique({
    where: {
      id: params.barbershopId
    },
    include: {
      services: true
    }
  });

  if (!data) {
    // TODO: redirecionar para home page

    return null;
  }

  const barbershop = JSON.parse(JSON.stringify(data))

  return (
    <div>
      <BarbershopInfo barbershop={JSON.parse(JSON.stringify(barbershop))} />

      <div className="flex flex-col gap-4 px-5 py-6">
        {barbershop.services.map((service: Service) => (
          <ServiceItem
            key={service.id}
            barbershop={barbershop}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  );
}