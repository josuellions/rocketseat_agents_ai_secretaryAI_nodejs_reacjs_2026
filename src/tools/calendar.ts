import { z } from "zod";
import type { Tool } from "./interfaces.js";

interface Event {
  title: string;
  time: string;
  attendees: string[];
}

interface Calendar {
  [key: string]: Event[];
}

const calendar: Calendar = {
  "2026-06-02": [
    {
      title: "Reunião de Planejamento do Projeto",
      time: "09:00",
      attendees: ["Ana", "Carlos", "Mariana"],
    },
  ],
  "2026-06-03": [
    {
      title: "Revisão de Arquitetura da Aplicação",
      time: "14:30",
      attendees: [],
    },
  ],
  "2026-06-04": [
    {
      title: "Demonstração para o Cliente",
      time: "10:00",
      attendees: ["João", "Fernanda", "Lucas", "Cliente XPTO"],
    },
  ],
  "2026-06-05": [
    {
      title: "Workshop de Inteligência Artificial",
      time: "16:00",
      attendees: [],
    },
  ],
  "2026-06-06": [
    {
      title: "Retrospectiva da Sprint",
      time: "11:00",
      attendees: ["Equipe Backend", "Equipe Frontend"],
    },
  ],
  "2026-06-07": [
    {
      title: "Entrevista Técnica",
      time: "15:30",
      attendees: [],
    },
  ],
};

const getTodayDate: Tool = {
  function: async () => {
    return {
      content: [
        {
          type: "text",
          text: new Date().toLocaleDateString("pt-BR"),
        },
      ],
    };
  },
  declaration: {
    name: "getTodayDate",
    description: "retorna a data de hoje no formato yyyy-mm-dd",
  },
};

const getEvents: Tool = {
  function: async ({ date }) => {
    const events = calendar[date] ?? [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(events),
        },
      ],
      structuredContent: { events: events },
    };
  },
  declaration: {
    name: "getEvents",
    description: "retorna os eventos do calendário para um determinado dia.",
    parameters: z.object({
      date: z
        .string()
        .describe(
          "a data para o qual queremos retornar os eventos, no formato yyyy-mm-dd",
        ),
    }),
  },
};

const scheduleEvent: Tool = {
  function: async ({ title, date, time, attendees }) => {
    const eventList = calendar[date] ?? [];
    eventList.push({
      title: title,
      time: time,
      attendees: attendees,
    });
    calendar[date] = eventList;

    return {
      content: [
        {
          type: "text",
          text: "Evento adicionado com sucesso!",
        },
      ],
    };
  },
  declaration: {
    name: "scheduleEvent",
    description:
      "marcar um novo eventos no calendário para um determinado dia.",
    parameters: z.object({
      title: z.string().describe("o título do evento"),
      date: z.string().describe("a data do evento, no formato yyyy-mm-dd"),
      time: z.string().describe("a hora do evento, no formato HH:MM"),
      attendees: z
        .array(z.string())
        .describe("lista de nomes de convidados para o evento"),
    }),
  },
};

const rescheduleEvent: Tool = {
  function: async ({ title, date, newTime }) => {
    let result;
    const eventList = calendar[date] ?? [];
    const eventIndex = eventList.findIndex((obj) => obj.title === title);

    if (eventIndex == -1) {
      result = "Evento não encontrado";
    } else {
      calendar[date]![eventIndex]!.time = newTime;
      result = "Evento atualizado com sucesso!";
    }

    return {
      content: [
        {
          type: "text",
          text: result,
        },
      ],
    };
  },
  declaration: {
    name: "rescheduleEvent",
    description: "remarcar um eventos para um novo horário.",
    parameters: z.object({
      title: z.string().describe("o título do evento para remarcar"),
      date: z.string().describe("a data do evento, no formato yyyy-mm-dd"),
      newTime: z.string().describe("a nova hora do evento, no formato HH:MM"),
    }),
  },
};

const allDefinitions = [
  rescheduleEvent,
  scheduleEvent,
  getTodayDate,
  getEvents,
];

export { allDefinitions };
