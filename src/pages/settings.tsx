import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import CloudSync from "@/components/setting/CloudSync";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Settings() {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    console.log(session)

    return <div className="flex flex-col gap-5">
      <CloudSync />
      
    </div>
}


// if (!session) {
//   return (
//       <Auth
//           supabaseClient={supabase}
//           providers={["google"]}
//           appearance={{ theme: ThemeSupa }}
//           redirectTo="http://localhost:3000/settings"
//       />
//   );
// } else {
//   return <div>Logged in!</div>;
// }