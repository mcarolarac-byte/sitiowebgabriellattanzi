import { contactSchema } from "../contact-schema";

const validData = {
  name: "María García",
  email: "maria@example.com",
  phone: "+34 600 000 000",
  message: "Me gustaría recibir más información sobre sus servicios.",
  website: "",
  consent: "accepted",
};

describe("contactSchema — validación del formulario de contacto", () => {
  describe("nombre", () => {
    it("acepta un nombre válido", () => {
      expect(contactSchema.safeParse(validData).success).toBe(true);
    });

    it("rechaza un nombre de 1 carácter", () => {
      const result = contactSchema.safeParse({ ...validData, name: "A" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Escribe tu nombre completo.");
      }
    });

    it("rechaza un nombre vacío", () => {
      const result = contactSchema.safeParse({ ...validData, name: "" });
      expect(result.success).toBe(false);
    });
  });

  describe("correo", () => {
    it("acepta un correo válido", () => {
      expect(contactSchema.safeParse(validData).success).toBe(true);
    });

    it("rechaza un correo sin @", () => {
      const result = contactSchema.safeParse({ ...validData, email: "noesuncorreo" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Escribe un correo válido.");
      }
    });

    it("rechaza un correo vacío", () => {
      const result = contactSchema.safeParse({ ...validData, email: "" });
      expect(result.success).toBe(false);
    });
  });

  describe("teléfono (opcional)", () => {
    it("acepta teléfono vacío", () => {
      expect(contactSchema.safeParse({ ...validData, phone: "" }).success).toBe(true);
    });

    it("acepta teléfono undefined", () => {
      const { phone: _phone, ...rest } = validData;
      expect(contactSchema.safeParse(rest).success).toBe(true);
    });

    it("acepta formato internacional", () => {
      expect(
        contactSchema.safeParse({ ...validData, phone: "+1 (555) 123-4567" }).success
      ).toBe(true);
    });

    it("rechaza teléfono con letras", () => {
      const result = contactSchema.safeParse({ ...validData, phone: "mi-teléfono" });
      expect(result.success).toBe(false);
    });
  });

  describe("mensaje", () => {
    it("rechaza un mensaje con menos de 10 caracteres", () => {
      const result = contactSchema.safeParse({ ...validData, message: "Hola" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("mínimo 10 caracteres");
      }
    });

    it("acepta un mensaje largo", () => {
      const longMessage = "a".repeat(3000);
      expect(contactSchema.safeParse({ ...validData, message: longMessage }).success).toBe(true);
    });

    it("rechaza un mensaje de más de 3000 caracteres", () => {
      const tooLong = "a".repeat(3001);
      expect(contactSchema.safeParse({ ...validData, message: tooLong }).success).toBe(false);
    });
  });

  describe("honeypot (campo anti-bot)", () => {
    it("acepta website vacío (usuario real)", () => {
      expect(contactSchema.safeParse({ ...validData, website: "" }).success).toBe(true);
    });

    it("rechaza website con contenido (bot detectado)", () => {
      const result = contactSchema.safeParse({ ...validData, website: "http://spam.com" });
      expect(result.success).toBe(false);
    });
  });

  describe("consentimiento (GDPR)", () => {
    it("acepta consent='accepted'", () => {
      expect(contactSchema.safeParse(validData).success).toBe(true);
    });

    it("rechaza formulario sin consentimiento (consent ausente)", () => {
      const { consent: _consent, ...rest } = validData;
      const result = contactSchema.safeParse(rest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Debes aceptar la Política de Privacidad.");
      }
    });

    it("rechaza consent con valor incorrecto", () => {
      const result = contactSchema.safeParse({ ...validData, consent: "on" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Debes aceptar la Política de Privacidad.");
      }
    });
  });
});
