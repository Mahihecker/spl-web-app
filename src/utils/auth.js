// src/utils/auth.js
export function generateMockToken(user) {
  // Include ALL user fields in the token payload
  const payload = {
    role: user.role,
    username: user.username,
    email: user.email,
    pfp: user.pfp,
    orgId: user.orgId || null,
    enrolledOrgIds: user.enrolledOrgIds || [],
    // Add timestamp for realism
    iat: Date.now()
  };
  console.log('Token payload:', payload); // Debug log
  return btoa(JSON.stringify(payload));
}
export function decodeMockToken(token) {
  try {
    const payload = JSON.parse(atob(token));
    console.log('Decoded token:', payload); // Debug log
    return payload;
  } catch (err) {
    console.error('Failed to decode token:', err);
    throw err;
  }
}