import DashboardPage from "./Dashboard";
import AuthGuard from "@/components/AuthGuard";

export default function Page() {
    
    return (
        <AuthGuard>
            <DashboardPage />
        </AuthGuard>
    );
}