/**
 * Returns ``true`` if ``role`` is ``superadmin``
 */
export function SuperAdminGuard(role: string) {
    return role === 'superadmin';
}