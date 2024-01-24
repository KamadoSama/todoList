import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todoApp.db');

const init = (db) => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT, description TEXT, categorie TEXT, date TEXT, priorite TEXT, heureDebut TEXT, heureFin TEXT, done INTEGER)'
    );
  });
}
  

export { init, db };