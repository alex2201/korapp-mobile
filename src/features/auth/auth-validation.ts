const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string) {
  const normalizedEmail = email.trim();

  if (!normalizedEmail) return 'Ingresa tu correo electrónico';
  if (!EMAIL_PATTERN.test(normalizedEmail)) return 'Ingresa un correo electrónico válido';

  return undefined;
}

export function validatePassword(password: string) {
  return password.length > 0 ? undefined : 'Ingresa tu contraseña';
}
