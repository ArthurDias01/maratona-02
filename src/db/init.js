//importa configuração do banco de dados
const Database = require("./config");

const initDb = {
  async init() {
    //ABRE O BANCO DE DADOS
    const db = await Database();
    // inicia o banco de dados criando as tabelas do profile
    await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`);
    // inicia o banco de dados criando as tabelas do jobs
    await db.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`);
    //INSERE DADOS na tabela profile
    await db.run(`INSERT INTO profile (
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
 ) VALUES (
     "Arthur Dias",
     "https://github.com/Arthurdias01.png",
     3000,
     5,
     5,
     4,
     70
);`);
    //INSERE DADOS na tabela jobs
    await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizzaria Guloso",
    2,
    1,
    1617514376018
);`);
    //INSERE DADOS na tabela jobs
    await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "OneTwo Projects",
    3,
    47,
    1617514376018
);`);

    await db.close();
  },
};

initDb.init();
