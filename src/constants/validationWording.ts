export default {
  invalid: (name: string) => `${name} tidak valid`,
  minLength: (min: number) => `Password minimal ${min} angka`,
  required: (name: string) => `${name} tidak boleh kosong`,
  notFound: (name: string) => `${name} tidak ditemukan`,
  incorrect: (name: string) => `${name} salah`,
  duplicate: (name: string, value: string) => `${name} ${value} telah dipakai`,
  oneOf: (name: string, ...args: string[]) =>
    `${name} harus salah satu diantara ${args.map(v => `'${v}'`).join(', ')}`
};
