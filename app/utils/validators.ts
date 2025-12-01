import { z } from 'zod';

// Email validator
export const emailSchema = z.string().email('Email inválido');

// Password validator (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
export const passwordSchema = z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter ao menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter ao menos um número')
    .regex(/[^A-Za-z0-9]/, 'Senha deve conter ao menos um caractere especial');

// Phone validator (Brazilian format) - Accepts formatted or raw (10-11 digits)
export const phoneSchema = z
    .string()
    .regex(/^(\(\d{2}\) \d{4,5}-\d{4}|\d{10,11})$/, 'Telefone inválido. Use o formato (99) 99999-9999');

// CPF validator
export const cpfSchema = z.string().refine((cpf) => validateCPF(cpf), {
    message: 'CPF inválido',
});

// CRMV validator
export const crmvSchema = z.string().min(4, 'CRMV inválido');

// CEP validator (Brazilian postal code)
export const cepSchema = z
    .string()
    .regex(/^\d{5}-\d{3}$/, 'CEP inválido. Use o formato 99999-999');

/**
 * Validate CPF
 */
export function validateCPF(cpf: string): boolean {
    // Remove non-numeric characters
    const cleanCPF = cpf.replace(/\D/g, '');

    // Check if has 11 digits
    if (cleanCPF.length !== 11) return false;

    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cleanCPF)) return false;

    // Validate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF.charAt(i), 10) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cleanCPF.charAt(9), 10)) return false;

    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF.charAt(i), 10) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cleanCPF.charAt(10), 10)) return false;

    return true;
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
    try {
        emailSchema.parse(email);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate password
 */
export function validatePassword(password: string): boolean {
    try {
        passwordSchema.parse(password);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate phone
 */
export function validatePhone(phone: string): boolean {
    try {
        phoneSchema.parse(phone);
        return true;
    } catch {
        return false;
    }
}
