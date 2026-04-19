"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { dentalServices } from "@/lib/dental-services";
import { cn } from "@/lib/utils";

function desktopNavClass(pathname: string, href: string) {
  const active = pathname === href;
  return cn(
    buttonVariants({ variant: "ghost", size: "sm" }),
    active && "bg-accent text-accent-foreground"
  );
}

export function MainNav({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const closeSheet = () => setSheetOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:gap-6">
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold tracking-tight sm:text-xl"
        >
          Dentist
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 lg:flex"
          aria-label="Main"
        >
          <Link href="/" className={desktopNavClass(pathname, "/")}>
            Home
          </Link>
          <Link href="/about" className={desktopNavClass(pathname, "/about")}>
            About Doctor
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1 px-2.5",
                pathname.startsWith("/services") && "bg-accent text-accent-foreground"
              )}
            >
              Dental
              <ChevronDown className="size-4 opacity-70" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal text-muted-foreground">
                  Services
                </DropdownMenuLabel>
                {dentalServices.map((s) => (
                  <DropdownMenuItem
                    key={s.slug}
                    onClick={() => router.push(`/services/${s.slug}`)}
                  >
                    {s.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/services")}>
                  View all services
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/contact"
            className={desktopNavClass(pathname, "/contact")}
          >
            Contact Now
          </Link>
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Link
            href="/book"
            className={cn(
              buttonVariants({ size: "default" }),
              "shadow-sm"
            )}
          >
            Book Appointment
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link
            href="/book"
            className={cn(buttonVariants({ size: "sm" }), "shadow-sm")}
          >
            Book
          </Link>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[min(100vw-2rem,20rem)]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-2 pb-6" aria-label="Mobile">
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "default" }),
                    "justify-start",
                    pathname === "/" && "bg-accent"
                  )}
                  onClick={closeSheet}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "default" }),
                    "justify-start",
                    pathname === "/about" && "bg-accent"
                  )}
                  onClick={closeSheet}
                >
                  About Doctor
                </Link>

                <div className="py-2">
                  <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Dental services
                  </p>
                  <div className="flex flex-col gap-0.5">
                    <Link
                      href="/services"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "justify-start font-medium",
                        pathname === "/services" && "bg-accent"
                      )}
                      onClick={closeSheet}
                    >
                      All services
                    </Link>
                    {dentalServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "justify-start pl-6 text-muted-foreground",
                          pathname === `/services/${s.slug}` &&
                            "bg-accent text-accent-foreground"
                        )}
                        onClick={closeSheet}
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <Separator className="my-2" />

                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "default" }),
                    "justify-start",
                    pathname === "/contact" && "bg-accent"
                  )}
                  onClick={closeSheet}
                >
                  Contact Now
                </Link>
                <Link
                  href="/book"
                  className={cn(
                    buttonVariants({ variant: "default", size: "default" }),
                    "mt-2 justify-center"
                  )}
                  onClick={closeSheet}
                >
                  Book Appointment
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
