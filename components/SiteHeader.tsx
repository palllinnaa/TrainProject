import AccountMenu from "./AccountMenu";

export default function SiteHeader() {
  return (
    <div>
      <header className="mt-5 bg-white">
        <div className="flex justify-between">
          <img className="sm:flex h-11" src="../images/logo_transparent.png" alt="logo" />
          <div className="sm:flex-1 lg:inline-block">
            <AccountMenu />
          </div>
        </div>
      </header>
    </div>
  );
}
