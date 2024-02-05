'use client'

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, UserIcon } from "lucide-react";

import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function SideMenu() {
  const { data } = useSession();

  const handleLoginClick = () => signIn("google");

  const handleLogoutClick = async () => await signOut();

  return (
    <>
      <SheetHeader className="p-5 text-left border-b border-solid border-primary">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user.image ?? ""} />
            </Avatar>

            <h2 className="font-bold">{data.user.name}</h2>
          </div>

          <Button
            variant="secondary"
            size="icon"
          >
            <LogOutIcon onClick={handleLogoutClick} />
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-3 px-5 py-6">
            <div className="flex items-center gap-2">
              <UserIcon size={32} />
              <h2 className="font-bold">Olá, faça seu login!</h2>
            </div>
            <Button
              variant="secondary"
              className="justify-start w-full"
              onClick={handleLoginClick}
            >
              <LogInIcon
                size={18}
                className="mr-2"
              />
              Fazer Login
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button
          asChild
          variant="outline"
          className="justify-start"
        >
          <Link href="/">
            <HomeIcon
              size={18}
              className="mr-2"
            />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button
            asChild
            variant="outline"
            className="justify-start"
          >
            <Link href="/bookings">
              <CalendarIcon
                size={18}
                className="mr-2"
              />
              Agendamento
            </Link>
          </Button>
        )}
      </div>
    </>
  )
}