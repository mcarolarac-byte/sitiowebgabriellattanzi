/**
 * Tests del componente ContactForm.
 * Se mockean las dependencias externas para aislar el componente:
 * - useActionState (React 19) → controla el estado del formulario
 * - next/script → evita carga de scripts externos en tests
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { ContactForm } from "../ContactForm";
import { submitContactForm } from "../actions";

// Mock de next/script (carga el script de Turnstile en prod)
jest.mock("next/script", () => ({
  __esModule: true,
  default: () => null,
}));

// Mock de la server action
jest.mock("../actions", () => ({
  submitContactForm: jest.fn(),
}));

// Tipado para jest.mocked
const mockedSubmitContactForm = jest.mocked(submitContactForm);

// Mock de useActionState para controlar el estado del form
const mockUseActionState = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: (...args: unknown[]) => mockUseActionState(...args),
}));

describe("ContactForm", () => {
  beforeEach(() => {
    // Estado por defecto: idle, no pending
    mockUseActionState.mockReturnValue([{ status: "idle" }, jest.fn(), false]);
  });

  describe("renderizado por defecto", () => {
    it("muestra los campos del formulario", () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    });

    it("muestra el botón de envío", () => {
      render(<ContactForm />);
      expect(screen.getByRole("button", { name: /Enviar mensaje/i })).toBeInTheDocument();
    });

    it("muestra la casilla de consentimiento con value='accepted'", () => {
      render(<ContactForm />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("value", "accepted");
      expect(checkbox).toHaveAttribute("name", "consent");
    });

    it("muestra el enlace a la Política de Privacidad en el consentimiento", () => {
      render(<ContactForm />);
      expect(screen.getByText(/Política de Privacidad/i)).toBeInTheDocument();
    });
  });

  describe("estado de éxito", () => {
    it("muestra el mensaje de gracias cuando el envío es exitoso", () => {
      mockUseActionState.mockReturnValue([{ status: "success" }, jest.fn(), false]);
      render(<ContactForm />);
      expect(screen.getByText(/¡Gracias por escribir!/i)).toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("estado de envío", () => {
    it("deshabilita el botón mientras se envía el formulario", () => {
      mockUseActionState.mockReturnValue([{ status: "idle" }, jest.fn(), true]); // pending = true
      render(<ContactForm />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent(/Enviando/i);
    });
  });

  describe("errores de campo", () => {
    it("muestra el error de nombre cuando hay un error de validación", () => {
      mockUseActionState.mockReturnValue([
        { status: "error", fieldErrors: { name: "Escribe tu nombre completo." } },
        jest.fn(),
        false,
      ]);
      render(<ContactForm />);
      expect(screen.getByText("Escribe tu nombre completo.")).toBeInTheDocument();
    });

    it("muestra el mensaje de error general", () => {
      mockUseActionState.mockReturnValue([
        { status: "error", message: "Revisa los datos del formulario." },
        jest.fn(),
        false,
      ]);
      render(<ContactForm />);
      expect(screen.getByRole("alert")).toHaveTextContent("Revisa los datos del formulario.");
    });

    it("muestra error de consentimiento con id consent-error y role=alert", () => {
      mockUseActionState.mockReturnValue([
        { status: "error", fieldErrors: { consent: "Debes aceptar la Política de Privacidad." } },
        jest.fn(),
        false,
      ]);
      render(<ContactForm />);
      const errorEl = screen.getByText("Debes aceptar la Política de Privacidad.");
      expect(errorEl).toBeInTheDocument();
      expect(errorEl).toHaveAttribute("id", "consent-error");
      expect(errorEl).toHaveAttribute("role", "alert");
    });
  });

  afterEach(() => {
    mockedSubmitContactForm.mockClear();
  });
});
