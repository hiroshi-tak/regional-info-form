import Setting from "./Setting";
import AuthGuard from "@/components/AuthGuard";

export default function Page() {
    
    return (
        <AuthGuard>
            <Setting />
        </AuthGuard>
    );
}