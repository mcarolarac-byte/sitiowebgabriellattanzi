/**
 * Tests del componente ContactForm.
 * Se mockean las dependencias externas para aislar el componente:
 * - useActionState (React 19) → controla el estado del formulario
 * - useLanguage → simula el contexto de idioma
 * - next/script → evita carga de scripts externos en tests
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { ContactForm } from "../ContactForm";

// Mock del contexto de idioma
jest.mock("@/contexts/LanguageContext", () => ({
  useLanguage: jest.fn(() => ({ lang: "es" })),
}));

// Mock de next/script (carga el script de Turnstile en prod)
jest.mock("next/script", () => ({
  __esModule: true,
  default: () => null,
}));

// Mock de la server action
jest.mock("../actions", () => ({
  submitContactForm: jest.fn(),
}));

// Mock de useActionState para controlar el estado del form
const mockUseActionState = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: (...args: unknown[]) => mockUseActionState(...args),
}));

const { useLanguage } = require("@/contexts/LanguageContext");

describe("ContactForm", () => {
  beforeEach(() => {
    // Estado por defecto: idle, no pending
    mockUseActionState.mockReturnValue([{ status: "idle" }, jest.fn(), false]);
  });

  describe("renderizado en español", () => {
    beforeEach(() => {
      useLanguage.mockReturnValue({ lang: "es" });
    });

    it("muestra los labels en español", () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    });

    it("muestra el botón de envío en español", () => {
      render(<ContactForm />);
      expect(screen.getByRole("button", { name: /Enviar mensaje/i })).toBeInTheDocument();
    });
  });

  describe("renderizado en inglés", () => {
    beforeEach(() => {
      useLanguage.mockReturnValue({ lang: "en" });
    });

    it("muestra los labels en inglés", () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    });

    it("muestra el botón de envío en inglés", () => {
      render(<ContactForm />);
      expect(screen.getByRole("button", { name: /Send message/i })).toBeInTheDocument();
    });
  });

  describe("estado de éxito", () => {
    it("muestra el mensaje de gracias en español cuando el envío es exitoso", () => {
      useLanguage.mockReturnValue({ lang: "es" });
      mockUseActionState.mockReturnValue([{ status: "success" }, jest.fn(), false]);
      render(<ContactForm />);
      expect(screen.getByText(/¡Gracias por escribir!/i)).toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("muestra el mensaje de gracias en inglés cuando el envío es exitoso", () => {
      useLanguage.mockReturnValue({ lang: "en" });
      mockUseActionState.mockReturnValue([{ status: "success" }, jest.fn(), false]);
      render(<ContactForm />);
      expect(screen.getByText(/Thank you for writing/i)).toBeInTheDocument();
    });
  });

  describe("estado de envío", () => {
    it("deshabilita el botón mientras se envía el formulario", () => {
      useLanguage.mockReturnValue({ lang: "es" });
      mockUseActionState.mockReturnValue([{ status: "idle" }, jest.fn(), true]); // pending = true
      render(<ContactForm />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent(/Enviando/i);
    });
  });

  describe("errores de campo", () => {
    it("muestra el error de nombre cuando hay un error de validación", () => {
      useLanguage.mockReturnValue({ lang: "es" });
      mockUseActionState.mockReturnValue([
        { status: "error", fieldErrors: { name: "Escribe tu nombre completo." } },
        jest.fn(),
        false,
      ]);
      render(<ContactForm />);
      expect(screen.getByText("Escribe tu nombre completo.")).toBeInTheDocument();
    });

    it("muestra el mensaje de error general", () => {
      useLanguage.mockReturnValue({ lang: "es" });
      mockUseActionState.mockReturnValue([
        { status: "error", message: "Revisa los datos del formulario." },
        jest.fn(),
        false,
      ]);
      render(<ContactForm />);
      expect(screen.getByRole("alert")).toHaveTextContent("Revisa los datos del formulario.");
    });
  });
});
