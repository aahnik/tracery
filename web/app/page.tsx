import { LoginPageComponent } from "@/components/login-page";
import { useActiveAccount } from "thirdweb/react";

export default function Home() {
  const activeAccount = useActiveAccount();
  console.log("address", activeAccount?.address);
  return <LoginPageComponent />;
}
