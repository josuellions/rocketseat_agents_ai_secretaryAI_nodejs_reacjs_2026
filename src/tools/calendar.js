const calendar = {
  "2026-06-02": [
    {
      title: "Reunião de Planejamento do Projeto",
      date: "2026-06-02",
      time: "09:00",
      attendees: ["Ana", "Carlos", "Mariana"],
    },
  ],
  "2026-06-03": [
    {
      title: "Revisão de Arquitetura da Aplicação",
      date: "2026-06-03",
      time: "14:30",
      attendees: [],
    },
  ],
  "2026-06-04": [
    {
      title: "Demonstração para o Cliente",
      date: "2026-06-04",
      time: "10:00",
      attendees: ["João", "Fernanda", "Lucas", "Cliente XPTO"],
    },
  ],
  "2026-06-05": [
    {
      title: "Workshop de Inteligência Artificial",
      date: "2026-06-05",
      time: "16:00",
      attendees: [],
    },
  ],
  "2026-06-06": [
    {
      title: "Retrospectiva da Sprint",
      date: "2026-06-06",
      time: "11:00",
      attendees: ["Equipe Backend", "Equipe Frontend"],
    },
  ],
  "2026-06-07": [
    {
      title: "Entrevista Técnica",
      date: "2026-06-07",
      time: "15:30",
      attendees: [],
    },
  ],
};

const getTodayDate = {
  function: () => {
    return "2026-06-04";
  },
  declaration: {
    name: "getTodayDate",
    description: "retorna a data de hoje no formato yyyy-mm-dd",
  },
};

const getEvents = {
  function: ({ date }) => {
    return calendar[date] ?? [];
  },
  declaration: {
    name: "getEvents",
    description: "retorna os eventos do calendário para um determinado dia.",
    parameters: {
      type: "OBJECT",
      properties: {
        date: {
          type: "STRING",
          description:
            "a data para o qual queremos retornar os eventos, no formato yyyy-mm-dd",
        },
      },
      required: ["date"],
    },
  },
};

const scheduleEvent = {
  function: ({ title, date, time, attendees }) => {
    const eventList = calendar[date] ?? [];
    eventList.push({
      title: title,
      date: date,
      time: time,
      attendees: attendees,
    });
    calendar[date] = eventList;

    return "Evento adicionado com sucesso!";
  },
  declaration: {
    name: "scheduleEvent",
    description: "retorna os eventos do calendário para um determinado dia.",
    parameters: {
      type: "OBJECT",
      properties: {
        title: {
          type: "STRING",
          description: "o título do evento",
        },
        date: {
          type: "STRING",
          description: "a data do evento, no formato yyyy-mm-dd",
        },
        title: {
          type: "STRING",
          description: "o título do evento",
        },
        time: {
          type: "STRING",
          description: "a hora do evento, no formato HH:MM",
        },
        attendees: {
          type: "ARRAY",
          items: { type: "STRING" },
          description: "lista de nomes de convidados para o evento",
        },
      },
      required: ["title", "date", "time"],
    },
  },
};

const rescheduleEvent = {
  function: ({ title, date, newTime }) => {
    const eventList = calendar[date] ?? [];
    const eventIndex = eventList.findIndex((obj) => obj.title === title);

    if (eventIndex > 0) {
      calendar[date][eventIndex].time = newTime;
      return "Evento atualizado com sucesso!";
    }

    return "Evento não encontrado";
  },
  declaration: {
    name: "rescheduleEvent",
    description: "remarcar um eventos para um novo horário.",
    parameters: {
      type: "OBJECT",
      properties: {
        title: {
          type: "STRING",
          description: "o título do evento para remarcar",
        },
        date: {
          type: "STRING",
          description: "a data do evento, no formato yyyy-mm-dd",
        },
        title: {
          type: "STRING",
          description: "o título do evento",
        },
        newtime: {
          type: "STRING",
          description: "a nova hora do evento, no formato HH:MM",
        },
      },
      required: ["title", "date", "newtime"],
    },
  },
};

const allFuncions = [getTodayDate, getEvents, scheduleEvent, rescheduleEvent];

export { allFuncions };
