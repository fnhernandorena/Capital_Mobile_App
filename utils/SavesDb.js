import * as SQLite from 'expo-sqlite';

export async function StartDB(){
    const db = SQLite.openDatabaseSync('capital.db');
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        --DROP TABLE IF EXISTS saves;
        CREATE TABLE IF NOT EXISTS saves (
            id INTEGER PRIMARY KEY NOT NULL, 
            title VARCHAR(255) NOT NULL, 
            currency VARCHAR(50) NOT NULL, 
            amount FLOAT NOT NULL, 
            location VARCHAR(255) NOT NULL
        );
    `);
}

export async function GetSaves(){
    const db = SQLite.openDatabaseSync('capital.db');
    const allRows = await db.getAllAsync('SELECT * FROM saves');
    return allRows;
}

export async function CreateSave(title, currency, amount, location) {
    const db = SQLite.openDatabaseSync('capital.db');
    if (title != null && currency != null && amount != null && location != null) {
        try {
            await db.runAsync(`
                INSERT INTO saves (title, currency, amount, location)
                VALUES ($title, $currency, $amount, $location);
            `, {
                $title: title,
                $currency: currency,
                $amount: amount,
                $location: location
            });
            console.log('Save inserted successfully', title, currency, amount);
        } catch (error) {
            console.error('Error inserting save:', error);
        }
    } else {
        console.error('One or more parameters are invalid:', { title, currency, amount, location });
    }
}

export async function DeleteSave(id){
    const db = SQLite.openDatabaseSync('capital.db');
    if (id) {
        try {
            await db.runAsync(`
                DELETE FROM saves WHERE id = $id;
            `, {$id: id});
            console.log('Save deleted successfully', id);
        } catch (error) {
            console.error('Error deleting save:', error);
        }
    } else {
        console.error('ID is invalid:', id);
    }
}

export async function GetSaveById(id) {
    const db = SQLite.openDatabaseSync('capital.db');
    if (id) {
        try {
            console.log(id);
            const save = await db.getAllAsync(`
                SELECT * FROM saves WHERE id = $id;
            `, { $id: id });
            return save[0];
        } catch (error) {
            console.error('Error retrieving save:', error);
        }
    } else {
        console.error('ID is invalid:', id);
    }
}

export async function UpdateSave(id, title, currency, amount, location) {
    const db = SQLite.openDatabaseSync('capital.db');
    if (id && title && currency && amount && location) {
        try {
            await db.runAsync(`
                UPDATE saves
                SET title = $title,
                    currency = $currency,
                    amount = $amount,
                    location = $location
                WHERE id = $id;
            `, {
                $id: id,
                $title: title,
                $currency: currency,
                $amount: amount,
                $location: location
            });
            console.log('Save updated successfully', id);
        } catch (error) {
            console.error('Error updating save:', error);
        }
    } else {
        console.error('One or more parameters are invalid:', { id, title, currency, amount, location });
    }
}
