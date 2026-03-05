import { redirect } from 'next/navigation';

export default function AdminPage() {
    // Le middleware ou le layout gérera le redirect vers /login si nécessaire
    // Par défaut on redirige vers le dashboard
    redirect('/admin/dashboard');
}
