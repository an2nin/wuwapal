import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function AuthCallback() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const {toast} = useToast();
    useEffect(() => {
      if(router.query.token){
        setCookie("token", router.query.token);
        router.push("/settings");
      }

      if(router.query.error){
        toast({
          title: "Error",
          description: router.query.error,
          variant: "destructive",
        })
        router.push("/settings");
      }
    }, [router])
    
    return (
        <></>
    );
}
