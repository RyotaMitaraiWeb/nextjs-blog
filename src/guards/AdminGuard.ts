/**
 * Returns ``true`` if ``role`` is ``admin``, or ``superadmin``
 */
export function AdminGuard(role: string) {
    return role === 'admin' || role === 'superadmin';
}