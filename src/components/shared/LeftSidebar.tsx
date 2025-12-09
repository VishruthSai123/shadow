"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { INITIAL_USER } from "@/constants";

import { Button } from "@/components/ui/button";
import { useSignOutAccount, useCheckAdminAccess } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/SupabaseAuthContext";
import Loader from "./Loader";
import NotificationBell from "./NotificationBell";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const { data: hasAdminAccess } = useCheckAdminAccess();
  
  // Prefetch routes on mount for faster navigation
  useEffect(() => {
    sidebarLinks.forEach(link => {
      router.prefetch(link.route);
    });
  }, [router]);

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    router.push("/sign-in");
  };

  // Filter sidebar links based on admin access
  const filteredSidebarLinks = sidebarLinks.filter((link) => {
    // Show admin link only if user has admin access
    if (link.route === "/admin") {
      return hasAdminAccess === true;
    }
    // Show all other links
    return true;
  });

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link href="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/shadow_logo.png"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        {isLoading || !user?.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <>
            <Link href={`/profile/${user.id}`} className="flex gap-3 items-center">
              <img
                src={user.image_url || "/assets/icons/profile-placeholder.svg"}
                alt="profile"
                className="h-14 w-14 rounded-full"
              />
              <div className="flex flex-col">
                <p className="body-bold">{user.name}</p>
                <p className="small-regular text-light-3">@{user.username}</p>
              </div>
            </Link>
            {/* Notification Bell in Sidebar */}
            <div className="mt-4 flex justify-center">
              <NotificationBell />
            </div>
          </>
        )}

        <ul className="flex flex-col gap-2">
          {filteredSidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className="group">
                <Link
                  href={link.route}
                  className={`flex gap-4 items-center p-4 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary-500/10 border-l-4 border-primary-500' 
                      : 'hover:bg-dark-4/50'
                  }`}>
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className="w-6 h-6 transition-all duration-200"
                    style={isActive ? { filter: 'brightness(0) saturate(100%) invert(21%) sepia(96%) saturate(4949%) hue-rotate(342deg) brightness(91%) contrast(94%)' } : {}}
                  />
                  <span className={`transition-all duration-200 ${
                    isActive 
                      ? 'text-primary-500 font-semibold' 
                      : 'text-light-2 group-hover:text-light-1'
                  }`}>
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        className="shad-button_ghost"
        onClick={(e) => handleSignOut(e)}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
