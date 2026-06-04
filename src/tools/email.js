const inbox = [
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

const getEmails = {
  function: () => {
    return inbox;
  },
  declaration: {
    name: "getEmails",
    description: "retorna todos os email da caixa de entrada.",
  },
};

const sendEmail = {
  function: ({ contact, message }) => {
    console.log(">> Email enviado com sucesso! \n", { contact, message });
    inbox.push({ sender: contact, message });
    return inbox;
  },
  declaration: {
    name: "sendEmail",
    description: "envia um email para um contato.",
    parameters: {
      type: "OBJECT",
      properties: {
        contact: {
          type: "STRING",
          description: "o nome do contato para enviar a mensagem",
        },
        message: {
          type: "STRING",
          description: "a mensagem a ser enviada",
        },
      },
      required: ["contact", "message"],
    },
  },
};

const allFuncions = [getEmails, sendEmail];

export { allFuncions };
