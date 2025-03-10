export const Validators = {
  required: (value: string) => (value.trim() ? "" : "Campo obrigatório"),

  email: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "E-mail inválido",

  cpf: (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length !== 11) return "CPF inválido";
    // Validação de dígitos verificadores
    // Adicione aqui a lógica completa de validação de CPF se necessário
    return "";
  },

  phone: (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    return cleanValue.length === 10 || cleanValue.length === 11
      ? ""
      : "Número de celular inválido";
  },

  password: (value: string) => (value.length >= 6 ? "" : "Mínimo 6 caracteres"),

  fullName: (value: string) =>
    value.split(" ").length >= 2 ? "" : "Digite o seu nome completo",

  matchPassword: (pass: string, confirm: string) =>
    pass === confirm ? "" : "As senhas não coincidem",

  date: (value: string) => {
    if (!value) return "";

    // Verifica o formato dd/mm/aaaa
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value))
      return "Formato inválido (dd/mm/aaaa)";

    const [day, month, year] = value.split("/").map(Number);

    // Validação básica de números
    if (
      day < 1 || 
      day > 31 || 
      month < 1 || 
      month > 12 || 
      year < 1900 || 
      year > new Date().getFullYear()
    ) {
      return "Data inválida";
    }

    // Verifica dias em cada mês
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day > lastDayOfMonth) {
      return "Data inválida";
    }

    // Cria objeto Date (meses são 0-based no JavaScript)
    const date = new Date(year, month - 1, day);

    // Verifica se a data é real (ex: 30/02 não existe)
    const isValid =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    return isValid ? "" : "Data inválida";
  },
};
