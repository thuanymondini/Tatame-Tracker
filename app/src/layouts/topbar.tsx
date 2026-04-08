import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Outlet, Link } from "react-router-dom";

export function Topbar() {
  return (
    <div>
      <div className="flex flex-row justify-between px-6 bg-sidebar">
            <div>

            </div>
          <div>
            <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to={"/"}>
                  <NavigationMenuLink>Workouts</NavigationMenuLink>
                  <NavigationMenuContent>
                    <ul className="w-96"></ul>
                  </NavigationMenuContent>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:flex">
                <Link to={"/technique"}>
                  <NavigationMenuLink>Techniques</NavigationMenuLink>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]"></ul>
                  </NavigationMenuContent>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:flex">
                <Link to={"/techniqueCategory"}>
                  <NavigationMenuLink>Techniques Category</NavigationMenuLink>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]"></ul>
                  </NavigationMenuContent>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                ></NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div>
            <ModeToggle></ModeToggle>
          </div>
      </div>
      <Outlet />
    </div>
  );
}