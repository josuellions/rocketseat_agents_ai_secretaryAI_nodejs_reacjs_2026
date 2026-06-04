import { GoogleGenAI } from "@google/genai";

import { allFuncions as calendarFunctions } from "./tools/calendar.js";
import { allFuncions as emailFunctions } from "./tools/email.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

const allFuncions = calendarFunctions.concat(emailFunctions);

const baseUseCalendar = async () => {
  try {
    console.log("Script iniciado:", new Date().toISOString());

    const contents = [
      {
        role: "user",
        parts: [
          {
            // text: "que dia é hoje?",
            // text: "qual a temperatura no Brasil?",
            // text: "quais eventos na minha agenda para o dia 10/06/20230?",
            // text: "marque um evento novo para dia 31/12/2026 as 18:00, chamado 'ano novo' passar junto com Roberta.",
            text: "madar um email com mensagem de bonita e emotiva de feliz aniversario, para Roberta.",
          },
        ],
      },
    ];

    let response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      //model: "gemini-3.1-flash-lite",
      contents: contents,
      config: {
        tools: [
          {
            functionDeclarations: allFuncions,
          },
        ],
      },
    });

    console.log(response.candidates[0].content.parts[0]);
  } catch (error) {
    if (error.status === 429) {
      console.error("Limite de requisições excedido.");
    } else {
      console.error(error);
    }
  }
};

const hanleUseCalendar = async () => {
  try {
    console.log("Script iniciado:", new Date().toISOString());
    console.log(
      allFuncions[5].function({
        contact: "roberta@email",
        message: "Vamos jantar hoje as 20:00h!",
      }),
    );
    console.log(allFuncions[4].function());
    return;
    console.log(
      allFuncions[2].function({
        title: "jantar com a Roberta",
        date: "2026-06-04",
        time: "18:00",
        attendees: ["Josuel", "Roberta"],
      }),
    );
    console.log(
      allFuncions[1].function({
        date: "2026-06-04",
      }),
    );
    console.log(
      allFuncions[3].function({
        title: "jantar com a Roberta",
        date: "2026-06-04",
        newTime: "20:00",
      }),
    );
    console.log(
      allFuncions[1].function({
        date: "2026-06-04",
      }),
    );
  } catch (error) {
    if (error.status === 429) {
      console.error("Limite de requisições excedido.");
    } else {
      console.error(error);
    }
  }
};

hanleUseCalendar();
