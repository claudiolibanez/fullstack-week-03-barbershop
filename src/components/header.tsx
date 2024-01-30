import Image from "next/image";
import { MenuIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <Card>
      <CardContent className="flex flex-row justify-between items-center p-5">
        <Image
          src="/logo.png"
          alt="FSW Barber"
          height={18}
          width={120}
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
        >
          <MenuIcon size={18} />
        </Button>
      </CardContent>
    </Card>
  )
}