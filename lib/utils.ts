export function getAge() {
  const birthday = Date.UTC(2005, 5, 16)
  const now = Date.now();

  const age = new Date(0, 0, 0)
  age.setUTCMilliseconds(now - birthday)

  return age.getFullYear() - 1900;
}