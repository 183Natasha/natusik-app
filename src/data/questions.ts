

export const basicQuestions: object[] = [
    // {
    //   id: 1,
    //   type: "text",
    //   label: "Как тебя зовут?",
    //   model: "name",
    //   placeholder: "Введите имя",
    //   required: true,
    // },
    {
        id: 2,
        type: "date",
        label: "Текущая дата",
        model: "date",
        required: true,
    },
    {
        id: 3,
        type: "radio",
        label: "Была ли у Вас сегодня головная боль (ГБ) или аура?",
        model: "headacheToday",
        options: [
            { value: "yes", label: "Да" },
            { value: "no", label: "Нет" },
        ],
        required: true,
    },
];

export const headacheQuestions: object[] = [
    {
        id: 4,
        type: "radio",
        label: "В течение часа ДО возникновения головной боли отмечали ли вы:",
        sublabels: [
            "- зрительные нарушения (цветные вспышки, зигзаги, слепые пятна)",
            "- И/ИЛИ обонятельные (ощущение посторонних запахов)",
        ],
        model: "aura",
        options: [
            { value: "yes", label: "Да" },
            { value: "no", label: "Нет" },
        ],
    },
    {
        id: 5,
        type: "checkbox",
        label: "Где отмечалась головная боль?",
        model: "location",
        options: [
            { value: "one", label: "C одной стороны" },
            { value: "two", label: "С обеих сторон" },
        ],
    },
    {
        id: 6,
        type: "checkbox",
        label: "Характер ГБ",
        model: "headacheType",
        options: [
            { value: "press", label: "Давящая" },
            { value: "puls", label: "Пульсирующая" },
        ],
    },
    {
        id: 7,
        type: "select",
        label:
            "Интенсивность головной боли в баллах (Выберите интенсивность из списка)",
        model: "intensity",
        options: [
            { value: "0", label: "0 - Нет боли" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5 - Средняя боль" },
            { value: "6", label: "6" },
            { value: "7", label: "7" },
            { value: "8", label: "8" },
            { value: "9", label: "9" },
            { value: "10", label: "10 - Невыносимая боль" },
        ],
        placeholder: "Выберите значение от 0 до 10", // текст по умолчанию
    },
    {
        id: 8,
        type: "radio",
        label: "Усиливалась ли при физической нагрузке?",
        model: "physicalActivity",
        options: [
            { value: "yes", label: "Да" },
            { value: "no", label: "Нет" },
        ],
    },
    {
        id: 9,
        type: "radio",
        label: "Сопровождалась ли тошнотой?",
        model: "nausea",
        options: [
            { value: "yes", label: "Да" },
            { value: "no", label: "Нет" },
        ],
    },
    {
        id: 10,
        type: "radio",
        label: "Сопровождалась ли рвотой?",
        model: "vomiting",
        options: [
            { value: "yes", label: "Да" },
            { value: "no", label: "Нет" },
        ],
    },
    {
        id: 11,
        type: "radio",
        label: "Раздражал ли свет?",
        model: "lightSensitivity",
        options: [
            { value: "yes", label: "Да" },
            { value: "no", label: "Нет" },
        ],
    },
    {
        id: 12,
        type: "radio",
        label: "Раздражал ли звук?",
        model: "soundSensitivity",
        options: [
            { value: "yes", label: "Да" },
            { value: "no", label: "Нет" },
        ],
    },
    {
        id: 13,
        type: "radio",
        label: "Головная боль требовала использование медикаментов",
        model: "medication",
        options: [
            { value: "yes", label: "Да" },
            { value: "no", label: "Нет" },
        ],
    },
];

export const drugQuestions: object[] = [
    {
        id: 14,
        type: "text",
        label:
            "Заполните поля ниже, если головная боль требовала использование медикаментов",
        sublabels: ["Какой препарат Вы приняли?"],
        model: "drugName",
        placeholder: "Введите название препарата",
    },
    {
        id: 15,
        type: "text",
        label: "Какая дозировка (мг)?",
        model: "drugMass",
        placeholder: "Введите дозировку препарата",
    },
    {
        id: 16,
        type: "radio",
        label: "Был эффект от приема препарата?",
        model: "drugEffect",
        options: [
            { value: "yes", label: "Да" },
            { value: "no", label: "Нет" },
        ],
    },
];
