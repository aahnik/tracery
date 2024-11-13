"use client";

import { Users, TrendingUp, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Members", href: "/members", icon: Users },
  { name: "Proposals", href: "/proposals", icon: FileText },
  { name: "Cash Flow", href: "/flow", icon: TrendingUp },
];

export function BottomBarComponent() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="max-w-md mx-auto px-4">
        <ul className="flex justify-around">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <li key={tab.name} className="flex-1">
                <Link
                  href={tab.href}
                  className={`flex flex-col items-center py-2 px-1 text-sm ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <tab.icon className="w-6 h-6 mb-1" />
                  <span>{tab.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
