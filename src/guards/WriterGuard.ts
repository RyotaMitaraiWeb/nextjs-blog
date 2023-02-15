/**
 * Returns ``true`` if ``role`` is ``writer``, ``admin``, or ``superadmin``
 */
export function WriterGuard(role: string) {
    return role === 'writer' || role === 'admin' || role === 'superadmin';
}