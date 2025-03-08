export const Validators = {
  required: (value: string) => value.trim() ? "" : "Campo obrigatório",
  
  email: (value: string) => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "E-mail inválido",

  cpf: (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length !== 11) return "CPF inválido";
    // Validação de dígitos verificadores
    // Adicione aqui a lógica completa de validação de CPF se necessário
    return "";
  },

  phone: (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return (cleanValue.length === 10 || cleanValue.length === 11) 
      ? "" 
      : "Número de celular inválido";
  },

  password: (value: string) => 
    value.length >= 6 ? "" : "Mínimo 6 caracteres",

  fullName: (value: string) =>
    value.split(' ').length >= 2 ? "" : "Digite o seu nome completo",

  matchPassword: (pass: string, confirm: string) =>
    pass === confirm ? "" : "As senhas não coincidem"
};