import { isValid as isValidCnpj } from "@fnando/cnpj";
import { isValid as isValidCpf } from "@fnando/cpf";

import { generateDecorator } from "./generate-decorator";

export const IsCpf = generateDecorator(isValidCpf, "isCPF", "invalid CPF");

export const IsCnpj = generateDecorator(isValidCnpj, "isCNPJ", "invalid CNPJ");

export const IsCnpjOrCpf = generateDecorator(
  (CPFCNPJ: string) => {
    const { length } = CPFCNPJ;

    switch (length) {
      case 11:
        return isValidCpf(CPFCNPJ);
      case 14:
        return isValidCnpj(CPFCNPJ);
      default:
        return false;
    }
  },
  "isCNPJOrCPF",
  "invalid document",
);
