import Link from "next/link";
import AccountMenu from "./AccountMenu";

export default function SiteHeader() {
  return (
    <div>
      <header className="mt-4 bg-white">
        <div className="flex justify-between">
          <Link href='/'>
            <img className="sm:flex h-11" src="../images/logo_transparent.png" alt="logo" />
          </Link>
          <div className="sm:flex-1 lg:inline-block">
            <AccountMenu/>
          </div>
        </div>
      </header>
    </div>
  );
}
