import z from "zod";
import type { Tool } from "./interfaces.js";

interface Email {
  sender: string;
  message: string;
}
const inbox: Email[] = [
  {
    sender: "ana.silva@empresa.com",
    message:
      "Olá, poderia revisar o relatório financeiro antes da reunião de amanhã?",
  },
  {
    sender: "carlos.mendes@cliente.com",
    message:
      "Confirmo minha presença na demonstração do produto marcada para quinta-feira.",
  },
  {
    sender: "rh@empresa.com",
    message:
      "Lembrete: o prazo para atualização dos dados cadastrais termina nesta sexta-feira.",
  },
  {
    sender: "fernanda.costa@empresa.com",
    message: "Segue em anexo a proposta comercial revisada para análise.",
  },
  {
    sender: "suporte@provedor.com",
    message:
      "Identificamos uma instabilidade temporária em nossos serviços. Nossa equipe já está trabalhando na correção.",
  },
  {
    sender: "joao.almeida@empresa.com",
    message: "Você tem disponibilidade para uma reunião rápida às 15:00?",
  },
  {
    sender: "newsletter@tecnologia.com",
    message:
      "Confira as principais novidades sobre IA generativa desta semana.",
  },
  {
    sender: "financeiro@empresa.com",
    message: "O reembolso referente às despesas de viagem foi aprovado.",
  },
  {
    sender: "mariana.rocha@cliente.com",
    message: "Gostaria de agendar uma apresentação para a próxima semana.",
  },
  {
    sender: "eventos@conferencia.dev",
    message: "Sua inscrição para a Conferência Dev Summit 2026 foi confirmada.",
  },
];

const getEmails: Tool = {
  function: async () => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(inbox),
        },
      ],
      structuredContent: {
        inbox: inbox,
      },
    };
  },
  declaration: {
    name: "getEmails",
    description: "retorna todos os email da caixa de entrada.",
  },
};

const sendEmail: Tool = {
  function: async ({ contact, message }) => {
    return {
      content: [
        {
          type: "text",
          text: `"Email enviado com sucesso para ", ${contact}: ${message}`,
        },
      ],
    };
  },
  declaration: {
    name: "sendEmail",
    description: "envia um email para um contato.",
    parameters: z.object({
      contact: z.string().describe("o nome do contato para enviar a mensagem"),
      message: z.string().describe("a mensagem a ser enviada"),
    }),
  },
};

const allDefinitions = [getEmails, sendEmail];

export { allDefinitions };
