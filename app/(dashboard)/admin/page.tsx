import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-buttons";

const Admin = () => {
  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-3xl font-bold">Dashboard Page</h1>
        <UserButton />
        <LogoutButton>
          <Button>Logout</Button>
        </LogoutButton>
      </div>
    </>
  );
};

export default Admin;
